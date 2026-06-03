import { useState, type ReactNode } from "react";
import { ArrowRight, BookOpen, Bot, ClipboardList, FileText, Headphones, PhoneCall, Play, ShieldCheck, Sparkles, TimerReset, Workflow } from "lucide-react";

interface WelcomeGuideProps {
  onDirectOpen: () => void;
  onStartGuidedTour: () => void;
  onOpenOnline: () => void;
  onOpenTicketSuggestion: () => void;
  onOpenKnowledge: () => void;
}

const guideSteps = [
  {
    eyebrow: "Step 1 / 客服工作流程",
    title: "先让面试官看懂：客服每天到底在处理什么",
    desc: "用户转人工后，客服需要快速理解上下文、核对订单、回复用户、必要时建单，并在工单阶段继续处理回电和方案执行。",
    icon: Workflow,
    visual: "workflow",
    points: ["智能客服接待", "转人工", "人工理解上下文", "建单沉淀", "工单处理与回电闭环"],
  },
  {
    eyebrow: "Step 2 / 智能总结",
    title: "解决转人工时，客服翻历史信息的痛点",
    desc: "AI 把用户诉求、商家沟通、工单记录压缩成客服能直接看的摘要，减少人工重新阅读聊天记录、订单和历史工单的时间。",
    icon: Sparkles,
    visual: "summary",
    points: ["用户到底发生了什么", "商家是否给过明确结论", "有没有未完结工单或高风险记录"],
  },
  {
    eyebrow: "Step 3 / AI 建单",
    title: "解决客服建单时，重复敲字段的痛点",
    desc: "建单工具把工单分类、用户诉求、工单类型和备注预填好，客服只需要复核和微调，降低漏填、错填和表达不统一的问题。",
    icon: ClipboardList,
    visual: "draft",
    points: ["分类自动预填", "诉求自动归纳", "备注自动沉淀关键证据"],
  },
  {
    eyebrow: "Step 4 / 工单智能建议",
    title: "让客服知道这时候应该直接做什么",
    desc: "智能建议把问题概述、举证情况、知识依据和方案指引放在同一屏，客服不用自己翻规则，也能理解为什么推荐这个动作。",
    icon: Bot,
    visual: "suggestion",
    points: ["先做退货退款还是补证", "哪些赔付不支持", "引用了哪条知识库规则"],
  },
  {
    eyebrow: "Step 5 / 回电规范",
    title: "把全电商客服的回电时效从手算变成系统规范",
    desc: "系统创建每轮回电时间，外呼后自动生成下一轮回电；遇到路由规则会修改预约提醒，避免客服靠手算导致用户感知回电超时。",
    icon: TimerReset,
    visual: "callback",
    points: ["默认 48h 回电时效", "外呼后生成下一轮", "避免 badcase 频发"],
  },
  {
    eyebrow: "Step 6 / 深度展示建议",
    title: "工单智能建议和回电，是最值得展开讲深度的部分",
    desc: "这部分可以继续补强成面试讲解里的技术与产品闭环：让面试官看到 AI 不是生成一段话，而是在真实业务约束下做判断、引用知识、校验风险。",
    icon: ShieldCheck,
    visual: "depth",
    points: ["补一张 RAG 命中知识链路", "补 ReAct 执行检查项", "补 self-reflection 风险校验", "补知识库清洗前后对比", "补回电超时 badcase 前后对比"],
  },
];

export function WelcomeGuide({ onDirectOpen, onStartGuidedTour, onOpenOnline, onOpenTicketSuggestion, onOpenKnowledge }: WelcomeGuideProps) {
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const step = guideSteps[stepIndex];
  const Icon = step.icon;
  const isLast = stepIndex === guideSteps.length - 1;

  if (!started) {
    return (
      <main className="relative flex h-screen overflow-hidden bg-white text-slate-950">
        <div className="absolute left-[-12%] top-[-20%] h-96 w-96 rounded-full bg-teal-100/80 blur-3xl" />
        <div className="absolute bottom-[-18%] right-[-10%] h-[420px] w-[420px] rounded-full bg-cyan-100/70 blur-3xl" />
        <div className="relative grid w-full grid-cols-[minmax(0,0.95fr)_minmax(420px,0.75fr)] gap-10 px-14 py-12">
          <section className="flex min-w-0 flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs text-teal-700">
              <Sparkles size={14} />
              客服AI辅助工作台Demo
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.08] tracking-tight">个人工作内容demo</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">此demo主要展示本人工作内容，减少双方沟通时信息gap。围绕AI如何帮助客服理解上下文、辅助建单、推荐工单处理方案，并将回电时效从复杂的人工手算变成系统化规则。</p>
            <div className="mt-8 flex items-center gap-3">
              <button
                className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-950/30 transition hover:bg-teal-400"
                onClick={onStartGuidedTour}
              >
                跟随指引查看功能
                <Play size={15} />
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                onClick={onDirectOpen}
              >
                直接查看工作台
                <ArrowRight size={16} />
              </button>
            </div>
          </section>

          <section className="flex items-center">
            <div className="w-full rounded-[28px] border border-slate-200 bg-slate-50 p-5 shadow-xl shadow-slate-200/80">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="mb-4 text-xs text-slate-500">演示动线</div>
                <div className="space-y-3">
                  {["智能总结", "AI 建单", "工单智能建议", "人工知识库", "回电规范"].map((item, index) => (
                    <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-50 text-xs font-semibold text-teal-700">{index + 1}</div>
                      <div className="text-sm font-medium text-slate-800">{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex h-screen overflow-hidden bg-[#f6f8fb] text-slate-950">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-teal-50 to-transparent" />
      <section className="relative mx-auto flex w-full max-w-7xl flex-col px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <button className="text-xs font-medium text-slate-500 hover:text-slate-900" onClick={() => setStarted(false)}>
            返回欢迎页
          </button>
          <div className="flex items-center gap-2">
            {guideSteps.map((item, index) => (
              <button
                key={item.eyebrow}
                className={index === stepIndex ? "h-2 w-8 rounded-full bg-teal-500 transition-all" : "h-2 w-2 rounded-full bg-slate-300 transition-all"}
                onClick={() => setStepIndex(index)}
                aria-label={`查看第 ${index + 1} 步`}
              />
            ))}
          </div>
        </div>

        <div key={step.eyebrow} className="grid min-h-0 flex-1 grid-cols-[minmax(0,0.9fr)_minmax(460px,1fr)] gap-8 transition-all duration-500 animate-in fade-in slide-in-from-right-4">
          <section className="flex min-w-0 flex-col justify-center">
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
              <Icon size={14} />
              {step.eyebrow}
            </div>
            <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-950">{step.title}</h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-8 text-slate-600">{step.desc}</p>
            <div className="mt-7 grid gap-3">
              {step.points.map((point) => (
                <div key={point} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-teal-500" />
                  {point}
                </div>
              ))}
            </div>
          </section>

          <section className="flex min-h-0 items-center">
            <GuideVisual type={step.visual} />
          </section>
        </div>

        <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="text-xs text-slate-500">
            {isLast ? "建议最后把面试官带到工单详情页，重点讲智能建议与回电闭环。" : "点击下一步，沿着客服工作流继续看下一个能力。"}
          </div>
          <div className="flex items-center gap-2">
            {stepIndex > 0 ? (
              <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50" onClick={() => setStepIndex((current) => current - 1)}>
                上一步
              </button>
            ) : null}
            {isLast ? (
              <>
                <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50" onClick={onOpenKnowledge}>
                  查看知识库
                </button>
                <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50" onClick={onOpenOnline}>
                  进入在线工作台
                </button>
                <button className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-500" onClick={onOpenTicketSuggestion}>
                  进入工单智能建议
                  <ArrowRight size={15} />
                </button>
              </>
            ) : (
              <button className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-500" onClick={() => setStepIndex((current) => current + 1)}>
                下一步
                <ArrowRight size={15} />
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function GuideVisual({ type }: { type: string }) {
  if (type === "workflow") {
    const nodes = [
      { icon: Headphones, title: "用户转人工", desc: "用户问题复杂，机器人转人工" },
      { icon: Sparkles, title: "AI 总结", desc: "压缩上下文，降低阅读成本" },
      { icon: ClipboardList, title: "AI 建单", desc: "预填分类、诉求与备注" },
      { icon: Bot, title: "智能建议", desc: "给出依据与下一步动作" },
      { icon: PhoneCall, title: "回电闭环", desc: "系统生成轮次与时效" },
    ];

    return (
      <div className="w-full rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
        <div className="mb-4 text-sm font-semibold text-slate-900">一条完整客服处理链路</div>
        <div className="space-y-3">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            return (
              <div key={node.title} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <Icon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-slate-900">{node.title}</div>
                  <div className="mt-1 text-xs text-slate-500">{node.desc}</div>
                </div>
                {index < nodes.length - 1 ? <ArrowRight size={16} className="text-slate-300" /> : null}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (type === "summary") {
    return (
      <DemoPanel title="智能总结卡片" badge="转人工后一眼看懂">
        <DemoBlock title="用户诉求" text="用户签收后发现 ¥469.00 料理机杯体破损，商家拒绝退款，用户要求退还货款并承担退回运费。" active />
        <DemoBlock title="商家沟通记录" text="商家要求用户补充开箱视频，暂未同意直接退款。" />
        <DemoBlock title="工单记录" text="无未完结工单，但用户对处理时效敏感，需承诺明确回访时间。" />
      </DemoPanel>
    );
  }

  if (type === "draft") {
    return (
      <DemoPanel title="AI 建单工具" badge="从手敲字段到复核字段">
        <FieldPreview label="工单分类" value="售后纠纷 / 商品破损 / 签收后争议" />
        <FieldPreview label="用户诉求" value="支持全额退款并承担退回运费" />
        <FieldPreview label="工单类型" value="升级处理" />
        <FieldPreview label="备注" value="已整合用户照片、商家拒绝原因和历史服务记录。" multiline />
      </DemoPanel>
    );
  }

  if (type === "suggestion") {
    return (
      <DemoPanel title="工单智能建议" badge="推荐动作 + 知识依据">
        <DemoBlock title="问题概述" text="用户投诉直播宣传与实物品牌认知不一致，已连续催促平台处理并提及升级投诉。" active />
        <DemoBlock title="知识依据" text="命中品牌宣传争议/虚假宣传/3.2，可按虚假宣传场景优先支持退货退款。" />
        <DemoBlock title="方案指引" text="发起退货退款；不支持假一赔三；必要时申请 20 元优惠券兜底。" />
      </DemoPanel>
    );
  }

  if (type === "callback") {
    return (
      <DemoPanel title="回电规范流水" badge="避免人工手算超时">
        <TimelinePreview time="2026-06-01 14:20:03" title="创建第 1 轮回电" text="默认 48h，回电时间为 2026-06-03 14:20:03。" />
        <TimelinePreview time="2026-06-01 14:20:23" title="规则修改预约时间" text="系统将回电时间提前至 2026-06-02 14:20:23。" />
        <TimelinePreview time="2026-06-02 17:21:37" title="外呼后生成第 2 轮" text="默认 48h，回电时间为 2026-06-04 17:21:37。" />
      </DemoPanel>
    );
  }

  return (
    <DemoPanel title="建议补强的深度内容" badge="面试讲解重点">
      <DemoBlock title="RAG" text="展示命中的知识切片、定位符、原文内容，以及为什么这条知识支撑该方案。" active />
      <DemoBlock title="ReAct" text="展示系统执行过哪些检查：订单、举证、场景推断、赔付边界、回电时效。" />
      <DemoBlock title="Self-reflection" text="展示结果校验：场景是否一致、证据是否足够、方案是否覆盖所有诉求。" />
      <DemoBlock title="知识库清洗" text="补一页清洗前后对比：重复、过期、无定位内容如何变成可召回切片。" />
    </DemoPanel>
  );
}

function DemoPanel({ title, badge, children }: { title: string; badge: string; children: ReactNode }) {
  return (
    <div className="w-full rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-950">{title}</div>
        <span className="rounded-full bg-teal-50 px-3 py-1 text-[11px] font-semibold text-teal-700">{badge}</span>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function DemoBlock({ title, text, active = false }: { title: string; text: string; active?: boolean }) {
  return (
    <div className={active ? "rounded-2xl border border-teal-200 bg-teal-50 p-4" : "rounded-2xl border border-slate-100 bg-slate-50 p-4"}>
      <div className="mb-1 text-sm font-semibold text-slate-900">{title}</div>
      <div className="text-xs leading-6 text-slate-600">{text}</div>
    </div>
  );
}

function FieldPreview({ label, value, multiline = false }: { label: string; value: string; multiline?: boolean }) {
  return (
    <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs">
      <div className="py-1 text-slate-400">{label}</div>
      <div className={multiline ? "leading-6 text-slate-700" : "truncate py-1 text-slate-700"}>{value}</div>
    </div>
  );
}

function TimelinePreview({ time, title, text }: { time: string; title: string; text: string }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3">
      <div className="w-32 shrink-0 text-[11px] text-slate-400">{time}</div>
      <div className="border-l-2 border-teal-200 pl-3">
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="mt-1 text-xs leading-5 text-slate-600">{text}</div>
      </div>
    </div>
  );
}
