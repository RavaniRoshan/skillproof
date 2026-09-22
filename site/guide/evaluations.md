---
title: Evaluations
---

<script setup>
const costControl = [
  {
    icon: "hash",
    title: "Cached by content hash",
    body: "Results are keyed by (content_hash, task, model, judge, n), so an unrelated skill change replays the cache instead of paying for the run again.",
  },
  {
    icon: "scale",
    title: "Small defaults",
    body: "Two models, a handful of tasks, a small number of runs. The first run has to be cheap enough to actually happen.",
  },
  {
    icon: "alert",
    title: "A budget that hard-stops",
    body: "--budget-usd stops the run rather than warning about it. A free tool whose first run costs $40 gets uninstalled, not adopted.",
  },
];
</script>

<DocHero
  eyebrow="Explanation"
  title="Surviving model bumps"
  sub="A skill that scored 92% in June can quietly degrade with the September model. Nothing re-runs the eval when a model changes — that is the gap this page designs for."
/>

> [!NOTE] Status: v0.2
> The design below is fixed; the harness is not built. `skillproof eval` parses
> its flags and echoes them today.

## Baseline vs treated

For each task (a prompt plus a rubric, stored with the skill in `evals/`):

1. Run the task on the target agent **without** the skill → baseline.
2. Run it **with** the skill → treated.
3. Judge both against the rubric with a judge model that defaults to
   something **other** than the task model.
4. Repeat across the pinned models you care about.

Running the task both ways is what makes the number meaningful: it cancels the
noise a single run would otherwise attribute to the skill.

## The verdict line

```text
sonnet-4.5  baseline 0.40 → with_skill 0.88  (uplift +0.48)
sonnet-4.6  baseline 0.52 → with_skill 0.55  (uplift +0.03)
verdict: SKILL_DEGRADED_ON_NEWER_MODEL
```

That verdict is published as a signed delta record in the ledger, next to the
capability attestations. The stored record also carries the judge agreement
rate and whether each task came from the author or was generated — a generated
task is labelled as weaker evidence rather than quietly mixed in.

## Cost control

Model calls cost money, so cost control is designed in rather than bolted on:

<FeatureCards :items="costControl" />
