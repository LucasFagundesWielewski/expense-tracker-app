import React, { useEffect, useState } from 'react';
import { getExpenses } from '../services/api';
import ExpenseList from '../components/Expenses/ExpenseList';
import ExpenseForm from '../components/Expenses/ExpenseForm';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      const data = await getExpenses();
      setExpenses(data);
      setLoading(false);
    };

    fetchExpenses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const totalExpenses = expenses.reduce((total, expense) => total + expense.value, 0);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Total Expenses: ${totalExpenses.toFixed(2)}</h2>
      <ExpenseForm setExpenses={setExpenses} />
      <ExpenseList expenses={expenses} setExpenses={setExpenses} />
    </div>
  );
};

export default Dashboard;