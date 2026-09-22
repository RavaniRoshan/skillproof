"""Render `site/public/demo-scan.gif`: a looping terminal capture of a skillproof scan.

Frames redraw the DiffDemo TUI (chrome, header, prompt, status, scrolling rows)
with a typewriter command, per-step reveals, and a 1.2s end hold so the loop
breathes. Pillow-only; DejaVu Sans Mono if present, else Pillow's bitmap font.
"""

from __future__ import annotations

from PIL import Image, ImageDraw, ImageFont

W, H = 960, 560
FPS = 12
LOOP_MS = 13_200  # mirrors DiffDemo SCRIPT total (~13.2s incl. settle)
END_HOLD_MS = 1_200

BG = (22, 22, 22)
LINE = (46, 46, 50)
BRIGHT = (250, 250, 250)
MID = (161, 161, 170)
DIM = (113, 113, 122)
GREEN = (74, 222, 128)
RED = (248, 113, 113)
AMBER = (251, 191, 36)
DOT_R, DOT_Y, DOT_G = (251, 96, 91), (254, 188, 47), (39, 200, 64)

FONT_PATHS = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf",
]
try:
    FONT = ImageFont.truetype(FONT_PATHS[0], 15)
    FONT_B = ImageFont.truetype(FONT_PATHS[1], 15)
    FONT_SM = ImageFont.truetype(FONT_PATHS[0], 13)
except OSError:  # pragma: no cover - fallback for minimal containers
    FONT = FONT_B = FONT_SM = ImageFont.load_default()

# (appear_ms, kind, text) — kind selects color treatment.
ROWS: list[tuple[int, str, str]] = [
    (1500, "run", "* Scanning skill... (esc to interrupt)"),
    (1500, "dim", "L Next: stream SKILL.md + scripts"),
    (1900, "dim", ".. Thinking..."),
    (2700, "bold", "o Read(SKILL.md)"),
    (2900, "dim", "L 84 lines, 2 tools declared (ctrl+o to expand)"),
    (3100, "ok", "o Read(hooks/notify.sh)"),
    (3300, "dim", "L 12 lines, no network"),
    (4200, "bold", "o Search(scripts: \"curl|fetch|socket\")"),
    (4400, "dim", "L Found 3 files (ctrl+o to expand)"),
    (4600, "dim", ".. Thought for 4s (ctrl+o to show thinking)"),
    (5800, "bold", "o Read(scripts/refund.py)"),
    (6000, "dim", "L 212 lines, fs.write, outbound https"),
    (6200, "ok", "o Read(mcp.json)"),
    (6400, "dim", "L 1 server, stripe-mcp (declared)"),
    (7500, "run", "* Cross-checking declarations..."),
    (7700, "dim", "L Next: fail CI on new privileges"),
    (9000, "err", "o Bash(skillproof diff base.json head.json)"),
    (9200, "err", "L Error: + network.outbound_domains (NEW)"),
    (9600, "dim", ".. Thought for 6s (ctrl+o to show thinking)"),
    (10800, "bold", "o Eval(model bump claude-4.6 -> 4.7)"),
    (11000, "dim", "L 12/12 cases pass, 0 regressions"),
    (11200, "ok", "o Attest(base.json + evals)"),
    (12400, "dim", "L sigstore signed, appended to ledger"),
    (12600, "ok", "o Done in 9.4s - proof on record"),
]

CMD = "skillproof scan ./stripe-refunds --out base.json"
TYPE_START, TYPE_END = 600, 1500

KINDS = {
    "bold": (BRIGHT, True),
    "ok": (BRIGHT, False),
    "dim": (DIM, False),
    "run": (BRIGHT, True),
    "err": (RED, True),
}

VISIBLE = 9
TOP = 176
LINE_H = 26


def row_color(kind: str) -> tuple[tuple[int, int, int], bool]:
    return KINDS.get(kind, (MID, False))


def draw_window(base: Image.Image, t: int) -> Image.Image:
    img = base.copy()
    d = ImageDraw.Draw(img)

    # rows visible at time t (last VISIBLE, like DiffDemo)
    live = [(k, x) for (at, k, x) in ROWS if at <= t][-VISIBLE:]

    # typed command
    if t >= TYPE_START:
        frac = min(1.0, (t - TYPE_START) / max(1, TYPE_END - TYPE_START))
        cmd = CMD[: int(len(CMD) * frac)]
    else:
        cmd = ""
    d.text((52, 128), "> " + cmd, font=FONT_SM, fill=MID)
    if t < TYPE_END or (t // 500) % 2 == 0:
        cx = 52 + d.textlength("> " + cmd, font=FONT_SM)
        d.rectangle([cx + 2, 128, cx + 11, 144], fill=MID)

    y = TOP
    for kind, text in live:
        color, bold = row_color(kind)
        mark, _, rest = text.partition(" ")
        mark_color = GREEN if kind == "ok" else (AMBER if kind == "run" else color)
        d.text((40, y), mark, font=FONT_B if bold else FONT_SM, fill=mark_color)
        d.text((62, y), rest, font=FONT_B if bold else FONT_SM, fill=color)
        y += LINE_H

    # end-hold badge mirrors the TUI "done" pill
    if t >= LOOP_MS - END_HOLD_MS:
        label = "proof on record"
        tw = d.textlength(label, font=FONT_B)
        bx0 = (W - tw) / 2 - 22
        d.rounded_rectangle([bx0, H - 118, bx0 + tw + 44, H - 78], radius=20, fill=(39, 39, 42))
        d.text(((W - tw) / 2, H - 108), label, font=FONT_B, fill=BRIGHT)

    step = "1-6" if t >= 10800 else ("1-5" if t >= 9000 else f"1-{min(4, 1 + t // 2700)}")
    d.text((W - 64, 30), step, font=FONT_SM, fill=MID)
    d.text((40, H - 34), "main (skillproof)", font=FONT_SM, fill=DIM)
    return img


def chrome() -> Image.Image:
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, W - 1, H - 1], radius=14, outline=LINE, width=1)
    for i, c in enumerate((DOT_R, DOT_Y, DOT_G)):
        d.ellipse([28 + i * 22, 26, 38 + i * 22, 36], fill=c)
    d.text((W / 2 - 44, 26), "Skill scan", font=FONT_SM, fill=MID)
    d.line([0, 52, W, 52], fill=LINE, width=1)
    d.text((40, 66), "skillproof  v0.1.0", font=FONT_B, fill=MID)
    d.text((40, 88), "scan - attest - gate     ~/skills/stripe-refunds", font=FONT_SM, fill=DIM)
    d.line([0, 170, W, 170], fill=LINE, width=1)
    d.line([0, H - 52, W, H - 52], fill=LINE, width=1)
    d.text((40, H - 34), "> _", font=FONT_SM, fill=MID)
    return img


def main() -> None:
    base = chrome()
    frames: list[Image.Image] = []
    t = 0
    while t < LOOP_MS:
        frames.append(draw_window(base, t))
        t += 1000 // FPS
    frames[0].save(
        "site/public/demo-scan.gif",
        save_all=True,
        append_images=frames[1:],
        duration=1000 // FPS,
        loop=0,
        optimize=True,
    )
    print(f"wrote site/public/demo-scan.gif ({len(frames)} frames)")


if __name__ == "__main__":
    main()
