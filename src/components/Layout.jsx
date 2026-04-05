import React, { useState, useEffect } from 'react';
import {
  Moon,
  Sun,
  Bell,
  LayoutGrid,
  ChevronRight,
  TrendingUp,
  Settings2,
  Activity,
  Menu,
  X,
  Sparkles,
  PieChart as ChartIcon,
  Fingerprint,
  Lock as LockIcon,
  Unlock,
  ShieldCheck,
  Coins,
  ChevronDown as ChevronDownIcon,
  Globe,
  Wallet,
  FileText,
  Pin,
  PinOff
} from 'lucide-react';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../store/AppContext';
import logo from '../utils/logo.png';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <Activity className="w-[18px] h-[18px]" /> },
  { id: 'transactions', label: 'Ledger', icon: <Fingerprint className="w-[18px] h-[18px]" /> },
  { id: 'budget', label: 'Budget', icon: <Wallet className="w-[18px] h-[18px]" /> },
  { id: 'reports', label: 'Reports', icon: <FileText className="w-[18px] h-[18px]" /> },
  { id: 'settings', label: 'Settings', icon: <Settings2 className="w-[18px] h-[18px]" /> },
];

const PAGE_GRADIENTS = {
  dashboard: "bg-[#f8fafc] bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.04),transparent_50%)]",
  analytics: "bg-[#fafafa] bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(236,72,153,0.04),transparent_50%)]",
  budget: "bg-[#f0fdf4] bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(20,184,166,0.04),transparent_50%)]",
  forecasting: "bg-[#fffbeb] bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(234,88,12,0.04),transparent_50%)]",
  transactions: "bg-[#fef2f2] bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.06),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.04),transparent_50%)]",
  reports: "bg-[#f0f9ff] bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.04),transparent_50%)]",
  settings: "bg-[#f8fafc] bg-[radial-gradient(ellipse_at_top_right,rgba(71,85,105,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.04),transparent_50%)]"
};

export default function Layout({ children }) {
  const { role, setRole, activeTab, setActiveTab, openNewTransaction, currency, setCurrency, darkMode, setDarkMode } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  
  const [isSidebarPinned, setIsSidebarPinned] = useState(() => {
    const saved = localStorage.getItem('sidebar_pinned');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  useEffect(() => {
    localStorage.setItem('sidebar_pinned', JSON.stringify(isSidebarPinned));
  }, [isSidebarPinned]);

  const isExpanded = isSidebarPinned || isSidebarHovered;

  return (
    <div className={cn(
      "flex min-h-screen transition-all duration-1000 ease-in-out font-['DM_Sans']",
      darkMode 
        ? "bg-background text-foreground dark" 
        : cn("text-foreground", PAGE_GRADIENTS[activeTab] || PAGE_GRADIENTS.dashboard)
    )}>
      {/* Desktop Sidebar */}
      <aside 
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
        className={cn(
          "bg-card border-r border-border hidden lg:flex flex-col sticky top-0 h-screen p-6 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group/sidebar",
          isExpanded ? "w-[280px]" : "w-[88px]"
        )}
      >
         <div className={cn(
          "flex items-center transition-all duration-500", 
          isExpanded ? "mb-12 justify-between w-full" : "mb-10 justify-center h-16 w-full"
        )}>
          <div className={cn("flex items-center transition-all duration-500", isExpanded ? "gap-4" : "justify-center")}>
             <div className={cn(
               "relative transition-all duration-500 flex-shrink-0 rounded-[12px] bg-white p-1 flex items-center justify-center overflow-hidden shadow-sm",
               isExpanded ? "w-10 h-10" : "w-14 h-14"
             )}>
                <img 
                  src={logo} 
                  alt="Financial Curator" 
                  className={cn(
                    "object-contain transition-all duration-500",
                    isExpanded ? "w-full h-full" : "w-[90%] h-[90%]"
                  )}
                />
             </div>
             <div className={cn("space-y-0.5 transition-all duration-500 overflow-hidden", !isExpanded && "scale-0 opacity-0 w-0 absolute pointer-events-none")}>
                <h1 className="text-[17px] font-[1000] tracking-tighter text-foreground leading-[1.1] whitespace-nowrap">Financial Curator</h1>
                <div className="flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <p className="text-[9px] font-[900] text-muted-foreground uppercase tracking-widest opacity-60">Audit Live</p>
                </div>
             </div>
          </div>
          <button 
             onClick={() => setIsSidebarPinned(!isSidebarPinned)}
             className={cn(
               "p-2 rounded-xl transition-all duration-300",
               isSidebarPinned ? "bg-indigo-600/10 text-indigo-600" : "bg-secondary text-muted-foreground hover:text-foreground",
               !isExpanded && "opacity-0 invisible pointer-events-none group-hover/sidebar:opacity-100 group-hover/sidebar:visible absolute"
             )}
          >
             {isSidebarPinned ? <Pin className="w-4 h-4 fill-current" /> : <PinOff className="w-4 h-4" />}
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center transition-all duration-300 group overflow-hidden relative",
                activeTab === item.id
                  ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20"
                  : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground",
                isExpanded ? "p-[14px_20px] rounded-[22px] gap-4" : "p-0 rounded-[20px] justify-center h-[56px] w-[56px] mx-auto"
              )}
            >
              <div className={cn(
                "flex-shrink-0 flex items-center justify-center transition-all duration-300",
                isExpanded ? "w-5 h-5" : "w-10 h-10"
              )}>
                 {React.cloneElement(item.icon, { 
                   className: cn(
                     "transition-all duration-300", 
                     isExpanded ? "w-[18px] h-[18px]" : "w-[24px] h-[24px]"
                   ) 
                 })}
              </div>
              <span className={cn(
                "transition-all duration-500 whitespace-nowrap font-[800] text-[13px]",
                !isExpanded && "opacity-0 -translate-x-10 pointer-events-none absolute"
              )}>
                {item.label}
              </span>
              {activeTab === item.id && isExpanded && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-40" />}
            </button>
          ))}
        </nav>

        {/* Role Switcher */}
        <div className={cn("pt-8 border-t border-border mt-auto transition-all duration-500", !isExpanded && "opacity-0 invisible")}>
          <p className="text-[10px] font-[900] text-muted-foreground/30 uppercase tracking-[0.2em] mb-4 px-4">Authority Logic</p>
          <div className="bg-secondary/40 p-1.5 rounded-[22px] flex items-center border border-border/50">
            <button
              onClick={() => setRole('viewer')}
              className={cn(
                "flex-1 py-3 rounded-[18px] text-[11px] font-[900] uppercase tracking-widest flex items-center justify-center gap-2 transition-all",
                role === 'viewer' ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              )}
            >
              {role === 'viewer' ? <LockIcon className="w-3 h-3" /> : null} Viewer
            </button>
            <button
              onClick={() => setRole('admin')}
              className={cn(
                "flex-1 py-3 rounded-[18px] text-[11px] font-[900] uppercase tracking-widest flex items-center justify-center gap-2 transition-all",
                role === 'admin' ? "bg-indigo-600 text-white shadow-lg" : "text-muted-foreground"
              )}
            >
              {role === 'admin' ? <ShieldCheck className="w-3.5 h-3.5" /> : <Unlock className="w-3 h-3" />} Admin
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-[84px] bg-card border-b border-border/40 px-6 lg:px-12 flex items-center justify-between sticky top-0 z-[40] backdrop-blur-xl bg-card/70">
          <div className="flex-1 flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 rounded-xl bg-secondary text-foreground active:scale-95 transition-all"><Menu className="w-5 h-5" /></button>
            <div className="hidden lg:flex items-center gap-10">
              {['Dashboard', 'Portfolio', 'Forecasting'].map(l => (
                <button
                   key={l}
                   onClick={() => setActiveTab(l.toLowerCase() === 'portfolio' ? 'analytics' : l.toLowerCase())}
                   className={cn(
                     "text-[12px] font-[900] uppercase tracking-widest transition-all",
                     (activeTab === l.toLowerCase() || (activeTab === 'analytics' && l === 'Portfolio')) ? "text-indigo-600" : "text-muted-foreground/40 hover:text-foreground"
                   )}
                >
                   {l}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-8">
            <div className="flex items-center gap-2">
              {/* Sovereign Currency Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                  className={cn(
                    "flex items-center gap-2.5 p-[10px_16px] rounded-2xl transition-all border group relative z-[10000]",
                    isCurrencyOpen
                      ? "bg-indigo-600 border-indigo-400 text-white shadow-xl shadow-indigo-600/30 active:scale-95"
                      : cn(
                        "border shadow-sm",
                        darkMode
                          ? "bg-[#0A0A0B]/80 text-white border-white/5 backdrop-blur-xl hover:bg-white/5"
                          : "bg-white text-foreground border-slate-200 hover:bg-secondary"
                      )
                  )}
                >
                  <Coins className={cn("w-4 h-4 transition-transform group-hover:scale-110", isCurrencyOpen ? "text-white" : "text-indigo-500")} />
                  <span className="text-[11px] font-[1000] uppercase tracking-widest">{currency}</span>
                </button>

                <AnimatePresence>
                  {isCurrencyOpen && (
                    <>
                      {/* Universal Context Closer: High-Sensitivity Smart Shield */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCurrencyOpen(false)}
                        className="fixed inset-0 w-[200vw] h-[200vh] -left-[50vw] -top-[50vh] bg-black/5 dark:bg-black/20 backdrop-blur-sm z-[9998] cursor-zoom-out pointer-events-auto"
                      />

                      {/* Linear Precision Rail: High-Fidelity Horizontal standards belt */}
                      <div className="absolute left-1/2 top-full -translate-x-1/2 z-[9999] pt-4 pointer-events-none">
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -5, scale: 0.98 }}
                          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                          className={cn(
                            "relative flex items-center gap-2 p-1.5 sm:p-2 border backdrop-blur-3xl rounded-[24px] sm:rounded-[32px] pointer-events-auto max-w-[calc(100vw-32px)] sm:max-w-none overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory ring-1",
                            darkMode
                              ? "bg-[#0A0A0B] border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] ring-white/5"
                              : "bg-white border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)] ring-black/[0.02]"
                          )}
                        >
                          {/* Sovereign Standards Rail */}
                          {[
                            { id: 'INR', symbol: '₹', color: 'text-indigo-500' },
                            { id: 'USD', symbol: '$', color: 'text-emerald-500' },
                            { id: 'EUR', symbol: '€', color: 'text-amber-500' },
                            { id: 'GBP', symbol: '£', color: 'text-rose-500' },
                            { id: 'JPY', symbol: '¥', color: 'text-cyan-500' },
                            { id: 'AED', symbol: 'د.إ', color: 'text-slate-500' },
                            { id: 'CAD', symbol: '$', color: 'text-orange-500' },
                            { id: 'AUD', symbol: '$', color: 'text-blue-500' }
                          ].map((c, i) => (
                            <motion.button
                              key={c.id}
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: i * 0.04 }}
                              onClick={() => { setCurrency(c.id); setIsCurrencyOpen(false); }}
                              className={cn(
                                "flex-shrink-0 w-[52px] h-[52px] sm:w-[64px] sm:h-[64px] rounded-[18px] sm:rounded-[22px] flex flex-col items-center justify-center transition-all border snap-center active:scale-90 group",
                                currency === c.id
                                  ? "bg-indigo-600 border-indigo-400 text-white z-30 shadow-[0_10px_25px_rgba(79,70,229,0.4)]"
                                  : cn("bg-transparent border-transparent text-muted-foreground hover:scale-105 active:opacity-80",
                                    darkMode ? "hover:bg-white/5 hover:border-white/10" : "hover:bg-secondary hover:border-slate-200")
                              )}
                            >
                              <span className={cn("text-[16px] sm:text-[18px] font-[900] mb-0.5 group-hover:scale-110 transition-transform", currency === c.id ? 'text-white' : c.color)}>
                                {c.symbol}
                              </span>
                              <span className={cn("text-[8px] sm:text-[10px] font-[1000] uppercase tracking-tighter transition-opacity", currency === c.id ? 'opacity-100 text-white' : 'opacity-40 group-hover:opacity-100')}>
                                {c.id}
                              </span>
                            </motion.button>
                          ))}
                        </motion.div>
                      </div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <button onClick={() => setDarkMode(!darkMode)} className="p-3 rounded-2xl bg-secondary/50 text-muted-foreground hover:text-foreground transition-all">
                {darkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className="hidden sm:flex p-3 rounded-2xl bg-secondary/50 text-muted-foreground hover:text-foreground relative">
                <Bell className="w-5 h-5" />
                <div className="absolute top-[10px] right-[10px] w-2 h-2 rounded-full bg-indigo-500 border-2 border-card" />
              </button>
            </div>
            <div className="flex items-center gap-4 border-l border-border/50 pl-6 lg:pl-10">
              <div className="text-right hidden sm:block">
                <p className="text-[13px] font-[1000] text-foreground tracking-tight leading-none mb-1">Raj Kishor Pattnaik</p>
                <p className="text-[10px] font-[800] text-muted-foreground/40 uppercase tracking-widest leading-none">Portfolio Admin</p>
              </div>
              <button
                onClick={() => setActiveTab('settings')}
                className={cn(
                  "w-[44px] h-[44px] rounded-2xl flex items-center justify-center font-[1000] text-[13px] transition-all hover:scale-105 active:scale-95",
                  activeTab === 'settings'
                    ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 ring-2 ring-indigo-400 ring-offset-2 dark:ring-offset-background"
                    : "bg-indigo-600/90 text-white shadow-xl shadow-indigo-600/20"
                )}
              >
                RK
              </button>
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-6 lg:p-12 scrollbar-hide pb-32">
          {children}
        </section>

        {/* Mobile Navigation Dock */}
        <nav className="fixed bottom-0 left-0 right-0 h-[88px] bg-card/80 backdrop-blur-3xl border-t border-border px-4 flex lg:hidden items-center justify-between z-[50] pb-2">
          {[
            { id: 'dashboard', label: 'Monitor', icon: <Activity className="w-6 h-6" /> },
            { id: 'analytics', label: 'Portfolio', icon: <ChartIcon className="w-6 h-6" /> },
            { id: 'transactions', label: 'Ledger', icon: <Fingerprint className="w-6 h-6" /> },
            { id: 'forecasting', label: 'Forecast', icon: <Sparkles className="w-6 h-6" /> }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex flex-col items-center gap-1.5 flex-1 py-4 rounded-[24px] transition-all",
                activeTab === item.id ? "text-indigo-600 bg-indigo-600/5" : "text-muted-foreground/40"
              )}
            >
              {item.icon}
              <span className="text-[9px] font-[1000] uppercase tracking-widest leading-none">{item.label}</span>
            </button>
          ))}
        </nav>
      </main>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-background/80 backdrop-blur-md z-[100] lg:hidden" />
            <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 left-0 bottom-0 w-[300px] bg-card border-r border-border z-[110] flex flex-col p-8 lg:hidden shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                   <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
                   <div className="space-y-0.5">
                      <span className="text-[18px] font-[1000] tracking-tighter block leading-none">Financial Curator</span>
                      <p className="text-[9px] font-[1000] text-emerald-500 uppercase tracking-widest leading-none">Security Active</p>
                   </div>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-xl bg-secondary text-foreground active:scale-90 transition-all"><X className="w-5 h-5" /></button>
              </div>
              <nav className="flex-1 space-y-3">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                    className={cn(
                      "w-full flex items-center gap-4 p-[16px_22px] rounded-[24px] transition-all",
                      activeTab === item.id ? "bg-indigo-600 text-white shadow-xl" : "text-muted-foreground hover:bg-secondary/50"
                    )}
                  >
                    {item.icon}
                    <span className="text-[14px] font-[900] tracking-tight">{item.label}</span>
                  </button>
                ))}
              </nav>
              <div className="pt-8 border-t border-border mt-auto space-y-6">
                <div className="bg-secondary/50 p-1.5 rounded-[22px] flex items-center">
                  <button onClick={() => { setRole('viewer'); setIsSidebarOpen(false); }} className={cn("flex-1 py-3 rounded-[18px] text-[11px] font-[900]", role === 'viewer' ? "bg-card shadow-sm" : "text-muted-foreground")}>Viewer</button>
                  <button onClick={() => { setRole('admin'); setIsSidebarOpen(false); }} className={cn("flex-1 py-3 rounded-[18px] text-[11px] font-[900]", role === 'admin' ? "bg-indigo-600 text-white shadow-lg" : "text-muted-foreground")}>Admin</button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
