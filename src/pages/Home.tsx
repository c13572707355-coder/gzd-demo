import { useMemo, useState } from "react";
import { ChatWorkspace } from "@/components/workspace/ChatWorkspace";
import { GuidedTourOverlay, type TourStep } from "@/components/workspace/GuidedTourOverlay";
import { KnowledgeBaseWorkspace } from "@/components/workspace/KnowledgeBaseWorkspace";
import { QueuePanel } from "@/components/workspace/QueuePanel";
import { RightWorkPanel } from "@/components/workspace/RightWorkPanel";
import { TicketDetailWorkspace } from "@/components/workspace/TicketDetailWorkspace";
import { TicketSidebar } from "@/components/workspace/TicketSidebar";
import { TicketWorkspace } from "@/components/workspace/TicketWorkspace";
import { TopBar } from "@/components/workspace/TopBar";
import { WelcomeGuide } from "@/components/workspace/WelcomeGuide";
import { WorkspaceModeSwitch, type WorkspaceMode } from "@/components/workspace/WorkspaceModeSwitch";
import { type CaseId, type TicketListRecord, knowledgeRecords, ticketDetailDemo, ticketListRecords, ticketSidebarSections, workspaceCases } from "@/data/workspace";

const ticketTabCounts: Record<string, number> = {
  我的待处理工单: 25,
  我的已完结工单: 21,
  我提交的工单: 30,
  组内处理中工单: 60,
  全部工单: 999,
};

const tourSteps: TourStep[] = [
  {
    targetId: "online-workspace",
    pageHint: "客服工作流程",
    title: "客服作业流",
    desc: "用户转人工后，客服需要理解上下文、回复用户、建工单单跟进(若有必要)，再进入工单处理和回电。",
  },
  {
    targetId: "smart-summary",
    pageHint: "智能总结",
    title: "AI 帮客服省掉翻历史信息的时间",
    desc: "这里把用户诉求、商家沟通和历史工单压缩到顶部。客服不用重新翻聊天记录、订单和工单记录，就能知道用户发生了什么。",
  },
  {
    targetId: "ticket-draft",
    pageHint: "AI 建单",
    title: "建单从手动敲字变成复核字段",
    desc: "工单分类、用户诉求、工单类型、备注都由 AI 预填。客服只需要检查和微调，减少重复录入和漏填。",
    bubblePlacement: "left",
  },
  {
    targetId: "ticket-suggestion",
    pageHint: "工单智能建议",
    title: "AI给出客服工单处理方案",
    desc: "智能建议把问题概述、举证情况、知识依据(可跳转)和方案指引放在一起，客服能看到推荐动作，也能看到为什么这么推荐。",
    bubblePlacement: "left",
    bubbleOffsetY: -120,
    bubbleOffsetX: -40,
  },
  {
    targetId: "knowledge-table",
    pageHint: "知识库与实现原理",
    title: "智能建议知识库示例",
    desc: "使用RAG、ReAct 、Self-reflection等agent架构提升方案生成准确率，同步进行知识库清洗",
    bubbleOffsetY: -180,
  },
  {
    targetId: "callback-countdown",
    pageHint: "回电规范",
    title: "回电倒计时让回电时效规范可控",
    desc: "客服不需要靠手算判断什么时候必须回电，工单旁直接展示倒计时，并用颜色区分临近超时和高风险工单。",
  },
];

function expandTicketRecords(records: TicketListRecord[], total: number, prefix: string) {
  return Array.from({ length: total }, (_, index) => {
    const base = records[index % records.length];
    const day = String((index % 28) + 1).padStart(2, "0");
    const hour = String((9 + (index % 10)) % 24).padStart(2, "0");
    const minute = String((index * 7) % 60).padStart(2, "0");
    const numericId = String(2026060100000000 + index + prefix.length * 1000).padStart(16, "0");

    return {
      ...base,
      id: `W${numericId}`,
      createdAt: `2026-06-${day} ${hour}:${minute}:15`,
      latestReplyAt: `2026-06-${day} ${hour}:${minute}:42`,
      upgradedAt: base.upgradedAt === "-" ? "-" : `2026-06-${day} ${hour}:${minute}:58`,
      manualReviewAt: base.manualReviewAt === "-" ? "-" : `2026-06-${day} ${hour}:${minute}:32`,
      closeAt: base.isClosed ? `2026-06-${day}` : "-",
    };
  });
}

export default function Home() {
  const [activeCaseId, setActiveCaseId] = useState<CaseId>("damage");
  const [showWelcome, setShowWelcome] = useState(true);
  const [guidedStepIndex, setGuidedStepIndex] = useState<number | null>(null);
  const [mode, setMode] = useState<WorkspaceMode>("online");
  const [activeTicketTab, setActiveTicketTab] = useState("我的待处理工单");
  const [selectedTicket, setSelectedTicket] = useState<TicketListRecord | null>(null);
  const [selectedKnowledgeId, setSelectedKnowledgeId] = useState<string | null>(null);
  const activeCase = useMemo(
    () => workspaceCases.find((item) => item.id === activeCaseId) ?? workspaceCases[0],
    [activeCaseId]
  );
  const filteredTicketRecords = useMemo(() => {
    const build = (label: string, source: TicketListRecord[]) =>
      expandTicketRecords(source, ticketTabCounts[label] ?? source.length, label);

    switch (activeTicketTab) {
      case "我的待处理工单":
        return build("我的待处理工单", ticketListRecords.filter((item) => ["处理中", "升级处理中", "待复核"].includes(item.status)));
      case "我的已完结工单":
        return build("我的已完结工单", ticketListRecords.filter((item) => item.isClosed));
      case "我提交的工单":
        return build("我提交的工单", ticketListRecords);
      case "组内处理中工单":
        return build("组内处理中工单", ticketListRecords.filter((item) => !item.isClosed));
      case "全部工单":
        return build("全部工单", ticketListRecords);
      default:
        return build("我的待处理工单", ticketListRecords.filter((item) => ["处理中", "升级处理中", "待复核"].includes(item.status)));
    }
  }, [activeTicketTab]);
  const demoTicketRecord = useMemo(
    () => filteredTicketRecords.find((item) => !item.isClosed) ?? filteredTicketRecords[0] ?? null,
    [filteredTicketRecords]
  );

  const openOnlineWorkspace = () => {
    setActiveCaseId("damage");
    setMode("online");
    setSelectedKnowledgeId(null);
    setGuidedStepIndex(null);
    setShowWelcome(false);
  };

  const selectTicketSuggestionDemo = () => {
    const tab = "我的待处理工单";
    const source = ticketListRecords.filter((item) => ["处理中", "升级处理中", "待复核"].includes(item.status));
    const records = expandTicketRecords(source, ticketTabCounts[tab] ?? source.length, tab);

    setActiveTicketTab(tab);
    setSelectedTicket(records[0] ?? source[0] ?? null);
    setSelectedKnowledgeId(null);
    setMode("ticket");
  };

  const openTicketSuggestionDemo = () => {
    selectTicketSuggestionDemo();
    setGuidedStepIndex(null);
    setShowWelcome(false);
  };

  const openKnowledgeDemo = () => {
    setSelectedKnowledgeId("KB-BRAND-0001");
    setMode("knowledge");
    setGuidedStepIndex(null);
    setShowWelcome(false);
  };

  const startGuidedTour = () => {
    setActiveCaseId("damage");
    setSelectedTicket(null);
    setSelectedKnowledgeId(null);
    setMode("online");
    setGuidedStepIndex(0);
    setShowWelcome(false);
  };

  const moveGuidedTour = (nextIndex: number) => {
    if (nextIndex >= tourSteps.length) {
      setActiveCaseId("damage");
      setMode("online");
      setSelectedTicket(null);
      setSelectedKnowledgeId(null);
      setGuidedStepIndex(null);
      return;
    }

    if (nextIndex <= 2) {
      setMode("online");
      setSelectedTicket(null);
      setSelectedKnowledgeId(null);
    } else if (nextIndex === 3) {
      selectTicketSuggestionDemo();
    } else if (nextIndex === 4) {
      setSelectedKnowledgeId("KB-BRAND-0001");
      setMode("knowledge");
    } else if (nextIndex === 5) {
      setActiveTicketTab("我的待处理工单");
      setSelectedTicket(null);
      setSelectedKnowledgeId(null);
      setMode("ticket");
    }

    setGuidedStepIndex(nextIndex);
  };

  if (showWelcome) {
    return (
      <WelcomeGuide
        onDirectOpen={openOnlineWorkspace}
        onStartGuidedTour={startGuidedTour}
        onOpenOnline={openOnlineWorkspace}
        onOpenTicketSuggestion={openTicketSuggestionDemo}
        onOpenKnowledge={openKnowledgeDemo}
      />
    );
  }

  return (
    <main className="flex h-screen overflow-hidden bg-slate-100 text-slate-900">
      <WorkspaceModeSwitch
        mode={mode}
        onChange={(nextMode) => {
          setMode(nextMode);
          setSelectedKnowledgeId(null);
        }}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          mode={mode}
          onBackToWelcome={() => {
            setGuidedStepIndex(null);
            setShowWelcome(true);
          }}
        />

        {mode === "online" ? (
          <div data-guide-id="online-workspace" className="grid h-[calc(100vh-40px)] grid-cols-[276px_minmax(620px,1fr)_430px] overflow-hidden">
            <div className="flex min-h-0 flex-col border-r border-slate-200 bg-white">
              <QueuePanel cases={workspaceCases} activeCaseId={activeCaseId} onCaseChange={setActiveCaseId} />
            </div>
            <ChatWorkspace data={activeCase} />
            <RightWorkPanel data={activeCase} />
          </div>
        ) : mode === "knowledge" ? (
          <KnowledgeBaseWorkspace records={knowledgeRecords} selectedId={selectedKnowledgeId} />
        ) : (
          <div className="grid h-[calc(100vh-40px)] grid-cols-[224px_minmax(0,1fr)] overflow-hidden">
            <div className="flex min-h-0 flex-col border-r border-slate-200 bg-white">
              <TicketSidebar
                sections={ticketSidebarSections}
                activeTab={activeTicketTab}
                demoDetailOpen={Boolean(selectedTicket)}
                onTabChange={(tab) => {
                  setActiveTicketTab(tab);
                  setSelectedTicket(null);
                }}
                onOpenDemoDetail={() => {
                  if (demoTicketRecord) {
                    setSelectedTicket(demoTicketRecord);
                  }
                }}
              />
            </div>
            {selectedTicket ? (
              <TicketDetailWorkspace
                record={selectedTicket}
                detail={ticketDetailDemo}
                onBack={() => setSelectedTicket(null)}
                onOpenKnowledge={(knowledgeId) => {
                  setSelectedKnowledgeId(knowledgeId);
                  setMode("knowledge");
                }}
              />
            ) : (
              <TicketWorkspace records={filteredTicketRecords} activeTab={activeTicketTab} onOpenDetail={setSelectedTicket} />
            )}
          </div>
        )}
      </div>
      {guidedStepIndex !== null ? (
        <GuidedTourOverlay
          step={tourSteps[guidedStepIndex]}
          stepIndex={guidedStepIndex}
          total={tourSteps.length}
          onPrev={() => moveGuidedTour(Math.max(0, guidedStepIndex - 1))}
          onNext={() => moveGuidedTour(guidedStepIndex + 1)}
          onClose={() => setGuidedStepIndex(null)}
        />
      ) : null}
    </main>
  );
}
