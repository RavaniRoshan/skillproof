# Evaluations

> Status: v0.2. The design below is fixed; the harness is being built.

A skill that scored 92% in June may silently degrade with the September model.
Nothing re-runs the eval on a model bump — that is the gap SkillProof owns.

## Baseline vs treated

For each task (a prompt plus a rubric, stored with the skill in `evals/`):

1. Run the task on the target agent **without** the skill → baseline.
2. Run it **with** the skill → treated.
3. Judge both against the rubric with a judge model that defaults to
   something **other** than the task model.
4. Repeat across the pinned models you care about.

## The verdict line

```text
sonnet-4.5  baseline 0.40 → with_skill 0.88  (uplift +0.48)
sonnet-4.6  baseline 0.52 → with_skill 0.55  (uplift +0.03)
verdict: SKILL_DEGRADED_ON_NEWER_MODEL
```

That verdict is published as a signed delta record in the ledger, next to the
capability attestations.

## Cost control

Model calls cost money, so cost control is designed in, not bolted on:

- Results are cached by `(content_hash, task, model, judge, n)`; unrelated
  skill changes replay the cache.
- Small defaults: two models × few tasks × small n.
- `--budget-usd` hard-stops the run. A free tool whose first run costs $40
  gets uninstalled, not adopted.
