import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  const { id, description, value, date } = expense;

  const handleEdit = () => {
    onEdit(id);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <View style={styles.expenseItem}>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.value}>Valor: R$ {value.toFixed(2)}</Text>
      <Text style={styles.date}>Data: {new Date(date).toLocaleDateString()}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  expenseItem: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: '#e11d48',
  },
  date: {
    fontSize: 14,
    color: '#555',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 12,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ExpenseItem;
