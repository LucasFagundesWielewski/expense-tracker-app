import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ExpenseForm = ({ onSubmit, existingExpense }) => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (existingExpense) {
      setDescription(existingExpense.description);
      setValue(existingExpense.value.toString());
      setDate(existingExpense.date);
    }
  }, [existingExpense]);

  const handleSubmit = () => {
    const expenseData = {
      description,
      value: parseFloat(value),
      date,
    };
    onSubmit(expenseData);
    setDescription('');
    setValue('');
    setDate('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Digite a descrição"
          required
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Valor</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          placeholder="Digite o valor"
          keyboardType="numeric"
          required
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Data</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="Digite a data"
          required
        />
      </View>
      <Button
        title={existingExpense ? 'Atualizar Despesa' : 'Adicionar Despesa'}
        onPress={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    fontSize: 16,
  },
});

export default ExpenseForm;
