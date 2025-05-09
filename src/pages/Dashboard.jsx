import React, { useEffect, useState } from 'react';
import { fetchExpenses, addExpense, updateExpense, deleteExpense } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import ExpenseForm from '../components/Expenses/ExpenseForm';
import Navbar from '../components/Shared/Navbar';
import '../styles/global.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadExpenses = async () => {
      const data = await fetchExpenses(user.uid);
      setExpenses(data);
      setLoading(false);
    };
    loadExpenses();
  }, [user]);

  const handleAddExpense = async (expense) => {
    const newExpense = await addExpense({ ...expense, userId: user.uid });
    setExpenses((prev) => [...prev, newExpense]);
    setShowForm(false);
  };

  const handleEditExpense = async (expense) => {
    await updateExpense(editingExpense.id, expense);
    setExpenses((prev) =>
      prev.map((e) => (e.id === editingExpense.id ? { ...e, ...expense } : e))
    );
    setEditingExpense(null);
    setShowForm(false);
  };

  const handleDeleteExpense = async (id) => {
    await deleteExpense(id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const openAddForm = () => {
    setEditingExpense(null);
    setShowForm(true);
  };

  const openEditForm = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  if (loading) return <div>Carregando...</div>;

  const totalExpenses = expenses.reduce((total, expense) => total + expense.value, 0);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Dashboard</h1>
        <h2>Total de Gastos: R$ {totalExpenses.toFixed(2)}</h2>
        {showForm && (
          <ExpenseForm
            onSubmit={editingExpense ? handleEditExpense : handleAddExpense}
            existingExpense={editingExpense}
          />
        )}
        <ul className="expense-list">
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <li key={expense.id} className="expense-item">
                <div>
                  <h3>{expense.description}</h3>
                  <p>Valor: R$ {expense.value.toFixed(2)}</p>
                  <p>Data: {new Date(expense.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <button
                    className="button button-primary"
                    onClick={() => openEditForm(expense)}
                  >
                    Editar
                  </button>
                  <button
                    className="button button-danger"
                    onClick={() => handleDeleteExpense(expense.id)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>Nenhuma despesa encontrada.</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default Dashboard;