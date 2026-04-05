import React, { useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { subDays, format, isSameDay } from 'date-fns';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 400 } }
};

export default function SpendingTrendChart({ transactions = [], currency = 'INR', darkMode = false }) {
  const data = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), 6 - i);
      const dayName = format(date, 'eee');
      const amount = transactions
        .filter(t => t.type === 'expense' && isSameDay(new Date(t.date), date))
        .reduce((sum, t) => sum + t.amount, 0);
      
      return { day: dayName, amount };
    });
    return last7Days;
  }, [transactions]);

  const formatCurrency = (val) => 
    new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', { 
      style: 'currency', 
      currency: currency,
      maximumFractionDigits: 0 
    }).format(val);

  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className="bg-card border border-border p-6 rounded-[40px] shadow-sm relative overflow-hidden group transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[15px] font-[1000] tracking-tighter text-foreground uppercase tracking-widest leading-none">Spending Trend</h3>
          <p className="text-[9px] font-[900] text-muted-foreground/30 uppercase tracking-[0.2em] mt-1.5">Last 7 Days</p>
        </div>
        <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
          <span className="text-[10px] font-[1000] text-indigo-600 uppercase tracking-widest">Live Rail</span>
        </div>
      </div>

      <div className="h-[140px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: darkMode ? '#131720' : '#ffffff', 
                borderRadius: '16px', 
                border: '1px solid hsl(var(--border))', 
                fontSize: '10px',
                fontWeight: '800',
                padding: '8px 12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}
              formatter={(value) => [formatCurrency(value), 'Spent']}
              labelStyle={{ color: 'hsl(var(--muted-foreground))', marginBottom: '4px' }}
            />
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke="#6366f1" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#trendGradient)"
              animationDuration={1500}
              dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: darkMode ? '#131720' : '#ffffff' }}
              activeDot={{ r: 6, fill: '#6366f1', strokeWidth: 0 }}
            />
            <XAxis 
              dataKey="day" 
              hide={false} 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 9, fontWeight: 900, fill: 'hsl(var(--muted-foreground))', opacity: 0.4 }}
              dy={10}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
}
