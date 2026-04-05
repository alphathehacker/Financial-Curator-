import React from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database, 
  HelpCircle,
  ExternalLink,
  Plus,
  QrCode,
  CreditCard,
  CheckCircle2,
  Smartphone,
  ShieldCheck,
  Zap,
  Lock,
  RefreshCcw,
  Trash2
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useApp } from '../store/AppContext';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { x: -20, opacity: 0 },
  show: { x: 0, opacity: 1 }
};

export default function Settings({ role, setRole }) {
  const upiProviders = [
    { id: 'gpay', name: 'GPAY', status: 'Synced', icon: <QrCode className="w-6 h-6 text-indigo-500" />, connection: 'VERIFIED', active: true },
    { id: 'phonepe', name: 'PHONEPE', status: 'Disconnected', icon: <QrCode className="w-6 h-6 text-purple-500" />, connection: 'CONNECT', active: false },
    { id: 'paytm', name: 'PAYTM', status: 'Synced', icon: <QrCode className="w-6 h-6 text-cyan-500" />, connection: 'VERIFIED', active: true },
  ];

  const cardNetworks = [
    { id: 'visa', name: 'VISA •••• 4242', status: 'Active', icon: <CreditCard className="w-6 h-6 text-blue-600" />, connection: 'LINKED', active: true },
  ];

   const { setTransactions } = useApp();

   const handleCoreReset = () => {
      localStorage.removeItem('finease_transactions');
      window.location.reload(); // Force full system reboot for parity
   };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-4xl space-y-12 pb-20 font-['DM_Sans']"
    >
      {/* Settings Header */}
      <div className="space-y-2">
        <h2 className="text-[32px] lg:text-[40px] font-[1000] tracking-tighter text-foreground leading-none">Security Architecture</h2>
        <p className="text-[14px] font-[500] text-muted-foreground/60 leading-relaxed max-w-sm">
           Manage your financial encryption protocols and payment rail integrations.
        </p>
      </div>

      {/* UPI Infrastructure Section */}
      <section className="space-y-8">
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
               <h3 className="text-[16px] font-[1000] uppercase tracking-[0.1em] text-foreground">UPI Infrastructure</h3>
               <p className="text-[13px] font-[500] text-muted-foreground/60">Connect GPay, PhonePe or Paytm to track scans</p>
            </div>
            <button className="px-6 py-4 rounded-2xl bg-indigo-600 text-white text-[11px] font-[1000] uppercase tracking-widest shadow-xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 w-fit">
               <Plus className="w-3.5 h-3.5" /> Add Provider
            </button>
         </div>

         <div className="grid grid-cols-1 gap-4">
            {upiProviders.map((upi) => (
               <motion.div 
                  key={upi.id}
                  whileHover={{ scale: 1.01 }}
                  className="bg-card border border-border p-6 rounded-[32px] flex items-center justify-between group transition-all hover:bg-secondary/30"
               >
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 rounded-[22px] bg-secondary flex items-center justify-center border border-border/50 group-hover:bg-white dark:group-hover:bg-background transition-all">
                        {upi.icon}
                     </div>
                     <div>
                        <h4 className="text-[16px] font-[1000] text-foreground tracking-tight">{upi.name}</h4>
                        <p className="text-[12px] font-[600] text-muted-foreground/60 mt-0.5">Status: <span className={cn(upi.active ? "text-indigo-500" : "text-muted-foreground")}>{upi.status}</span></p>
                     </div>
                  </div>
                  <button className={cn(
                     "px-6 py-2.5 rounded-2xl text-[11px] font-[1000] uppercase tracking-widest transition-all",
                     upi.active 
                        ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-sm" 
                        : "bg-secondary text-muted-foreground border border-border hover:bg-indigo-600 hover:text-white"
                  )}>
                     {upi.connection}
                  </button>
               </motion.div>
            ))}
         </div>
      </section>

      {/* Card Networks Section */}
      <section className="space-y-8">
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
               <h3 className="text-[16px] font-[1000] uppercase tracking-[0.1em] text-foreground">Card Networks</h3>
               <p className="text-[13px] font-[500] text-muted-foreground/60">Securely link your Credit & Debit cards</p>
            </div>
            <button className="px-6 py-4 rounded-2xl bg-indigo-600 text-white text-[11px] font-[1000] uppercase tracking-widest shadow-xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 w-fit">
               <Plus className="w-3.5 h-3.5" /> Add Network
            </button>
         </div>

         <div className="grid grid-cols-1 gap-4">
            {cardNetworks.map((card) => (
               <motion.div 
                  key={card.id}
                  whileHover={{ scale: 1.01 }}
                  className="bg-card border border-border p-6 rounded-[32px] flex items-center justify-between group transition-all hover:bg-secondary/30"
               >
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 rounded-[22px] bg-secondary flex items-center justify-center border border-border/50 group-hover:bg-white dark:group-hover:bg-background transition-all">
                        {card.icon}
                     </div>
                     <div>
                        <h4 className="text-[16px] font-[1000] text-foreground tracking-tight">{card.name}</h4>
                        <p className="text-[12px] font-[600] text-muted-foreground/60 mt-0.5">Network: <span className="text-indigo-500">Encrypted</span></p>
                     </div>
                  </div>
                  <button className="px-6 py-2.5 rounded-2xl text-[11px] font-[1000] uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-sm">
                     {card.connection}
                  </button>
               </motion.div>
            ))}
         </div>
      </section>


      {/* Data Management Infrastructure */}
      <section className="space-y-8">
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
               <h3 className="text-[16px] font-[1000] uppercase tracking-[0.1em] text-foreground">Data Management</h3>
               <p className="text-[13px] font-[500] text-muted-foreground/60">Manage your local storage and ledger cache</p>
            </div>
            <button 
               onClick={handleCoreReset}
               className="px-6 py-4 rounded-2xl bg-rose-600/10 text-rose-600 border border-rose-600/20 text-[11px] font-[1000] uppercase tracking-widest hover:bg-rose-600 hover:text-white active:scale-95 transition-all flex items-center gap-2 w-fit shadow-sm"
            >
               <RefreshCcw className="w-3.5 h-3.5" /> Refresh Financial Core
            </button>
         </div>
      </section>

      {/* Authority Logic (RBAC) */}
      <section className="space-y-6 pt-12 border-t border-border">
         <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-indigo-600" />
            <h3 className="text-[14px] font-[1000] uppercase tracking-widest text-muted-foreground/60">Authority Logic</h3>
         </div>
         <div className="bg-secondary/40 p-1.5 rounded-[22px] flex items-center border border-border/50 w-fit">
            <button
               onClick={() => setRole('viewer')}
               className={cn(
                  "px-8 py-3 rounded-[18px] text-[11px] font-[900] uppercase tracking-widest transition-all",
                  role === 'viewer' ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
               )}
            >
               Viewer
            </button>
            <button
               onClick={() => setRole('admin')}
               className={cn(
                  "px-8 py-3 rounded-[18px] text-[11px] font-[900] uppercase tracking-widest transition-all",
                  role === 'admin' ? "bg-indigo-600 text-white shadow-lg" : "text-muted-foreground"
               )}
            >
               Admin
            </button>
         </div>
      </section>
    </motion.div>
  );
}
