import { useEffect, useRef, useState } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import type { WorkspaceCase } from "@/data/workspace";

interface SmartSummaryProps {
  data: WorkspaceCase;
  compact?: boolean;
}

const sections = [
  { key: "userDemand", title: "用户诉求" },
  { key: "merchantRecords", title: "商家沟通记录" },
  { key: "ticketRecords", title: "工单记录" },
] as const;

export function SmartSummary({ data, compact = false }: SmartSummaryProps) {
  if (compact) {
    return (
      <section data-guide-id="smart-summary" className="border-b border-cyan-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="rounded bg-cyan-50 px-1.5 py-0.5 text-[11px] font-semibold text-cyan-700">智能总结</span>
            <SummaryHoverText className="line-clamp-1 text-xs font-semibold text-slate-900" content={data.summary.title} />
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x divide-slate-100">
          {sections.map((section) => (
            <div key={section.key} className="px-3 py-2">
              <div className="mb-1 text-[11px] font-semibold text-slate-700">{section.title}</div>
              <SummaryHoverText
                className="line-clamp-2 text-[11px] leading-5 text-slate-500"
                content={data.summary[section.key][0]}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section data-guide-id="smart-summary" className="relative overflow-hidden rounded-[28px] border border-teal-100 bg-gradient-to-br from-white via-teal-50/70 to-cyan-50 p-5 shadow-xl shadow-teal-900/5">
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-teal-200/30 blur-3xl" />
      <div className="relative">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-teal-700">
              <ShieldCheck size={15} />
              智能总结
            </div>
            <h2 className="max-w-4xl text-lg font-semibold leading-7 tracking-tight text-slate-950">
              {data.summary.title}
            </h2>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-3">
          {sections.map((section) => (
            <div key={section.key} className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
                <CheckCircle2 size={15} className="text-teal-700" />
                {section.title}
              </div>
              <ul className="space-y-2">
                {data.summary[section.key].map((item) => (
                  <li key={item} className="text-xs leading-5 text-slate-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SummaryHoverText({ content, className }: { content: string; className: string }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const updateTruncation = () => {
      setIsTruncated(element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth);
    };

    updateTruncation();
    window.addEventListener("resize", updateTruncation);
    return () => window.removeEventListener("resize", updateTruncation);
  }, [content]);

  return (
    <div className="group relative">
      <p ref={textRef} className={className}>
        {content}
      </p>
      {isTruncated ? (
        <div className="pointer-events-none absolute left-0 top-full z-30 mt-2 hidden w-80 rounded-xl border border-slate-200 bg-white p-3 text-[11px] leading-5 text-slate-600 shadow-xl group-hover:block">
          {content}
        </div>
      ) : null}
    </div>
  );
}
