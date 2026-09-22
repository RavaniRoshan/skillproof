// Icon paths + card shape shared by the docs feature grids.
// Kept in a plain module (like brands.ts) so markdown pages can import the
// type, and so the SFC does not need to export anything from <script setup>.
// Markup is inner SVG: stroke comes from the wrapping <svg> in the component.

export const CARD_ICONS = {
  terminal:
    '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/>',
  globe:
    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z"/>',
  file: '<path d="M14 3v5h5M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M9 13h6M9 17h4"/>',
  lock: '<rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',
  users:
    '<circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M3 20c0-3 2.5-5 5-5s5 2 5 5M11 20c0-3 2.5-5 5-5s5 2 5 5"/>',
  plug: '<path d="M9 3v5M15 3v5M7 8h10v4a5 5 0 0 1-10 0zM12 17v4"/>',
  hash: '<path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/>',
  diff: '<path d="M8 3v18M16 3v18M4 8h4M16 16h4"/>',
  scale:
    '<path d="M12 3v18M7 7h10M7 7 4 14h6zM17 7l-3 7h6zM8 21h8"/>',
  gauge:
    '<path d="M12 14l4-4"/><path d="M4 18a9 9 0 1 1 16 0"/><circle cx="12" cy="18" r="1.5"/>',
  shield:
    '<path d="M12 3l8 3v6c0 5-3.4 8.2-8 9-4.6-.8-8-4-8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 0-2 2z"/><path d="M8 7h7M8 11h7"/>',
  compass:
    '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/>',
  alert:
    '<path d="M10.3 3.9 1.9 18a2 2 0 0 0 1.7 3h16.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  route:
    '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M6 17V8a3 3 0 0 1 3-3h6a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h7"/>',
} as const;

export type CardIcon = keyof typeof CARD_ICONS;

export interface FeatureCard {
  icon?: CardIcon;
  title: string;
  body: string;
  to?: string;
  meta?: string;
}
