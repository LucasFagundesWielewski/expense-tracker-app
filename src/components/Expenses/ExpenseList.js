import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ExpenseItem from './ExpenseItem';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  if (expenses.length === 0) {
    return <Text style={styles.noExpenses}>Nenhuma despesa encontrada.</Text>;
  }

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ExpenseItem 
          expense={item} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  noExpenses: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ExpenseList;
