import { Bot, Clock3, Headphones, UserRound, type LucideIcon } from "lucide-react";
import type { MessageRole, WorkspaceCase } from "@/data/workspace";
import { cn } from "@/lib/utils";

interface ConversationPanelProps {
  data: WorkspaceCase;
}

const roleIcon: Record<MessageRole, LucideIcon> = {
  user: UserRound,
  agent: Headphones,
  bot: Bot,
  system: Clock3,
};

export function ConversationPanel({ data }: ConversationPanelProps) {
  return (
    <section className="flex h-full min-h-0 flex-col rounded-[24px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-950">IM 会话流</h2>
            <p className="mt-1 text-xs text-slate-500">转人工后保留完整上下文</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
            接待中
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
          {data.customer.name.slice(0, 1)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-900">{data.customer.name}</span>
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] text-amber-700">
              {data.customer.emotion}
            </span>
          </div>
          <p className="truncate text-xs text-slate-500">{data.customer.risk}</p>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-white to-slate-50/70 p-4">
        {data.messages.map((message) => {
          const Icon = roleIcon[message.role];
          const isUser = message.role === "user";
          const isSystem = message.role === "system";

          if (isSystem) {
            return (
              <div key={message.id} className="rounded-2xl border border-cyan-100 bg-cyan-50/80 p-3">
                <div className="mb-1 flex items-center gap-2 text-[11px] font-medium text-cyan-700">
                  <Icon size={14} />
                  {message.meta || "系统提示"} · {message.time}
                </div>
                <p className="text-xs leading-5 text-slate-700">{message.content}</p>
              </div>
            );
          }

          return (
            <div key={message.id} className={cn("flex gap-2", isUser ? "justify-start" : "justify-end")}>
              {isUser && (
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                  <Icon size={15} />
                </div>
              )}
              <div className={cn("max-w-[82%]", !isUser && "text-right")}>
                <div className="mb-1 text-[11px] text-slate-400">
                  {message.sender} · {message.time}
                </div>
                <div
                  className={cn(
                    "rounded-2xl px-3.5 py-2.5 text-xs leading-5 shadow-sm",
                    isUser
                      ? "rounded-tl-md bg-slate-100 text-slate-800"
                      : "rounded-tr-md bg-teal-700 text-white"
                  )}
                >
                  {message.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-slate-100 p-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
          <p className="text-xs text-slate-500">建议回复：我已看到您的举证材料，会先核对平台规则并为您创建跟进工单。</p>
        </div>
      </div>
    </section>
  );
}
