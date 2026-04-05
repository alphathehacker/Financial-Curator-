import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ComposedChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { 
  Activity, 
  Zap, 
  ShieldCheck,
  Smartphone,
  CreditCard as CardIcon,
  CircleDollarSign,
  TrendingUp,
  ArrowUpRight,
  Plus,
  MoreHorizontal,
  Wifi,
  Lock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

import { useApp } from '../store/AppContext';

// ── MOCK DATA (stored in INR base) ──────────────────────────────────────────────────
const CONNECTED_ACCOUNTS = [
  { id: '1', name: 'ICICI Private', type: 'card', number: '•••• 4291', balance: 48091 * 83, color: 'from-[#4f46e5] to-[#7c3aed]', status: 'connected' },
  { id: '2', name: 'Amex Gold', type: 'card', number: '•••• 8802', balance: 12428 * 83, color: 'from-[#0ea5e9] to-[#2563eb]', status: 'connected' },
  { id: '3', name: 'Axis Reserve', type: 'card', number: '•••• 1154', balance: 6154 * 83, color: 'from-[#059669] to-[#10b981]', status: 'synced' },
  { id: '4', name: 'Federal Bank', type: 'upi', number: 'user@okaxis', balance: 18694 * 83, color: 'from-[#f59e0b] to-[#ea580c]', status: 'connected' },
];

const MONTHLY_STATS = [
  { month: 'Jan', income: 4500 * 83, expenses: 3200 * 83, savings: 1300 * 83 },
  { month: 'Feb', income: 5200 * 83, expenses: 3800 * 83, savings: 1400 * 83 },
  { month: 'Mar', income: 4800 * 83, expenses: 4100 * 83, savings: 700 * 83 },
  { month: 'Apr', income: 6100 * 83, expenses: 3900 * 83, savings: 2200 * 83 },
  { month: 'May', income: 5500 * 83, expenses: 4200 * 83, savings: 1300 * 83 },
  { month: 'Jun', income: 5800 * 83, expenses: 3700 * 83, savings: 2100 * 83 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 400 } }
};

const CustomTooltip = ({ active, payload, label }) => {
  const { formatCurrency, convertFromInr, currency } = useApp();
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card/95 border border-border/50 rounded-[16px] p-3 shadow-2xl backdrop-blur-xl ring-1 ring-white/10 min-w-[140px]">
      <p className="text-[9px] font-[1000] text-muted-foreground/60 uppercase mb-2.5 tracking-[0.2em]">{label}</p>
      <div className="space-y-2">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-[11px] font-[800] text-muted-foreground/60">{entry.name}</span>
            </div>
            <span className="text-[12px] font-[1000] text-foreground tracking-tighter">{formatCurrency(convertFromInr(entry.value, currency))}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AssetCard = ({ account }) => {
  const { formatCurrency, convertFromInr, currency } = useApp();
  return (
  <motion.div 
    variants={itemVariants}
    whileHover={{ y: -10, scale: 1.02 }}
    className={cn(
      "relative h-[220px] rounded-[32px] p-8 overflow-hidden group cursor-pointer shadow-lg transition-all duration-300",
      "bg-gradient-to-br", account.color
    )}
  >
    {/* Digital Texture & Glass Overlay */}
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-40" />
    <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-white/20 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

    <div className="relative z-10 flex flex-col h-full justify-between">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-[10px] font-[900] text-white/50 uppercase tracking-[0.2em] leading-none">Portfolio Asset</p>
          <h4 className="text-[18px] font-[1000] text-white tracking-tight">{account.name}</h4>
        </div>
        <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                <Wifi className="w-4 h-4 text-white/80" />
            </div>
            <MoreHorizontal className="w-5 h-5 text-white/40" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="min-w-0">
           <p className="text-[26px] sm:text-[32px] font-[1000] text-white tracking-[0.02em] leading-none truncate">
             {formatCurrency(convertFromInr(account.balance, currency))}
           </p>
           <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] font-[900] text-white/40 tracking-widest">{account.number}</span>
              <div className="h-[3px] w-[3px] rounded-full bg-white/20" />
              <span className="text-[9px] font-[1000] text-emerald-400 uppercase tracking-widest">Active Rail</span>
           </div>
        </div>
        
        <div className="flex items-center justify-between">
           <div className="flex -space-x-2">
              {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-white/20 border border-white/10 backdrop-blur-sm" />)}
           </div>
           <div className="w-10 h-7 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <div className="w-6 h-4 bg-amber-400/80 rounded-sm" />
           </div>
        </div>
      </div>
    </div>
    </motion.div>
    );
};

export default function Analytics() {
  const { formatCurrency, convertFromInr, currency } = useApp();
  return (
    <motion.div 
      initial="hidden" animate="visible" variants={containerVariants}
      className="space-y-10 font-['DM_Sans'] pb-20"
    >
      {/* Portfolio Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
         <div className="space-y-3">
            <div className="bg-indigo-500/10 text-indigo-600 p-[6px_14px] rounded-full w-fit text-[10px] font-[1000] uppercase tracking-widest border border-indigo-200/50">
               Portfolio Intelligence
            </div>
            <h1 className="text-[34px] lg:text-[42px] font-[1000] tracking-tighter text-foreground leading-none">Global Asset Vault</h1>
            <p className="text-[14px] font-[500] text-muted-foreground/60 leading-relaxed max-w-sm">
               Unified visualization of all connected financial nodes and digital rails.
            </p>
         </div>
         <button className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white p-[14px_28px] rounded-[22px] text-[12px] font-[1000] uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20 active:scale-95 group">
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            Connect New Node
         </button>
      </div>

      {/* Connected Assets Tray */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
         {CONNECTED_ACCOUNTS.map(acc => (
           <AssetCard key={acc.id} account={acc} />
         ))}
      </div>

      {/* Deep Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
         {/* performance Rail */}
         <motion.div variants={itemVariants} className="bg-card border border-border p-6 sm:p-8 rounded-[40px] shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8 sm:mb-10 px-1 sm:px-0">
               <div className="flex items-center gap-2.5 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-secondary flex items-center justify-center text-indigo-600">
                     <Activity className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                     <h3 className="text-[15px] sm:text-[17px] font-[1000] tracking-tighter text-foreground uppercase tracking-widest truncate leading-none">Growth Trajectory</h3>
                     <p className="text-[9px] sm:text-[10px] font-[900] text-muted-foreground/30 uppercase tracking-[0.2em] mt-1.5 flex items-center gap-1.5">
                        <ShieldCheck className="w-2.5 h-2.5 text-emerald-500" /> High Precision
                     </p>
                  </div>
               </div>
               <div className="flex items-center gap-2 sm:gap-4">
                  <div className="text-right min-w-0">
                    <p className="text-[9px] sm:text-[10px] font-[900] text-muted-foreground/40 uppercase tracking-widest leading-none mb-1">Net Yield</p>
                    <p className="text-[16px] sm:text-[19px] font-[1000] text-emerald-500 tracking-tighter leading-none">+12.4%</p>
                  </div>
                  <div className="w-[1px] h-6 sm:h-8 bg-border/50 hidden xs:block" />
                  <MoreHorizontal className="w-5 h-5 text-muted-foreground/30 hidden xs:block" />
               </div>
            </div>

            <div className="h-[320px] sm:h-[400px] w-full px-1">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={MONTHLY_STATS}>
                  <defs>
                    <linearGradient id="yieldGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.1} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))', fontWeight: 800 }} 
                    dy={12}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))', fontWeight: 800 }}
                    tickFormatter={(v) => formatCurrency(convertFromInr(v, currency)).replace(/\.00$/, '')}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--secondary))', opacity: 0.2 }} />
                  <Area type="monotone" dataKey="income" name="Yield" fill="url(#yieldGradient)" stroke="none" />
                  <Bar dataKey="income" name="Inflow" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={40} />
                  <Bar dataKey="expenses" name="Outflow" fill="#f43f5e" radius={[6, 6, 0, 0]} barSize={40} opacity={0.6} />
                  <Line type="monotone" dataKey="savings" name="Net" stroke="#10b981" strokeWidth={4} dot={false} strokeDasharray="5 5" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
         </motion.div>

         {/* Security & Insight Rail */}
         <div className="flex flex-col gap-8">
            <motion.div variants={itemVariants} className="bg-card border border-border p-8 rounded-[40px] shadow-sm relative overflow-hidden group flex-1">
               <div className="space-y-6 relative z-10">
                  <div className="w-14 h-14 rounded-[22px] bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                     <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                     <h4 className="text-[20px] font-[1000] text-foreground tracking-tight mb-2">Security Ledger</h4>
                     <p className="text-[13px] font-[500] text-muted-foreground/60 leading-relaxed">
                        Your global portfolio is currently protected by <span className="text-indigo-600 font-[800]">Sovereign Shield</span>. No malicious digital rails detected in the last 24 cycles.
                     </p>
                  </div>
                  <div className="pt-6 border-t border-border flex items-center justify-between">
                     <span className="text-[10px] font-[900] text-muted-foreground/40 uppercase tracking-widest">Protocol Status</span>
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[11px] font-[1000] text-emerald-500 uppercase tracking-tight">Encrypted</span>
                     </div>
                  </div>
               </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-indigo-600 p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
               <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                     <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10">
                        <Zap className="w-6 h-6 text-white" />
                     </div>
                     <ArrowUpRight className="w-6 h-6 text-white/40" />
                  </div>
                  <div>
                     <h4 className="text-[20px] font-[1000] text-white tracking-tight leading-tight mb-3">Optimize Liquidity</h4>
                     <p className="text-[13px] font-[500] text-white/60 leading-relaxed">
                        We've identified an opportunity to increase your net yield by <span className="text-white font-[800]">2.4%</span> by reallocating idle rails from your Federal account.
                     </p>
                  </div>
                  <button className="w-full py-4 rounded-2xl bg-white text-indigo-600 text-[11px] font-[1000] uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-xl shadow-black/10">
                     Execute Protocol
                     </button>
               </div>
               <Activity className="absolute -right-10 -bottom-10 w-48 h-48 text-white/5 rotate-12" />
            </motion.div>
         </div>
      </div>
    </motion.div>
  );
}
