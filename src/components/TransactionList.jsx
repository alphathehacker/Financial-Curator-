import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  ChevronDown, 
  Calendar as CalendarIcon,
  Tag,
  DollarSign,
  Download,
  Plus,
  Trash2,
  Edit2,
  Eye,
  FileText,
  AlertCircle,
  TrendingDown,
  TrendingUp,
  Clock,
  X,
  Home,
  Utensils,
  Car,
  Music,
  ShoppingBag,
  Zap as ZapIcon,
  DollarSign as IncomeIcon,
  Plus as OtherIcon,
  Lock as SecureLockIcon,
  Smartphone, 
  CreditCard, 
  Wallet
} from 'lucide-react';
import { CATEGORIES, PAYMENT_METHODS } from '../utils/data';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { useApp } from '../store/AppContext';
import { TableSkeleton } from './Skeleton';

export default function TransactionList({ transactions, role, onEdit, onDelete, onAdd }) {
  const { isLoading, currency, formatCurrency, convertFromInr } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'income', 'expense'
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortOption, setSortOption] = useState('latest'); // 'latest', 'highest', 'lowest'
  const [visibleCount, setVisibleCount] = useState(15);
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  if (isLoading) return <TableSkeleton />;

  const CAT_ICONS = {
    housing: <Home className="w-3.5 h-3.5" />,
    food: <Utensils className="w-3.5 h-3.5" />,
    transport: <Car className="w-3.5 h-3.5" />,
    entertainment: <Music className="w-3.5 h-3.5" />,
    shopping: <ShoppingBag className="w-3.5 h-3.5" />,
    utilities: <ZapIcon className="w-3.5 h-3.5" />,
    income: <IncomeIcon className="w-3.5 h-3.5" />,
    other: <OtherIcon className="w-3.5 h-3.5" />,
  };

  const getMethodById = (id) => {
    return PAYMENT_METHODS.find(m => m.id === id) || PAYMENT_METHODS[PAYMENT_METHODS.length - 1];
  };

  const getMethodIcon = (method) => {
    switch (method?.type) {
      case 'upi': return <Smartphone className="w-3.5 h-3.5" />;
      case 'card': return <CreditCard className="w-3.5 h-3.5" />;
      default: return <Wallet className="w-3.5 h-3.5" />;
    }
  };

  const handleExport = () => {
    // CSV Export
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const rows = transactions.map(t => [
      t.date,
      t.description,
      CATEGORIES.find(c => c.id === t.category)?.name || t.category,
      t.type,
      t.amount
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `transaction_report_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(t => {
        const catName = CATEGORIES.find(c => c.id === t.category)?.name.toLowerCase() || '';
        const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             catName.includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || t.type === filterType;
        const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
        return matchesSearch && matchesType && matchesCategory;
      })
      .sort((a, b) => {
        if (sortOption === 'latest') return new Date(b.date) - new Date(a.date);
        if (sortOption === 'highest') return b.amount - a.amount;
        if (sortOption === 'lowest') return a.amount - b.amount;
        return 0;
      });
  }, [transactions, searchTerm, filterType, filterCategory, sortOption]);

  const displayedTransactions = filteredTransactions.slice(0, visibleCount);

  const displayVal = (val) => formatCurrency(convertFromInr(val, currency));

  return (
    <div className="space-y-6 font-['DM_Sans'] pb-20 lg:pb-0">
      {/* Header View */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-1">
         <div className="space-y-1">
            <h2 className="text-[28px] font-[900] tracking-tighter text-foreground">Ledger Archives</h2>
            <p className="text-[14px] font-[500] text-muted-foreground/60">Manage and audit your full financial history.</p>
         </div>
         
         <div className="flex items-center gap-3">
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-6 py-2.5 bg-secondary hover:bg-secondary/80 text-foreground rounded-[16px] text-[12px] font-[800] border border-border shadow-sm transition-all active:scale-95"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
            {role === 'admin' ? (
               <button 
                  onClick={onAdd}
                  className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-[16px] text-[12px] font-[800] shadow-xl hover:shadow-indigo-500/20 transition-all active:scale-95"
               >
                  <Plus className="w-4 h-4" /> Add Entry
               </button>
            ) : (
               <div className="px-6 py-2.5 bg-muted/20 text-muted-foreground rounded-[16px] text-[11px] font-[900] uppercase tracking-widest border border-dashed border-border flex items-center gap-2">
                  <Eye className="w-4 h-4" /> Read Only
               </div>
            )}
         </div>
      </div>

      {/* Studio-Grade Filter Ecosystem */}
      <motion.div 
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         className="bg-card/40 backdrop-blur-xl border border-border/50 p-3 lg:p-4 rounded-[28px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none flex flex-col lg:flex-row gap-3 lg:items-center sticky top-24 z-30"
      >
         {/* Adaptive Search Rail */}
         <div className="relative group flex-1">
            <Search className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within:text-indigo-500 transition-colors" />
            <input 
               type="text" 
               placeholder="Audit transactions by name, category, or note..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-secondary/30 hover:bg-secondary/50 focus:bg-card border border-transparent focus:border-border transition-all duration-300 px-12 py-3.5 rounded-[22px] text-[14px] font-[600] text-foreground placeholder:text-muted-foreground/30 outline-none shadow-sm"
            />
            {searchTerm && (
               <button 
                  onClick={() => setSearchTerm('')} 
                  className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-indigo-500 hover:text-white transition-all shadow-sm"
               >
                  <X className="w-3 h-3" />
               </button>
            )}
         </div>

         {/* Curated Selectors */}
         <div className="flex flex-wrap items-center gap-2 lg:gap-3">
            {/* High-Fidelity Sort Navigator */}
            <div className="relative">
               <button 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-3 bg-secondary/40 border border-border/20 rounded-[24px] px-6 py-3.5 transition-all hover:bg-secondary/60 shadow-sm min-w-[170px] justify-between"
               >
                  <span className="text-[11px] font-[1000] uppercase tracking-widest text-foreground flex items-center gap-2">
                     {sortOption === 'latest' && <Clock className="w-3.5 h-3.5 text-indigo-500" />}
                     {sortOption === 'highest' && <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />}
                     {sortOption === 'lowest' && <TrendingDown className="w-3.5 h-3.5 text-rose-500" />}
                     {sortOption}
                  </span>
                  <ChevronDown className={cn("w-4 h-4 text-muted-foreground/40 transition-transform duration-300", isSortOpen && "rotate-180")} />
               </button>

               <AnimatePresence>
                  {isSortOpen && (
                     <motion.div 
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.98 }}
                        className="absolute left-0 top-[calc(100%+8px)] w-[240px] bg-card border border-border shadow-[0_20px_40px_rgba(0,0,0,0.12)] rounded-[24px] p-2 z-[100] backdrop-blur-3xl overflow-hidden"
                     >
                        {[
                           { id: 'latest', label: 'Latest Archives', icon: <Clock className="w-3.5 h-3.5" /> },
                           { id: 'highest', label: 'Max Capital Outflow', icon: <TrendingUp className="w-3.5 h-3.5" /> },
                           { id: 'lowest', label: 'Min Capital Outflow', icon: <TrendingDown className="w-3.5 h-3.5" /> }
                        ].map((opt) => (
                           <button
                              key={opt.id}
                              onClick={() => { setSortOption(opt.id); setIsSortOpen(false); }}
                              className={cn(
                                 "w-full flex items-center gap-3 p-3.5 rounded-[18px] text-[11px] font-[1000] uppercase tracking-widest transition-all mb-1 last:mb-0",
                                 sortOption === opt.id ? "bg-indigo-600 text-white shadow-lg" : "text-muted-foreground hover:bg-secondary"
                              )}
                           >
                              <div className={cn("w-6 h-6 rounded-lg bg-secondary flex items-center justify-center transition-colors", sortOption === opt.id && "bg-white/10")}>
                                 {opt.icon}
                              </div>
                              {opt.label}
                           </button>
                        ))}
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>

            <div className="bg-secondary/40 p-1 rounded-[20px] flex items-center border border-border/20 shadow-inner">
               {['all', 'income', 'expense'].map(type => (
                  <button
                     key={type}
                     onClick={() => setFilterType(type)}
                     className={cn(
                        "px-5 py-2.5 rounded-[16px] text-[10px] font-[900] uppercase tracking-[0.1em] transition-all duration-300 relative",
                        filterType === type 
                           ? "bg-card text-foreground shadow-[0_4px_12px_rgba(0,0,0,0.05)] ring-1 ring-border/10" 
                           : "text-muted-foreground/40 hover:text-foreground"
                     )}
                  >
                     {type}
                  </button>
               ))}
            </div>

            {/* Premium Segment Selector */}
            <div className="relative">
               <button 
                  onClick={() => setIsCatOpen(!isCatOpen)}
                  className="flex items-center gap-3 bg-secondary/40 border border-border/20 rounded-[20px] px-6 py-3.5 transition-all hover:bg-secondary/60 shadow-sm min-w-[200px] justify-between"
               >
                  <span className="text-[11px] font-[1000] uppercase tracking-widest text-foreground">
                     {filterCategory === 'all' ? 'Every Segment' : CATEGORIES.find(c => c.id === filterCategory)?.name}
                  </span>
                  <ChevronDown className={cn("w-4 h-4 text-muted-foreground/40 transition-transform duration-300", isCatOpen && "rotate-180")} />
               </button>

               <AnimatePresence>
                  {isCatOpen && (
                     <motion.div 
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.98 }}
                        className="absolute right-0 top-[calc(100%+8px)] w-[240px] bg-card border border-border shadow-[0_20px_40px_rgba(0,0,0,0.12)] rounded-[24px] p-2 z-[100] backdrop-blur-3xl lg:right-0 overflow-hidden"
                     >
                        <button 
                           onClick={() => { setFilterCategory('all'); setIsCatOpen(false); }}
                           className={cn(
                              "w-full flex items-center gap-3 p-3.5 rounded-[18px] text-[11px] font-[900] uppercase tracking-widest transition-all text-left",
                              filterCategory === 'all' ? "bg-indigo-600 text-white shadow-lg" : "text-muted-foreground hover:bg-secondary"
                           )}
                        >
                           <div className="w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                              <Search className="w-3 h-3" />
                           </div>
                           Every Segment
                        </button>
                        <div className="h-[1px] bg-border/50 my-1 mx-2" />
                        <div className="max-h-[300px] overflow-y-auto scrollbar-hide">
                           {CATEGORIES.map(cat => (
                              <button
                                 key={cat.id}
                                 onClick={() => { setFilterCategory(cat.id); setIsCatOpen(false); }}
                                 className={cn(
                                    "w-full flex items-center gap-3 p-3.5 rounded-[18px] text-[11px] font-[900] uppercase tracking-widest transition-all text-left mb-1 last:mb-0",
                                    filterCategory === cat.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-muted-foreground hover:bg-secondary"
                                 )}
                              >
                                 <div className={cn(
                                    "w-6 h-6 rounded-lg flex items-center justify-center bg-secondary transition-colors",
                                    filterCategory === cat.id && "bg-white/20"
                                 )}>
                                    {CAT_ICONS[cat.id] || <Tag className="w-3.5 h-3.5" />}
                                 </div>
                                 {cat.name}
                              </button>
                           ))}
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
         </div>
      </motion.div>

      {/* Ledger Architecture */}
      <div className="bg-card/40 backdrop-blur-3xl border border-border/40 rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-none lg:border-indigo-500/5">
         <div className="hidden lg:block overflow-x-auto overflow-y-hidden">
            <table className="w-full text-left border-collapse table-fixed">
               <thead>
                  <tr className="bg-secondary/10 border-b border-border/30 text-muted-foreground/30">
                     <th className="w-[12%] px-8 py-6 text-[9px] font-[1000] uppercase tracking-[0.3em]">
                        <div className="flex items-center gap-2">
                           <CalendarIcon className="w-3 h-3" /> Temporal
                        </div>
                     </th>
                     <th className="w-[38%] px-8 py-6 text-[9px] font-[1000] uppercase tracking-[0.3em]">
                        Origin & Segment
                     </th>
                     <th className="w-[16%] px-8 py-6 text-[9px] font-[1000] uppercase tracking-[0.3em]">
                        Fiscal Pipeline
                     </th>
                     <th className="w-[19%] px-8 py-6 text-[9px] font-[1000] uppercase tracking-[0.3em] text-right pr-20">
                        Capital Flow
                     </th>
                     <th className="w-[15%] px-8 py-6 text-[9px] font-[1000] uppercase tracking-[0.3em] text-center">Audit Authority</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-border/10">
                  <AnimatePresence mode="popLayout">
                     {displayedTransactions.length > 0 ? (
                        displayedTransactions.map((tx) => (
                           <motion.tr 
                              key={tx.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                              className="group transition-all duration-300 hover:bg-indigo-500/[0.03] cursor-default even:bg-secondary/10"
                           >
                              <td className="px-8 py-6 text-[10px] font-[900] text-muted-foreground/20 font-mono tracking-tighter transition-colors group-hover:text-indigo-500/50">
                                 {tx.date}
                              </td>
                              <td className="px-8 py-6">
                                 <div className="flex items-center gap-5">
                                    <div className={cn(
                                       "w-10 h-10 rounded-[14px] flex items-center justify-center shadow-lg transition-all duration-500 group-hover:rotate-[360deg]",
                                       tx.type === 'income' ? "bg-emerald-500 shadow-emerald-500/20" : "bg-slate-300 dark:bg-slate-800 shadow-black/5"
                                    )}>
                                       <span className="text-white">
                                          {CAT_ICONS[tx.category] || (tx.type === 'income' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />)}
                                       </span>
                                    </div>
                                    <div className="space-y-1.5 min-w-0">
                                       <p className="text-[14px] font-[1000] text-foreground tracking-tight group-hover:text-indigo-600 transition-colors truncate">{tx.description}</p>
                                       <div className="flex items-center gap-2">
                                          <div className={cn("w-1 h-1 rounded-full", tx.type === 'income' ? "bg-emerald-500" : "bg-slate-400")} />
                                          <span className="text-[9px] font-[1000] uppercase tracking-widest text-muted-foreground/30">
                                             {CATEGORIES.find(c => c.id === tx.category)?.name || 'General Node'}
                                          </span>
                                       </div>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-8 py-6">
                                 <div className="inline-flex items-center gap-2.5 bg-secondary/40 p-[6px_14px] border border-border/40 rounded-full transition-all group-hover:bg-card">
                                    <div className="text-muted-foreground/40 scale-90 group-hover:text-indigo-500 transition-colors">
                                       {getMethodIcon(getMethodById(tx.method))}
                                    </div>
                                    <span className="text-[10px] font-[1000] text-muted-foreground/60 uppercase tracking-widest">{getMethodById(tx.method).name}</span>
                                 </div>
                              </td>
                              <td className="px-8 py-6 text-right pr-20">
                                 <div className="flex flex-col items-end">
                                    <div className={cn(
                                       "p-[6px_16px] rounded-2xl font-[1000] text-[15px] tracking-tighter transition-all",
                                       tx.type === 'income' 
                                          ? 'bg-emerald-500/10 text-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                                          : 'text-foreground'
                                    )}>
                                       {tx.type === 'income' ? '+' : '-'}{displayVal(tx.amount)}
                                    </div>
                                 </div>
                              </td>
                              <td className="px-8 py-6">
                                 <div className="flex items-center justify-center relative">
                                    <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:scale-0 group-hover:opacity-0">
                                       <div className="flex items-center gap-2 p-[6px_14px] bg-secondary/50 rounded-full border border-border/20">
                                          <FileText className="w-3 h-3 text-muted-foreground/30" />
                                          <span className="text-[9px] font-[1000] text-muted-foreground/40 uppercase tracking-widest">Signed</span>
                                       </div>
                                    </div>
                                    <div className="flex items-center gap-1 bg-white/40 dark:bg-black/20 p-1 rounded-2xl border border-border/50 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                                       {role === 'admin' ? (
                                          <>
                                             <button onClick={() => onEdit(tx)} className="p-2 rounded-xl border border-border/50 bg-card hover:bg-indigo-600 hover:text-white text-muted-foreground transition-all active:scale-90"><Edit2 className="w-3.5 h-3.5" /></button>
                                             <button onClick={() => onDelete(tx.id)} className="p-2 rounded-xl bg-card hover:bg-rose-500 hover:text-white text-rose-500 transition-all active:scale-90"><Trash2 className="w-3.5 h-3.5" /></button>
                                          </>
                                       ) : (
                                          <div className="p-2 rounded-xl text-muted-foreground/40" title="Secure Record">
                                             <SecureLockIcon className="w-4 h-4" />
                                          </div>
                                       )}
                                    </div>
                                 </div>
                              </td>
                           </motion.tr>
                        ))
                     ) : (
                        <tr>
                           <td colSpan={5} className="h-64 text-center">
                              <div className="flex flex-col items-center justify-center gap-3">
                                 <AlertCircle className="w-12 h-12 text-muted-foreground/10" />
                                 <p className="text-[11px] font-[800] text-muted-foreground/40 uppercase tracking-widest">No matching financial records discovered</p>
                              </div>
                           </td>
                        </tr>
                     )}
                  </AnimatePresence>
               </tbody>
            </table>
         </div>

         {/* Mobile Card Layout */}
         <div className="lg:hidden">
            {displayedTransactions.length > 0 ? (
               displayedTransactions.map(tx => (
                  <motion.div 
                     key={tx.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                     className="p-6 border-b border-border/30 active:bg-secondary/30 transition-all relative overflow-hidden"
                  >
                     <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-4">
                           <div className={cn(
                              "w-12 h-12 rounded-[18px] flex items-center justify-center text-white shadow-md",
                              tx.type === 'income' ? "bg-emerald-500" : "bg-slate-400 dark:bg-slate-700/50"
                           )}>
                              {CAT_ICONS[tx.category] || (tx.type === 'income' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />)}
                           </div>
                           <div>
                              <p className="text-[15px] font-[1000] text-foreground tracking-tight leading-none mb-1">{tx.description}</p>
                              <div className="flex items-center gap-2">
                                 <span className="text-[10px] font-[800] text-muted-foreground/40 font-mono tracking-tighter">{tx.date}</span>
                                 <span className="text-[8px] opacity-20">•</span>
                                 <span className="text-[9px] font-[1000] uppercase tracking-widest text-indigo-500/60">
                                    {CATEGORIES.find(c => c.id === tx.category)?.name}
                                 </span>
                              </div>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className={cn("text-[17px] font-[1000] tracking-tighter leading-none mb-1", tx.type === 'income' ? 'text-emerald-500' : 'text-foreground')}>
                              {tx.type === 'income' ? '+' : '-'}{displayVal(tx.amount)}
                           </p>
                           <p className="text-[9px] font-[1000] uppercase tracking-widest text-muted-foreground/10">Audit ID: {tx.id.slice(-4)}</p>
                        </div>
                     </div>
                     
                     <div className="flex gap-2">
                        {role === 'admin' ? (
                           <>
                              <button onClick={() => onEdit(tx)} className="flex-1 py-3.5 rounded-[18px] bg-secondary text-foreground text-[10px] font-[1000] uppercase tracking-widest active:scale-95 transition-all shadow-sm">View & Edit</button>
                              <button onClick={() => onDelete(tx.id)} className="w-[50px] flex items-center justify-center rounded-[18px] bg-rose-500/10 text-rose-500 active:scale-95 transition-all border border-rose-500/10"><Trash2 className="w-4 h-4" /></button>
                           </>
                        ) : (
                           <div className="flex-1 py-3.5 rounded-[18px] border border-dashed border-border/40 flex items-center justify-center gap-3 text-muted-foreground/20 text-[9px] font-[1000] uppercase tracking-widest shadow-inner">
                              <SecureLockIcon className="w-4 h-4" /> Secure Record Archive
                           </div>
                        )}
                     </div>
                  </motion.div>
               ))
            ) : (
               <div className="p-20 text-center flex flex-col items-center gap-4">
                  <AlertCircle className="w-12 h-12 text-muted-foreground/10" />
                  <p className="text-[11px] font-[1000] text-muted-foreground/30 uppercase tracking-[0.2em]">Discovery: No valid archives found</p>
               </div>
            )}
         </div>
         
         {filteredTransactions.length > visibleCount && (
            <div className="p-10 bg-secondary/10 backdrop-blur-md border-t border-border/50 text-center flex flex-col items-center gap-4">
               <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-[1px] bg-border" />
                  <span className="text-[10px] font-[900] text-muted-foreground/30 uppercase tracking-[0.2em] px-2">Audit Continuity</span>
                  <div className="w-8 h-[1px] bg-border" />
               </div>
               <button 
                  onClick={() => setVisibleCount(p => p + 15)}
                  className="px-12 py-4.5 rounded-full bg-card hover:bg-indigo-600 text-foreground hover:text-white text-[11px] font-[1000] uppercase tracking-widest transition-all shadow-[0_10px_20px_rgba(0,0,0,0.05)] hover:shadow-indigo-500/20 active:scale-95 ring-1 ring-border group"
               >
                  Load Audited Archives
                  <ChevronDown className="w-3.5 h-3.5 inline-block ml-3 group-hover:translate-y-0.5 transition-transform" />
               </button>
            </div>
         )}
      </div>
    </div>
  );
}
