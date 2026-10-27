"use client";

import { useEffect, useState } from "react";

export function ReadingProgress({ target = "article-body" }: { target?: string }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = document.getElementById(target);
    const on = () => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      setP(Math.max(0, Math.min(1, -r.top / Math.max(1, total))));
    };
    on(); window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, [target]);
  return (
    <div className="fixed left-0 right-0 top-0 z-[45] h-1 bg-transparent pointer-events-none" aria-hidden>
      <div className="h-full bg-mint-500 origin-left transition-transform duration-75" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}
