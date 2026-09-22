// Minimal scroll-reveal: dependency-free IntersectionObserver + CSS transitions.
// No framer-motion / GSAP: this is a VitePress SSG page with small Vue islands —
// adding a motion runtime would cost ~50-100KB for fades/slides CSS handles natively.
// Registered once in theme setup; marks [data-reveal] nodes visible on entry.
// Respects prefers-reduced-motion (nodes render final state, no transforms).

const SELECTOR = "[data-reveal]";

let observer: IntersectionObserver | null = null;
let watcher: MutationObserver | null = null;
let armed = false;

function reveal(el: Element) {
  el.classList.add("is-in");
}

function arm(root: ParentNode = document) {
  if (!observer) return;
  for (const el of root.querySelectorAll(SELECTOR)) {
    if (el.classList.contains("is-in")) continue;
    observer.observe(el);
  }
}

export function initReveal() {
  if (armed || typeof window === "undefined") return;
  armed = true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    // Skip observation entirely; CSS forces final state for reduced motion.
    document.documentElement.classList.add("reduce-motion");
    return;
  }
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target);
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
  );
  arm();
  // Vue islands hydrate after setup; catch late-mounted [data-reveal] nodes.
  watcher = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node instanceof Element) {
          if (node.matches(SELECTOR)) {
            if (!node.classList.contains("is-in")) observer?.observe(node);
          } else if (node.querySelector(SELECTOR)) {
            arm(node);
          }
        }
      }
    }
  });
  watcher.observe(document.body, { childList: true, subtree: true });
}
