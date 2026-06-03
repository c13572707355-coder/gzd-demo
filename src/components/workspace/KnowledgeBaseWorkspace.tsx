import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Download, Plus, Search, Trash2, Upload, X } from "lucide-react";
import type { KnowledgeRecord } from "@/data/workspace";

interface KnowledgeBaseWorkspaceProps {
  records: KnowledgeRecord[];
  selectedId?: string | null;
}

const filters = ["上传时间", "ID", "文档标题", "文档总结", "业务线", "场景", "分片内容", "定位符", "定位字段", "文档链接", "完整场景（召回用）"];
const filterOptions = filters.filter((item) => item !== "定位符");

const filterFieldMap: Record<string, (record: KnowledgeRecord) => string> = {
  上传时间: (record) => record.uploadedAt,
  ID: (record) => record.id,
  文档标题: (record) => record.title,
  文档总结: (record) => record.summary,
  业务线: (record) => record.businessLine,
  场景: (record) => record.scene,
  分片内容: (record) => record.chunkContent,
  定位字段: (record) => record.locatorField,
  文档链接: (record) => record.documentLink,
  "完整场景（召回用）": (record) => record.fullScene,
};

const PAGE_SIZE = 10;

function expandKnowledgeRecords(records: KnowledgeRecord[], total: number) {
  if (records.length >= total) return records;

  const syntheticCases: Array<Omit<KnowledgeRecord, "id" | "uploadedAt"> & { prefix: string }> = [
    {
      prefix: "KB-BRAND",
      title: "品牌宣传争议·直播间口播误导处理口径",
      summary: "适用于达人直播间使用“原版原标”“柜台同源”等口播，用户到货后主张品牌认知落差的争议判定与售后处理。",
      businessLine: "电商客服 / 商品治理",
      scene: "品牌宣传争议 / 直播口播误导 / 3.3",
      chunkContent:
        "直播口播出现“原版原标”“商场同款”“大牌平替天花板”等表达，且用户举证显示实物品牌展示与直播形成认知不一致时，可按品牌宣传误导场景优先支持退货退款，并同步回收直播切片与话术证据。",
      locator: "3.3",
      locatorField: "品牌宣传争议/直播口播误导/3.3",
      documentLink: "https://kb.example.com/docs/brand-dispute/live-script#3.3",
      fullScene:
        "用户投诉达人直播间存在品牌暗示、原版原标、商场同款等误导表达，收到货后发现商品品牌展示、吊牌、包装与认知不一致，需要客服判断是否按品牌宣传争议处理。",
    },
    {
      prefix: "KB-BRAND",
      title: "品牌宣传争议·详情页遮挡商标举证要点",
      summary: "用于处理商家在商品详情页、主图或视频中遮挡商标信息，导致用户下单后产生品牌误认的举证要求。",
      businessLine: "电商客服 / 售后争议",
      scene: "品牌宣传争议 / 品牌遮挡 / 3.5",
      chunkContent:
        "若商品详情页、视频帧、橱窗图存在局部遮挡品牌 logo、刻意避开吊牌信息或仅展示剪裁细节，用户提供实物图后能证明品牌展示方式不一致时，应优先固定详情页截图、用户实物图和直播回放，再判断是否支持退货退款。",
      locator: "3.5",
      locatorField: "品牌宣传争议/品牌遮挡/3.5",
      documentLink: "https://kb.example.com/docs/brand-dispute/logo-hidden#3.5",
      fullScene:
        "用户反馈商品详情页或直播画面遮挡品牌信息，到货后发现实物 logo、吊牌或包装品牌与其理解存在偏差，需要平台判断是否构成品牌遮挡误导。",
    },
    {
      prefix: "KB-FAKE",
      title: "非实锤假货·第三方 APP 页面举证边界",
      summary: "用于识别用户仅提供第三方 APP 页面、真假对比贴或网页识别结果时的证据有效性边界。",
      businessLine: "电商客服 / 商品治理",
      scene: "假货判定 / 非实锤假货 / 2.1",
      chunkContent:
        "用户仅提交第三方 APP 页面、网页识别截图或防伪码异常页面时，不能直接认定实锤假货。客服应区分信息参考与权威鉴定结论，必要时引导补充品牌方鉴定报告、第三方有效鉴定或司法文书。",
      locator: "2.1",
      locatorField: "假货判定/非实锤假货/2.1",
      documentLink: "https://kb.example.com/docs/fake-goods/third-party-app#2.1",
      fullScene:
        "用户主张商品是假货，但举证仅为得物、识货、防伪网页、真假对比帖等非权威页面，需要判断证据是否只能作为辅助信息而非实锤凭证。",
    },
    {
      prefix: "KB-FAKE",
      title: "假货争议·品牌方鉴定报告核验规则",
      summary: "明确品牌方实物鉴定报告、司法文书和中检国检报告的有效字段要求，避免误判实锤假货。",
      businessLine: "电商客服 / 商品治理",
      scene: "假货判定 / 实锤凭证核验 / 1.6",
      chunkContent:
        "品牌方实物鉴定报告需包含受理主体、商品识别信息、鉴定结论和时间戳；司法或中检国检材料需可对应订单商品。若报告无法关联到当前订单商品或内容模糊不全，不应直接按实锤假货处理。",
      locator: "1.6",
      locatorField: "假货判定/实锤凭证核验/1.6",
      documentLink: "https://kb.example.com/docs/fake-goods/brand-report#1.6",
      fullScene:
        "用户上传品牌方报告、权威机构鉴定或司法材料，客服需要确认材料是否能真实对应当前订单商品，再决定是否进入实锤假货赔付流程。",
    },
    {
      prefix: "KB-REFUND",
      title: "退款到账争议·重复进线回访建单规则",
      summary: "适用于退款处理中用户 24 小时内重复进线，客服需要补建回访工单并明确下次反馈节点。",
      businessLine: "电商客服 / 售后退款",
      scene: "售后申请 / 重复催退款 / 5.3",
      chunkContent:
        "若用户在退款处理中 24 小时内重复咨询，且前次客服承诺未闭环，应补建需回电确认的回访工单，备注支付状态、退款流水核验动作和下一次反馈时间，避免重复解释与时效投诉。",
      locator: "5.3",
      locatorField: "售后申请/重复催退款/5.3",
      documentLink: "https://kb.example.com/docs/refund/repeat-contact#5.3",
      fullScene:
        "用户持续追问退款到账时间、商家称已处理但平台仍显示处理中，上一次客服承诺回访未完成，需要判断是否立刻补建回访工单。",
    },
    {
      prefix: "KB-REFUND",
      title: "退款到账争议·原路退回时效说明模板",
      summary: "用于客服根据支付渠道向用户说明原路退回时效、失败原因和需要进一步核验的节点。",
      businessLine: "电商客服 / 售后退款",
      scene: "售后申请 / 到账时效解释 / 5.4",
      chunkContent:
        "银行卡、抖音支付、零钱等退款渠道的到账时效不同。客服需优先核验支付流水状态，再向用户说明原路退回时效、节假日顺延和退款失败重发的节点，不得仅复述商家已处理。",
      locator: "5.4",
      locatorField: "售后申请/到账时效解释/5.4",
      documentLink: "https://kb.example.com/docs/refund/arrival-template#5.4",
      fullScene:
        "用户要求明确退款到账时间、退款去向和失败原因，客服需要结合不同支付渠道给出准确说明，而不是泛化答复“请继续等待”。",
    },
    {
      prefix: "KB-LOGISTICS",
      title: "物流异常·承诺送达前补发决策规则",
      summary: "用于生日、节日、活动、急用等强时效场景下，判断承运商核查与商家补发的优先级。",
      businessLine: "电商客服 / 履约物流",
      scene: "物流异常 / 强时效补发 / 2.6",
      chunkContent:
        "当用户存在生日送礼、出行、比赛等明确使用时限，且包裹物流停滞接近承诺送达时间时，应同步承运商核查与商家补发可行性，优先保证用户使用场景，不宜只做等待解释。",
      locator: "2.6",
      locatorField: "物流异常/强时效补发/2.6",
      documentLink: "https://kb.example.com/docs/logistics/urgent-reship#2.6",
      fullScene:
        "用户说明生日、节日、旅行、活动急用等特殊使用场景，物流停滞已影响送达承诺，需要平台判断是否优先推动补发或升级物流核查。",
    },
    {
      prefix: "KB-LOGISTICS",
      title: "物流异常·网点停滞 48h 升级处理",
      summary: "适用于包裹在分拨中心、转运中心、直营网点等节点连续停滞超过 48 小时的升级动作。",
      businessLine: "电商客服 / 履约物流",
      scene: "物流异常 / 网点停滞升级 / 2.2",
      chunkContent:
        "物流在分拨中心、转运中心或派送网点停滞超过 48 小时且无后续扫描时，应发起承运商工单、同步商家核查揽派异常，并记录承诺送达时间、最近轨迹和用户诉求，便于后续判断补发或赔付。",
      locator: "2.2",
      locatorField: "物流异常/网点停滞升级/2.2",
      documentLink: "https://kb.example.com/docs/logistics/site-stagnation#2.2",
      fullScene:
        "用户反馈物流卡在某一网点、转运中心或派送站点久未更新，商家与承运商互相推诿，需要平台介入升级物流异常处理。",
    },
    {
      prefix: "KB-AFTERSALE",
      title: "签收后破损·举证不足补证规则",
      summary: "用于处理签收后发现破损但当前缺少开箱视频、快递面单异常或签收异常证明的补证口径。",
      businessLine: "电商客服 / 售后争议",
      scene: "商品破损 / 补证流程 / 6.1",
      chunkContent:
        "用户签收后反馈商品破损，但现有举证仅有实物破损照片、无开箱视频或外包装异常证明时，应先固定现有照片并结合商家拒绝理由判断是否需要补充开箱视频、快递证明或仓内打包信息。",
      locator: "6.1",
      locatorField: "商品破损/补证流程/6.1",
      documentLink: "https://kb.example.com/docs/aftersale/damage-supplement#6.1",
      fullScene:
        "用户签收后发现商品破损，要求退款或换货，但商家以签收为由拒绝售后，客服需要判断现有证据是否足以进入平台复核或需要补证。",
    },
    {
      prefix: "KB-AFTERSALE",
      title: "换货申请·缺货协商与补差策略",
      summary: "适用于用户要求更换新机或新尺码，但商家库存不足，需要协商补差、补发或退款的处理策略。",
      businessLine: "电商客服 / 售后争议",
      scene: "换货申请 / 缺货协商 / 7.2",
      chunkContent:
        "若用户希望换货但商家库存不足，客服需同步核对可替代 SKU、差价承担、预计补货时间和用户接受范围。用户对等待不接受时，可转入退款或补偿协商，不得无限期挂起。",
      locator: "7.2",
      locatorField: "换货申请/缺货协商/7.2",
      documentLink: "https://kb.example.com/docs/aftersale/exchange-stockout#7.2",
      fullScene:
        "用户要求换货、补寄或更换尺码颜色，但商家库存不足、补货时间不明，需要平台协助确认替代商品、差价和用户可接受方案。",
    },
  ];

  return Array.from({ length: total }, (_, index) => {
    const base = records[index % records.length];
    if (index < records.length) return base;

    const serial = index - records.length + 1;
    const day = String((serial % 10) + 10).padStart(2, "0");
    const synthetic = syntheticCases[(serial - 1) % syntheticCases.length];

    return {
      id: `${synthetic.prefix}-${String(1000 + serial).padStart(4, "0")}`,
      uploadedAt: `2026-01-${day} ${String(9 + (serial % 9)).padStart(2, "0")}:${String((serial * 11) % 60).padStart(2, "0")}`,
      title: synthetic.title,
      summary: synthetic.summary,
      businessLine: synthetic.businessLine,
      scene: synthetic.scene,
      chunkContent: synthetic.chunkContent,
      locator: synthetic.locator,
      locatorField: synthetic.locatorField,
      documentLink: synthetic.documentLink,
      fullScene: synthetic.fullScene,
    };
  });
}

export function KnowledgeBaseWorkspace({ records, selectedId }: KnowledgeBaseWorkspaceProps) {
  const rowRefs = useRef<Record<string, HTMLTableRowElement | null>>({});
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const expandedRecords = useMemo(() => expandKnowledgeRecords(records, 25), [records]);
  const [activeFilter, setActiveFilter] = useState("文档标题");
  const [query, setQuery] = useState("");
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [pageNotice, setPageNotice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const visibleRecords = useMemo(() => {
    const source = expandedRecords;
    const keyword = query.trim().toLowerCase();

    if (!keyword) return source;

    const getter = filterFieldMap[activeFilter];
    return source.filter((record) => (getter ? getter(record) : Object.values(record).join(" ")).toLowerCase().includes(keyword));
  }, [activeFilter, expandedRecords, query]);

  useEffect(() => {
    setCurrentPage(1);
    scrollRef.current?.scrollTo({ top: 0 });
  }, [activeFilter, query]);

  useEffect(() => {
    if (!selectedId) return;
    setCurrentPage(1);
    rowRefs.current[selectedId]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [selectedId]);

  const totalPages = Math.max(1, Math.ceil(visibleRecords.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pagedRecords = visibleRecords.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const allChecked = pagedRecords.length > 0 && pagedRecords.every((record) => checkedIds.includes(record.id));

  const toggleAll = () => {
    if (allChecked) {
      setCheckedIds((current) => current.filter((id) => !pagedRecords.some((record) => record.id === id)));
      return;
    }
    setCheckedIds((current) => Array.from(new Set([...current, ...pagedRecords.map((record) => record.id)])));
  };

  const deleteChecked = () => {
    setPageNotice("demo无法删除");
  };

  return (
    <section data-guide-id="knowledge-table" className="relative flex h-[calc(100vh-40px)] min-h-0 flex-col bg-white">
      <div className="shrink-0 border-b border-slate-200 px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-950">bytehi 人工知识库切片-2025快照-二线</div>
            <div className="mt-3 flex items-center gap-5 text-[12px]">
              <span className="border-b-2 border-teal-500 pb-2 font-semibold text-slate-950">知识详情</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center gap-1 rounded-md border border-slate-900 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-950 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-300"
              disabled={checkedIds.length === 0}
              onClick={deleteChecked}
            >
              <Trash2 size={13} />
              删除
            </button>
            <button className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-600">
              <Download size={13} />
              导出
            </button>
            <button className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-600">
              <Upload size={13} />
              批量导入
            </button>
            <button
              className="inline-flex items-center gap-1 rounded-md bg-teal-600 px-3 py-1.5 text-[12px] font-medium text-white"
              onClick={() => {
                setDrawerOpen(true);
                setSaveError("");
              }}
            >
              <Plus size={13} />
              添加知识
            </button>
          </div>
        </div>
        {pageNotice ? <div className="mt-3 text-[12px] font-semibold text-rose-600">{pageNotice}</div> : null}

        <div className="mt-4 flex flex-wrap gap-2">
          {filterOptions.map((item) => (
            <button
              key={item}
              className={
                activeFilter === item
                  ? "rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[12px] font-medium text-emerald-700 shadow-sm"
                  : "rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-950 shadow-sm hover:bg-slate-50"
              }
              onClick={() => {
                setActiveFilter(item);
                scrollRef.current?.scrollTo({ top: 0 });
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex min-w-[260px] items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[12px] text-slate-950">
            <Search size={13} />
            <input
              className="min-w-0 flex-1 outline-none placeholder:text-slate-400"
              placeholder={`按${activeFilter}搜索`}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <button className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-950" onClick={() => setQuery("")}>清空</button>
        </div>
      </div>

      <div ref={scrollRef} className="min-h-0 flex-1 overflow-x-auto overflow-y-scroll">
        <table className="min-w-[1260px] border-separate border-spacing-0 text-left text-[12px]">
          <thead className="sticky top-0 z-10 bg-slate-50 text-slate-500">
            <tr>
              <TableHead className="w-[36px]">
                <input type="checkbox" checked={allChecked} onChange={toggleAll} />
              </TableHead>
              <TableHead className="w-[135px]">ID / 上传时间</TableHead>
              <TableHead className="w-[170px]">文档标题</TableHead>
              <TableHead className="w-[200px]">文档总结</TableHead>
              <TableHead className="w-[105px]">业务线</TableHead>
              <TableHead className="w-[160px]">场景</TableHead>
              <TableHead className="w-[240px]">分片内容</TableHead>
              <TableHead className="w-[70px]">定位符</TableHead>
              <TableHead className="w-[145px]">定位字段</TableHead>
              <TableHead className="w-[105px]">文档链接</TableHead>
              <TableHead className="w-[210px]">完整场景（召回用）</TableHead>
            </tr>
          </thead>
          <tbody>
            {pagedRecords.map((record, index) => {
              const isSelected = record.id === selectedId;
              const tooltipDirection = index <= 1 ? "down" : "up";
              return (
                <tr
                  key={record.id}
                  ref={(node) => {
                    rowRefs.current[record.id] = node;
                  }}
                  className={isSelected ? "bg-teal-50/90" : "bg-white hover:bg-slate-50"}
                >
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={checkedIds.includes(record.id)}
                      onChange={() => {
                        setCheckedIds((current) =>
                          current.includes(record.id) ? current.filter((id) => id !== record.id) : [...current, record.id]
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-slate-800">{record.id}</div>
                    <div className="mt-0.5 text-slate-400">{record.uploadedAt}</div>
                  </TableCell>
                  <TableCell strong text={record.title} tooltipDirection={tooltipDirection} />
                  <TableCell text={record.summary} tooltipDirection={tooltipDirection} />
                  <TableCell text={record.businessLine} tooltipDirection={tooltipDirection} />
                  <TableCell text={record.scene} tooltipDirection={tooltipDirection} />
                  <TableCell text={record.chunkContent} tooltipDirection={tooltipDirection} />
                  <TableCell strong>{record.locator}</TableCell>
                  <TableCell text={record.locatorField} tooltipDirection={tooltipDirection} />
                  <TableCell>
                    <a
                      className="text-teal-600 hover:underline"
                      href={record.documentLink}
                      onClick={(event) => {
                        event.preventDefault();
                        setPageNotice("仅demo示意，无真实文档");
                      }}
                    >
                      查看文档
                    </a>
                  </TableCell>
                  <TableCell text={record.fullScene} tooltipAlign="right" tooltipDirection={tooltipDirection} />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="shrink-0 border-t border-slate-200 px-5 py-3">
        <div className="flex items-center justify-between text-[12px] text-slate-500">
          <div>共 {visibleRecords.length} 条知识，当前第 {safePage} / {totalPages} 页</div>
          <div className="flex items-center gap-2">
            <button
              className="inline-flex h-7 w-7 items-center justify-center rounded border border-slate-200 bg-white disabled:text-slate-300"
              disabled={safePage === 1}
              onClick={() => {
                setCurrentPage((page) => Math.max(1, page - 1));
                scrollRef.current?.scrollTo({ top: 0 });
              }}
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                className={
                  page === safePage
                    ? "rounded border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700"
                    : "rounded border border-slate-200 bg-white px-2.5 py-1 text-slate-600"
                }
                onClick={() => {
                  setCurrentPage(page);
                  scrollRef.current?.scrollTo({ top: 0 });
                }}
              >
                {page}
              </button>
            ))}
            <button
              className="inline-flex h-7 w-7 items-center justify-center rounded border border-slate-200 bg-white disabled:text-slate-300"
              disabled={safePage === totalPages}
              onClick={() => {
                setCurrentPage((page) => Math.min(totalPages, page + 1));
                scrollRef.current?.scrollTo({ top: 0 });
              }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
      <AddKnowledgeDrawer
        open={drawerOpen}
        saveError={saveError}
        onSave={() => setSaveError("demo无法保存")}
        onClose={() => {
          setDrawerOpen(false);
          setSaveError("");
        }}
      />
    </section>
  );
}

function TableHead({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <th className={`border-b border-slate-200 px-3 py-2.5 font-semibold ${className}`}>{children}</th>;
}

function TableCell({
  children,
  strong = false,
  text,
  tooltipAlign = "left",
  tooltipDirection = "up",
}: {
  children?: ReactNode;
  strong?: boolean;
  text?: string;
  tooltipAlign?: "left" | "right";
  tooltipDirection?: "up" | "down";
}) {
  const shouldShowTooltip = Boolean(text && text.length > 22);
  const horizontalClass = tooltipAlign === "right" ? "right-0" : "left-0";
  const verticalClass = tooltipDirection === "down" ? "top-full mt-1" : "bottom-full mb-1";
  const tooltipClass = `pointer-events-none absolute ${horizontalClass} ${verticalClass} z-[80] hidden w-[360px] rounded-lg border border-slate-200 bg-white p-3 text-[12px] font-normal leading-5 text-slate-700 shadow-xl group-hover:block`;

  return (
    <td className="border-b border-slate-100 px-3 py-2.5 align-top">
      {text ? (
        <div className="group relative">
          <div className={strong ? "line-clamp-2 font-semibold leading-5 text-slate-800" : "line-clamp-3 leading-5 text-slate-600"}>{text}</div>
          {shouldShowTooltip ? <div className={tooltipClass}>{text}</div> : null}
        </div>
      ) : (
        <div className={strong ? "line-clamp-2 font-semibold leading-5 text-slate-800" : "line-clamp-3 leading-5 text-slate-600"}>{children}</div>
      )}
    </td>
  );
}

function AddKnowledgeDrawer({
  open,
  saveError,
  onSave,
  onClose,
}: {
  open: boolean;
  saveError: string;
  onSave: () => void;
  onClose: () => void;
}) {
  const fields = ["文档标题", "文档总结", "业务线", "场景", "分片内容", "定位符", "定位字段", "文档链接", "完整场景（召回用）"];

  return (
    <div className={open ? "pointer-events-auto absolute inset-0 z-40 flex justify-end bg-slate-950/45 transition-opacity duration-300" : "pointer-events-none absolute inset-0 z-40 flex justify-end bg-slate-950/0 transition-opacity duration-300"}>
      <div className={open ? "flex h-full w-[520px] translate-x-0 flex-col bg-white shadow-2xl transition-transform duration-300" : "flex h-full w-[520px] translate-x-full flex-col bg-white shadow-2xl transition-transform duration-300"}>
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-slate-100 px-5">
          <div className="text-sm font-semibold text-slate-950">添加知识</div>
          <button className="text-slate-500 hover:text-slate-900" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6">
          {saveError ? <div className="mb-4 text-[12px] font-semibold text-rose-600">{saveError}</div> : null}
          <div className="mb-4 h-px bg-slate-100" />
          <div className="mb-4 border-l-4 border-teal-500 pl-2 text-[12px] font-semibold text-slate-900">
            检索&召回字段（可选）
          </div>
          <div className="space-y-4">
            {fields.map((field) => (
              <div key={field} className="grid grid-cols-[120px_minmax(0,1fr)] items-center gap-4">
                <label className="text-[12px] font-medium text-slate-700">{field}</label>
                {field === "场景" ? (
                  <div className="flex items-center gap-2">
                    <select className="h-9 flex-1 rounded-md border border-slate-200 bg-white px-3 text-[12px] text-slate-500 outline-none">
                      <option>请选择</option>
                      <option>品牌宣传争议</option>
                      <option>假货判定</option>
                      <option>售后退款</option>
                    </select>
                    <label className="flex items-center gap-1 text-[12px] text-slate-500">
                      <input type="checkbox" />
                      排除
                    </label>
                  </div>
                ) : (
                  <input className="h-9 rounded-md border border-slate-200 px-3 text-[12px] outline-none placeholder:text-slate-400" placeholder="输入" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between border-t border-slate-100 px-5 py-4">
          <div />
          <div className="flex items-center gap-2">
            <button className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[12px] text-slate-600" onClick={onClose}>
              取消
            </button>
            <button className="rounded-md bg-teal-600 px-3 py-1.5 text-[12px] font-medium text-white" onClick={onSave}>
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
