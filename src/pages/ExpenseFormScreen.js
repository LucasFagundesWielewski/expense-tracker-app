import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addExpense, fetchExpenses, updateExpense, deleteExpense } from '../services/api';
import useAuth from '../hooks/useAuth';
import ExpenseForm from '../components/Expenses/ExpenseForm';
import Navbar from '../components/Shared/Navbar';
import { Ionicons } from '@expo/vector-icons';

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

  const totalExpenses = expenses.reduce((total, expense) => total + expense.value, 0);

  if (loading) {
    return (
      <View style={styles.centered}>
        <Navbar />
        <ActivityIndicator size="large" color="#e11d48" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Minhas Despesas</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => { setEditingExpense(null); setShowForm(true); }}>
          <Text style={styles.addButtonText}>+ Nova Despesa</Text>
        </TouchableOpacity>

        <Text style={styles.total}>Total: R$ {totalExpenses.toFixed(2)}</Text>

        {expenses.map((expense) => (
          <View key={expense.id} style={styles.expenseItem}>
            <Text style={styles.expenseText}>{expense.description}</Text>
            <Text style={styles.expenseText}>R$ {expense.value.toFixed(2)}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => { setEditingExpense(expense); setShowForm(true); }}>
                <Text style={styles.editText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteExpense(expense.id)}>
                <Text style={styles.deleteText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={showForm}
        animationType="fade"
        transparent
        onRequestClose={() => setShowForm(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowForm(false)}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <TouchableOpacity style={styles.closeIcon} onPress={() => setShowForm(false)}>
              <Ionicons name="close" size={28} color="#22223b" />
            </TouchableOpacity>
            <ExpenseForm
              onSubmit={editingExpense ? handleEditExpense : handleAddExpense}
              existingExpense={editingExpense}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  total: { fontSize: 18, marginBottom: 10 },
  addButton: { backgroundColor: '#6366f1', padding: 10, borderRadius: 8, marginBottom: 20 },
  addButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  expenseItem: { marginBottom: 15, padding: 10, backgroundColor: '#eee', borderRadius: 8 },
  expenseText: { fontSize: 16 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  editText: { color: '#6366f1' },
  deleteText: { color: '#e11d48' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(34, 34, 59, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    elevation: 8,
    shadowColor: '#22223b',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 2,
    padding: 4,
  },
});

export default ExpenseFormScreen;