import { subDays, format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isWithinInterval, subMonths } from 'date-fns';

export const CATEGORIES = [
  { id: 'housing', name: 'Housing', color: '#6366f1' },
  { id: 'food', name: 'Food & Dining', color: '#f43f5e' },
  { id: 'transport', name: 'Transportation', color: '#f59e0b' },
  { id: 'entertainment', name: 'Entertainment', color: '#8b5cf6' },
  { id: 'shopping', name: 'Shopping', color: '#ec4899' },
  { id: 'utilities', name: 'Utilities', color: '#ef4444' },
  { id: 'income', name: 'Salary', color: '#10b981' },
  { id: 'other', name: 'Health', color: '#06b6d4' },
];

export const PAYMENT_METHODS = [
  { id: 'gpay', name: 'Google Pay', type: 'upi', color: '#4285F4', icon: 'GPay' },
  { id: 'phonepe', name: 'PhonePe', type: 'upi', color: '#6739B7', icon: 'PhonePe' },
  { id: 'paytm', name: 'Paytm', type: 'upi', color: '#00BAF2', icon: 'Paytm' },
  { id: 'amazonpay', name: 'Amazon Pay', type: 'upi', color: '#FF9900', icon: 'APay' },
  { id: 'hdfc_cc', name: 'HDFC Credit Card', type: 'card', color: '#004C8C', icon: 'CC' },
  { id: 'icici_cc', name: 'ICICI Credit Card', type: 'card', color: '#FF7A33', icon: 'CC' },
  { id: 'amex', name: 'Amex Gold', type: 'card', color: '#0070CE', icon: 'CC' },
  { id: 'axis_dc', name: 'Axis Debit Card', type: 'card', color: '#97144D', icon: 'DC' },
  { id: 'cash', name: 'Physical Cash', type: 'cash', color: '#10b981', icon: 'Cash' },
];

const generateTransactions = () => {
  const transactions = [];
  const now = new Date();
  
  // Salary
  for (let i = 0; i < 4; i++) {
    transactions.push({
      id: `salary-${i}`,
      date: format(startOfMonth(subMonths(now, i)), 'yyyy-MM-dd'),
      amount: 150000,
      category: 'income',
      type: 'income',
      method: 'hdfc_cc', // Salary usually goes to primary bank
      description: 'Monthly Salary Credit',
    });
  }

  // Expenses
  const expenseCategories = CATEGORIES.filter(c => c.id !== 'income');
  for (let i = 0; i < 120; i++) {
    const date = subDays(now, Math.floor(Math.random() * 120));
    const category = expenseCategories[Math.floor(Math.random() * expenseCategories.length)];
    const method = PAYMENT_METHODS[Math.floor(Math.random() * PAYMENT_METHODS.length)];
    const amount = Math.floor(Math.random() * 800) + 20;
    
    transactions.push({
      id: `tx-${i}`,
      date: format(date, 'yyyy-MM-dd'),
      amount: amount,
      category: category.id,
      type: 'expense',
      method: method.id,
      description: `${category.name} via ${method.name}`,
    });
  }

  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const INITIAL_TRANSACTIONS = generateTransactions();

export const calculateSummary = (transactions = []) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const thisMonthData = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });
  
  const lastMonthData = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === (currentMonth === 0 ? 11 : currentMonth - 1) && 
           d.getFullYear() === (currentMonth === 0 ? currentYear - 1 : currentYear);
  });

  const getMetrics = (data) => ({
    income: data.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
    expenses: data.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
  });

  const curr = getMetrics(thisMonthData);
  const prev = getMetrics(lastMonthData);

  const calcTrend = (c, p) => p === 0 ? 0 : ((c - p) / p) * 100;

  return {
    balance: { 
      value: curr.income - curr.expenses, 
      trend: calcTrend(curr.income - curr.expenses, prev.income - prev.expenses) 
    },
    income: { value: curr.income, trend: calcTrend(curr.income, prev.income) },
    expenses: { value: curr.expenses, trend: calcTrend(curr.expenses, prev.expenses) }
  };
};

export const getInsights = (transactions = [], { currency, formatCurrency, convertFromInr }) => {
  const displayVal = (val) => formatCurrency(convertFromInr(val, currency));

  const expenses = transactions.filter(t => t.type === 'expense');
  const catTotals = {};
  expenses.forEach(t => { catTotals[t.category] = (catTotals[t.category] || 0) + t.amount; });

  const sortedCats = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);
  const highest = sortedCats[0];
  const highestCat = CATEGORIES.find(c => c.id === highest?.[0]);

  return [
    { 
      id: 'high-spend',
      title: 'Highest Spending',
      value: highestCat?.name || 'N/A',
      detail: `${displayVal(highest?.[1] || 0)} spent this period`,
      type: 'warning',
      suggestion: `Consider reducing ${highestCat?.name} by 10% to save ${displayVal(Math.round((highest?.[1] || 0) * 0.1))}`
    },
    { 
      id: 'savings-rate',
      title: 'Efficiency Score',
      value: '72%',
      detail: 'Your capital utilization is optimized',
      type: 'success',
      suggestion: 'You are on track to meet your quarterly goals.'
    }
  ];
};

export const getChartData = (transactions = [], period = 'month') => {
  const days = period === 'week' ? 7 : period === 'year' ? 365 : 30;
  const interval = eachDayOfInterval({ start: subDays(new Date(), days), end: new Date() });
  
  let balance = calculateSummary(transactions.filter(t => new Date(t.date) < subDays(new Date(), days))).balance.value;

  return interval.map(date => {
    const dayTxs = transactions.filter(t => isSameDay(new Date(t.date), date));
    const dayInc = dayTxs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const dayExp = dayTxs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    balance += (dayInc - dayExp);
    return {
      name: format(date, days > 30 ? 'MMM' : 'dd MMM'),
      balance: balance,
      income: dayInc,
      expense: dayExp
    };
  });
};
