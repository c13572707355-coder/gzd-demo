export type CaseId = "refund" | "logistics" | "damage";

export type MessageRole = "user" | "agent" | "bot" | "system";

export interface OrderOption {
  id: string;
  product: string;
  amount: string;
  status: string;
  afterSale: string;
  merchant: string;
  logistics: string;
  paidAt: string;
  size: string;
  quantity: string;
  paymentMethod: string;
}

export interface WorkspaceCase {
  id: CaseId;
  label: string;
  customer: {
    name: string;
    level: string;
    emotion: string;
    risk: string;
    phone: string;
    city: string;
  };
  summary: {
    title: string;
    confidence: string;
    sources: string;
    userDemand: string[];
    merchantRecords: string[];
    ticketRecords: string[];
  };
  messages: Array<{
    id: string;
    role: MessageRole;
    sender: string;
    time: string;
    content: string;
    meta?: string;
  }>;
  order: {
    id: string;
    product: string;
    amount: string;
    status: string;
    afterSale: string;
    merchant: string;
    logistics: string;
    paidAt: string;
  };
  orderOptions: OrderOption[];
  history: Array<{
    title: string;
    time: string;
    result: string;
  }>;
  recommendations: Array<{
    title: string;
    desc: string;
    action: string;
    tone: "primary" | "warning" | "neutral";
  }>;
  process: Array<{
    title: string;
    desc: string;
    status: "done" | "active" | "pending";
  }>;
  ticketDraft: {
    category: string;
    demand: string;
    type: string;
    note: string;
  };
}

export interface TicketSidebarSection {
  title: string;
  items: Array<{
    label: string;
    count: number;
  }>;
}

export interface TicketListRecord {
  id: string;
  tag: string;
  classification: string;
  title: string;
  path: string;
  amount: string;
  status: string;
  statusTone: "emerald" | "amber" | "slate" | "blue" | "violet" | "rose";
  isClosed: boolean;
  countdown?: string;
  countdownTone?: "teal" | "amber" | "rose";
  createdAt: string;
  latestReplyAt: string;
  callbackAt: string;
  upgradedAt: string;
  manualReviewAt: string;
  closeAt: string;
  category: string;
  issue: string;
  summary: string;
}

export interface TicketDetailSuggestion {
  overview: string;
  userDemands: string[];
  evidence: {
    user: string;
    merchant: string;
    bell: string;
    scene: string;
  };
  knowledge: Array<{
    knowledgeId: string;
    feature: string;
    content: string;
  }>;
  guidance: string[];
}

export interface KnowledgeRecord {
  id: string;
  uploadedAt: string;
  title: string;
  summary: string;
  businessLine: string;
  scene: string;
  chunkContent: string;
  locator: string;
  locatorField: string;
  documentLink: string;
  fullScene: string;
}

export interface TicketDetailDemo {
  title: string;
  ticketNo: string;
  status: string;
  priority: string;
  countdown: string;
  createdAt: string;
  updatedAt: string;
  classification: string;
  currentOwner: string;
  handleGroup: string;
  orderNo: string;
  product: string;
  merchant: string;
  amount: string;
  userName: string;
  userLevel: string;
  userRisk: string;
  ticketRisk: string;
  tags: string[];
  suggestion: TicketDetailSuggestion;
  attachments: string[];
  processLogs: Array<{
    time: string;
    actor?: string;
    role: "系统" | "用户" | "商家" | "客服";
    title: string;
    detail: string;
  }>;
  serviceNotes: string[];
}

export const workspaceCases: WorkspaceCase[] = [
  {
    id: "damage",
    label: "签收后破损",
    customer: {
      name: "抖音用户_晚风汽水",
      level: "黑金会员",
      emotion: "情绪偏急",
      risk: "退款争议升级风险",
      phone: "138****6294",
      city: "浙江 杭州",
    },
    summary: {
      title: "料理机签收后破损，用户要求平台介入退款",
      confidence: "92%",
      sources: "已整合会话、订单、历史工单 3 类上下文",
      userDemand: [
        "用户签收后发现 ¥469.00 料理机杯体破损，商家以已签收为由拒绝退款，用户要求退还货款并承担退回运费。",
        "问题产生于商品签收后发现破损，但外包装无明显破损，责任归属需要平台核验用户举证与商家拒绝理由。",
        "智能客服已引导用户上传 3 张破损照片并转人工；用户接受继续核验，但要求当天给出处理结果，明确表示拖太久会投诉。",
      ],
      merchantRecords: [
        "商家当前明确结论为拒绝直接退款，理由是订单已签收且外包装记录未见异常。",
        "商家要求用户补充开箱视频或快递异常证明，才同意继续复核破损责任。",
        "商家 05-29 10:18 表示可接受平台复核结果，当前尚未与用户达成一致。",
      ],
      ticketRecords: [
        "无未完结工单；近 30 天无同类高风险投诉记录。",
        "历史少发配件售后已由商家 24h 内补寄完成，用户对处理时效较敏感。",
        "当前应重点沉淀破损举证、商家拒绝原因和是否需要补充开箱视频，避免重复解释。",
      ],
    },
    messages: [
      {
        id: "m1",
        role: "user",
        sender: "抖音用户_晚风汽水",
        time: "10:01",
        content: "我刚收到料理机，杯体这里裂了，根本不能用，想申请退款。",
      },
      {
        id: "m2",
        role: "bot",
        sender: "智能客服",
        time: "10:02",
        content: "可以帮您处理。请先上传商品破损位置照片，我会同步核对订单签收和售后状态。",
      },
      {
        id: "m3",
        role: "user",
        sender: "抖音用户_晚风汽水",
        time: "10:03",
        content: "照片已经传了三张，商家说我签收了就不给退。",
      },
      {
        id: "m4",
        role: "bot",
        sender: "智能客服",
        time: "10:04",
        content: "已收到照片。当前订单显示 5 月 28 日签收，售后申请被商家拒绝。该问题需要人工客服继续核验。",
      },
      {
        id: "m5",
        role: "user",
        sender: "抖音用户_晚风汽水",
        time: "10:04",
        content: "我刚收到料理机，杯体这里裂了，根本不能用。商家说我签收了不给退，这不合理。",
      },
      {
        id: "m6",
        role: "system",
        sender: "系统",
        time: "10:05",
        content: "用户已上传破损照片 3 张，订单 5 月 28 日签收，当前售后状态：商家拒绝退款。",
        meta: "转人工节点",
      },
      {
        id: "m7",
        role: "agent",
        sender: "客服周然",
        time: "10:06",
        content: "我先帮您核对订单和商家的处理记录，请您稍等，我会尽快给出下一步处理方式。",
      },
      {
        id: "m8",
        role: "user",
        sender: "抖音用户_晚风汽水",
        time: "10:07",
        content: "可以，但我今天必须知道怎么处理，拖太久我就投诉了。",
      },
    ],
    order: {
      id: "DD20260528091362",
      product: "北欧白多功能料理机 1.5L",
      amount: "¥469.00",
      status: "已签收",
      afterSale: "退款申请被商家拒绝",
      merchant: "青禾生活电器旗舰店",
      logistics: "中通快递，05-28 18:42 本人签收",
      paidAt: "2026-05-26 21:13",
    },
    orderOptions: [
      {
        id: "DD20260528091362",
        product: "北欧白多功能料理机 1.5L",
        amount: "¥469.00",
        status: "待处理",
        afterSale: "退款申请被商家拒绝",
        merchant: "青禾生活电器旗舰店",
        logistics: "中通快递，05-28 18:42 本人签收",
        paidAt: "2026-05-26 21:13",
        size: "白色 1.5L",
        quantity: "1",
        paymentMethod: "银行卡",
      },
      {
        id: "DD20260516087521",
        product: "便携榨汁杯升级款 600ml",
        amount: "¥199.00",
        status: "发货前退款关闭",
        afterSale: "售后处理中",
        merchant: "青禾生活电器旗舰店",
        logistics: "无需物流",
        paidAt: "2026-05-16 10:08",
        size: "奶油白",
        quantity: "1",
        paymentMethod: "银行卡",
      },
      {
        id: "DD20260416055230",
        product: "料理机随行杯配件装",
        amount: "¥79.00",
        status: "备货中",
        afterSale: "补寄完成",
        merchant: "青禾生活电器旗舰店",
        logistics: "韵达快递，已签收",
        paidAt: "2026-04-16 14:22",
        size: "透明杯体",
        quantity: "1",
        paymentMethod: "零钱",
      },
    ],
    history: [
      {
        title: "少发配件补寄",
        time: "2026-04-16",
        result: "商家 24h 内补寄，用户确认收到",
      },
      {
        title: "咨询发票抬头",
        time: "2026-03-02",
        result: "机器人自助解决，无人工介入",
      },
    ],
    recommendations: [
      {
        title: "优先核对破损举证是否满足平台规则",
        desc: "当前照片能证明商品破损，但缺少开箱过程，建议先判断是否需要补证。",
        action: "查看举证规则",
        tone: "primary",
      },
      {
        title: "创建售后争议工单并标记高优",
        desc: "用户情绪偏急且商家已拒绝，建议沉淀工单并承诺回电时效。",
        action: "使用预填建单",
        tone: "warning",
      },
      {
        title: "回复用户预计 4 小时内给出复核进展",
        desc: "先稳定用户预期，避免重复进线和投诉升级。",
        action: "插入回复话术",
        tone: "neutral",
      },
    ],
    process: [
      { title: "识别问题类型", desc: "售后纠纷 / 签收后破损", status: "done" },
      { title: "核对订单状态", desc: "已签收，商家已拒绝退款", status: "done" },
      { title: "匹配知识依据", desc: "命中签收后破损举证规则", status: "active" },
      { title: "生成建议方案", desc: "建议补证或进入平台复核", status: "pending" },
    ],
    ticketDraft: {
      category: "售后纠纷 / 商品破损 / 签收后争议",
      demand: "用户要求平台介入，支持全额退款并承担退回运费",
      type: "升级处理",
      note: "已归并破损照片、商家拒绝理由和签收节点。建议创建高优升级工单，优先核验是否满足平台破损规则，并备注“如证据不足需补充开箱视频”。",
    },
  },
  {
    id: "refund",
    label: "退款争议",
    customer: {
      name: "抖音用户_阿哲想下单",
      level: "金卡会员",
      emotion: "不满",
      risk: "可能重复投诉",
      phone: "186****3170",
      city: "广东 深圳",
    },
    summary: {
      title: "退款 5 天未到账，用户要求明确到账时间",
      confidence: "89%",
      sources: "已整合会话、售后单、支付状态 3 类上下文",
      userDemand: [
        "¥329.00 订单退款超过承诺 1-3 个工作日仍未到账，用户要求平台明确退款到账时间。",
        "问题产生于商家称已同意退款，但支付侧仍显示处理中，用户无法判断是商家未处理还是支付链路延迟。",
        "智能客服已查询售后和支付状态并说明仍在处理中，用户不接受继续等待，表示若今日无结果将发起平台投诉。",
      ],
      merchantRecords: [
        "商家 05-28 确认同意退款，但仅提供售后单截图，未提供支付退款流水号。",
        "商家表态为“已处理”，但支付侧状态仍为处理中，商家结论与用户实际到账结果不一致。",
        "商家同意平台协助查询支付状态，目前尚未形成到账时间一致结论。",
      ],
      ticketRecords: [
        "有未完结工单；同订单已有一次催退款进线记录。",
        "上次客服承诺 24h 内回访，但当前未看到闭环结果，存在重复进线和投诉风险。",
        "继续处理时需优先核对支付退款流水，并补充明确回访时间。",
      ],
    },
    messages: [
      { id: "r1", role: "user", sender: "抖音用户_阿哲想下单", time: "09:40", content: "我这个退款怎么还没到账？页面一直显示处理中。" },
      { id: "r2", role: "bot", sender: "智能客服", time: "09:41", content: "我先为您查询售后单和支付状态，请稍等。" },
      { id: "r3", role: "bot", sender: "智能客服", time: "09:42", content: "查询到商家已同意退款，但支付侧仍在处理中。通常到账需要 1 到 3 个工作日。" },
      { id: "r4", role: "user", sender: "抖音用户_阿哲想下单", time: "09:42", content: "退款说 1 到 3 天到账，现在第 5 天了还没动静。" },
      { id: "r5", role: "system", sender: "系统", time: "09:44", content: "检测到该订单 24 小时内重复进线，建议转人工处理。", meta: "转人工节点" },
      { id: "r6", role: "agent", sender: "客服周然", time: "09:45", content: "我会帮您同步核对支付状态和商家退款记录，并给您一个明确的回访时间。" },
    ],
    order: {
      id: "DD20260524110287",
      product: "儿童护眼学习台灯 Pro",
      amount: "¥329.00",
      status: "退款处理中",
      afterSale: "商家已同意退款",
      merchant: "明眸家居专营店",
      logistics: "退货已签收，05-27 11:26",
      paidAt: "2026-05-24 11:02",
    },
    orderOptions: [
      {
        id: "DD20260524110287",
        product: "儿童护眼学习台灯 Pro",
        amount: "¥329.00",
        status: "待处理",
        afterSale: "商家已同意退款",
        merchant: "明眸家居专营店",
        logistics: "退货已签收，05-27 11:26",
        paidAt: "2026-05-24 11:02",
        size: "标准版",
        quantity: "1",
        paymentMethod: "银行卡",
      },
      {
        id: "DD20260510088132",
        product: "书桌收纳护眼灯配件包",
        amount: "¥59.00",
        status: "发货前退款关闭",
        afterSale: "退款关闭",
        merchant: "明眸家居专营店",
        logistics: "无需物流",
        paidAt: "2026-05-10 20:18",
        size: "默认",
        quantity: "1",
        paymentMethod: "银行卡",
      },
      {
        id: "DD20260428109164",
        product: "儿童学习桌灯备用灯管",
        amount: "¥89.00",
        status: "备货中",
        afterSale: "仅退款完成",
        merchant: "明眸家居专营店",
        logistics: "顺丰快递，已签收",
        paidAt: "2026-04-28 09:35",
        size: "暖白光",
        quantity: "1",
        paymentMethod: "抖音支付",
      },
    ],
    history: [
      { title: "退款到账咨询", time: "2026-05-29", result: "机器人答复后用户继续追问" },
      { title: "退货物流查询", time: "2026-05-27", result: "客服确认仓库已签收" },
    ],
    recommendations: [
      { title: "核对支付侧退款状态", desc: "先确认是否已生成支付退款流水，避免仅依据商家截图答复。", action: "查看支付状态", tone: "primary" },
      { title: "补建回访工单", desc: "上次承诺未闭环，建议创建需回电确认任务。", action: "创建回访工单", tone: "warning" },
      { title: "告知用户预计处理节点", desc: "建议明确“今日 18:00 前回访”，降低重复进线。", action: "插入说明", tone: "neutral" },
    ],
    process: [
      { title: "识别问题类型", desc: "退款催促 / 到账争议", status: "done" },
      { title: "核对售后状态", desc: "商家同意，支付处理中", status: "done" },
      { title: "匹配历史进线", desc: "24 小时内重复咨询", status: "active" },
      { title: "生成回访建议", desc: "建议补建工单并承诺时效", status: "pending" },
    ],
    ticketDraft: {
      category: "售后退款 / 退款到账慢 / 时效催促",
      demand: "用户要求确认退款到账时间，并希望今日内得到明确回访",
      type: "回访跟进",
      note: "已识别用户重复进线与历史承诺未闭环风险。建议补建退款到账回访单，先核对支付侧退款流水号，再承诺今日18:00前回呼同步结果。",
    },
  },
  {
    id: "logistics",
    label: "物流异常",
    customer: {
      name: "抖音用户_周末要送礼",
      level: "银卡会员",
      emotion: "焦虑",
      risk: "履约时效风险",
      phone: "159****8041",
      city: "江苏 南京",
    },
    summary: {
      title: "物流停滞 72 小时，用户要求确认是否补发",
      confidence: "87%",
      sources: "已整合物流轨迹、订单承诺、用户场景 3 类上下文",
      userDemand: [
        "¥258.00 生日礼盒物流停滞 72 小时，用户担心无法在周六生日场景前送达。",
        "问题产生于包裹停留在南京转运中心且超过承诺时效临界点，用户无法确认是否丢件。",
        "智能客服已查询物流轨迹并建议转人工；用户可接受补发，但希望平台或商家承担加急运费，对继续等待接受度低。",
      ],
      merchantRecords: [
        "商家已联系承运商核查，但暂未拿到网点反馈。",
        "商家表示库存充足，可在平台确认物流异常后补发，但不愿在核查前直接退款。",
        "商家当前倾向等待物流反馈，尚未与用户就补发时点和加急运费承担达成一致。",
      ],
      ticketRecords: [
        "无未完结工单；该用户近半年无物流投诉记录。",
        "订单页面承诺 05-30 前送达，当前物流停滞已对履约承诺造成风险。",
        "继续处理时应保留承运商核查进展、商家补发表态和用户生日使用时限。",
      ],
    },
    messages: [
      { id: "l1", role: "user", sender: "抖音用户_周末要送礼", time: "11:12", content: "我的礼盒物流一直不更新，周六生日要用，能帮我看看吗？" },
      { id: "l2", role: "bot", sender: "智能客服", time: "11:13", content: "已为您查询物流轨迹，包裹目前停留在南京转运中心。" },
      { id: "l3", role: "bot", sender: "智能客服", time: "11:14", content: "最近一次物流更新为 05-27 23:40，已超过 72 小时未更新。建议转人工继续核查承运商和商家补发方案。" },
      { id: "l4", role: "user", sender: "抖音用户_周末要送礼", time: "11:14", content: "这个礼盒周六生日要用，物流三天没动了，到底还能不能到？" },
      { id: "l5", role: "system", sender: "系统", time: "11:16", content: "订单承诺送达时间为 2026-05-30 20:00，当前存在履约风险。", meta: "转人工节点" },
      { id: "l6", role: "agent", sender: "客服周然", time: "11:17", content: "我会先帮您核实承运商状态，同时确认商家是否支持补发方案。" },
    ],
    order: {
      id: "DD20260525188034",
      product: "生日限定香氛礼盒",
      amount: "¥258.00",
      status: "运输中",
      afterSale: "暂无售后",
      merchant: "拾光香氛礼品店",
      logistics: "南京转运中心停滞 72 小时",
      paidAt: "2026-05-25 18:30",
    },
    orderOptions: [
      {
        id: "DD20260525188034",
        product: "生日限定香氛礼盒",
        amount: "¥258.00",
        status: "待处理",
        afterSale: "暂无售后",
        merchant: "拾光香氛礼品店",
        logistics: "南京转运中心停滞 72 小时",
        paidAt: "2026-05-25 18:30",
        size: "限定礼盒",
        quantity: "1",
        paymentMethod: "银行卡",
      },
      {
        id: "DD20260514076218",
        product: "生日蜡烛装饰套组",
        amount: "¥39.00",
        status: "备货中",
        afterSale: "暂无售后",
        merchant: "拾光香氛礼品店",
        logistics: "已出库待揽收",
        paidAt: "2026-05-14 12:04",
        size: "星空蓝",
        quantity: "1",
        paymentMethod: "零钱",
      },
      {
        id: "DD20260430051266",
        product: "香氛礼盒加购提袋",
        amount: "¥19.90",
        status: "发货前退款关闭",
        afterSale: "已关闭",
        merchant: "拾光香氛礼品店",
        logistics: "无需物流",
        paidAt: "2026-04-30 16:25",
        size: "米白",
        quantity: "1",
        paymentMethod: "银行卡",
      },
    ],
    history: [
      { title: "修改收货地址", time: "2026-05-26", result: "用户自行修改成功" },
      { title: "优惠券咨询", time: "2026-05-10", result: "机器人自助解决" },
    ],
    recommendations: [
      { title: "同步承运商核查异常原因", desc: "物流停滞超过 72 小时，建议先触发承运商核查。", action: "发起核查", tone: "primary" },
      { title: "确认商家是否支持补发", desc: "用户有明确使用时限，补发方案优先级高于继续等待。", action: "联系商家", tone: "warning" },
      { title: "提供预计反馈时间", desc: "建议承诺 2 小时内反馈物流核查结果。", action: "插入承诺", tone: "neutral" },
    ],
    process: [
      { title: "识别问题类型", desc: "物流异常 / 停滞超时", status: "done" },
      { title: "核对承诺时效", desc: "05-30 前送达，已临近风险", status: "done" },
      { title: "匹配处理策略", desc: "核查承运商 + 商家补发", status: "active" },
      { title: "生成安抚话术", desc: "建议明确 2 小时反馈", status: "pending" },
    ],
    ticketDraft: {
      category: "履约物流 / 物流停滞 / 强时效场景",
      demand: "用户要求确认是否丢件，并希望不影响生日使用场景，必要时可直接补发",
      type: "履约干预",
      note: "已识别生日场景和强时效诉求，建议创建履约干预单并备注“若24小时内仍无新轨迹，优先走补发兜底方案”，避免继续等待造成场景损失。",
    },
  },
];

export const ticketSidebarSections: TicketSidebarSection[] = [
  {
    title: "工单列表",
    items: [
      { label: "我的待处理工单", count: 25 },
      { label: "我的已完结工单", count: 21 },
      { label: "我提交的工单", count: 30 },
      { label: "组内处理中工单", count: 60 },
      { label: "全部工单", count: 999 },
    ],
  },
];

export const ticketDetailDemo: TicketDetailDemo = {
  title: "商品问题·质量问题·虚假宣传争议",
  ticketNo: "W2026060123456789",
  status: "处理中",
  priority: "高优",
  countdown: "18:59:29",
  createdAt: "2026-05-27 17:07:08",
  updatedAt: "2026-06-02 17:21:37",
  classification: "商品问题·质量问题·虚假宣传争议",
  currentOwner: "张三",
  handleGroup: "服饰售后二线-品牌争议组",
  orderNo: "6953118422653015903",
  product: "芙美轻奢蕾丝拼接收腰连衣裙",
  merchant: "芙美轻奢优选专营店",
  amount: "¥48.00",
  userName: "抖音用户_青柚拿铁",
  userLevel: "L3 体验用户",
  userRisk: "高情绪风险",
  ticketRisk: "高优先级 / 虚假宣传投诉风险",
  tags: ["虚假宣传", "高情绪", "72h 内追诉", "品牌宣传争议"],
  suggestion: {
    overview:
      "用户表示直播间和详情页存在“原版原标”“品牌同厂”暗示，收到实物后发现品牌展示与预期不一致，已连续催促平台处理并提及将升级投诉。用户核心诉求为全额退货退款 48 元并处理商家宣传问题；现阶段已给用户说明正在核验直播切片、商详和店铺资质，但用户尚未接受，仅认可尽快给出明确处理结论。",
    userDemands: [
      "⭐️全额退货退款 48 元（未满足）",
      "处理商家无理由拒绝售后并确认宣传是否违规（未满足）",
      "明确告知该商品是否属于正品或存在品牌误导（未满足）",
    ],
    evidence: {
      user:
        "第三方 APP 举证（得物鉴别页截图，显示无法匹配宣传品牌信息）+ 用户提供直播录屏截帧 2 张；另有商品实物图 4 张，可见实物存在品牌 logo 展示，与详情页遮挡展示方式不一致。",
      merchant:
        "品牌资质举证（店铺名称包含“专营店”，平台已沉淀基础资质）；商家补充详情页截图 2 张，主张商品为店铺自有货盘，但未充分解释直播口播“原版原标”来源。",
      bell: "",
      scene:
        "虚假宣传（直播口播存在品牌暗示，详情页有遮挡品牌信息，用户提供直播录屏和第三方 APP 页面作为佐证，但无品牌方鉴定或司法文书，不满足实锤假货凭证）。",
    },
    knowledge: [
      {
        knowledgeId: "KB-BRAND-0001",
        feature: "直播口播“原版原标”+ 详情页遮挡品牌信息 + 用户主诉宣传与实物认知不一致",
        content:
          "命中《场景知识库·品牌宣传争议·虚假宣传》3.2：商家存在品牌暗示、遮挡品牌信息或宣传不规范导致消费者误认的，可按虚假宣传场景优先支持退货退款处理。[位置：品牌宣传争议/虚假宣传/3.2]",
      },
      {
        knowledgeId: "KB-FAKE-0002",
        feature: "用户要求按假货直接赔付，但当前无品牌方实物鉴定报告 / 司法文书 / 中检国检报告",
        content:
          "命中《场景知识库·假货场景判定》1.4：未满足实锤假货凭证时，不支持按假一赔三或实锤假货方案直接赔付。[位置：假货判定/实锤标准/1.4]",
      },
      {
        knowledgeId: "KB-BRAND-0003",
        feature: "虚假宣传场景已支持退货退款，用户若不同意仅退货退款",
        content:
          "命中《场景知识库·品牌宣传争议补偿兜底》4.1：可先提供退货退款；若用户对时效或体验不认可，可补充 10-20 元优惠券作为兜底安抚，但不得替代主方案。[位置：品牌宣传争议/补偿兜底/4.1]",
      },
    ],
    guidance: [
      "发起退货退款，售后原因字段填写“宣传品牌与实际认知不一致/品牌暗示引发误购”，运费责任选择“商家承担”，并在备注中同步直播口播和商详遮挡证据。",
      "不支持按实锤假货结论直接赔付或假一赔三；如用户继续要求额外赔付，先明确当前场景为“虚假宣传”，再按知识库兜底方案申请 20 元优惠券补偿。",
      "可直接回复用户：当前已按虚假宣传场景支持您发起退货退款 48 元，运费由商家承担；商家宣传问题平台会同步复核，若您对处理时效仍不认可，我可以继续为您申请 20 元优惠券补偿。",
    ],
  },
  attachments: ["直播录屏截帧 2 张", "得物页面截图 1 张", "商品实物图 4 张", "商详页截图 2 张"],
  processLogs: [
    {
      time: "2026-06-01 14:20:03",
      role: "系统",
      title: "创建工单",
      detail: "系统根据用户投诉“直播宣传与实物品牌认知不一致”自动创建工单，初始分配至服饰售后二线待处理。",
    },
    {
      time: "2026-06-01 14:20:03",
      role: "系统",
      title: "创建预约回电时间",
      detail: "第1轮次回电时间生成，默认回电时效为 48 小时，回电时间为 2026-06-03 14:20:03。",
    },
    {
      time: "2026-06-01 14:20:23",
      role: "系统",
      title: "修改预约提醒外呼时间",
      detail: "“工单路由到组-规则1”修改人工预约外呼时间：修改前 2026-06-03 14:20:03；修改后 2026-06-02 14:20:23。",
    },
    {
      time: "2026-06-01 15:08:43",
      actor: "抖音用户_青柚拿铁",
      role: "用户",
      title: "补充举证",
      detail: "用户上传得物页面截图与实物细节图，再次强调直播宣传与到货实物不一致，要求平台明确是否属于品牌误导。",
    },
    {
      time: "2026-06-01 15:26:18",
      actor: "芙美轻奢优选专营店",
      role: "商家",
      title: "提交商家举证",
      detail: "商家补充店铺资质与商详截图，主张商品为店铺正常货盘，但未解释直播间“原版原标”话术来源，也未同意直接退款。",
    },
    {
      time: "2026-06-01 16:02:55",
      role: "系统",
      title: "系统回收直播切片",
      detail: "已命中“原版原标”“同厂款”直播口播片段，待人工确认是否构成品牌暗示，并同步沉淀至知识依据命中记录。",
    },
    {
      time: "2026-06-01 17:14:26",
      actor: "张三",
      role: "客服",
      title: "工单升级至品牌争议组",
      detail: "一线客服根据用户投诉内容打标“虚假宣传争议”，转交品牌争议组继续处理，并要求在下一轮回电前给出明确处理口径。",
    },
    {
      time: "2026-06-02 17:21:37",
      actor: "王丹丹",
      role: "客服",
      title: "外呼",
      detail: "外呼次数：第1次；外呼号码：*******8520；是否接通：是；通话时长：2秒。",
    },
    {
      time: "2026-06-02 17:21:37",
      role: "系统",
      title: "创建预约回电时间",
      detail: "第2轮次回电时间生成，默认回电时效为 48 小时，回电时间为 2026-06-04 17:21:37。",
    },
  ],
  serviceNotes: [
    "近 72 小时用户连续 2 次追问，明确表示若无结论将投诉平台客服。",
    "用户可接受回电沟通，但不接受仅做安抚解释。",
    "当前建议优先完成退货退款建单，再同步商家治理动作，避免用户等待过长。",
  ],
};

export const knowledgeRecords: KnowledgeRecord[] = [
  {
    id: "KB-BRAND-0001",
    uploadedAt: "2026-01-19 16:38",
    title: "品牌宣传争议·虚假宣传处理规则",
    summary:
      "本知识点用于判断商家在直播间、商品详情页或达人讲解中存在品牌暗示、遮挡品牌信息、宣传不规范导致消费者误认时，平台可采用的售后处理方案。",
    businessLine: "电商客服 / 售后争议",
    scene: "品牌宣传争议 / 虚假宣传 / 3.2",
    chunkContent:
      "若商家存在“原版原标”“品牌同厂”“一线大牌平替”等容易造成消费者误认的表达，或在详情页、直播画面中遮挡品牌信息导致消费者基于品牌认知下单，用户收到实物后主张宣传与实际认知不一致，可按虚假宣传场景优先支持退货退款。运费责任原则上由商家承担，并需同步沉淀直播口播、商详截图、用户实物图等证据。",
    locator: "3.2",
    locatorField: "品牌宣传争议/虚假宣传/3.2",
    documentLink: "https://kb.example.com/docs/brand-dispute/false-advertising#3.2",
    fullScene:
      "用户投诉商品存在品牌宣传不一致、品牌遮挡、原版原标、同厂款、品牌暗示或宣传不规范；用户收到实物后认为与直播间或详情页形成的品牌认知不一致，并要求平台支持退货退款或处理商家宣传问题。",
  },
  {
    id: "KB-FAKE-0002",
    uploadedAt: "2026-01-19 16:38",
    title: "假货场景判定·实锤凭证标准",
    summary:
      "本知识点用于区分实锤假货、非实锤假货和虚假宣传场景，明确不满足实锤凭证时不能直接按假货赔付或假一赔三处理。",
    businessLine: "电商客服 / 商品治理",
    scene: "假货判定 / 实锤标准 / 1.4",
    chunkContent:
      "实锤假货需同时满足明确宣传品牌信息和有效实锤凭证。有效凭证包括品牌方实物鉴定报告、司法机构出具法律文书、第三方有效鉴定、中检或国检报告。若用户仅提供第三方 APP 截图、实物图、主观真假对比或防伪异常说明，未形成品牌方或权威机构结论，不支持按实锤假货直接赔付或假一赔三，可转入虚假宣传、非实锤假货或补证流程判断。",
    locator: "1.4",
    locatorField: "假货判定/实锤标准/1.4",
    documentLink: "https://kb.example.com/docs/fake-goods/evidence-standard#1.4",
    fullScene:
      "用户要求按假货、假一赔三、非正品赔付处理，但当前举证缺少品牌方实物鉴定报告、司法文书、第三方有效鉴定或中检国检报告，需要判断是否满足实锤假货标准。",
  },
  {
    id: "KB-BRAND-0003",
    uploadedAt: "2026-01-19 16:38",
    title: "品牌宣传争议·补偿兜底策略",
    summary:
      "本知识点用于虚假宣传场景已支持退货退款后，用户对处理时效或体验不认可时的优惠券兜底边界。",
    businessLine: "电商客服 / 体验补偿",
    scene: "品牌宣传争议 / 补偿兜底 / 4.1",
    chunkContent:
      "虚假宣传争议场景中，主方案应优先提供退货退款，且不得用优惠券替代主售后方案。若用户对时效、沟通体验或处理结果仍不认可，可根据情绪风险、重复进线、投诉升级表述申请 10-20 元优惠券作为兜底安抚。补偿需在备注中说明已支持退货退款、用户仍不接受的原因及风险等级。",
    locator: "4.1",
    locatorField: "品牌宣传争议/补偿兜底/4.1",
    documentLink: "https://kb.example.com/docs/brand-dispute/compensation#4.1",
    fullScene:
      "虚假宣传或品牌宣传争议已支持退货退款，但用户仍要求补偿、赔付、投诉处理时效或对平台解释不认可，需要判断优惠券补偿是否可作为兜底安抚方案。",
  },
  {
    id: "KB-LOGISTICS-0004",
    uploadedAt: "2026-01-20 10:12",
    title: "物流停滞超时·承运商核查与补发规则",
    summary:
      "用于物流停滞超过 48-72 小时且用户存在明确使用时限时，指导客服发起承运商核查并同步商家补发可行性。",
    businessLine: "电商客服 / 履约物流",
    scene: "物流异常 / 停滞超时 / 2.3",
    chunkContent:
      "当物流轨迹超过 72 小时未更新，且订单存在承诺送达或用户明确使用时限，可优先触发承运商核查。若商家库存充足，可同步确认补发时点、加急运费承担及原包裹后续拦截方案，避免用户重复进线。",
    locator: "2.3",
    locatorField: "物流异常/停滞超时/2.3",
    documentLink: "https://kb.example.com/docs/logistics/stagnation#2.3",
    fullScene:
      "用户反馈物流长时间不更新、承诺送达临近、生日送礼或急用场景，需要平台判断是否发起物流核查、商家补发或时效安抚。",
  },
  {
    id: "KB-REFUND-0005",
    uploadedAt: "2026-01-20 11:05",
    title: "退款到账争议·支付流水核验",
    summary:
      "用于商家已同意退款但用户长时间未到账时，指导客服核验支付侧退款流水、承诺回访时效并避免重复解释。",
    businessLine: "电商客服 / 售后退款",
    scene: "售后申请 / 查询催促退款 / 5.1",
    chunkContent:
      "商家已同意退款但支付侧仍显示处理中时，客服需优先核对是否已生成支付退款流水、退款渠道、预计到账时间和失败原因。若用户 24 小时内重复进线或上次承诺未闭环，应补建回访工单并明确下一次反馈时间。",
    locator: "5.1",
    locatorField: "售后申请/查询催促退款/5.1",
    documentLink: "https://kb.example.com/docs/refund/payment-flow#5.1",
    fullScene:
      "用户咨询退款长时间未到账、商家称已处理但支付状态仍处理中、用户要求明确到账时间或支付流水，需要客服核验退款链路并承诺回访。",
  },
];

export const ticketListRecords: TicketListRecord[] = [
  {
    id: "T2026030724020832095236",
    tag: "售后问题/商品破损/签收后争议",
    classification: "售后服务问题·商品破损·签收后争议",
    title: "智能消息总结已传回，需商家确认杯体破损责任",
    path: "用户进入人工 > 料理机签收后破损 > 平台介入退款",
    amount: "¥469.00",
    status: "已完结",
    statusTone: "emerald",
    isClosed: true,
    createdAt: "2026-03-02 17:58:32",
    latestReplyAt: "2026-03-07 17:58:32",
    callbackAt: "-",
    upgradedAt: "2026-03-10 10:11:52",
    manualReviewAt: "-",
    closeAt: "2026-03-10",
    category: "售后问题",
    issue: "商家拒绝退款",
    summary: "完结原因：用户未补充开箱视频，商家仍拒赔；用户认可平台补贴运费方案。",
  },
  {
    id: "T2026031017250424739181",
    tag: "售后问题/退款到账/重复进线",
    classification: "售后服务问题·售后申请·查询/催促退款",
    title: "退款 5 天未到账，用户要求明确支付退款流水",
    path: "用户进入人工 > 退款争议 > 到账时效投诉风险",
    amount: "¥329.00",
    status: "处理中",
    statusTone: "blue",
    isClosed: false,
    countdown: "18:59:29",
    countdownTone: "teal",
    createdAt: "2026-03-10 17:31:45",
    latestReplyAt: "2026-03-10 17:31:45",
    callbackAt: "-",
    upgradedAt: "2026-03-11 09:52:06",
    manualReviewAt: "-",
    closeAt: "2026-03-11",
    category: "退款争议",
    issue: "退款到账慢",
    summary: "初审审核驳回；需补充支付退款流水。用户已提及如今日内无结论将继续投诉客服。",
  },
  {
    id: "T2026031922041196638263",
    tag: "物流问题/履约异常/超时未签收",
    classification: "物流服务问题·履约异常·超时未签收",
    title: "物流停滞超过 72 小时，需确认承运商核查与补发方案",
    path: "用户进入人工 > 物流异常 > 生日场景补发诉求",
    amount: "¥258.00",
    status: "预处理提醒",
    statusTone: "amber",
    isClosed: false,
    countdown: "02:14:18",
    countdownTone: "amber",
    createdAt: "2026-03-19 16:30:15",
    latestReplyAt: "2026-03-19 16:30:15",
    callbackAt: "-",
    upgradedAt: "2026-03-20 14:44:35",
    manualReviewAt: "-",
    closeAt: "2026-03-20",
    category: "履约异常",
    issue: "物流停滞",
    summary: "承运商未返回核查结果，需在用户生日当天前确认补发是否可送达，超时将升级履约投诉。",
  },
  {
    id: "T20260302164903979578011",
    tag: "商品问题/质量争议/平台兜底",
    classification: "商品质量问题·质量争议·平台兜底复核",
    title: "商品异响问题需升级平台复核，商家建议用户补充视频",
    path: "售后复核 > 质量争议 > 平台兜底判断",
    amount: "¥699.00",
    status: "升级处理中",
    statusTone: "violet",
    isClosed: false,
    countdown: "00:43:12",
    countdownTone: "rose",
    createdAt: "2026-03-02 16:09:26",
    latestReplyAt: "2026-03-02 17:39:33",
    callbackAt: "2026-03-04 10:39:32",
    upgradedAt: "2026-03-06 15:32:26",
    manualReviewAt: "-",
    closeAt: "2026-03-06",
    category: "质量争议",
    issue: "平台复核",
    summary: "高优先级复核中，自动站点系统托管；商家已要求补充异响视频，当前证据不足需人工判断。",
  },
  {
    id: "T2026031700351787212057",
    tag: "售后问题/换货/缺货协商",
    classification: "售后服务问题·换货申请·缺货协商",
    title: "用户要求更换新机，需同步库存和补差策略",
    path: "售后跟进 > 换货诉求 > 商家库存核验",
    amount: "¥455.00",
    status: "待分配",
    statusTone: "slate",
    isClosed: false,
    countdown: "47:53:07",
    countdownTone: "teal",
    createdAt: "2026-03-17 20:35:30",
    latestReplyAt: "2026-03-17 20:35:30",
    callbackAt: "-",
    upgradedAt: "2026-03-18 15:51:37",
    manualReviewAt: "-",
    closeAt: "2026-03-18",
    category: "换货协商",
    issue: "库存不足",
    summary: "第 10 轮次回电时间生成，回电时间为 2026-06-03 16:53:38，需尽快分配处理人。",
  },
  {
    id: "T202603131510350422265",
    tag: "物流问题/签收异常/驿站代收",
    classification: "物流服务问题·签收异常·驿站代收争议",
    title: "用户反馈驿站代签未通知，需核对末端站点沟通记录",
    path: "物流投诉 > 代签争议 > 站点核查",
    amount: "¥221.00",
    status: "待复核",
    statusTone: "amber",
    isClosed: false,
    countdown: "04:26:18",
    countdownTone: "amber",
    createdAt: "2026-03-13 15:14:15",
    latestReplyAt: "2026-03-13 15:14:15",
    callbackAt: "-",
    upgradedAt: "2026-03-14 14:13:13",
    manualReviewAt: "-",
    closeAt: "2026-03-14",
    category: "签收异常",
    issue: "驿站代签",
    summary: "跟单标签：已共识 / 已解决完毕。当前待复核站点通知证据，用户问题集中在代签未提前告知。",
  },
  {
    id: "T2026030715800751763588",
    tag: "售后问题/赔付咨询/运费争议",
    classification: "售后服务问题·赔付咨询·运费争议",
    title: "用户要求补退运费差价，需核对运费险生效时间",
    path: "赔付咨询 > 运费争议 > 运费险核验",
    amount: "¥28.00",
    status: "待用户补充",
    statusTone: "rose",
    isClosed: false,
    countdown: "18:59:29",
    countdownTone: "teal",
    createdAt: "2026-03-07 09:38:23",
    latestReplyAt: "2026-03-07 09:38:23",
    callbackAt: "-",
    upgradedAt: "2026-03-07 17:35:37",
    manualReviewAt: "-",
    closeAt: "2026-03-07",
    category: "赔付咨询",
    issue: "运费争议",
    summary: "催单跟催中，用户要求平台补退运费 ¥28.00；当前待用户上传运费支付截图后继续处理。",
  },
];
