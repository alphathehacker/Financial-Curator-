import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Zap,
  LayoutGrid,
  ChevronRight,
  Flame,
  Target,
  BrainCircuit,
  CreditCard as CardIcon,
  DollarSign,
  Wallet,
  Smartphone,
  CircleDollarSign,
  Utensils,
  ShoppingBag,
  Bus,
  Gamepad,
  Receipt,
  Home
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart, 
  Bar, 
  Cell as ReCell, 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis 
} from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { useApp } from '../store/AppContext';
import { calculateSummary, getInsights, getChartData, CATEGORIES, PAYMENT_METHODS } from '../utils/data';
import { DashboardSkeleton } from './Skeleton';

import SpendingTrendChart from './SpendingTrendChart';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 400 } }
};

export default function Dashboard({ transactions = [] }) {
  const { isLoading, currency, darkMode, formatCurrency, convertFromInr } = useApp();
  const [period, setPeriod] = useState('month'); // 'week', 'month', 'year'

  // The values in transactions are in INR (base)
  const displayVal = (val) => formatCurrency(convertFromInr(val, currency));

  const summary = useMemo(() => calculateSummary(transactions), [transactions]);
  const insights = useMemo(() => getInsights(transactions, { currency, formatCurrency, convertFromInr }), [transactions, currency, formatCurrency, convertFromInr]);
  const chartData = useMemo(() => getChartData(transactions, period), [transactions, period]);

  const categoryData = useMemo(() => {
    // Correct IDs matching INITIAL_TRANSACTIONS in data.js
    const categories = [
       { id: 'food', label: 'Dining', icon: Utensils },
       { id: 'shopping', label: 'Retail', icon: ShoppingBag },
       { id: 'transport', label: 'Transit', icon: Bus },
       { id: 'entertainment', label: 'Leisure', icon: Gamepad },
       { id: 'utilities', label: 'Bills', icon: Receipt },
       { id: 'housing', label: 'Rent', icon: Home }
    ];
    
    const totals = {};
    categories.forEach(c => totals[c.id] = 0);
    
    transactions.filter(t => t.type === 'expense').forEach(t => {
       if (totals.hasOwnProperty(t.category)) {
          totals[t.category] += t.amount;
       }
    });

    return categories.map(c => ({
       subject: c.label,
       icon: c.icon,
       A: totals[c.id]
    }));
  }, [transactions]);

  const accountBreakdown = useMemo(() => {
    const totals = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
       totals[t.method] = (totals[t.method] || 0) + t.amount;
    });
    return Object.entries(totals).map(([id, amount]) => {
       const method = PAYMENT_METHODS.find(m => m.id === id) || { id: `unknown-${id}`, name: 'Legacy Rail', type: 'cash' };
       return { ...method, amount };
    }).sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  if (isLoading) return <DashboardSkeleton />;

  const StatCard = ({ title, value, trend, icon: Icon, color }) => (
    <motion.div 
      variants={itemVariants} 
      whileHover={{ y: -5, scale: 1.01 }}
      className="bg-card border border-border p-6 rounded-[32px] shadow-sm relative overflow-hidden group cursor-default transition-all duration-300 hover:border-indigo-500/20"
    >
       <div className="flex justify-between items-start mb-6">
          <div className={cn("p-3 rounded-2xl", color)}>
             <Icon className="w-5 h-5" />
          </div>
          <div className={cn(
             "flex items-center gap-1.5 p-[4px_12px] rounded-full text-[11px] font-[900] shadow-[0_2px_4px_rgba(0,0,0,0.02)]",
             trend >= 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
          )}>
             {trend >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
             {Math.abs(Math.round(trend))}%
          </div>
       </div>
        <div>
           <p className="text-[11px] font-[800] text-muted-foreground/40 uppercase tracking-widest mb-1">{title}</p>
           <div className="flex items-baseline gap-1">
              <h4 className="text-[28px] lg:text-[34px] font-[900] tracking-tighter text-foreground">{displayVal(value)}</h4>
           </div>
        </div>
       <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );

  return (
    <motion.div 
      initial="hidden" animate="visible" variants={containerVariants}
      className="space-y-8 lg:space-y-12 font-['DM_Sans'] pb-20"
    >
      {/* Header View */}
      <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 px-1">
         <div className="space-y-3">
            <div className="bg-[#ccfbf1]/50 dark:bg-[#115e59]/20 text-[#115e59] dark:text-[#2dd4bf] p-[6px_14px] rounded-full w-fit text-[10px] font-[900] uppercase tracking-widest border border-emerald-200 dark:border-emerald-800/30">
               Financial Intelligence
            </div>
            <h1 className="text-[32px] lg:text-[42px] font-[900] tracking-tighter text-foreground leading-none">Curator Dashboard</h1>
            <p className="text-[14px] font-[500] text-muted-foreground/60 leading-relaxed max-w-sm">
               Your real-time financial trajectory and automated predictive monitoring.
            </p>
         </div>
         <div className="flex items-center gap-1.5 bg-secondary/50 p-1 rounded-[16px] border border-border/50">
            {['week', 'month', 'year'].map(p => (
               <button 
                  key={p} onClick={() => setPeriod(p)}
                  className={cn("px-4 py-2 rounded-[12px] text-[11px] font-[900] uppercase tracking-widest transition-all", period === p ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
               >
                  {p}
               </button>
            ))}
         </div>
      </motion.div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-1">
         <StatCard title="Total Balance" value={summary.balance.value} trend={summary.balance.trend} icon={Wallet} color="bg-indigo-500/10 text-indigo-500" />
         <StatCard title="Total Income" value={summary.income.value} trend={summary.income.trend} icon={TrendingUp} color="bg-emerald-500/10 text-emerald-500" />
         <StatCard title="Total Expenses" value={summary.expenses.value} trend={summary.expenses.trend} icon={TrendingDown} color="bg-rose-500/10 text-rose-500" />
      </div>

      {/* Payment Rails Section */}
      <motion.div variants={itemVariants} className="space-y-6 px-1">
         <div className="flex items-center justify-between">
            <div>
               <h3 className="text-[18px] font-[900] text-foreground tracking-tight">Financial Rails</h3>
               <p className="text-[11px] font-[800] text-muted-foreground/40 uppercase tracking-widest mt-1">Cross-Account Activity</p>
            </div>
            <button className="text-[10px] font-[900] uppercase tracking-widest text-indigo-600 hover:text-indigo-700 transition-colors">Manage Accounts</button>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {accountBreakdown.slice(0, 5).map((acc, idx) => (
               <motion.div 
                  key={`${acc.id}-${idx}`}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-card border border-border p-8 rounded-[40px] relative overflow-hidden group shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500"
               >
                  {/* Decorative Background Glow */}
                  <div className={cn(
                     "absolute -right-10 -top-10 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity duration-1000",
                     acc.type === 'upi' ? "bg-purple-500" : acc.type === 'card' ? "bg-indigo-500" : "bg-emerald-500"
                  )} />

                  <div className="relative z-10 space-y-6">
                     <div className="flex items-center justify-between">
                        <div className={cn(
                           "w-14 h-14 rounded-[22px] flex items-center justify-center text-white shadow-lg rotate-3 group-hover:rotate-0 transition-transform duration-500",
                           acc.type === 'upi' ? "bg-gradient-to-br from-purple-500 to-indigo-600 shadow-purple-500/30" : 
                           acc.type === 'card' ? "bg-gradient-to-br from-indigo-500 to-blue-700 shadow-indigo-500/30" : 
                           "bg-gradient-to-br from-emerald-400 to-teal-600 shadow-emerald-500/30"
                        )}>
                           {acc.type === 'upi' ? <Smartphone className="w-6 h-6" /> : acc.type === 'card' ? <CardIcon className="w-6 h-6" /> : <CircleDollarSign className="w-6 h-6" />}
                        </div>
                        <div className="py-1.5 px-3 rounded-full bg-secondary/80 border border-border/50">
                           <span className="text-[8px] font-[1000] uppercase tracking-widest text-muted-foreground/60">Status: Active</span>
                        </div>
                     </div>

                     <div>
                        <p className="text-[11px] font-[900] text-muted-foreground/40 uppercase tracking-[0.15em] mb-1">{acc.name}</p>
                        <h4 className="text-[24px] font-[1000] text-foreground tracking-tighter leading-tight">{displayVal(acc.amount)}</h4>
                     </div>

                     <div className="space-y-2">
                        <div className="flex justify-between text-[9px] font-[1000] uppercase tracking-widest text-muted-foreground/40">
                           <span>Utilization</span>
                           <span>{Math.min(100, Math.round((acc.amount / (summary.expenses.value || 1)) * 100))}%</span>
                        </div>
                        <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden p-[2px] border border-border/20">
                           <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(100, (acc.amount / (summary.expenses.value || 1)) * 100)}%` }}
                              transition={{ duration: 1, ease: "circOut" }}
                              className={cn(
                                 "h-full rounded-full shadow-inner",
                                 acc.type === 'upi' ? "bg-gradient-to-r from-purple-500 to-indigo-500" : 
                                 acc.type === 'card' ? "bg-gradient-to-r from-indigo-500 to-blue-500" : 
                                 "bg-gradient-to-r from-emerald-500 to-teal-500"
                              )}
                           />
                        </div>
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>
      </motion.div>

      {/* Main Insights (Smart AI Section) */}
      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8">
         {/* Narrow Column: Financial Distribution */}
         <div className="flex flex-col gap-8 self-start w-full">
            <motion.div variants={itemVariants} className="bg-card border border-border p-5 md:p-8 rounded-[40px] shadow-sm relative overflow-hidden group flex flex-col w-full">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                        <Target className="w-5 h-5" />
                     </div>
                     <div>
                        <h3 className="text-[16px] font-[1000] tracking-tighter text-foreground leading-none uppercase tracking-widest">Sector Map</h3>
                        <p className="text-[9px] font-[900] text-muted-foreground/30 uppercase tracking-[0.2em] mt-1.5 whitespace-nowrap">Asset Distribution</p>
                     </div>
                  </div>
                  <button className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-all"><MoreHorizontal className="w-5 h-5" /></button>
               </div>

               <div className="space-y-6">
                  {categoryData.sort((a,b) => b.A - a.A).map((cat, i) => (
                     <div key={cat.subject} className="space-y-2 group/cat cursor-default px-1">
                        <div className="flex items-center justify-between transition-all duration-300 sm:group-hover/cat:translate-x-1">
                           <div className="flex items-center gap-3 min-w-0">
                              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 sm:group-hover/cat:scale-110 transition-transform">
                                 <cat.icon className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-[11px] font-[1000] text-muted-foreground/60 uppercase tracking-widest truncate">{cat.subject}</span>
                           </div>
                           <span className="text-[13px] font-[1000] text-foreground tracking-tighter whitespace-nowrap ml-2">{displayVal(cat.A)}</span>
                        </div>
                        <div className="h-1.5 w-full bg-secondary/50 rounded-full overflow-hidden p-[1px] border border-border/10">
                           <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.max(2, (cat.A / (Math.max(...categoryData.map(c => c.A)) || 1)) * 100)}%` }}
                              transition={{ duration: 1, ease: "circOut", delay: i * 0.05 }}
                              className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.2)]"
                           />
                        </div>
                     </div>
                  ))}
               </div>

               {/* Micro Summary Insight */}
               <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-between">
                  <span className="text-[9px] font-[1000] uppercase tracking-widest text-muted-foreground/30">Total Allocated</span>
                  <span className="text-[14px] font-[1000] text-indigo-600 tracking-tighter">
                     {displayVal(categoryData.reduce((acc, curr) => acc + curr.A, 0))}
                  </span>
               </div>
            </motion.div>

            <SpendingTrendChart transactions={transactions} currency={currency} darkMode={darkMode} />
         </div>

         {/* Wide Column: Insights & Breakdown */}
         <div className="flex flex-col gap-8 self-start">
            <motion.div variants={itemVariants} className="bg-card border border-border p-6 md:p-8 rounded-[40px] shadow-sm flex flex-col hover:border-indigo-500/20 transition-all duration-500 relative overflow-hidden group">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center border border-border transition-all">
                        <Target className="w-6 h-6 text-indigo-500" />
                     </div>
                     <div>
                        <h3 className="text-[18px] font-[1000] tracking-tighter text-foreground uppercase tracking-widest leading-none">Fiscal Audit Map</h3>
                        <p className="text-[10px] font-[900] text-muted-foreground/30 uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
                           <Activity className="w-2.5 h-2.5 text-emerald-500" /> Dynamic Live Ledger
                        </p>
                     </div>
                  </div>
                  <button className="w-full md:w-auto px-6 py-4 rounded-2xl bg-foreground text-card text-[10px] font-[1000] tracking-[0.2em] uppercase hover:bg-indigo-600 hover:text-white transition-all active:scale-95 shadow-sm">
                     Full Audit Hub
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 relative z-10">
                  {chartData.slice(-6).reverse().map((d, i) => {
                     const isHigh = d.expense > 2000;
                     return (
                        <div key={i} className="space-y-3 group/item cursor-default">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                 <div className={cn(
                                    "w-10 h-10 rounded-2xl flex items-center justify-center transition-all shadow-inner",
                                    isHigh ? "bg-rose-500/10 text-rose-500" : "bg-emerald-500/10 text-emerald-500"
                                 )}>
                                    <CircleDollarSign className="w-5 h-5" />
                                 </div>
                                 <div>
                                    <span className="text-[14px] font-[800] text-foreground block leading-tight">{d.name}</span>
                                    <span className="text-[9px] font-[900] text-muted-foreground/40 uppercase tracking-widest">Auditing Rail</span>
                                 </div>
                              </div>
                              <span className="text-[16px] font-[1000] text-foreground tracking-tighter">{displayVal(d.expense)}</span>
                           </div>
                           <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden p-[1px] border border-border/20">
                              <motion.div 
                                 initial={{ width: 0 }}
                                 animate={{ width: `${Math.min(100, (d.expense / Math.max(...chartData.map(val => val.expense), 1)) * 100)}%` }}
                                 className={cn(
                                    "h-full rounded-full transition-all duration-700",
                                    isHigh ? "bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.3)]" : "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                                 )}
                              />
                           </div>
                        </div>
                     );
                  })}
               </div>
            </motion.div>

            <motion.div 
               variants={itemVariants} 
               className={cn(
                  "p-6 md:p-8 rounded-[40px] shadow-2xl relative overflow-hidden group border transition-all duration-700",
                  darkMode 
                     ? "bg-gradient-to-br from-indigo-800 via-indigo-950 to-black text-white border-white/5 shadow-indigo-500/20" 
                     : "bg-gradient-to-br from-white via-indigo-50/30 to-indigo-100/20 text-indigo-950 border-indigo-100 shadow-sm"
               )}
            >
               <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className="flex items-center gap-4">
                     <div className={cn(
                        "p-3 rounded-2xl backdrop-blur-3xl border transition-all duration-500",
                        darkMode ? "bg-white/10 border-white/10 shadow-inner" : "bg-indigo-600/10 border-indigo-600/10 shadow-sm"
                     )}>
                        <BrainCircuit className={cn("w-6 h-6", darkMode ? "text-indigo-300" : "text-indigo-600")} />
                     </div>
                     <div>
                        <span className={cn(
                           "text-[10px] font-[1000] uppercase tracking-[0.3em] block",
                           darkMode ? "text-indigo-300/60" : "text-indigo-600/60"
                        )}>Sovereign Insight</span>
                        <span className="text-[9px] font-[900] text-emerald-500 flex items-center gap-1.5 mt-0.5">
                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> SYSTEM ONLINE
                        </span>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
                  {insights.map((item, idx) => (
                     <motion.div 
                        key={item.id} 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className={cn(
                           "group/insight p-6 rounded-[34px] border transition-all cursor-default relative overflow-hidden",
                           darkMode 
                              ? "bg-white/5 hover:bg-white/10 border-white/10 backdrop-blur-2xl" 
                              : "bg-white/80 hover:bg-white border-indigo-100/50 shadow-[0_2px_10px_rgba(79,70,229,0.05)]"
                        )}
                     >
                        <div className={cn(
                           "absolute top-0 left-0 w-full h-[1px] -translate-y-full group-hover/insight:animate-[scan_2s_infinite] opacity-0 group-hover/insight:opacity-100",
                           darkMode ? "bg-gradient-to-r from-transparent via-indigo-400 to-transparent" : "bg-gradient-to-r from-transparent via-indigo-600 to-transparent"
                        )} />
                        <div className="flex items-center justify-between mb-3">
                           <p className={cn(
                              "text-[10px] font-[900] uppercase tracking-widest",
                              darkMode ? "text-indigo-200/40" : "text-indigo-600/40"
                           )}>{item.title}</p>
                           <Zap className={cn("w-3.5 h-3.5", darkMode ? "text-amber-400" : "text-amber-500")} />
                        </div>
                        <h4 className={cn(
                           "text-[22px] md:text-[26px] font-[1000] tracking-tighter leading-tight mb-2",
                           darkMode ? "text-white" : "text-indigo-950"
                        )}>{item.value}</h4>
                        <p className={cn(
                           "text-[12px] font-[500] leading-relaxed",
                           darkMode ? "text-indigo-100/60" : "text-indigo-600/60"
                        )}>{item.suggestion}</p>
                     </motion.div>
                  ))}
               </div>

               <div className="absolute -right-32 -bottom-32 w-80 h-80 bg-white/5 rounded-full blur-[100px]" />
            </motion.div>
         </div>
      </div>
    </motion.div>
  );
}
