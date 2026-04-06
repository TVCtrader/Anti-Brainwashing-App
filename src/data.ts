export interface ChecklistItem {
  id: string;
  text: string;
  description?: string;
}

export interface ChecklistSection {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  items: ChecklistItem[];
}

export const checklistData: ChecklistSection[] = [
  {
    id: "stage-1",
    title: "🛑 階段一：辨識操縱元素 (FAT 模式)",
    subtitle: "當新聞爆發時，先檢查是否存在以下人為操縱的痕跡",
    icon: "AlertTriangle",
    items: [
      {
        id: "f-1",
        text: "F - 異常性 (Focus)",
        description: "這件事是否極其不尋常（如：突然的大規模危機、前所未見的病毒、突然的軍事行動）？"
      },
      {
        id: "f-2",
        text: "F - 重複性 (Focus)",
        description: "同一個核心訊息（Talking Point）是否在早、中、晚的新聞中不斷重複出現？"
      },
      {
        id: "f-3",
        text: "F - 視覺衝擊 (Focus)",
        description: "媒體是否播送令人極度恐懼、甚至毛骨悚然的影片或圖像（如：倒地不起的病人、核爆蘑菇雲）？"
      },
      {
        id: "f-4",
        text: "F - 語言煽動 (Focus)",
        description: "是否頻繁使用「歷史以來最重要」、「世界末日」、「史詩級」等極端詞彙？"
      },
      {
        id: "a-1",
        text: "A - 跨界專家 (Authority)",
        description: "出來發言的專家是否「不務正業」？（例如：讓物理學家談 AI 倫理，或讓呼吸科專家談行政手段）"
      },
      {
        id: "a-2",
        text: "A - 立場轉向 (Authority)",
        description: "是否出現本來敵對陣營的代表人物突然「反水」支持官方政策？"
      },
      {
        id: "a-3",
        text: "A - 科學幌子 (Authority)",
        description: "是否用「支持科學/理性」來攻擊對手是「反科學/不中立」？"
      },
      {
        id: "a-4",
        text: "A - 命令式發言 (Authority)",
        description: "有頭有臉的人是否在不關己事的情況下，突然集體衝出來發表一致意見？"
      },
      {
        id: "t-1",
        text: "T - 非黑即白 (Tribe)",
        description: "事件是否被簡化為「我們（英雄）對抗他們（魔鬼）」？"
      },
      {
        id: "t-2",
        text: "T - 標籤化 (Tribe)",
        description: "不認同官方說法的人，是否立刻被貼上「陰謀論者」、「極端分子」或「叛國者」的標籤？"
      },
      {
        id: "t-3",
        text: "T - 情緒溢價 (Tribe)",
        description: "真相是否已不重要，重要的是你對這件事「感覺」對不對？（情緒真相時代）"
      },
      {
        id: "t-4",
        text: "T - 符號化 (Tribe)",
        description: "是否出現了極其精美、易於傳播的口號或象徵圖騰（如：特定的旗幟、統一的頭像）？"
      }
    ]
  },
  {
    id: "stage-2",
    title: "📈 階段二：判定劇本進度 (TREPAN 框架)",
    subtitle: "透過以下進度條，預判權力機構接下來的動作",
    icon: "BarChart3",
    items: [
      {
        id: "tr-t",
        text: "[T] 威脅期 (Threat)",
        description: "新聞是否停留在預測災難、製造不安的階段？（目的：讓你害怕）"
      },
      {
        id: "tr-r",
        text: "[R] 反抗期 (Resistance)",
        description: "是否開始出現零星的民間抗議或騷亂？（目的：製造動盪的假象以引出後續管理）"
      },
      {
        id: "tr-ea",
        text: "[E/A] 專家期 (Authority)",
        description: "主流媒體是否開始邀請大量非相關領域的權威人士，密集地為某個解決方案背書？"
      },
      {
        id: "tr-p",
        text: "[P] 定罪期 (Persona)",
        description: "劇本中是否出現了一個特定的「大壞蛋」或「替罪羊」，所有問題都歸咎於他？"
      },
      {
        id: "tr-a",
        text: "[A] 陣營化 (Alignment)",
        description: "社會是否已經分裂成兩派，且拒絕任何理性溝通？"
      },
      {
        id: "tr-n",
        text: "[N] 正常化 (Normalization)",
        description: "你是否開始覺得「世界一向如此」，對極端政策感到麻木？（目的：完成洗腦，徹底接受現狀）"
      }
    ]
  },
  {
    id: "stage-3",
    title: "🛡️ 階段三：個人獨立思考防護機制",
    subtitle: "在核對完清單後，請對自己進行以下心理提問",
    icon: "ShieldCheck",
    items: [
      {
        id: "p-1",
        text: "利益分析",
        description: "這件事推行後，誰賺了最多錢？誰獲得了最多權力？"
      },
      {
        id: "p-2",
        text: "框架置換",
        description: "如果拿掉「緊急狀態」或「為了你好」的框架，這件事本身是否合法且合理？"
      },
      {
        id: "p-3",
        text: "行為檢查",
        description: "我現在的觀點，是基於我的實際經驗，還是因為「每個人都這麼說」？"
      },
      {
        id: "p-4",
        text: "微反抗練習",
        description: "我能否在不影響生存的情況下，拒絕跟隨大眾做一些無意義的 Compliance（如：拒絕無謂的賠笑、拒絕盲目轉發未證實的口號）？"
      },
      {
        id: "p-5",
        text: "應對策略",
        description: "如果權力機構叫我「適應（Adaptation）」而非「解決問題（Problem Solving）」，這通常就是預謀好的操縱。"
      }
    ]
  }
];
