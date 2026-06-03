import { useEffect, useLayoutEffect, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

export interface TourStep {
  targetId: string;
  title: string;
  desc: string;
  pageHint: string;
  bubblePlacement?: "left" | "right";
  bubbleOffsetY?: number;
  bubbleOffsetX?: number;
}

interface GuidedTourOverlayProps {
  step: TourStep;
  stepIndex: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
}

interface RectState {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function GuidedTourOverlay({ step, stepIndex, total, onNext, onPrev, onClose }: GuidedTourOverlayProps) {
  const [rect, setRect] = useState<RectState | null>(null);

  useLayoutEffect(() => {
    const update = () => {
      const target = document.querySelector<HTMLElement>(`[data-guide-id="${step.targetId}"]`);
      if (!target) {
        setRect(null);
        return;
      }

      target.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });

      window.requestAnimationFrame(() => {
        const nextRect = target.getBoundingClientRect();
        setRect({
          top: Math.max(10, nextRect.top - 8),
          left: Math.max(10, nextRect.left - 8),
          width: nextRect.width + 16,
          height: nextRect.height + 16,
        });
      });
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [step.targetId]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const bubbleStyle = rect
    ? {
        top: Math.max(24, Math.min(window.innerHeight - 260, rect.top + rect.height + 18 + (step.bubbleOffsetY ?? 0))),
        left:
          step.bubblePlacement === "left"
            ? Math.max(24, rect.left - 388 + (step.bubbleOffsetX ?? 0))
            : Math.min(window.innerWidth - 380, Math.max(24, rect.left + Math.min(36, rect.width / 3) + (step.bubbleOffsetX ?? 0))),
      }
    : { top: 96, left: window.innerWidth - 420 };

  return (
    <div className="pointer-events-auto fixed inset-0 z-[120]">
      <div className="absolute inset-0 bg-slate-950/38" />

      {rect ? (
        <div
          className="pointer-events-none absolute rounded-2xl border-2 border-teal-300 bg-white/5 shadow-[0_0_0_9999px_rgba(15,23,42,0.08),0_0_28px_rgba(20,184,166,0.75)] transition-all duration-300"
          style={{
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          }}
        />
      ) : null}

      {rect ? (
        <div
          className="pointer-events-none absolute h-8 w-px bg-gradient-to-b from-teal-300 to-white/70"
          style={{
            top: rect.top + rect.height,
            left: Math.min(window.innerWidth - 80, Math.max(80, rect.left + Math.min(rect.width / 2, 260))),
          }}
        />
      ) : null}

      <div
        className="pointer-events-auto absolute w-[349px] rounded-2xl border border-white/20 bg-gradient-to-br from-orange-500 to-amber-400 p-4 text-white shadow-2xl shadow-orange-950/40 transition-all duration-300"
        style={{ ...bubbleStyle, marginLeft: "-20px", marginRight: "-20px" }}
      >
        <div className="mb-2 flex items-center justify-between">
          <div className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold">{step.pageHint}</div>
          <button className="rounded-full p-1 text-white/80 hover:bg-white/15 hover:text-white" onClick={onClose}>
            <X size={14} />
          </button>
        </div>
        <div className="text-lg font-semibold leading-6">{step.title}</div>
        <div className="mt-2 text-[13px] leading-6 text-white/90">{step.desc}</div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-[12px] font-medium text-white/80">
            {stepIndex + 1} / {total}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
              disabled={stepIndex === 0}
              onClick={onPrev}
            >
              <ArrowLeft size={13} />
              上一步
            </button>
            <button className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-orange-600" onClick={onNext}>
              {stepIndex === total - 1 ? "完成" : "下一步"}
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
