"use client";

import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import { ARTICLES, TOPICS } from "@/lib/data";
import { TOPIC_ICONS } from "@/components/ui";
import { ArticleRow, FeatureCard } from "@/components/cards";

export function TopicExplorer() {
  const [active, setActive] = useState(TOPICS[0].slug);
  const topic = TOPICS.find((t) => t.slug === active)!;
  const items = ARTICLES.filter((a) => a.topic === active);
  const [lead, ...rest] = items;
  return (
    <div>
      <div role="tablist" aria-label="Topics" className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 snap-x">
        {TOPICS.map((t) => {
          const Icon = TOPIC_ICONS[t.icon];
          const on = t.slug === active;
          return (
            <button key={t.slug} role="tab" aria-selected={on} onClick={() => setActive(t.slug)}
              className={clsx("snap-start shrink-0 inline-flex items-center gap-2.5 h-12 pl-3 pr-4 rounded-2xl font-semibold text-[15px] transition",
                on ? "bg-brand-800 text-white shadow-lift" : "bg-white text-ink-700 shadow-soft hover:text-brand-800")}>
              <span className={clsx("size-8 rounded-xl grid place-items-center", on ? "bg-white/15" : "bg-brand-50 text-brand-700")}><Icon className="size-4" /></span>
              {t.name}<span className={clsx("text-xs font-medium tabular-nums", on ? "text-white/70" : "text-ink-400")}>{t.count}</span>
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="mt-6 grid lg:grid-cols-12 gap-6">
        {lead && <FeatureCard a={lead} className="lg:col-span-7" size="md" />}
        <div className="lg:col-span-5 card p-5 sm:p-6 flex flex-col">
          <p className="text-[15px] text-ink-600 leading-relaxed">{topic.blurb}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {topic.subs.map((s) => (
              <Link key={s.slug} href={`/topics/${topic.slug}/${s.slug}`} className="h-8 px-3 inline-flex items-center rounded-full bg-brand-50 text-brand-800 text-sm font-medium hover:bg-brand-100">{s.name}</Link>
            ))}
          </div>
          <div className="mt-5 space-y-5 flex-1">
            {rest.slice(0, 3).map((a) => <ArticleRow key={a.slug} a={a} />)}
            {rest.length === 0 && <p className="text-sm text-ink-500">More {topic.name.toLowerCase()} coverage is on the topic page.</p>}
          </div>
          <Link href={`/topics/${topic.slug}`} className="mt-6 inline-flex items-center justify-between h-12 px-4 rounded-xl bg-canvas font-semibold text-brand-800 hover:bg-brand-50">
            Explore {topic.name}<ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
