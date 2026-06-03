import { Bot, Check, Paperclip, Send, UserRound, Zap } from "lucide-react";
import type { MessageRole, WorkspaceCase } from "@/data/workspace";
import { SmartSummary } from "@/components/workspace/SmartSummary";
import { cn } from "@/lib/utils";

interface ChatWorkspaceProps {
  data: WorkspaceCase;
}

export function ChatWorkspace({ data }: ChatWorkspaceProps) {
  return (
    <section className="flex h-full min-h-0 flex-col bg-[#f5f8fa]">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-semibold text-slate-900">{data.customer.name}</h1>
            <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] text-amber-700">{data.customer.level}</span>
            <span className="text-[11px] text-slate-400">用户 ID 52044270633</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <button className="flex items-center rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-600">
            完成
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="sticky top-0 z-20 bg-[#f5f8fa]/95 backdrop-blur">
          <SmartSummary data={data} compact />
        </div>
        <div className="mx-auto max-w-4xl space-y-4 p-5">
          {data.messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
        </div>
      </div>

      <div className="shrink-0 border-t border-slate-200 bg-white px-5 py-2.5">
        <div className="mx-auto max-w-4xl">
          <div className="mb-2 flex items-center gap-2 text-[11px] text-slate-500">
            <button className="rounded bg-slate-100 px-2 py-1">常用话术</button>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-white"><Paperclip size={16} /></button>
            <textarea
              className="h-9 flex-1 resize-none bg-transparent px-1 py-2 text-xs leading-5 text-slate-700 outline-none"
              defaultValue="我已看到您的举证材料，会先核对平台规则并为您创建跟进工单。"
            />
            <button className="flex h-9 items-center gap-1.5 rounded-lg bg-teal-600 px-4 text-xs font-medium text-white hover:bg-teal-700">
              <Send size={14} /> 发送
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatBubble({ message }: { message: WorkspaceCase["messages"][number] }) {
  const isUser = message.role === "user";
  const isAgent = message.role === "agent";
  const isSystem = message.role === "system";

  if (isSystem) {
    return (
      <div className="flex items-center gap-3 py-1">
        <div className="h-px flex-1 bg-slate-200" />
        <div className="rounded-full border border-teal-100 bg-white px-3 py-1.5 text-[11px] text-slate-500 shadow-sm">
          <span className="mr-2 font-medium text-teal-700">用户进入人工</span>
          <span>{message.time}</span>
        </div>
        <div className="h-px flex-1 bg-slate-200" />
      </div>
    );
  }

  return (
    <div className={cn("flex gap-2", isUser ? "justify-start" : "justify-end")}>
      {isUser ? <Avatar role={message.role} /> : null}
      <div className={cn("max-w-[68%]", !isUser && "text-right")}>
        <div className="mb-1 text-[11px] text-slate-400">
          {message.sender} · {message.time}
        </div>
        <div
          className={cn(
            "inline-block rounded-2xl px-3.5 py-2.5 text-xs leading-5 shadow-sm",
            isUser
              ? "rounded-tl-md bg-white text-slate-700"
              : message.role === "bot"
                ? "rounded-tr-md bg-cyan-500 text-white"
                : "rounded-tr-md bg-teal-500 text-white"
          )}
        >
          {message.content}
        </div>
      </div>
      {!isUser ? <Avatar role={message.role} /> : null}
    </div>
  );
}

function Avatar({ role }: { role: MessageRole }) {
  return (
    <div
      className={cn(
        "mt-5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
        role === "agent"
          ? "bg-teal-500 text-white"
          : role === "bot"
            ? "bg-cyan-500 text-white"
            : "bg-slate-200 text-slate-500"
      )}
    >
      {role === "agent" ? <Zap size={14} /> : role === "bot" ? <Bot size={14} /> : <UserRound size={14} />}
    </div>
  );
}
