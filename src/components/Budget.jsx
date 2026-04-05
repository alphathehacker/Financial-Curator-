import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  MoreHorizontal, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp, 
  PieChart as PieIcon,
  ChevronRight,
  Target,
  Zap,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Flame,
  LayoutGrid,
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { useApp } from '../store/AppContext';

const INITIAL_BUDGETS = [
  { id: 1, name: "Entertainment", limit: 2000, spent: 920, color: "bg-[#a78bfa]", icon: <Zap className="w-5 h-5" /> },
  { id: 2, name: "Food & Dining", limit: 3000, spent: 2384, color: "bg-[#34d399]", icon: <Activity className="w-5 h-5" /> },
  { id: 3, name: "Housing", limit: 3000, spent: 1800, color: "bg-[#60a5fa]", icon: <Target className="w-5 h-5" /> },
  { id: 4, name: "Transportation", limit: 2200, spent: 680, color: "bg-[#fbbf24]", icon: <Zap className="w-5 h-5" /> },
  { id: 5, name: "Utilities", limit: 2000, spent: 451, color: "bg-[#f87171]", icon: <Activity className="w-5 h-5" /> },
  { id: 6, name: "Shopping", limit: 1500, spent: 1200, color: "bg-[#f472b6]", icon: <Zap className="w-5 h-5" /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 300 } }
};

export default function Budget({ role }) {
  const { currency, formatCurrency, convertFromInr } = useApp();
  const [budgets] = useState(INITIAL_BUDGETS);

  const displayVal = (val) => formatCurrency(convertFromInr(val, currency));

  const totalLimit = useMemo(() => budgets.reduce((sum, b) => sum + b.limit, 0), [budgets]);
  const totalSpent = useMemo(() => budgets.reduce((sum, b) => sum + b.spent, 0), [budgets]);
  const totalPct = Math.round((totalSpent / (totalLimit || 1)) * 100);

  const recommendations = useMemo(() => [
     { id: 1, title: 'Food & Dining Reset', icon: <Activity className="w-5 h-5" />, current: 3000, suggested: 2600, impact: `${displayVal(400)} Monthly Saving`, color: 'indigo' },
     { id: 2, title: 'Entertainment Optimization', icon: <Zap className="w-5 h-5" />, current: 2000, suggested: 1500, impact: `${displayVal(500)} Liquidity Boost`, color: 'emerald' }
  ], [currency]);

  return (
    <motion.div 
      initial="hidden" animate="visible" variants={containerVariants}
      className="space-y-10 font-['DM_Sans'] pb-24"
    >
      {/* Allocation Console Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 px-1">
         <div className="space-y-3">
            <div className="bg-indigo-500/10 text-indigo-600 p-[6px_14px] rounded-full w-fit text-[10px] font-[1000] uppercase tracking-widest border border-indigo-200/50">
               Fiscal Allocation
            </div>
            <h1 className="text-[34px] lg:text-[42px] font-[1000] tracking-tighter text-foreground leading-none">Budget Architecture</h1>
            <p className="text-[14px] font-[500] text-muted-foreground/60 leading-relaxed max-w-sm">
               Strategic management of liquid assets distributed across operational category nodes.
            </p>
         </div>
         <div className="flex items-center gap-3">
            <button className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white p-[14px_28px] rounded-[22px] text-[12px] font-[1000] uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20 active:scale-95">
               <Plus className="w-4 h-4" /> New Category
            </button>
            <button className="p-[14px] rounded-[22px] bg-secondary border border-border/50 text-muted-foreground hover:text-foreground transition-all">
               <History className="w-5 h-5" />
            </button>
         </div>
      </div>

      {/* Main Budget Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
         <motion.div variants={itemVariants} className="bg-card border border-border p-8 rounded-[40px] shadow-sm relative overflow-hidden group">
            <div className="relative z-10 space-y-10">
               <div className="flex items-center justify-between">
                  <div className="space-y-1">
                     <p className="text-[11px] font-[1000] text-muted-foreground/40 uppercase tracking-[0.2em]">Allocated Liquidity</p>
                     <h3 className="text-[36px] font-[1000] tracking-tighter text-foreground">
                        {formatCurrency(totalSpent)} <span className="text-muted-foreground/30 text-[24px]">/ {formatCurrency(totalLimit)}</span>
                     </h3>
                  </div>
                  <div className="hidden sm:flex flex-col items-end">
                     <p className="text-[10px] font-[1000] text-muted-foreground/40 uppercase tracking-widest leading-none mb-2">Total Utilization</p>
                     <p className={cn(
                        "text-[24px] font-[1000] tracking-tighter leading-none",
                        totalPct > 90 ? "text-rose-500" : totalPct > 70 ? "text-amber-500" : "text-emerald-500"
                     )}>{totalPct}%</p>
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="flex items-center justify-between text-[11px] font-[1000] uppercase tracking-widest">
                     <span className="text-muted-foreground/60">Spending Velocity</span>
                     <span className="text-foreground">Optimal Yield Cycle</span>
                  </div>
                  <div className="h-4 bg-secondary/50 rounded-full p-1 border border-border relative overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${totalPct}%` }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className={cn(
                           "h-full rounded-full transition-all duration-700 shadow-[0_0_20px_rgba(37,99,235,0.2)]",
                           totalPct > 90 ? "bg-rose-500" : totalPct > 70 ? "bg-amber-500" : "bg-indigo-600"
                        )}
                     />
                  </div>
                  <div className="grid grid-cols-3 gap-8 pt-4">
                     <div>
                        <p className="text-[10px] font-[1000] text-muted-foreground/40 uppercase tracking-widest mb-1.5">Daily Burn</p>
                        <p className="text-[18px] font-[1000] text-foreground tracking-tight">{formatCurrency(Math.round(totalSpent / 30))}</p>
                     </div>
                     <div className="border-l border-border/50 pl-8">
                        <p className="text-[10px] font-[1000] text-muted-foreground/40 uppercase tracking-widest mb-1.5">Remaining</p>
                        <p className="text-[18px] font-[1000] text-foreground tracking-tight">{formatCurrency(totalLimit - totalSpent)}</p>
                     </div>
                     <div className="border-l border-border/50 pl-8">
                        <p className="text-[10px] font-[1000] text-muted-foreground/40 uppercase tracking-widest mb-1.5">Runway</p>
                        <p className="text-[18px] font-[1000] text-emerald-500 tracking-tight">12 Days</p>
                     </div>
                  </div>
               </div>
            </div>
            
            {/* Background pattern */}
            <div className="absolute inset-0 bg-secondary/5 opacity-[0.4] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
         </motion.div>

         {/* Insight Panels */}
         <div className="flex flex-col gap-8">
            <motion.div variants={itemVariants} className="bg-card border border-border p-8 rounded-[40px] shadow-sm relative overflow-hidden group flex-1">
               <div className="space-y-6 relative z-10">
                  <div className="w-14 h-14 rounded-[22px] bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                     <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                     <h4 className="text-[20px] font-[1000] text-foreground tracking-tight mb-2">Security Ceiling</h4>
                     <p className="text-[13px] font-[500] text-muted-foreground/60 leading-relaxed">
                        You have <span className="text-foreground font-[800]">38% safe headroom</span> remaining in your current monthly cycle. Spending velocity is optimal.
                     </p>
                  </div>
               </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-indigo-600 p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
               <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                     <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10">
                        <Flame className="w-6 h-6 text-white" />
                     </div>
                     <ArrowUpRight className="w-6 h-6 text-white/40" />
                  </div>
                  <div>
                     <h4 className="text-[20px] font-[1000] text-white tracking-tight leading-tight mb-3">Savings Protocol</h4>
                     <p className="text-[13px] font-[500] text-white/60 leading-relaxed">
                        By reducing <span className="text-white font-[800]">Dining outflow</span> by just 12%, you can accelerate your saving cycle by +3 days.
                     </p>
                  </div>
               </div>
            </motion.div>
         </div>
      </div>

      {/* Strategic Recommendations Hub */}
      <motion.div variants={itemVariants} className="space-y-6">
         <div className="flex items-center gap-3 px-1">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 border border-indigo-500/20">
               <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
               <h3 className="text-[18px] font-[1000] tracking-tighter text-foreground uppercase tracking-widest">Recalibration Engine</h3>
               <p className="text-[10px] font-[900] text-muted-foreground/30 uppercase tracking-[0.2em] mt-1">AI-Driven Optimization Suggested</p>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((rec) => (
               <div key={rec.id} className="bg-gradient-to-br from-card to-secondary/30 border border-indigo-500/20 p-6 rounded-[32px] relative overflow-hidden group hover:border-indigo-500/40 transition-all">
                  <div className="flex items-start justify-between relative z-10">
                     <div className="flex items-center gap-4">
                        <div className={cn("w-12 h-12 rounded-[18px] flex items-center justify-center text-white shadow-xl shadow-indigo-600/10", rec.color === 'indigo' ? 'bg-indigo-600' : 'bg-emerald-600')}>
                           {rec.icon}
                        </div>
                        <div>
                           <h4 className="text-[15px] font-[1000] text-foreground tracking-tight uppercase tracking-widest">{rec.title}</h4>
                           <span className="text-[10px] font-[900] text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 mt-2 inline-block">High Impact</span>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-8 relative z-10">
                     <div className="p-3 bg-secondary/50 rounded-2xl border border-border/50">
                        <p className="text-[9px] font-[1000] text-muted-foreground/40 uppercase tracking-widest mb-1">Current Limit</p>
                        <p className="text-[16px] font-[1000] text-foreground tracking-tighter">{formatCurrency(rec.current)}</p>
                     </div>
                     <div className="p-3 bg-indigo-500/5 rounded-2xl border border-indigo-500/20">
                        <p className="text-[9px] font-[1000] text-indigo-500/60 uppercase tracking-widest mb-1">Suggested</p>
                        <p className="text-[16px] font-[1000] text-indigo-600 tracking-tighter">{formatCurrency(rec.suggested)}</p>
                     </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between relative z-10">
                     <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                        <span className="text-[11px] font-[800] text-emerald-500">{rec.impact}</span>
                     </div>
                     <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-[10px_20px] rounded-[14px] text-[10px] font-[1000] uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center gap-2">
                        Apply <ChevronRight className="w-3.5 h-3.5" />
                     </button>
                  </div>

                  {/* Backdrop Pattern */}
                  <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors" />
               </div>
            ))}
         </div>
      </motion.div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
         {budgets.map((budget, i) => {
            const pct = Math.round((budget.spent / budget.limit) * 100);
            const isCritical = pct > 90;
            const isWarning = pct > 75 && pct <= 90;
            const [isFlipped, setIsFlipped] = useState(false);

            return (
               <div key={budget.id} className="perspective-1000 h-[320px]">
                  <motion.div 
                     animate={{ rotateY: isFlipped ? 180 : 0 }}
                     transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                     className="w-full h-full relative preserve-3d"
                  >
                     {/* Front Side */}
                     <div className="absolute inset-0 backface-hidden w-full h-full">
                        <div className="bg-card/40 backdrop-blur-3xl border border-border/50 p-6 rounded-[32px] shadow-sm h-full flex flex-col relative group cursor-pointer transition-all duration-300 hover:border-indigo-500/30">
                           {/* Orbital Header */}
                           <div className="flex items-start justify-between mb-6">
                              <div className="flex items-center gap-3">
                                 <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105", budget.color)}>
                                   {budget.icon}
                                 </div>
                                 <div className="min-w-0">
                                    <h4 className="text-[14px] font-[1000] text-foreground tracking-widest uppercase leading-none truncate">{budget.name}</h4>
                                    <div className="flex items-center gap-1.5 mt-1.5">
                                       <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", isCritical ? "bg-rose-500" : isWarning ? "bg-amber-500" : "bg-emerald-500")} />
                                       <span className={cn("text-[9px] font-[900] uppercase tracking-widest", 
                                          isCritical ? "text-rose-500" : isWarning ? "text-amber-500" : "text-emerald-500/60"
                                       )}>
                                          {isCritical ? "System Alert" : isWarning ? "Warning" : "Nominal"}
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <button className="text-muted-foreground/20 hover:text-foreground transition-colors">
                                 <MoreHorizontal className="w-4 h-4" />
                              </button>
                           </div>

                           {/* Neural Capacity Rail */}
                           <div className="space-y-6 flex-1">
                              <div className="space-y-4">
                                 <div className="flex items-baseline justify-between transition-transform group-hover:translate-x-1">
                                    <div className="flex items-baseline gap-1.5">
                                       <span className="text-[28px] font-[1000] text-foreground tracking-tighter leading-none">{formatCurrency(budget.spent)}</span>
                                       <span className="text-[11px] font-[800] text-muted-foreground/30 uppercase tracking-widest">/ {formatCurrency(budget.limit)}</span>
                                    </div>
                                    <span className={cn("text-[14px] font-[1000] tracking-tighter", 
                                       isCritical ? "text-rose-500" : isWarning ? "text-amber-500" : "text-foreground/40"
                                    )}>{pct}%</span>
                                 </div>
                                 
                                 <div className="relative h-2.5 bg-secondary/30 rounded-full overflow-hidden border border-border/10 p-[2px]">
                                    <motion.div 
                                       initial={{ width: 0 }}
                                       animate={{ width: `${Math.min(pct, 100)}%` }}
                                       transition={{ duration: 1.5, ease: "circOut" }}
                                       className={cn(
                                          "h-full rounded-full transition-all duration-700 relative",
                                          isCritical ? "bg-rose-500/80" : isWarning ? "bg-amber-500/80" : "bg-indigo-600/80"
                                       )}
                                    >
                                       {/* Animated flow effect */}
                                       <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />
                                    </motion.div>
                                 </div>
                              </div>

                              <div className="pt-4 border-t border-dashed border-border/50 flex items-center justify-between mt-auto">
                                 <div className="flex flex-col">
                                    <span className="text-[8px] font-[1000] text-muted-foreground/30 uppercase tracking-widest leading-none mb-1">Consumption</span>
                                    <p className="text-[11px] font-[900] text-muted-foreground/60 uppercase tracking-widest">Stable Orbit</p>
                                 </div>
                                 <button 
                                    onClick={(e) => {
                                       e.stopPropagation();
                                       setIsFlipped(true);
                                    }}
                                    className="p-[8px_16px] rounded-xl bg-secondary hover:bg-indigo-500/10 text-indigo-600 text-[10px] font-[1000] uppercase tracking-widest transition-all border border-transparent hover:border-indigo-500/20"
                                 >
                                    Details
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Back Side (Map Insight View) */}
                     <div className="absolute inset-0 backface-hidden rotate-y-180 w-full h-full">
                        <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 border border-white/10 p-5 rounded-[40px] shadow-2xl h-full flex flex-col text-white">
                           <div className="flex items-center justify-between mb-3 sm:mb-4">
                              <div className="flex items-center gap-2">
                                 <div className="p-1 rounded-lg bg-white/10 text-indigo-400 border border-white/10">
                                    <LayoutGrid className="w-3.5 h-3.5" />
                                 </div>
                                 <span className="text-[10px] sm:text-[11px] font-[1000] uppercase tracking-widest text-white/50">Insight Map</span>
                              </div>
                              <button 
                                 onClick={(e) => {
                                    e.stopPropagation();
                                    setIsFlipped(false);
                                 }}
                                 className="text-white/20 hover:text-white transition-colors"
                              >
                                 <Plus className="w-4 h-4 rotate-45" />
                              </button>
                           </div>

                           <div className="flex-1 flex flex-col items-center justify-center space-y-3 sm:space-y-4">
                              <div className="relative w-20 h-20 flex items-center justify-center">
                                 <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="5" fill="transparent" className="text-white/5" />
                                    <circle 
                                       cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="5" fill="transparent" 
                                       strokeDasharray={226}
                                       strokeDashoffset={226 - (226 * pct) / 100}
                                       strokeLinecap="round"
                                       className={cn(
                                          "transition-all duration-1000",
                                          isCritical ? "text-rose-500" : "text-indigo-400"
                                       )}
                                    />
                                 </svg>
                                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-[16px] font-[1000] tracking-tighter leading-none">{pct}%</span>
                                    <span className="text-[7px] font-[900] text-white/30 uppercase mt-0.5">Cap</span>
                                 </div>
                              </div>

                              <div className="w-full space-y-2 px-0.5">
                                 <div className="flex justify-between items-center p-2 rounded-[16px] bg-white/5 border border-white/5">
                                    <span className="text-[8px] font-[800] text-white/30 uppercase tracking-widest">Remaining</span>
                                    <span className="text-[11px] font-[1000] tracking-tighter">{formatCurrency(budget.limit - budget.spent)}</span>
                                 </div>
                                 <div className="flex justify-between items-center p-2 rounded-[16px] bg-white/5 border border-white/5">
                                    <span className="text-[8px] font-[800] text-white/30 uppercase tracking-widest">Daily Cap</span>
                                    <span className="text-[11px] font-[1000] tracking-tighter">{formatCurrency(Math.round(budget.limit / 30))}</span>
                                 </div>
                              </div>
                           </div>

                           <div className="pt-3.5 border-t border-white/5 flex items-center justify-center mt-2.5">
                              <button className="text-[9px] font-[1000] text-indigo-400 uppercase tracking-widest flex items-center gap-1.5 hover:text-indigo-300 transition-colors group/btn">
                                 Generate Full Audit <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                              </button>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               </div>
            );
         })}

         {role === 'admin' && (
            <motion.button 
               variants={itemVariants}
               whileHover={{ scale: 0.98 }}
               className="bg-secondary/30 border-2 border-dashed border-border rounded-[40px] p-8 flex flex-col items-center justify-center gap-4 group hover:border-indigo-500/50 hover:bg-secondary/50 transition-all h-full min-h-[280px]"
            >
               <div className="w-16 h-16 rounded-full border-2 border-dashed border-border flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:border-indigo-500/50 transition-all">
                  <Plus className="w-8 h-8 text-muted-foreground/40 group-hover:text-indigo-600" />
               </div>
               <div className="text-center">
                  <p className="text-[16px] font-[1000] text-foreground uppercase tracking-widest">New Node</p>
                  <p className="text-[12px] text-muted-foreground/60 mt-1">Initialize custom category</p>
               </div>
            </motion.button>
         )}
      </div>
    </motion.div>
  );
}
