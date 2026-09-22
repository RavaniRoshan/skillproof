import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(here, "fixtures");

function load(name: string) {
  return JSON.parse(fs.readFileSync(path.join(fixturesDir, name), "utf-8"));
}

test("list fixture matches documented V1Skill shape", () => {
  const body = load("list.json");
  expect(Array.isArray(body.data)).toBe(true);
  for (const skill of body.data) {
    for (const field of [
      "id",
      "slug",
      "name",
      "source",
      "installs",
      "sourceType",
      "installUrl",
      "url",
    ]) {
      expect(skill).toHaveProperty(field);
    }
    expect(skill.id).toBe(`${skill.source}/${skill.slug}`);
  }
  expect(body.pagination).toMatchObject({ page: 0, hasMore: true });
});

test("search fixture matches documented shape", () => {
  const body = load("search.json");
  expect(Array.isArray(body.data)).toBe(true);
  expect(["fuzzy", "semantic"]).toContain(body.searchType);
});

test("curated fixture groups contain V1Skill arrays", () => {
  const body = load("curated.json");
  expect(Array.isArray(body.data)).toBe(true);
  for (const group of body.data) {
    expect(Array.isArray(group.skills)).toBe(true);
    for (const skill of group.skills) {
      expect(skill.id).toBe(`${skill.source}/${skill.slug}`);
    }
  }
});

test("detail fixture has hash and file snapshot", () => {
  const detail = load("detail.json");
  expect(detail.id).toBe(`${detail.source}/${detail.slug}`);
  expect(typeof detail.installs).toBe("number");
  expect(detail.hash === null || typeof detail.hash === "string").toBe(true);
  expect(detail.files === null || Array.isArray(detail.files)).toBe(true);
  if (detail.files) {
    for (const file of detail.files) {
      expect(typeof file.path).toBe("string");
      expect(typeof file.contents).toBe("string");
    }
  }
});

test("audit fixture preserves provider identity and verdicts", () => {
  const body = load("audit.json");
  expect(Array.isArray(body.audits)).toBe(true);
  for (const audit of body.audits) {
    expect(typeof audit.provider).toBe("string");
    expect(["pass", "warn", "fail"]).toContain(audit.status);
  }
});
