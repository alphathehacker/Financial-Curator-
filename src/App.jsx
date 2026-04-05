import React from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import Settings from './components/Settings';
import Budget from './components/Budget';
import Analytics from './components/Analytics';
import Reports from './components/Reports';
import Forecasting from './components/Forecasting';
import { useApp } from './store/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const { 
    transactions, 
    role, 
    setRole, 
    activeTab, 
    setActiveTab, 
    isLoading, 
    editingTx, 
    isFormOpen, 
    setIsFormOpen, 
    handleSaveTransaction, 
    handleDeleteTransaction,
    setEditingTransaction,
    openNewTransaction
  } = useApp();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
         <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
            <p className="text-[12px] font-[800] text-muted-foreground uppercase tracking-widest animate-pulse">Initializing curator...</p>
         </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard key="dashboard" transactions={transactions} />;
      case 'transactions':
        return (
          <TransactionList 
            key="transactions" 
            transactions={transactions} 
            role={role} 
            onEdit={setEditingTransaction}
            onDelete={h => handleDeleteTransaction(h)}
          />
        );
      case 'settings':
        return <Settings key="settings" role={role} setRole={setRole} />;
      case 'budget':
        return <Budget key="budget" role={role} />;
      case 'analytics':
        return <Analytics key="analytics" />;
      case 'reports':
        return <Reports key="reports" role={role} />;
      case 'forecasting':
        return <Forecasting key="forecasting" />;
      default:
        return <Dashboard transactions={transactions} />;
    }
  };

  return (
    <Layout 
      role={role} 
      setRole={setRole} 
      onAddTransaction={openNewTransaction}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {isFormOpen && (
            <TransactionForm 
              tx={editingTx} 
              onSave={handleSaveTransaction} 
              onCancel={() => setIsFormOpen(false)} 
            />
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}

export default App;
