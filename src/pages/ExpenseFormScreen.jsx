import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { addExpense, fetchExpenses, updateExpense, deleteExpense } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import ExpenseForm from '../components/Expenses/ExpenseForm';
import Navbar from '../components/Shared/Navbar';

const ExpenseFormScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

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

  // Agrupa despesas por categoria (se existir campo category)
  const expensesByCategory = expenses.reduce((acc, expense) => {
    const cat = expense.category || 'Outros';
    acc[cat] = (acc[cat] || 0) + expense.value;
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <div className="container expenses-page">
        <header className="expenses-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h1 style={{ margin: 0 }}>Minhas Despesas</h1>
          </div>
          <button className="button button-primary" onClick={openAddForm} style={{ fontWeight: 'bold', fontSize: 18 }}>
            + Nova Despesa
          </button>
        </header>

        <section className="expenses-summary">
          <div className="summary-card">
            <strong style={{ fontSize: 24, color: '#e11d48' }}>R$ {totalExpenses.toFixed(2)}</strong>
          </div>
          <div className="summary-categories">
            {Object.keys(expensesByCategory).map((cat) => (
              <div key={cat} className="category-chip">
                <span style={{ fontWeight: 600 }}>{cat}</span>
                <span style={{ color: '#6366f1', marginLeft: 8 }}>R$ {expensesByCategory[cat].toFixed(2)}</span>
              </div>
            ))}
          </div>
        </section>

        {showForm && (
          <div className="expense-form-modal">
            <ExpenseForm
              onSubmit={editingExpense ? handleEditExpense : handleAddExpense}
              existingExpense={editingExpense}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        <ul className="expense-list">
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <li key={expense.id} className="expense-item">
                <div className="expense-info">
                  <h3 style={{ margin: 0 }}>{expense.description}</h3>
                  <span className="expense-category">{expense.category || 'Outros'}</span>
                  <p className="expense-date">
                    {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="expense-value">
                  <strong style={{ color: '#e11d48' }}>R$ {expense.value.toFixed(2)}</strong>
                </div>
                <div className="expense-actions">
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
            <p className="no-expenses">Nenhuma despesa cadastrada ainda.<br />Clique em <b>+ Nova Despesa</b> para começar!</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default ExpenseFormScreen;