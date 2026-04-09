"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { navLinks } from "@/config/nav-links";
import styles from "./app-shell.module.css";

function linkIsActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <div className={styles.shell}>
      <header className={styles.topBar}>
        <button
          type="button"
          className={styles.menuBtn}
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="app-drawer"
          aria-label="Open menu"
        >
          <span className={styles.menuIcon} aria-hidden />
        </button>
        <h1 className={styles.appTitle}>My app</h1>
      </header>

      <main className={styles.main}>{children}</main>

      {open ? (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Close menu"
          onClick={close}
        />
      ) : null}

      <nav
        id="app-drawer"
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className={styles.drawerHeader}>
          <h2 className={styles.drawerTitle}>Navigation</h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={close}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>
        <div className={styles.nav}>
          {navLinks.map((item) => {
            const active = linkIsActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
                onClick={close}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
