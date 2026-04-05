import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TRANSACTIONS } from '../utils/data';
import { useToast } from './ToastContext';
import { convertFromInr, convertToInr, formatCurrency, CURRENCY_SYMBOLS } from '../utils/currency';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { showToast } = useToast();
  const [transactions, setTransactions] = useState([]);
  const [role, setRole] = useState('admin'); // 'admin' or 'viewer'
  const [currency, setCurrency] = useState('INR');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [editingTx, setEditingTx] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('finease_theme') === 'dark');

  // Persistence
  useEffect(() => {
    const savedTransactions = localStorage.getItem('finease_transactions');
    const savedRole = localStorage.getItem('finease_role');
    const savedCurrency = localStorage.getItem('finease_currency');

    if (savedTransactions) {
      const parsed = JSON.parse(savedTransactions);
      // Migration Logic: If legacy data (income ~6500) detected, force-refresh to new v2 trajectory
      const monthIncome = parsed.filter(t => {
         const d = new Date(t.date);
         return d.getMonth() === new Date().getMonth() && t.type === 'income';
      }).reduce((sum, t) => sum + t.amount, 0);

      if (monthIncome < 20000 && parsed.length > 0) {
         localStorage.removeItem('finease_transactions');
         setTransactions(INITIAL_TRANSACTIONS);
      } else {
         setTransactions(parsed);
      }
    } else {
      setTransactions(INITIAL_TRANSACTIONS);
    }

    if (savedRole) {
      setRole(savedRole);
    }

    if (savedCurrency) {
      setCurrency(savedCurrency);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('finease_transactions', JSON.stringify(transactions));
      localStorage.setItem('finease_role', role);
      localStorage.setItem('finease_currency', currency);
    }
  }, [transactions, role, currency, isLoading]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('finease_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('finease_theme', 'light');
    }
  }, [darkMode]);

  // Actions
  const handleSaveTransaction = (newTx) => {
    const isEditing = transactions.some(t => t.id === newTx.id);

    setTransactions(prev => {
      const idx = prev.findIndex(t => t.id === newTx.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = newTx;
        return updated.sort((a, b) => new Date(b.date) - new Date(a.date));
      }
      return [newTx, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date));
    });

    setIsFormOpen(false);
    showToast(isEditing ? 'Transaction updated successfully' : 'Transaction created successfully', 'success');
  };

  const handleDeleteTransaction = (id) => {
    if (role === 'viewer') {
      showToast('Action restricted: Viewer access only', 'error');
      return;
    }
    setTransactions(prev => prev.filter(t => t.id !== id));
    showToast('Transaction removed from ledger', 'success');
  };

  const updateRole = (newRole) => {
    setRole(newRole);
    showToast(`Authority set to: ${newRole === 'admin' ? 'Administrator' : 'Auditor'}`, 'success');
  };

  const setEditingTransaction = (tx) => {
    if (role === 'viewer') {
      showToast('Action restricted: Viewer access only', 'error');
      return;
    }
    setEditingTx(tx);
    setIsFormOpen(true);
  };

  const openNewTransaction = () => {
    if (role === 'viewer') {
      showToast('Action restricted: Viewer access only', 'error');
      return;
    }
    setEditingTx(null);
    setIsFormOpen(true);
  };

  const value = {
    transactions,
    setTransactions,
    role,
    setRole: updateRole,
    activeTab,
    setActiveTab,
    isLoading,
    editingTx,
    isFormOpen,
    setIsFormOpen,
    currency,
    setCurrency,
    formatCurrency: (val) => formatCurrency(val, currency),
    currencySymbol: CURRENCY_SYMBOLS[currency] || '$',
    convertFromInr,
    convertToInr,
    handleSaveTransaction,
    handleDeleteTransaction,
    setEditingTransaction,
    openNewTransaction,
    darkMode,
    setDarkMode
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
