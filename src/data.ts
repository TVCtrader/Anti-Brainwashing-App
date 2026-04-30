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
  },
  {
    id: "stage-4",
    title: "📊 階段四：心理戰跡象評分工具",
    subtitle: "依據以下 20 個維度進行評點（1分=不存在，5分=極度明顯）",
    icon: "LayoutList",
    items: [
      {
        id: "sw-1",
        text: "1. 時機 (Timing)",
        description: "問題：此時機是否讓人感到可疑，或與其他事件巧合？\n範例：在企業醜聞期間，突然出現關於水污染的新聞。"
      },
      {
        id: "sw-2",
        text: "2. 情緒操弄",
        description: "問題：是否在缺乏真憑實據的情況下，挑起恐懼、憤怒或罪惡感？\n範例：報導展示了哭泣的孩童和垂死的野生動物，卻避而不談成因。"
      },
      {
        id: "sw-3",
        text: "3. 統一口徑",
        description: "問題：關鍵短語或觀點是否在不同媒體中重複出現？\n範例：所有媒體都使用「前所未有」和「本可避免的悲劇」等詞彙。"
      },
      {
        id: "sw-4",
        text: "4. 資訊缺失",
        description: "問題：是否排除了其他觀點或關鍵細節？\n範例：很少有消息源討論事件的時間線或其他可能的促成因素。"
      },
      {
        id: "sw-5",
        text: "5. 簡化敘事",
        description: "問題：故事是否被簡化為「善與惡」的框架？\n範例：將責任完全歸咎於一家公司，而忽略了系統性問題。"
      },
      {
        id: "sw-6",
        text: "6. 群體對立",
        description: "問題：是否營造了「我們 vs. 他們」的對立動態？\n範例：當地人被塑造為受害者，而外來者則受到指責。"
      },
      {
        id: "sw-7",
        text: "7. 權威過載",
        description: "問題：是否由存疑的「專家」主導敘述方向？\n範例：非環保領域的專家佔據大量傳播時間以支持特定政策。"
      },
      {
        id: "sw-8",
        text: "8. 訴求緊急行動",
        description: "問題：是否要求在不經思考的情況下立即做出決定？\n範例：運動（Campaigns）催促立即捐款或快速更改政策。"
      },
      {
        id: "sw-9",
        text: "9. 過度使用新奇感",
        description: "問題：事件是否被描述為震驚或前所未有的？\n範例：媒體強調這場危機是多麼「令人震驚」且「一生難得一見」。"
      },
      {
        id: "sw-10",
        text: "10. 財務/政治利益",
        description: "問題：權勢集團是否獲得了不成比例的利益？\n範例：一家提供清理服務的公司遊說政府以獲取合同。"
      },
      {
        id: "sw-11",
        text: "11. 壓制異見",
        description: "問題：批評者是否被禁言或貼上負面標籤？\n範例：反對者被斥為「否認者」或直接被忽略。"
      },
      {
        id: "sw-12",
        text: "12. 虛假兩難",
        description: "問題：是否僅呈現了兩種極端的選擇？\n範例：「你要麼支持這項政策，要麼就是不關心環境。」"
      },
      {
        id: "sw-13",
        text: "13. 從眾效應",
        description: "問題：是否因為「每個人都在做」而產生遵從壓力？\n範例：社群媒體網紅發布相同的標籤，敦促追隨者加入。"
      },
      {
        id: "sw-14",
        text: "14. 情緒重複",
        description: "問題：相同的情緒誘因是否被過度重複？\n範例：電視和網路上不斷循環播放破壞與苦難的畫面。"
      },
      {
        id: "sw-15",
        text: "15. 刻意篩選數據",
        description: "問題：統計數據是否被選擇性呈現或脫離背景？\n範例：分享引人注目的數字，卻不解釋這些數字是如何計算出來的。"
      },
      {
        id: "sw-16",
        text: "16. 邏輯謬誤",
        description: "問題：是否使用有缺陷的論點來駁回批評者？\n範例：批評者被貼上「脫離群眾的精英」標籤，而不回應其論點。"
      },
      {
        id: "sw-17",
        text: "17. 製造憤怒",
        description: "問題：憤怒情緒是否顯得突然或與事實脫節？\n範例：病毒式梗圖在極少背景資訊的情況下迅速升級憤怒。"
      },
      {
        id: "sw-18",
        text: "18. 框架技術",
        description: "問題：故事是否被定型以控制你的認知方式？\n範例：危機被描繪成完全可以預防的，而忽略了系統性因素。"
      },
      {
        id: "sw-19",
        text: "19. 行為快速轉變",
        description: "問題：群體是否在沒有明確理由的情況下採納某些符號或行動？\n範例：社群媒體用戶突然集體在個人資料中加入「水滴」表情符號。"
      },
      {
        id: "sw-20",
        text: "20. 歷史類比",
        description: "問題：故事是否反映了過去的操弄事件？\n範例：過去的環境危機曾被類似地用於通過影響深遠且具爭議性的立法。"
      }
    ]
  }
];
