import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import ExpenseForm from '../components/Expenses/ExpenseForm';


const ExpenseFormScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();


  const { existingExpense, onSubmit } = route.params || {};


  const handleSubmit = (expense) => {
    if (onSubmit) {
      onSubmit(expense);
    }
    navigation.goBack();
  };


  return (
    <ExpenseForm
      onSubmit={handleSubmit}
      existingExpense={existingExpense || null}
    />
  );
};


export default ExpenseFormScreen;



