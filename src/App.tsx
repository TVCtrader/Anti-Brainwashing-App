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
  MessageSquare
} from "lucide-react";
import { checklistData, type ChecklistSection, type ChecklistItem } from "./data";
import { cn } from "./lib/utils";

const IconMap: Record<string, any> = {
  AlertTriangle,
  BarChart3,
  ShieldCheck,
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
    }
  };

  const exportMarkdown = () => {
    let md = `# Anti-Brainwashing 分析報告\n\n`;
    md += `分析日期：${new Date().toLocaleString()}\n`;
    md += `分析進度：${progress}% (${checkedCount}/${totalItems})\n\n`;
    
    checklistData.forEach(section => {
      md += `## ${section.title}\n\n`;
      section.items.forEach(item => {
        const isChecked = checkedItems[item.id];
        const note = itemNotes[item.id];
        md += `${isChecked ? '[x]' : '[ ]'} **${item.text}**\n`;
        if (item.description) md += `   *${item.description}*\n`;
        if (note) md += `   > 筆記：${note}\n`;
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
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
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
          <div className="flex border-b border-slate-100">
            {checklistData.map((section, idx) => (
              <button
                key={section.id}
                onClick={() => setActiveStage(idx)}
                className={cn(
                  "flex-1 py-3 text-sm font-bold transition-all border-b-2",
                  activeStage === idx 
                    ? "text-indigo-600 border-indigo-600" 
                    : "text-slate-400 border-transparent hover:text-slate-600"
                )}
              >
                階段 {idx + 1}
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

              return (
                <section key={section.id} className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-lg transition-colors",
                      activeStage === 0 ? "bg-red-50 text-red-600" : 
                      activeStage === 1 ? "bg-amber-50 text-amber-600" : 
                      "bg-emerald-50 text-emerald-600"
                    )}>
                      <Icon size={24} />
                    </div>
                    <div className="text-left">
                      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        {section.title}
                        {sectionCheckedCount === section.items.length && (
                          <CheckCircle2 size={20} className="text-emerald-500" />
                        )}
                      </h2>
                      {section.subtitle && (
                        <p className="text-sm text-slate-500 font-normal">{section.subtitle}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {section.items.map((item, itemIdx) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: itemIdx * 0.05 }}
                        onClick={() => toggleItem(item.id)}
                        className={cn(
                          "flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer select-none",
                          checkedItems[item.id] 
                            ? "bg-indigo-50/50 border-indigo-200 ring-1 ring-indigo-100" 
                            : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
                        )}
                      >
                        <div className={cn(
                          "mt-1 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                          checkedItems[item.id]
                            ? "bg-indigo-600 border-indigo-600 text-white"
                            : "border-slate-300 bg-white"
                        )}>
                          {checkedItems[item.id] && <CheckCircle2 size={14} strokeWidth={3} />}
                        </div>
                        <div className="space-y-1 flex-grow">
                          <h3 className={cn(
                            "font-semibold text-sm transition-colors",
                            checkedItems[item.id] ? "text-indigo-900" : "text-slate-800"
                          )}>
                            {item.text}
                          </h3>
                          {item.description && (
                            <p className={cn(
                              "text-sm leading-relaxed transition-colors",
                              checkedItems[item.id] ? "text-indigo-700/80" : "text-slate-500"
                            )}>
                              {item.description}
                            </p>
                          )}
                          
                          {/* Item Note Input */}
                          <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                            <div className="relative">
                              <MessageSquare size={14} className="absolute left-3 top-3 text-slate-400" />
                              <textarea
                                value={itemNotes[item.id] || ""}
                                onChange={(e) => setItemNotes(prev => ({ ...prev, [item.id]: e.target.value }))}
                                placeholder="記錄具體觀察實例..."
                                className={cn(
                                  "w-full pl-9 pr-4 py-2 text-sm rounded-lg border transition-all resize-none min-h-[80px]",
                                  checkedItems[item.id]
                                    ? "bg-white border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                    : "bg-slate-50 border-slate-200 focus:border-slate-300"
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

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
