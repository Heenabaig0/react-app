/**
 * Add entries here when you create new routes under `app/<segment>/page.tsx`.
 * Keep `href` in sync with the file path (App Router uses folder names as URL segments).
 */
export type NavLink = {
  href: string;
  label: string;
};

export const navLinks: NavLink[] = [
  { href: "/", label: "To Do List" },
];
