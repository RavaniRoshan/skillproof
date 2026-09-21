# Manifesto

Agent skills became packaged software: versioned, scripted, installed from
third parties, running inside your agent's privileged context. A software
supply chain needs three answers before anyone trusts it — who signs the
package, what it is allowed to do, and whether it still works after the model
changes. Today, no neutral, open body answers any of the three.

Centralised players answer some of it behind their platform. Model vendors
answer it only for their own harnesses. Nobody answers the question that
actually hurts teams: *"a model update shipped last Tuesday — do my 40 skills
still pass?"*

SkillProof is the fixed version of the agent-skill registry idea. We do not
host skills, do not build new signing infrastructure, and do not sell policy
enforcement. We host a tiny, signed, content-addressed ledger of
attestations: for any skill at any content hash, what capabilities it uses and
whether its eval pass-rate survived the last model bump. Any registry, any
harness, any CI can consume it.

We are not npm. We are the thing npm never had and had to retrofit — the
neutral verification layer.

Neutrality is the only durable position. Registries can display our
attestations; scanners can consume our manifests; harnesses can gate on our
diffs. A thing everyone can use and no one has to pay for spreads faster than
a thing that requires a purchase order. If the big players absorb the
standard, that is how open infrastructure wins — even when the company
doesn't.

Core is MIT, forever. The ledger is public, forever. Everything here is
falsifiable — including the decision to build it.
