import { computeSkillproofHash, reconcile } from "../src/reconcile.js";

const files = [
  { path: "SKILL.md", contents: "---\nname: demo\n---\n\n# Demo\n" },
  { path: "examples/app.ts", contents: "// example\n" },
];

test("matching upstream hash reconciles to MATCH", () => {
  const hash = computeSkillproofHash(files);
  const result = reconcile(hash, files);
  expect(result?.hash_match).toBe(true);
  expect(result?.source_hash.source).toBe("skills.sh");
  expect(result?.skillproof_hash.source).toBe("skillproof");
  expect(result?.source_hash.value).toBe(result?.skillproof_hash.value);
});

test("differing hash records both instead of choosing one", () => {
  const result = reconcile("sha256:deadbeef", files);
  expect(result?.hash_match).toBe(false);
  expect(result?.source_hash.value).toBe("sha256:deadbeef");
  expect(result?.skillproof_hash.value).toMatch(/^sha256:[0-9a-f]{64}$/);
});

test("CRLF and LF content hash identically; order does not matter", () => {
  const crlf = files.map((file) => ({
    ...file,
    contents: file.contents.replace(/\n/g, "\r\n"),
  }));
  expect(computeSkillproofHash(crlf)).toBe(computeSkillproofHash(files));
  expect(computeSkillproofHash([...files].reverse())).toBe(
    computeSkillproofHash(files),
  );
});

test("vcs and dependency dirs are excluded and documented", () => {
  const withNoise = [
    ...files,
    { path: ".git/HEAD", contents: "ref: refs/heads/main" },
    { path: "node_modules/dep/index.js", contents: "evil" },
  ];
  expect(computeSkillproofHash(withNoise)).toBe(computeSkillproofHash(files));
});

test("null snapshot returns null instead of a fabricated verdict", () => {
  expect(reconcile(null, files)).toBeNull();
  expect(reconcile("sha256:abc", null)).toBeNull();
});
