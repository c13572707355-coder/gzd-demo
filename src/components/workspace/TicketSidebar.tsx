import type { TicketSidebarSection } from "@/data/workspace";

interface TicketSidebarProps {
  sections: TicketSidebarSection[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenDemoDetail: () => void;
  demoDetailOpen?: boolean;
}

export function TicketSidebar({ sections, activeTab, onTabChange, onOpenDemoDetail, demoDetailOpen = false }: TicketSidebarProps) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className="border-b border-slate-100 px-3 py-2 text-[11px] font-semibold text-slate-950">工单分组</div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.title} className="border-b border-slate-100 px-1.5 py-2 last:border-b-0">
            <div className="space-y-1">
              {section.items.map((item) => (
                <button
                  key={item.label}
                  onClick={() => onTabChange(item.label)}
                  className={
                    !demoDetailOpen && activeTab === item.label
                      ? "flex w-full items-center justify-between rounded-lg bg-slate-100 px-2 py-1.5 text-left text-[11px] font-semibold text-slate-950"
                      : "flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-[11px] text-slate-700 hover:bg-slate-50"
                  }
                >
                  <span className="flex items-center gap-1.5">{item.label}</span>
                  <span className="text-[11px] font-semibold text-slate-950">{item.count}</span>
                </button>
              ))}
              <button
                className="mt-2 w-full rounded-lg border border-teal-100 bg-teal-50 px-2 py-2 text-left text-[11px] font-semibold text-teal-700 transition hover:bg-teal-100/70"
                onClick={onOpenDemoDetail}
                type="button"
              >
                <div>打开demo工单详情</div>
                <div className="mt-1 text-[10px] font-normal text-teal-600">点开后直接进入可演示的工单详情</div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
