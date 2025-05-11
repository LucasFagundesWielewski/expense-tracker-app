import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, ActivityIndicator, Alert, Modal, Pressable, TouchableOpacity } from 'react-native';
import { fetchExpenses, addExpense, updateExpense, deleteExpense } from '../services/api';
import useAuth from '../hooks/useAuth';
import ExpenseForm from '../components/Expenses/ExpenseForm';
import Navbar from '../components/Shared/Navbar';
import { Ionicons } from '@expo/vector-icons';

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
    Alert.alert('Confirmar', 'Deseja realmente excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await deleteExpense(id);
          setExpenses((prev) => prev.filter((e) => e.id !== id));
        },
      },
    ]);
  };

  const openEditForm = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  const totalExpenses = expenses.reduce((total, expense) => total + expense.value, 0);

  const groupedExpenses = expenses
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .reduce((groups, expense) => {
      const dateObj = new Date(expense.date);
      const date = dateObj.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'UTC',
      });
      if (!groups[date]) groups[date] = [];
      groups[date].push(expense);
      return groups;
    }, {});

  return (
    <>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Dashboard</Text>
        <Text style={styles.total}>Total de Gastos: R$ {totalExpenses.toFixed(2)}</Text>

        {Object.keys(groupedExpenses).length > 0 ? (
          Object.entries(groupedExpenses).map(([date, expensesOnDate]) => (
            <View key={date} style={styles.group}>
              <Text style={styles.date}>{date}</Text>
              {expensesOnDate.map((expense) => (
                <View key={expense.id} style={styles.expenseItem}>
                  <View>
                    <Text style={styles.description}>{expense.description}</Text>
                    <Text>Valor: R$ {expense.value.toFixed(2)}</Text>
                  </View>
                  <View style={styles.buttons}>
                    <Button title="Editar" onPress={() => openEditForm(expense)} />
                    <Button title="Excluir" color="red" onPress={() => handleDeleteExpense(expense.id)} />
                  </View>
                </View>
              ))}
            </View>
          ))
        ) : (
          <Text style={{ marginTop: 20 }}>Nenhuma despesa encontrada.</Text>
        )}
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  total: {
    fontSize: 18,
    marginBottom: 20,
  },
  group: {
    marginBottom: 20,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  expenseItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttons: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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

export default Dashboard;