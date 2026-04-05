import React from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  ArrowUpRight,
  PieChart as PieIcon,
  Search,
  ChevronRight,
  Share2,
  ShieldCheck,
  Zap,
  Clock,
  Fingerprint,
  FileCheck,
  History,
  Terminal,
  Database
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const RECENT_REPORTS = [
  { id: 1, title: 'Q1 Financial Summary', date: 'MAR 31, 2024', type: 'PDF', size: '2.4 MB', status: 'Verified', color: 'text-emerald-500' },
  { id: 2, title: 'Monthly Burn Analysis', date: 'MAR 15, 2024', type: 'CSV', size: '1.1 MB', status: 'Audit Ready', color: 'text-indigo-500' },
  { id: 3, title: 'Tax Preparation Pack', date: 'FEB 28, 2024', type: 'ZIP', size: '12.8 MB', status: 'Archived', color: 'text-amber-500' },
  { id: 4, title: 'Liquidity Stress Test', date: 'FEB 10, 2024', type: 'PDF', size: '4.2 MB', status: 'Verified', color: 'text-emerald-500' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 300 } }
};

export default function Reports() {
  return (
    <motion.div 
      initial="hidden" animate="visible" variants={containerVariants}
      className="space-y-12 font-['DM_Sans'] pb-24"
    >
      {/* Audit Vault Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 px-1">
         <div className="space-y-4">
            <div className="flex items-center gap-2 bg-indigo-500/10 text-indigo-600 p-[6px_14px] rounded-full w-fit text-[10px] font-[1000] uppercase tracking-widest border border-indigo-200/50">
               <Fingerprint className="w-3.5 h-3.5" /> High-Fidelity Audit Vault
            </div>
            <h1 className="text-[34px] lg:text-[46px] font-[1000] tracking-tighter text-foreground leading-none">Financial Intelligence</h1>
            <p className="text-[14px] font-[500] text-muted-foreground/60 leading-relaxed max-w-lg">
               Synthesize high-precision forensic statements and automated fiscal summaries secured by deep-layer encryption.
            </p>
         </div>
         <div className="flex items-center gap-4">
            <div className="px-5 py-3 rounded-2xl bg-secondary/80 border border-border/50 text-foreground flex items-center gap-3">
               <Database className="w-4 h-4 text-indigo-500" />
               <div className="text-left">
                  <p className="text-[9px] font-[1000] text-muted-foreground/40 uppercase tracking-widest leading-none mb-1">Storage Usage</p>
                  <p className="text-[14px] font-[1000] tracking-tight">2.4 GB / 10 GB</p>
               </div>
            </div>
         </div>
      </div>

      {/* Synthesis Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
         <motion.div variants={itemVariants} className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 space-y-8">
               <div className="w-16 h-16 rounded-[24px] bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white shadow-xl shadow-black/10">
                  <Terminal className="w-8 h-8" />
               </div>
               <div className="space-y-3">
                  <h3 className="text-[28px] font-[1000] text-white tracking-tight leading-tight">Manual Synthesis Engine</h3>
                  <p className="text-[15px] font-[500] text-white/60 leading-relaxed max-w-md">
                     Trigger a custom audit cycle with granular node selection and temporal range verification.
                  </p>
               </div>
               <button className="flex items-center gap-3 bg-white text-indigo-600 p-[14px_32px] rounded-[22px] text-[12px] font-[1000] uppercase tracking-widest transition-all shadow-xl hover:scale-105 active:scale-95">
                  Initialize Report <Zap className="w-4 h-4 fill-indigo-600" />
               </button>
            </div>
            
            {/* Background design elements */}
            <div className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
            <ShieldCheck className="absolute -right-12 -bottom-12 w-64 h-64 text-white/5 rotate-[15deg] pointer-events-none" />
         </motion.div>

         <motion.div variants={itemVariants} className="bg-card border border-border p-10 rounded-[40px] shadow-sm flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <div className="bg-emerald-500/10 text-emerald-600 p-[6px_14px] rounded-full text-[9px] font-[1000] uppercase tracking-widest border border-emerald-500/20">Next Delivery</div>
                  <Clock className="w-4 h-4 text-muted-foreground/30" />
               </div>
               <div>
                  <h4 className="text-[22px] font-[1000] text-foreground tracking-tight leading-none mb-3">Q2 Market Projection</h4>
                  <p className="text-[13px] font-[500] text-muted-foreground/60 leading-relaxed">
                     Automated delivery configured for <span className="text-foreground font-[800]">April 10, 2024</span>. 
                     Syncing temporal data from 12 global nodes.
                  </p>
               </div>
            </div>
            <button className="flex items-center gap-2 text-indigo-600 text-[11px] font-[1000] uppercase tracking-[0.2em] hover:gap-3 transition-all pt-8">
               View Schedule <ChevronRight className="w-4 h-4" />
            </button>
         </motion.div>
      </div>

      {/* Document Archive Architecture */}
      <motion.div variants={itemVariants} className="space-y-6">
         <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-3">
               <div className="p-2 rounded-xl bg-secondary border border-border/50">
                  <History className="w-5 h-5 text-indigo-600" />
               </div>
               <h3 className="text-[20px] font-[1000] tracking-tighter text-foreground uppercase tracking-widest">Temporal Archives</h3>
            </div>
            <button className="text-[10px] font-[1000] text-muted-foreground/40 uppercase tracking-[0.2em] hover:text-indigo-600 transition-colors flex items-center gap-2">
               Show All Documentation <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
         </div>

         <div className="bg-card border border-border rounded-[40px] overflow-hidden shadow-sm divide-y divide-border/50">
            {RECENT_REPORTS.map((report) => (
               <div key={report.id} className="p-8 flex flex-col md:flex-row md:items-center justify-between hover:bg-secondary/30 transition-all group cursor-pointer relative">
                  <div className="flex items-center gap-6 relative z-10">
                     <div className="w-14 h-14 rounded-[22px] bg-secondary border border-border flex items-center justify-center text-indigo-600 shadow-sm transition-transform group-hover:scale-105 group-hover:bg-white dark:group-hover:bg-card">
                        <Download className="w-6 h-6" />
                     </div>
                     <div className="space-y-1">
                        <h4 className="text-[17px] font-[1000] text-foreground tracking-tight group-hover:text-indigo-600 transition-colors">{report.title}</h4>
                        <div className="flex items-center gap-3">
                           <span className="text-[10px] font-[1000] text-muted-foreground/30 uppercase tracking-widest">{report.date}</span>
                           <div className="w-1 h-1 rounded-full bg-muted-foreground/20" />
                           <div className="flex items-center gap-1.5">
                              <FileCheck className={cn("w-3.5 h-3.5", report.color)} />
                              <span className={cn("text-[10px] font-[1000] uppercase tracking-widest", report.color)}>{report.status}</span>
                           </div>
                        </div>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-12 mt-6 md:mt-0 relative z-10">
                     <div className="text-right hidden sm:block">
                        <div className="bg-secondary/80 p-[4px_10px] rounded-lg border border-border/50 inline-block mb-1">
                           <span className="text-[10px] font-[1000] text-foreground tracking-widest uppercase">{report.type}</span>
                        </div>
                        <p className="text-[11px] font-[1000] text-muted-foreground/40 uppercase tracking-widest">{report.size}</p>
                     </div>
                     <div className="flex items-center gap-3">
                        <button className="w-11 h-11 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground hover:bg-indigo-600 hover:text-white hover:shadow-xl hover:shadow-indigo-600/20 transition-all group/btn active:scale-90">
                           <Share2 className="w-4.5 h-4.5" />
                        </button>
                        <button className="w-11 h-11 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground hover:bg-indigo-600 hover:text-white hover:shadow-xl hover:shadow-indigo-600/20 transition-all group/btn active:scale-90">
                           <ArrowUpRight className="w-5 h-5" />
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </motion.div>
    </motion.div>
  );
}
