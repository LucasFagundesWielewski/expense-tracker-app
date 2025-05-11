import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const ExpenseForm = ({ onSubmit, existingExpense }) => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (existingExpense) {
      setDescription(existingExpense.description || '');
      setValue(existingExpense.value ? existingExpense.value.toString() : '');
      setDate(existingExpense.date ? new Date(existingExpense.date) : new Date());
    } else {
      setDescription('');
      setValue('');
      setDate(new Date());
    }
  }, [existingExpense]);

  const isValid =
    description.trim() !== '' &&
    value.trim() !== '' &&
    !isNaN(Number(value)) &&
    Number(value) > 0 &&
    date;

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit({
      description,
      value: parseFloat(value),
      date: date.toISOString(),
    });
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Digite a descrição"
      />
      <Text style={styles.label}>Valor</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder="Digite o valor"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Data</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
        <Text style={styles.dateButtonText}>
          {date ? date.toLocaleDateString() : 'Selecionar data'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeDate}
        />
      )}
      <Button
        title={existingExpense ? 'Atualizar Despesa' : 'Adicionar Despesa'}
        onPress={handleSubmit}
        disabled={!isValid}
        color={isValid ? '#6366f1' : '#ccc'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 8 },
  label: { fontWeight: 'bold', marginTop: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginTop: 4 },
  dateButton: { padding: 10, backgroundColor: '#eee', borderRadius: 4, marginTop: 4, marginBottom: 12 },
  dateButtonText: { fontSize: 16 },
});

export default ExpenseForm;