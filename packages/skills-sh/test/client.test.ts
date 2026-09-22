import { SkillsShError, createClient } from "../src/client.js";

function jsonResponse(body: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
    ...init,
  });
}

test("client sends explicit User-Agent and caches repeated lookups", async () => {
  const seenAgents: (string | null)[] = [];
  let calls = 0;
  const client = createClient({
    userAgent: "skillproof/0.1.0-test",
    fetchFn: (async (url: string | URL | Request, init?: RequestInit) => {
      calls++;
      seenAgents.push(
        (init?.headers as Record<string, string>)?.["User-Agent"] ?? null,
      );
      return jsonResponse({ data: [] });
    }) as typeof fetch,
  });
  await client.listSkills({ view: "trending", perPage: 10 });
  await client.listSkills({ view: "trending", perPage: 10 });
  expect(calls).toBe(1);
  expect(seenAgents).toEqual(["skillproof/0.1.0-test"]);
});

test("client honors Retry-After on 429 then succeeds", async () => {
  let calls = 0;
  const slept: number[] = [];
  const client = createClient({
    fetchFn: (async () => {
      calls++;
      if (calls === 1) {
        return new Response(JSON.stringify({ error: "rate_limited" }), {
          status: 429,
          headers: { "Retry-After": "1" },
        });
      }
      return jsonResponse({
        data: [],
        pagination: { page: 0, perPage: 1, total: 0, hasMore: false },
      });
    }) as typeof fetch,
    sleep: async (ms: number) => {
      slept.push(ms);
    },
  });
  const skills = await client.listSkills();
  expect(skills).toEqual([]);
  expect(calls).toBe(2);
  expect(slept).toEqual([1000]);
});

test("client maps 404 to a structured not_found error", async () => {
  const client = createClient({
    fetchFn: (async () =>
      new Response(JSON.stringify({ error: "not_found" }), {
        status: 404,
      })) as typeof fetch,
  });
  await expect(client.getSkill("owner", "missing")).rejects.toMatchObject({
    code: "not_found",
  } satisfies Partial<SkillsShError>);
});

test("client retries 503 with bounded backoff", async () => {
  let calls = 0;
  const client = createClient({
    maxRetries: 2,
    fetchFn: (async () => {
      calls++;
      if (calls < 3) {
        return new Response("busy", { status: 503 });
      }
      return jsonResponse({ data: [] });
    }) as typeof fetch,
    sleep: async () => {},
  });
  await expect(client.getCuratedSkills()).resolves.toEqual([]);
  expect(calls).toBe(3);
});
