import { Copy, Package, Plus, Search, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { OrderOption, WorkspaceCase } from "@/data/workspace";
import { TicketDraftCard } from "@/components/workspace/TicketDraftCard";

interface RightWorkPanelProps {
  data: WorkspaceCase;
}

export function RightWorkPanel({ data }: RightWorkPanelProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openedOrderIndexes, setOpenedOrderIndexes] = useState<number[]>([0]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const currentOrderIndex = openedOrderIndexes[activeTabIndex] ?? 0;
  const currentOrder = data.orderOptions[currentOrderIndex] ?? data.orderOptions[0];

  useEffect(() => {
    setOpenedOrderIndexes([0]);
    setActiveTabIndex(0);
    setIsDrawerOpen(false);
  }, [data.id]);

  return (
    <aside className="relative flex h-full min-h-0 flex-col border-l border-slate-200 bg-[#f8fafc]">
      <div className="flex h-11 shrink-0 items-center gap-5 border-b border-slate-200 bg-white px-4 text-xs">
        <button className="border-b-2 border-teal-500 py-3 font-semibold text-slate-900">智能辅助</button>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3 pb-16">
        <OrderCard
          data={data}
          currentOrder={currentOrder}
          openedOrderIndexes={openedOrderIndexes}
          activeTabIndex={activeTabIndex}
          onChangeTab={setActiveTabIndex}
          onCloseTab={(tabIndex) => {
            if (openedOrderIndexes.length <= 1) return;

            const next = openedOrderIndexes.filter((_, index) => index !== tabIndex);
            setOpenedOrderIndexes(next);

            if (activeTabIndex === tabIndex) {
              setActiveTabIndex(Math.max(0, tabIndex - 1));
            } else if (activeTabIndex > tabIndex) {
              setActiveTabIndex(activeTabIndex - 1);
            }
          }}
          onOpenOrders={() => setIsDrawerOpen(true)}
        />
        <RecommendationCard />
        <TicketDraftCard data={data} />
      </div>

      <OrderDrawer
        open={isDrawerOpen}
        orders={data.orderOptions}
        selectedIndex={currentOrderIndex}
        onClose={() => setIsDrawerOpen(false)}
        onSelect={(index) => {
          const existingTabIndex = openedOrderIndexes.indexOf(index);
          if (existingTabIndex >= 0) {
            setActiveTabIndex(existingTabIndex);
          } else {
            const next = [...openedOrderIndexes, index];
            setOpenedOrderIndexes(next);
            setActiveTabIndex(next.length - 1);
          }
          setIsDrawerOpen(false);
        }}
      />
    </aside>
  );
}

function OrderCard({
  data,
  currentOrder,
  openedOrderIndexes,
  activeTabIndex,
  onChangeTab,
  onCloseTab,
  onOpenOrders,
}: {
  data: WorkspaceCase;
  currentOrder: OrderOption;
  openedOrderIndexes: number[];
  activeTabIndex: number;
  onChangeTab: (index: number) => void;
  onCloseTab: (index: number) => void;
  onOpenOrders: () => void;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
        <div className="flex items-center gap-2">
          {openedOrderIndexes.map((_, index) => (
            <div
              key={`order-tab-${index}`}
              className={
                activeTabIndex === index
                  ? "flex cursor-pointer items-center gap-2 rounded bg-amber-50 px-2 py-1 text-[11px] font-medium text-amber-700"
                  : "flex cursor-pointer items-center gap-2 rounded bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500"
              }
              onClick={() => onChangeTab(index)}
            >
              <span>订单{index + 1}</span>
              <span className={activeTabIndex === index ? "text-amber-700" : "text-slate-500"}>待处理</span>
              <button
                className={openedOrderIndexes.length > 1 ? "text-current" : "cursor-not-allowed text-slate-300"}
                disabled={openedOrderIndexes.length <= 1}
                onClick={(event) => {
                  event.stopPropagation();
                  onCloseTab(index);
                }}
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
        <button className="rounded-md border border-slate-200 p-1 text-slate-500 transition hover:border-teal-200 hover:text-teal-700" onClick={onOpenOrders}>
          <Plus size={14} />
        </button>
      </div>
      <div className="p-3">
        <div className="mb-3 flex gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-amber-600">
            <Package size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              订单号：<span className="font-mono text-cyan-700">{currentOrder.id}</span>
              <Copy size={11} />
            </div>
            <h3 className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-slate-900">{currentOrder.product}</h3>
            <div className="mt-1 flex flex-wrap gap-1">
              <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] text-emerald-700">交易成功</span>
              <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] text-amber-700">{currentOrder.afterSale}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 rounded-lg border border-slate-100 text-center text-[11px]">
          <MiniCell label="单价" value={currentOrder.amount} />
          <MiniCell label="数量" value={currentOrder.quantity} />
          <MiniCell label="优惠" value="¥0.00" />
          <MiniCell label="实付" value={currentOrder.amount} />
        </div>

        <div className="mt-3 space-y-2 text-[11px]">
          <Info label="售后状态" value={currentOrder.afterSale} accent />
          <Info label="店铺名称" value={currentOrder.merchant} />
          <Info label="物流状态" value={currentOrder.logistics} />
          <Info label="支付时间" value={currentOrder.paidAt} />
          <Info label="用户标签" value={`${data.customer.level} / ${data.customer.emotion} / ${data.customer.risk}`} accent={false} />
        </div>
      </div>
    </section>
  );
}

function OrderDrawer({
  open,
  orders,
  selectedIndex,
  onClose,
  onSelect,
}: {
  open: boolean;
  orders: OrderOption[];
  selectedIndex: number;
  onClose: () => void;
  onSelect: (index: number) => void;
}) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-30 flex">
      <div className="flex-1 bg-slate-950/10" onClick={onClose} />
      <div className="h-full w-[430px] border-l border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
          <h2 className="text-xl font-semibold text-slate-900">订单列表</h2>
          <button className="text-slate-400 hover:text-slate-600" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="border-b border-slate-100 px-4 pb-3 pt-2">
          <div className="mb-3 text-sm font-semibold text-slate-900">UID订单查询</div>
          <div className="mb-2 flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-500">
            <Search size={14} />
            请输入订单编号
          </div>
        </div>
        <div className="h-[calc(100%-120px)] overflow-y-auto px-4 py-3">
          <div className="space-y-3">
            {orders.map((order, index) => (
              <button
                key={order.id}
                className={
                  selectedIndex === index
                    ? "w-full rounded-xl border border-teal-200 bg-teal-50/40 p-3 text-left"
                    : "w-full rounded-xl border border-slate-200 bg-white p-3 text-left hover:border-slate-300"
                }
                onClick={() => onSelect(index)}
              >
                <div className="mb-2 flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                    <Package size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                      <span>小店</span>
                      <span>|</span>
                      <span>抖音</span>
                      <span>|</span>
                      <span>订单号：{order.id}</span>
                      <span className="rounded bg-orange-50 px-1.5 py-0.5 text-[10px] text-orange-600">下单人</span>
                      <span className="rounded bg-violet-50 px-1.5 py-0.5 text-[10px] text-violet-600">备货中</span>
                    </div>
                    <div className="mt-1 text-sm font-semibold leading-6 text-slate-800">{order.product}</div>
                    <div className="mt-1 text-[11px] text-teal-700">发送 联系商家</div>
                    <div className="mt-2 space-y-1 text-[11px] text-slate-500">
                      <div>规格：{order.size} ｜ 数量：{order.quantity}</div>
                      <div>单价：{order.amount} ｜ 实付：{order.amount} ｜ 支付方式：{order.paymentMethod}</div>
                      <div>下单时间：{order.paidAt}</div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RecommendationCard() {
  return (
    <section className="rounded-xl border border-teal-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
        <h2 className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
          <Sparkles size={14} className="text-teal-600" />
          智能方案
        </h2>
        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">未上线</span>
      </div>
      <div className="p-3">
        <div className="flex min-h-[116px] flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/70 px-5 text-center">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
            <Sparkles size={16} />
          </div>
          <div className="text-xs font-semibold text-slate-700">在线阶段暂不展示智能方案推荐</div>
          <p className="mt-1 text-[11px] leading-5 text-slate-400">
            该能力将在工单详情阶段展示，当前仅保留模块入口与状态标识。
          </p>
        </div>
      </div>
    </section>
  );
}

function MiniCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r border-slate-100 px-1 py-2 last:border-r-0">
      <div className="text-slate-400">{label}</div>
      <div className="mt-1 font-semibold text-slate-800">{value}</div>
    </div>
  );
}

function Info({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex gap-3">
      <span className="w-14 shrink-0 text-slate-400">{label}</span>
      <span className={accent ? "font-medium text-amber-700" : "text-slate-700"}>{value}</span>
    </div>
  );
}
