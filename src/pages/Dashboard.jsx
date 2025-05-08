import React, { useEffect, useState } from 'react';
import { fetchExpenses } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExpenses = async () => {
      const data = await fetchExpenses(user.uid);
      setExpenses(data);
      setLoading(false);
    };
    loadExpenses();
  }, [user]);

  if (loading) return <div>Loading...</div>;

  const totalExpenses = expenses.reduce((total, expense) => total + expense.value, 0);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Total Expenses: ${totalExpenses.toFixed(2)}</h2>
      {/* Add ExpenseForm and ExpenseList here */}
    </div>
  );
};

export default Dashboard;