import { useEffect, useMemo, useState } from "react";
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import type { TicketListRecord } from "@/data/workspace";

interface TicketWorkspaceProps {
  records: TicketListRecord[];
  activeTab: string;
  onOpenDetail: (record: TicketListRecord) => void;
}

const filters = [
  "工单状态",
  "创建时间",
  "完成时间",
  "处理人",
  "处理组",
  "创建人",
  "分单来源",
  "下送时间",
  "升级时间",
];

const PAGE_SIZE = 15;

export function TicketWorkspace({ records, activeTab, onOpenDetail }: TicketWorkspaceProps) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  const pageCount = Math.max(1, Math.min(4, Math.ceil(records.length / PAGE_SIZE)));
  const visibleRecords = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return records.slice(start, start + PAGE_SIZE);
  }, [page, records]);

  return (
    <section className="flex h-full min-h-0 flex-col bg-[#f7f9fb]">
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4">
        <div className="text-sm font-semibold text-slate-900">工单工作台</div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-600">
            <Plus size={13} />
            新建工单
          </button>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white px-4 py-3">
        <div className="mb-3 flex items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
            <Search size={14} />
            支持搜索工单编号/订单号/店铺名称/店铺ID
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-teal-100 bg-teal-50 px-3 py-2 text-[11px] text-teal-700">
            <CalendarDays size={13} />
            创建时间
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button key={filter} className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] text-slate-600">
              {filter}
              <ChevronDown size={12} />
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto bg-white">
        <div className="min-w-[1040px]">
          <div className="grid grid-cols-[300px_110px_120px_130px_130px_130px_160px] border-b border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-medium text-slate-500">
            <div>工单信息</div>
            <div>工单状态</div>
            <div>创建时间</div>
            <div>下送回复时间</div>
            <div>升级时间</div>
            <div>人工跟进时间</div>
            <div>问题描述</div>
          </div>

          {visibleRecords.map((record, index) => (
            <TicketRow
              key={record.id}
              record={record}
              clickable={page === 1 && index === 0 && !record.isClosed}
              onOpenDetail={onOpenDetail}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-2 text-[11px] text-slate-400">
        <div>总计第 {page} 页 · 共 {records.length} 条</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              className="rounded px-2 py-1 text-slate-500 hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent"
              disabled={page === 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: pageCount }, (_, index) => {
              const pageNumber = index + 1;
              const isActive = pageNumber === page;

              return (
                <button
                  key={pageNumber}
                  className={isActive ? "rounded bg-teal-50 px-2 py-1 text-teal-700" : "rounded px-2 py-1 text-slate-500 hover:bg-slate-100"}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}
            <button
              className="rounded px-2 py-1 text-slate-500 hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent"
              disabled={page === pageCount}
              onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
            >
              <ChevronRight size={14} />
            </button>
          </div>
          <div>每页条数 {PAGE_SIZE}</div>
        </div>
      </div>
    </section>
  );
}

function TicketRow({
  record,
  clickable,
  onOpenDetail,
}: {
  record: TicketListRecord;
  clickable: boolean;
  onOpenDetail: (record: TicketListRecord) => void;
}) {
  const statusClass =
    record.statusTone === "emerald"
      ? "bg-emerald-50 text-emerald-700"
      : record.statusTone === "amber"
        ? "bg-amber-50 text-amber-700"
        : record.statusTone === "blue"
          ? "bg-sky-50 text-sky-700"
          : record.statusTone === "violet"
            ? "bg-violet-50 text-violet-700"
            : record.statusTone === "rose"
              ? "bg-rose-50 text-rose-700"
              : "bg-slate-100 text-slate-600";

  const countdownClass =
    record.countdownTone === "rose"
      ? "bg-rose-50 text-rose-700"
      : record.countdownTone === "amber"
        ? "bg-amber-50 text-amber-700"
        : "bg-teal-50 text-teal-700";

  return (
    <button
      className={
        clickable
          ? "relative grid w-full grid-cols-[300px_110px_120px_130px_130px_130px_160px] border-b border-teal-200 bg-teal-50/55 px-4 py-2.5 text-left text-[11px] text-slate-600 ring-1 ring-inset ring-teal-100 transition hover:bg-teal-50/70"
          : "grid w-full grid-cols-[300px_110px_120px_130px_130px_130px_160px] border-b border-slate-100 px-4 py-2.5 text-left text-[11px] text-slate-600 hover:bg-slate-50/70"
      }
      onClick={() => {
        if (clickable) onOpenDetail(record);
      }}
      type="button"
    >
      {clickable ? (
        <div className="pointer-events-none absolute left-[148px] top-2 z-10 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-semibold text-white shadow-md">
          此工单可点开
        </div>
      ) : null}
      <div className="pr-4">
        <div className="truncate text-[10px] text-slate-400">{record.id}</div>
        <div className="mt-1 flex items-center gap-2">
          {!record.isClosed && record.countdown ? (
            <span data-guide-id={clickable ? "callback-countdown" : undefined} className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium ${countdownClass}`}>{record.countdown}</span>
          ) : null}
          <div className="truncate text-[11px] text-slate-700">{record.classification}</div>
        </div>
      </div>
      <div className="pr-4">
        <span className={`rounded px-2 py-0.5 text-[10px] font-medium ${statusClass}`}>{record.status}</span>
      </div>
      <div>{record.createdAt}</div>
      <div>{record.latestReplyAt}</div>
      <div>{record.upgradedAt}</div>
      <div>{record.manualReviewAt}</div>
      <div className="pr-4">
        <div>{record.category}</div>
        <div className="mt-1 text-slate-400">{record.issue}</div>
      </div>
    </button>
  );
}
