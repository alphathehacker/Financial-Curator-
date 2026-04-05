import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn';
import { CATEGORIES, PAYMENT_METHODS } from '../utils/data';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../store/AppContext';

export default function TransactionForm({ tx, onSave, onCancel }) {
  const { currency, convertFromInr, convertToInr, currencySymbol } = useApp();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    description: '',
    category: 'other',
    type: 'expense',
    method: 'gpay'
  });
  
  useEffect(() => {
    if (tx) {
      setFormData({
        ...tx,
        amount: Number(convertFromInr(Math.abs(tx.amount), currency).toFixed(2))
      });
    }
  }, [tx]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) return;
    
    onSave({
      ...formData,
      id: tx?.id || `tx-${Date.now()}`,
      amount: convertToInr(parseFloat(formData.amount), currency)
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-2xl bg-card border rounded-[32px] p-8 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">{tx ? 'Edit Transaction' : 'New Transaction'}</h2>
          <button onClick={onCancel} className="p-2 hover:bg-muted rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Type</label>
              <div className="grid grid-cols-2 gap-2 bg-muted p-1 rounded-lg">
                <button 
                  type="button" 
                  onClick={() => setFormData({...formData, type: 'income'})}
                  className={`py-1.5 text-xs font-bold rounded-md transition-all ${formData.type === 'income' ? 'bg-background shadow-sm text-emerald-600' : 'text-muted-foreground'}`}
                >
                  Income
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, type: 'expense'})}
                  className={`py-1.5 text-xs font-bold rounded-md transition-all ${formData.type === 'expense' ? 'bg-background shadow-sm text-rose-600' : 'text-muted-foreground'}`}
                >
                  Expense
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</label>
              <input 
                type="date" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full bg-background border px-3 py-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</label>
            <input 
              type="text" 
              placeholder="Rent, Groceries, Dinner..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-background border px-3 py-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">{currencySymbol}</span>
                <input 
                  type="number" 
                  placeholder="0.00"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="w-full bg-background border pl-7 pr-3 py-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <div className="space-y-1.5 col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Source / Payment Rail</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                 {PAYMENT_METHODS.map(m => (
                    <button
                       key={m.id}
                       type="button"
                       onClick={() => setFormData({...formData, method: m.id})}
                       className={cn(
                          "px-3 py-2.5 rounded-xl border text-[11px] font-bold transition-all text-left flex flex-col gap-1",
                          formData.method === m.id 
                            ? "bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/20" 
                            : "bg-background border-border hover:bg-secondary text-muted-foreground"
                       )}
                    >
                       <span className="opacity-60">{m.type.toUpperCase()}</span>
                       <span className="truncate">{m.name}</span>
                    </button>
                 ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-background border px-3 py-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-primary"
              >
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {!formData.amount || !formData.description ? (
            <div className="flex items-center gap-2 text-xs text-amber-500 bg-amber-500/5 p-2 rounded-lg">
                <AlertCircle className="w-3 h-3" />
                Please fill in all required fields
            </div>
          ) : null}

          <div className="flex gap-3 pt-4">
             <button 
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 text-sm font-medium border rounded-lg hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={!formData.amount || !formData.description}
              className="flex-1 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              Save Transaction
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
