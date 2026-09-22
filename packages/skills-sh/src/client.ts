// Documented skills.sh API client.
// Docs: https://www.skills.sh/docs/api
// Auth: Vercel OIDC bearer token when available; local/CI use without a
// token only for fixture-backed development, never aggressive polling.
// Caching honors documented TTLs: leaderboard/search ~60s, detail/curated
// 5 minutes. Rate limits: 600 req/min per (team, project); every response
// carries X-RateLimit-* headers and 429 carries Retry-After.
import type {
  ListOptions,
  SkillsShClient,
  V1Audit,
  V1Skill,
  V1SkillDetail,
} from "./types.js";

export type SkillsShErrorCode =
  | "bad_request"
  | "unauthorized"
  | "not_found"
  | "rate_limited"
  | "unavailable"
  | "timeout"
  | "network";

export class SkillsShError extends Error {
  code: SkillsShErrorCode;
  status?: number;
  retryable: boolean;
  retryAfterMs?: number;

  constructor(
    code: SkillsShErrorCode,
    message: string,
    opts?: { status?: number; retryable?: boolean; retryAfterMs?: number },
  ) {
    super(message);
    this.name = "SkillsShError";
    this.code = code;
    this.status = opts?.status;
    this.retryable = opts?.retryable ?? false;
    this.retryAfterMs = opts?.retryAfterMs;
  }
}

export interface ClientOptions {
  baseUrl?: string;
  token?: string;
  userAgent?: string;
  timeoutMs?: number;
  maxRetries?: number;
  fetchFn?: typeof fetch;
  now?: () => number;
  sleep?: (ms: number) => Promise<void>;
}

const LIST_TTL_MS = 60_000;
const DETAIL_TTL_MS = 300_000;

function parseRetryAfterMs(value: string | null): number | undefined {
  if (!value) return undefined;
  const seconds = Number(value);
  if (!Number.isFinite(seconds) || seconds < 0) return undefined;
  return seconds * 1000;
}

function backoffMs(attempt: number): number {
  return Math.min(500 * 2 ** attempt, 8000);
}

export function createClient(options: ClientOptions = {}): SkillsShClient {
  const baseUrl = (options.baseUrl ?? "https://skills.sh").replace(/\/$/, "");
  const userAgent = options.userAgent ?? "skillproof/0.1.0";
  const timeoutMs = options.timeoutMs ?? 15000;
  const maxRetries = options.maxRetries ?? 3;
  const fetchFn = options.fetchFn ?? fetch;
  const now = options.now ?? Date.now;
  const sleep =
    options.sleep ?? ((ms: number) => new Promise((r) => setTimeout(r, ms)));
  const cache = new Map<string, { expiresAt: number; body: unknown }>();

  async function request<T>(path: string, ttlMs: number): Promise<T> {
    const url = `${baseUrl}${path}`;
    const cached = cache.get(url);
    if (cached && cached.expiresAt > now()) return cached.body as T;

    let lastError: unknown = null;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const headers: Record<string, string> = {
          Accept: "application/json",
          "User-Agent": userAgent,
        };
        if (options.token) headers.Authorization = `Bearer ${options.token}`;
        const res = await fetchFn(url, { headers, signal: controller.signal });
        if (res.status === 429) {
          const retryAfterMs =
            parseRetryAfterMs(res.headers.get("Retry-After")) ??
            backoffMs(attempt);
          lastError = new SkillsShError("rate_limited", "Rate limit exceeded", {
            status: 429,
            retryable: true,
            retryAfterMs,
          });
          if (attempt < maxRetries) {
            await sleep(retryAfterMs);
            continue;
          }
          throw lastError;
        }
        if (res.status === 503) {
          lastError = new SkillsShError("unavailable", "Service unavailable", {
            status: 503,
            retryable: true,
          });
          if (attempt < maxRetries) {
            await sleep(backoffMs(attempt));
            continue;
          }
          throw lastError;
        }
        if (res.status === 400) {
          throw new SkillsShError("bad_request", "Invalid request parameters", {
            status: 400,
          });
        }
        if (res.status === 401) {
          throw new SkillsShError(
            "unauthorized",
            "Missing, invalid, or expired token",
            { status: 401 },
          );
        }
        if (res.status === 404) {
          throw new SkillsShError("not_found", "Skill not found", {
            status: 404,
          });
        }
        if (!res.ok) {
          throw new SkillsShError(
            "unavailable",
            `Unexpected status ${res.status}`,
            { status: res.status, retryable: attempt < maxRetries },
          );
        }
        const body = (await res.json()) as T;
        cache.set(url, { expiresAt: now() + ttlMs, body });
        return body;
      } catch (error) {
        if (error instanceof SkillsShError) {
          if (!error.retryable || attempt >= maxRetries) throw error;
          lastError = error;
          continue;
        }
        if (error instanceof Error && error.name === "AbortError") {
          lastError = new SkillsShError("timeout", "Request timed out", {
            retryable: true,
          });
        } else {
          lastError = new SkillsShError(
            "network",
            error instanceof Error ? error.message : "Network error",
            { retryable: true },
          );
        }
        if (attempt < maxRetries) {
          await sleep(backoffMs(attempt));
          continue;
        }
        throw lastError;
      } finally {
        clearTimeout(timer);
      }
    }
    throw lastError;
  }

  return {
    async listSkills(listOptions: ListOptions = {}): Promise<V1Skill[]> {
      const params = new URLSearchParams();
      params.set("view", listOptions.view ?? "all-time");
      params.set("page", String(listOptions.page ?? 0));
      params.set("perPage", String(listOptions.perPage ?? 100));
      const body = await request<{ data: V1Skill[] }>(
        `/api/v1/skills?${params.toString()}`,
        LIST_TTL_MS,
      );
      if (!Array.isArray(body.data)) {
        throw new SkillsShError("network", "Unexpected list response shape");
      }
      return body.data;
    },

    async searchSkills(query: string, limit = 50): Promise<V1Skill[]> {
      const params = new URLSearchParams();
      params.set("q", query);
      params.set("limit", String(limit));
      const body = await request<{ data: V1Skill[] }>(
        `/api/v1/skills/search?${params.toString()}`,
        LIST_TTL_MS,
      );
      if (!Array.isArray(body.data)) {
        throw new SkillsShError("network", "Unexpected search response shape");
      }
      return body.data;
    },

    async getCuratedSkills(): Promise<V1Skill[]> {
      const body = await request<{
        data: { skills: V1Skill[] }[];
      }>(`/api/v1/skills/curated`, DETAIL_TTL_MS);
      if (!Array.isArray(body.data)) {
        throw new SkillsShError("network", "Unexpected curated response shape");
      }
      return body.data.flatMap((group) => group.skills ?? []);
    },

    async getSkill(source: string, skill: string): Promise<V1SkillDetail> {
      return request<V1SkillDetail>(
        `/api/v1/skills/${source}/${skill}`,
        DETAIL_TTL_MS,
      );
    },

    async getAudit(source: string, skill: string): Promise<V1Audit> {
      return request<V1Audit>(
        `/api/v1/skills/audit/${source}/${skill}`,
        DETAIL_TTL_MS,
      );
    },
  };
}
