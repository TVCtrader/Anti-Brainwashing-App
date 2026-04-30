import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  AlertTriangle, 
  BarChart3, 
  ShieldCheck, 
  CheckCircle2, 
  RotateCcw, 
  Info, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Share2,
  FileText,
  Download,
  MessageSquare,
  LayoutList,
  Target
} from "lucide-react";
import { checklistData, type ChecklistSection, type ChecklistItem } from "./data";
import { cn } from "./lib/utils";

const IconMap: Record<string, any> = {
  AlertTriangle,
  BarChart3,
  ShieldCheck,
  LayoutList,
};

export default function App() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem("independent-thinker-checklist");
    return saved ? JSON.parse(saved) : {};
  });
  const [itemNotes, setItemNotes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem("independent-thinker-notes");
    return saved ? JSON.parse(saved) : {};
  });
  const [summaryNotes, setSummaryNotes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem("independent-thinker-summary-notes");
    // Migration from old single summaryNote if exists
    if (!saved) {
      const oldSummary = localStorage.getItem("independent-thinker-summary");
      return oldSummary ? { "stage-1": oldSummary } : {};
    }
    return JSON.parse(saved);
  });
  const [activeStage, setActiveStage] = useState(0);
  const [itemScores, setItemScores] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem("independent-thinker-scores");
    return saved ? JSON.parse(saved) : {};
  });
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "stage-1": true,
    "stage-2": true,
    "stage-3": true,
  });

  useEffect(() => {
    localStorage.setItem("independent-thinker-checklist", JSON.stringify(checkedItems));
  }, [checkedItems]);

  useEffect(() => {
    localStorage.setItem("independent-thinker-notes", JSON.stringify(itemNotes));
  }, [itemNotes]);

  useEffect(() => {
    localStorage.setItem("independent-thinker-summary-notes", JSON.stringify(summaryNotes));
  }, [summaryNotes]);

  useEffect(() => {
    localStorage.setItem("independent-thinker-scores", JSON.stringify(itemScores));
  }, [itemScores]);

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const resetChecklist = () => {
    if (confirm("確定要重置所有勾選項與筆記嗎？")) {
      setCheckedItems({});
      setItemNotes({});
      setSummaryNotes({});
      setItemScores({});
    }
  };

  const updateScore = (id: string, score: number) => {
    setItemScores(prev => ({
      ...prev,
      [id]: prev[id] === score ? 0 : score
    }));
  };

  const exportMarkdown = () => {
    let md = `# Anti-Brainwashing 分析報告\n\n`;
    md += `分析日期：${new Date().toLocaleString()}\n`;
    md += `分析進度：${progress}% (${checkedCount}/${totalItems})\n\n`;
    
    checklistData.forEach(section => {
      md += `## ${section.title}\n\n`;
      section.items.forEach(item => {
        if (section.id === "stage-4") {
          const score = itemScores[item.id] || 0;
          const note = itemNotes[item.id];
          md += `**[分：${score}] ${item.text}**\n`;
          if (item.description) md += `   *${item.description}*\n`;
          if (note) md += `   > 筆記：${note}\n`;
        } else {
          const isChecked = checkedItems[item.id];
          const note = itemNotes[item.id];
          md += `${isChecked ? '[x]' : '[ ]'} **${item.text}**\n`;
          if (item.description) md += `   *${item.description}*\n`;
          if (note) md += `   > 筆記：${note}\n`;
        }
        md += `\n`;
      });
      
      const stageSummary = summaryNotes[section.id];
      if (stageSummary) {
        md += `### ${section.title} - 總結筆記\n\n${stageSummary}\n\n`;
      }
    });

    md += `---\n*報告由「Anti-Brainwashing App」生成*`;

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Anti-Brainwashing-分析報告-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const totalItems = checklistData.reduce((acc, section) => acc + section.items.length, 0);
  const checkedScoresCount = Object.keys(itemScores).reduce((acc, key) => {
    return acc + (itemScores[key] > 0 ? 1 : 0);
  }, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length + checkedScoresCount;
  const progress = Math.round((checkedCount / totalItems) * 100);

  const shareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Anti-Brainwashing App',
        text: '這是一套「資訊防毒軟體」，幫助你在面對重大新聞時透視操縱軌跡。',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("連結已複製到剪貼簿！");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 pt-4 sm:px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
                <ShieldCheck size={24} />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-800">
                Anti-Brainwashing App
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={shareApp}
                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                title="分享"
              >
                <Share2 size={20} />
              </button>
              <button 
                onClick={exportMarkdown}
                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                title="匯出報告"
              >
                <Download size={20} />
              </button>
              <button 
                onClick={resetChecklist}
                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="重置"
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-100 overflow-x-auto no-scrollbar">
            {checklistData.map((section, idx) => (
              <button
                key={section.id}
                onClick={() => setActiveStage(idx)}
                className={cn(
                  "flex-none px-6 py-3 text-sm font-bold transition-all border-b-2 whitespace-nowrap",
                  activeStage === idx 
                    ? "text-indigo-600 border-indigo-600" 
                    : "text-slate-400 border-transparent hover:text-slate-600"
                )}
              >
                {idx + 1}. {section.id === "stage-1" ? "操縱辨識" : 
                             section.id === "stage-2" ? "劇本進度" :
                             section.id === "stage-3" ? "獨立思考" :
                             "心理評分"}
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2 pb-4">
            <div className="flex justify-between text-xs font-medium text-slate-500">
              <span>分析進度</span>
              <span>{progress}% ({checkedCount}/{totalItems})</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-indigo-600 rounded-full"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6 space-y-8 pb-24">
        {/* Intro Card */}
        {activeStage === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
          >
            <p className="text-slate-600 leading-relaxed">
              這份 Check List 是根據 <span className="font-semibold text-indigo-600">FAT 模式</span> 與 <span className="font-semibold text-indigo-600">TREPAN 框架</span> 整合而成的實戰工具。你可以將其視為一套「資訊防毒軟體」，當你面對重大的社會事件或突發新聞時，按此清單逐一核對，即可透視權力機構的操縱軌跡，並保持獨立思考。
            </p>
          </motion.div>
        )}

        {/* Active Checklist Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {(() => {
              const section = checklistData[activeStage];
              const Icon = IconMap[section.icon] || Info;
              const sectionCheckedCount = section.items.filter(item => checkedItems[item.id]).length;
              const stage4TotalScore = section.id === "stage-4" 
                ? section.items.reduce((acc, item) => acc + (itemScores[item.id] || 0), 0)
                : 0;

              return (
                <section key={section.id} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-lg transition-colors",
                        activeStage === 0 ? "bg-red-50 text-red-600" : 
                        activeStage === 1 ? "bg-amber-50 text-amber-600" : 
                        activeStage === 2 ? "bg-emerald-50 text-emerald-600" :
                        "bg-indigo-50 text-indigo-600"
                      )}>
                        <Icon size={24} />
                      </div>
                      <div className="text-left">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                          {section.title}
                          {section.id !== "stage-4" && sectionCheckedCount === section.items.length && (
                            <CheckCircle2 size={20} className="text-emerald-500" />
                          )}
                        </h2>
                        {section.subtitle && (
                          <p className="text-sm text-slate-500 font-normal">{section.subtitle}</p>
                        )}
                      </div>
                    </div>
                    {section.id === "stage-4" && (
                      <div className="flex flex-col items-end gap-1">
                        <div className="bg-indigo-600 text-white px-4 py-2 rounded-xl shadow-lg shadow-indigo-100 flex flex-col items-center min-w-[70px]">
                          <span className="text-[10px] uppercase font-bold opacity-80">總分</span>
                          <span className="text-xl font-black">{stage4TotalScore}</span>
                        </div>
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded shadow-sm",
                          stage4TotalScore <= 25 ? "bg-slate-100 text-slate-500" :
                          stage4TotalScore <= 50 ? "bg-amber-100 text-amber-600" :
                          stage4TotalScore <= 75 ? "bg-orange-100 text-orange-600" :
                          "bg-red-100 text-red-600"
                        )}>
                          {stage4TotalScore <= 25 ? "低可能性" :
                           stage4TotalScore <= 50 ? "中等可能" :
                           stage4TotalScore <= 75 ? "高可能性" :
                           "極其明顯"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {section.items.map((item, itemIdx) => {
                      const currentScore = itemScores[item.id] || 0;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: itemIdx * 0.05 }}
                          onClick={() => section.id !== "stage-4" && toggleItem(item.id)}
                          className={cn(
                            "flex items-start gap-4 p-4 rounded-xl border transition-all select-none",
                            section.id === "stage-4" 
                              ? "bg-white border-slate-200" 
                              : checkedItems[item.id] 
                                ? "bg-indigo-50/50 border-indigo-200 ring-1 ring-indigo-100 cursor-pointer" 
                                : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm cursor-pointer"
                          )}
                        >
                          {section.id !== "stage-4" && (
                            <div className={cn(
                              "mt-1 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                              checkedItems[item.id]
                                ? "bg-indigo-600 border-indigo-600 text-white"
                                : "border-slate-300 bg-white"
                            )}>
                              {checkedItems[item.id] && <CheckCircle2 size={14} strokeWidth={3} />}
                            </div>
                          )}
                          <div className="space-y-2 flex-grow">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <h3 className={cn(
                                "font-semibold text-sm transition-colors",
                                section.id !== "stage-4" && checkedItems[item.id] ? "text-indigo-900" : "text-slate-800"
                              )}>
                                {item.text}
                              </h3>
                                {section.id !== "stage-4" && item.description && (
                                  <p className={cn(
                                    "text-sm leading-relaxed transition-colors whitespace-pre-wrap",
                                    checkedItems[item.id] ? "text-indigo-700/80" : "text-slate-500"
                                  )}>
                                    {item.description}
                                  </p>
                                )}
                              </div>
                              
                              {/* Item Note Input */}
                              <div className="mt-4 space-y-4" onClick={(e) => e.stopPropagation()}>
                              {section.id === "stage-4" && (
                                <div className="space-y-4">
                                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-2">
                                    {item.description?.split('\n').map((line, i) => {
                                      const [label, content] = line.split('：');
                                      return (
                                        <p key={i} className="text-xs leading-relaxed">
                                          <span className="font-bold text-slate-700">{label}：</span>
                                          <span className="text-slate-500">{content}</span>
                                        </p>
                                      );
                                    })}
                                  </div>
                                  
                                  <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">評分 (1~5)</span>
                                      {currentScore > 0 && (
                                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">已評分: {currentScore}</span>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      {[1, 2, 3, 4, 5].map((s) => (
                                        <button
                                          key={s}
                                          onClick={() => updateScore(item.id, s)}
                                          className={cn(
                                            "flex-1 h-10 rounded-xl text-sm font-black transition-all border-2",
                                            currentScore === s
                                              ? activeStage === 3 
                                                ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 -translate-y-0.5"
                                                : "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 -translate-y-0.5"
                                              : "bg-white border-slate-100 text-slate-400 hover:border-slate-200 hover:bg-slate-50 active:scale-95"
                                          )}
                                        >
                                          {s}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              <div className="relative">
                                <MessageSquare size={14} className="absolute left-3 top-3 text-slate-400" />
                                <textarea
                                  value={itemNotes[item.id] || ""}
                                  onChange={(e) => setItemNotes(prev => ({ ...prev, [item.id]: e.target.value }))}
                                  placeholder="記錄具體觀察實例..."
                                  className={cn(
                                    "w-full pl-9 pr-4 py-2 text-sm rounded-lg border transition-all resize-none min-h-[80px]",
                                    section.id !== "stage-4" && checkedItems[item.id]
                                      ? "bg-white border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                      : "bg-slate-50 border-slate-200 focus:border-slate-300"
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Stage 4 Interpretation Table */}
                  {section.id === "stage-4" && (
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 text-indigo-600">
                        <Target size={20} />
                        <h3 className="font-bold">評分詮釋指引</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <span className="block font-bold text-slate-400">0-25分</span>
                          <span className="text-slate-600 uppercase text-[10px] font-black block mt-1">心理戰可能性低</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <span className="block font-bold text-amber-500">26-50分</span>
                          <span className="text-slate-600 uppercase text-[10px] font-black block mt-1">可能性中等 (需深入觀察)</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <span className="block font-bold text-orange-500">51-75分</span>
                          <span className="text-slate-600 uppercase text-[10px] font-black block mt-1">可能性高 (很可能存在操弄)</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <span className="block font-bold text-red-600">76-100分</span>
                          <span className="text-slate-600 uppercase text-[10px] font-black block mt-1">極其明顯的心理戰跡象</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Stage-Specific Summary Notes Section */}
                  <div className="space-y-4 pt-6 border-t border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
                        <FileText size={20} />
                      </div>
                      <h2 className="font-bold text-slate-800">{section.title} - 總結筆記</h2>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <p className="text-xs text-slate-500">針對此階段記錄整體的分析心得或結論</p>
                      <textarea
                        value={summaryNotes[section.id] || ""}
                        onChange={(e) => setSummaryNotes(prev => ({ ...prev, [section.id]: e.target.value }))}
                        placeholder={`在此輸入您對 ${section.title} 的總結分析...`}
                        className="w-full p-4 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all min-h-[150px]"
                      />
                    </div>
                  </div>
                </section>
              );
            })()}
          </motion.div>
        </AnimatePresence>

        {/* Footer Note */}
        <footer className="pt-8 border-t border-slate-200">
          <div className="bg-slate-800 text-slate-100 p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-amber-400">
              <Info size={20} />
              <span className="font-bold">核心提示</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              一個獨立人格的基礎，在於肯定自己的理解力，而非依附於群體共識。當你發現新聞中「專家過多、情緒過激、語言過於對立」時，通常就是心理戰正在進行的訊號。
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-slate-400">
              <span>基於 FAT 模式 & TREPAN 框架</span>
              <span>•</span>
              <span>獨立思考防護工具</span>
            </div>
          </div>
        </footer>
      </main>

      {/* Mobile Bottom Bar (Optional) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-slate-200 sm:hidden">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">分析進度</span>
            <span className="text-sm font-bold text-indigo-600">{progress}% 完成</span>
          </div>
          <div className="flex gap-2">
             <button 
                onClick={exportMarkdown}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium active:scale-95 transition-transform flex items-center gap-2"
              >
                <Download size={16} />
                匯出
              </button>
             <button 
                onClick={resetChecklist}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium active:scale-95 transition-transform"
              >
                重置
              </button>
              <button 
                onClick={shareApp}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium shadow-lg shadow-indigo-200 active:scale-95 transition-transform flex items-center gap-2"
              >
                <Share2 size={16} />
                分享
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}
