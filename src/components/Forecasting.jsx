import React, { useState } from 'react';
import { 
  TrendingUp, 
  Zap, 
  ArrowUpRight, 
  Activity, 
  Sparkles,
  ChevronRight,
  Target,
  ShieldCheck,
  BrainCircuit,
  Orbit,
  Cpu,
  BarChart3,
  Waves,
  Scale
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  ComposedChart,
  Line
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../store/AppContext';
import { cn } from '../utils/cn';

const FORECAST_DATA = [
  { month: 'Apr', actual: 4800 * 83, projected: 4800 * 83, upper: 4800 * 83, lower: 4800 * 83 },
  { month: 'May', actual: 5200 * 83, projected: 5200 * 83, upper: 5200 * 83, lower: 5200 * 83 },
  { month: 'Jun', actual: 4900 * 83, projected: 5800 * 83, upper: 6200 * 83, lower: 5400 * 83 },
  { month: 'Jul', actual: null, projected: 6400 * 83, upper: 7100 * 83, lower: 5700 * 83 },
  { month: 'Aug', actual: null, projected: 7200 * 83, upper: 8400 * 83, lower: 6000 * 83 },
  { month: 'Sep', actual: null, projected: 9800 * 83, upper: 11500 * 83, lower: 8100 * 83 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 300 } }
};

const CustomTooltip = ({ active, payload, label }) => {
  const { formatCurrency, convertFromInr, currency } = useApp();
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card/95 border border-border/50 rounded-[16px] p-3.5 shadow-2xl backdrop-blur-xl ring-1 ring-white/10 min-w-[150px]">
      <p className="text-[9px] font-[1000] text-muted-foreground/60 uppercase mb-3 tracking-[0.2em]">{label} Analysis</p>
      <div className="space-y-2.5">
        {payload.filter(p => !['upper', 'lower'].includes(p.dataKey)).map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-[11px] font-[800] text-muted-foreground/80">{entry.name}</span>
            </div>
            <span className="text-[13px] font-[1000] text-foreground tracking-tighter">{formatCurrency(convertFromInr(entry.value, currency))}</span>
          </div>
        ))}
      </div>
      <div className="mt-3.5 pt-3.5 border-t border-border/50">
         <div className="flex items-center justify-between text-[10px]">
            <span className="font-[800] text-muted-foreground/40 uppercase tracking-widest">Confidence</span>
            <span className="font-[1000] text-indigo-500">94.2%</span>
         </div>
      </div>
    </div>
  );
};

const SimulationStat = ({ title, value, sub, icon: Icon, color, delay }) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ y: -5, scale: 1.01 }}
    className="bg-card border border-border p-6 rounded-[32px] shadow-sm relative group overflow-hidden cursor-default transition-all duration-500 hover:border-indigo-500/20"
  >
     <div className="flex justify-between items-start mb-6 relative z-10">
        <div className={cn("p-3.5 rounded-2xl", color)}>
           <Icon className="w-5 h-5" />
        </div>
        <div className="bg-emerald-500/10 text-emerald-500 p-[4px_12px] rounded-full text-[9px] font-[1000] uppercase tracking-widest border border-emerald-500/20">
           Dynamic
        </div>
     </div>
     
     <div className="relative z-10">
        <p className="text-[10px] font-[1000] text-muted-foreground/40 uppercase tracking-[0.2em] mb-1.5">{title}</p>
        <div className="flex items-baseline gap-2">
           <h4 className="text-[26px] font-[1000] text-foreground tracking-tighter leading-none">{value}</h4>
        </div>
        <p className="text-[12px] font-[500] text-muted-foreground/60 leading-relaxed mt-3">{sub}</p>
     </div>

     {/* Grid Pattern Decoration */}
     <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none group-hover:opacity-[0.12] transition-opacity duration-700">
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
     </div>
  </motion.div>
);

export default function Forecasting() {
  const { formatCurrency, convertFromInr, currency } = useApp();
  const [activeScenario, setActiveScenario] = useState('bullish');
  
  const displayVal = (val) => formatCurrency(convertFromInr(val, currency));

  return (
    <motion.div 
      initial="hidden" animate="visible" variants={containerVariants}
      className="space-y-12 font-['DM_Sans'] pb-24"
    >
      {/* Simulation Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 px-1">
         <div className="space-y-3">
            <div className="flex items-center gap-3">
               <div className="p-1.5 rounded-lg bg-indigo-600/10 text-indigo-600 border border-indigo-600/20">
                  <BrainCircuit className="w-4 h-4" />
               </div>
               <span className="text-[10px] font-[1000] uppercase tracking-[0.4em] text-indigo-600">Statistical Engine</span>
            </div>
            <h1 className="text-[32px] lg:text-[38px] font-[1000] tracking-tighter text-foreground leading-none">Statistical <span className="text-muted-foreground/30">Forecasting</span></h1>
            <p className="text-[14px] font-[500] text-muted-foreground/60 leading-relaxed max-w-lg">
               Our neural modeling engine simulates over <span className="text-indigo-600 font-[900]">12,000 fiscal paths</span> to determine your trajectory.
            </p>
         </div>
         <div className="flex items-center gap-2 bg-secondary/50 p-1.5 rounded-[20px] border border-border/50">
            <div className="flex flex-col px-4 py-2 border-r border-border/50">
               <span className="text-[9px] font-[1000] text-muted-foreground/40 uppercase tracking-widest">Model Precision</span>
               <span className="text-[16px] font-[1000] text-indigo-600 tracking-tighter">99.2%</span>
            </div>
            <div className="flex flex-col px-4 py-2">
               <span className="text-[9px] font-[1000] text-muted-foreground/40 uppercase tracking-widest">Confidence</span>
               <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[16px] font-[1000] text-foreground tracking-tighter">High</span>
               </div>
            </div>
         </div>
      </div>

      {/* Primary Simulation Dock */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <SimulationStat 
            title="Projected Asset Peak" 
            value={displayVal(148206 * 83)} 
            sub="Based on current inflow velocity and automated burn optimization."
            icon={TrendingUp} 
            color="bg-indigo-500/10 text-indigo-500 shadow-lg shadow-indigo-500/20"
         />
         <SimulationStat 
            title="Burn Cycle Optimization" 
            value="84.2%" 
            sub="Efficiency ratio calculated through historic merchant analysis."
            icon={Zap} 
            color="bg-amber-500/10 text-amber-500 shadow-lg shadow-amber-500/20"
         />
         <SimulationStat 
            title="Market Safety Margin" 
            value={displayVal(12400 * 83)} 
            sub="Suggested liquid buffer to maintain 98% security posture."
            icon={ShieldCheck} 
            color="bg-emerald-500/10 text-emerald-500 shadow-lg shadow-emerald-500/20"
         />
      </div>

      {/* The Central Simulation Canvas */}
      <motion.div variants={itemVariants} className="bg-card border border-border p-6 lg:p-10 rounded-[40px] shadow-sm relative overflow-hidden group">
         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 relative z-10">
            <div>
               <h3 className="text-[16px] font-[1000] tracking-tighter text-foreground uppercase tracking-widest">Liquidity Velocity Projection</h3>
               <p className="text-[10px] font-[1000] text-muted-foreground/30 uppercase tracking-[0.3em] mt-1.5 flex items-center gap-2">
                  <Orbit className="w-3 h-3 text-indigo-500 animate-spin-slow" /> Multiverse Modeling Active
               </p>
            </div>
            <div className="flex items-center gap-6 bg-secondary/30 p-3 rounded-[20px] border border-border/10 backdrop-blur-xl">
               <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span className="text-[10px] font-[1000] text-muted-foreground/60 uppercase tracking-widest">Historic</span>
               </div>
               <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-[1000] text-muted-foreground/60 uppercase tracking-widest">Projected</span>
               </div>
               <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/40" />
                  <span className="text-[10px] font-[1000] text-muted-foreground/60 uppercase tracking-widest">Variance</span>
               </div>
            </div>
         </div>

         <div className="h-[320px] w-full relative z-10 px-2 lg:px-4">
            <ResponsiveContainer width="100%" height="100%">
               <ComposedChart data={FORECAST_DATA}>
                  <defs>
                     <linearGradient id="probRange" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                     </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="hsl(var(--border))" opacity={0.1} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fontWeight: 900, fill: 'hsl(var(--muted-foreground))', opacity: 0.5 }} 
                    dy={16}
                  />
                  <YAxis hide domain={[0, 13000 * 83]} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  
                  {/* Probability Spread Area */}
                  <Area 
                    type="monotone" 
                    dataKey="upper" 
                    stroke="none" 
                    fill="none" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="lower" 
                    stroke="none" 
                    fill="url(#probRange)" 
                    name="Probability Range"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="projected" 
                    name="Projected" 
                    stroke="#10b981" 
                    strokeWidth={4} 
                    strokeDasharray="8 6" 
                    fill="none" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="actual" 
                    name="Actual" 
                    stroke="#6366f1" 
                    strokeWidth={4} 
                    fill="none" 
                    dot={{ r: 4, fill: '#6366f1', strokeWidth: 0 }}
                  />
               </ComposedChart>
            </ResponsiveContainer>
         </div>

         {/* Backdrop Digital Grid */}
         <div className="absolute inset-0 bg-secondary/5 opacity-[0.4] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </motion.div>

      {/* Scenario Simulation Lab */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
         {/* Strategic Scenario Engine */}
         <motion.div variants={itemVariants} className="bg-[#0f172a] text-white rounded-[32px] p-6 lg:p-9 shadow-2xl relative overflow-hidden group flex flex-col justify-between">
            <div className="relative z-10">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                        <Cpu className="w-5 h-5 text-indigo-400" />
                     </div>
                     <div>
                        <h4 className="text-[16px] font-[1000] tracking-tight text-white uppercase tracking-widest">Scenario Builder</h4>
                        <p className="text-[9px] font-[900] text-slate-500 uppercase tracking-[0.2em] mt-1">v4.2 Simulation Logic</p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     {['Bearish', 'Baseline', 'Bullish'].map(s => (
                        <button 
                           key={s}
                           onClick={() => setActiveScenario(s.toLowerCase())}
                           className={cn(
                              "px-4 py-2 rounded-[14px] text-[9px] font-[1000] uppercase tracking-widest transition-all",
                              activeScenario === s.toLowerCase() ? "bg-white text-slate-900 shadow-xl" : "bg-white/5 text-slate-400 hover:bg-white/10"
                           )}
                        >
                           {s}
                        </button>
                     ))}
                  </div>
               </div>

               <div className="space-y-3 max-w-xl">
                  <h3 className="text-[22px] lg:text-[26px] font-[1000] tracking-tighter leading-tight">
                     {activeScenario === 'bullish' ? "Accelerated Path" : activeScenario === 'bearish' ? "Defensive Posture" : "Standard Growth"}
                  </h3>
                  <p className="text-[13px] font-[500] text-slate-400 leading-relaxed">
                     {activeScenario === 'bullish' 
                        ? `Injecting an additional ${displayVal(15000 * 83)} into high-yield digital nodes could accelerate your total asset peak by up to +12 months, resulting in a 32% net worth variance.`
                        : activeScenario === 'bearish'
                           ? `Allocating +15% of monthly inflow into liquid buffers reduces yield by 4.2% but provides total protection against high market volatility spikes.`
                           : `Maintaining current spending velocity and passive savings logic results in a highly predictable trajectory with established yield cycles.`
                     }
                  </p>
               </div>
            </div>

            <div className="relative z-10 mt-8 flex flex-col sm:flex-row items-center gap-3">
               <button className="w-full sm:w-auto bg-white text-slate-950 px-6 py-3.5 rounded-[16px] text-[10px] font-[1000] uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10 group">
                  Deploy Simulation <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </button>
               <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white px-5 py-3.5 rounded-[16px] text-[10px] font-[1000] uppercase tracking-widest transition-all border border-white/5">
                  View Logic Hub
               </button>
            </div>

            {/* Decorative Orbitals */}
            <div className="absolute -right-20 -bottom-20 w-[400px] h-[400px] border border-white/[0.03] rounded-full" />
            <div className="absolute -right-40 -bottom-40 w-[600px] h-[600px] border border-white/[0.02] rounded-full" />
         </motion.div>

         {/* Secondary Risk Rail */}
         <div className="flex flex-col gap-8">
            <motion.div variants={itemVariants} className="bg-card border border-border p-6 rounded-[32px] shadow-sm flex flex-col flex-1 group">
               <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                     <div className="w-9 h-9 rounded-2xl bg-secondary flex items-center justify-center text-indigo-500">
                        <Scale className="w-4 h-4" />
                     </div>
                     <span className="text-[13px] font-[1000] text-foreground tracking-tight uppercase tracking-widest">Risk Analysis</span>
                  </div>
                  <Sparkles className="w-4 h-4 text-amber-500" />
               </div>
               
               <div className="space-y-3">
                  {[
                     { label: 'Inflation Burn', status: 'Protected', color: 'text-indigo-500' },
                     { label: 'Market Drag', status: 'Moderate', color: 'text-amber-500' },
                     { label: 'Yield Stability', status: 'Optimal', color: 'text-emerald-500' },
                     { label: 'Digital Fragility', status: 'Zero Risk', color: 'text-indigo-500' }
                  ].map(item => (
                     <div key={item.label} className="p-3 rounded-[18px] bg-secondary/30 border border-border/10 flex items-center justify-between group/row hover:bg-secondary/50 transition-all">
                        <span className="text-[11px] font-[800] text-muted-foreground/60">{item.label}</span>
                        <div className={cn("text-[10px] font-[1000] uppercase tracking-widest flex items-center gap-1.5", item.color)}>
                           <div className={cn("w-1 h-1 rounded-full", item.color.replace('text-', 'bg-'))} />
                           {item.status}
                        </div>
                     </div>
                  ))}
               </div>
               
               <div className="mt-auto pt-8 flex items-center gap-4">
                  <div className="flex-1 h-2 rounded-full bg-secondary/50 overflow-hidden p-[1px]">
                     <div className="h-full w-4/5 bg-gradient-to-r from-indigo-500 to-indigo-300 rounded-full" />
                  </div>
                  <span className="text-[14px] font-[1000] text-foreground tracking-tighter">82% Safe</span>
               </div>
            </motion.div>
         </div>
      </div>
    </motion.div>
  );
}
