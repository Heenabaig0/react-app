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
  const [showControls, setShowControls] = useState(false);
  const [showClock, setShowClock] = useState(true);
  const [compactTopBar, setCompactTopBar] = useState(false);
  const [now, setNow] = useState(() => new Date());

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!showClock) return;
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, [showClock]);

  return (
    <div className={styles.shell}>
      <header className={`${styles.topBar} ${compactTopBar ? styles.topBarCompact : ""}`}>
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
        <div className={styles.topBarTools}>
          {showClock ? (
            <span className={styles.clock} aria-live="polite">
              {now.toLocaleTimeString()}
            </span>
          ) : null}
          <div className={styles.dropdownWrap}>
            <button
              type="button"
              className={styles.controlsBtn}
              aria-haspopup="menu"
              aria-expanded={showControls}
              onClick={() => setShowControls((v) => !v)}
            >
              Controls
            </button>
            {showControls ? (
              <div className={styles.dropdown} role="menu" aria-label="App controls">
                <label className={styles.toggleRow}>
                  <span className={styles.toggleLabel}>Show clock</span>
                  <input
                    type="checkbox"
                    checked={showClock}
                    onChange={(e) => setShowClock(e.target.checked)}
                  />
                </label>
                <label className={styles.toggleRow}>
                  <span className={styles.toggleLabel}>Compact top bar</span>
                  <input
                    type="checkbox"
                    checked={compactTopBar}
                    onChange={(e) => setCompactTopBar(e.target.checked)}
                  />
                </label>
              </div>
            ) : null}
          </div>
        </div>
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
