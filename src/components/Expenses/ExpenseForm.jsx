import React, { useState, useEffect } from 'react';

const ExpenseForm = ({ onSubmit, existingExpense }) => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (existingExpense) {
      setDescription(existingExpense.description);
      setValue(existingExpense.value);
      setDate(existingExpense.date);
    }
  }, [existingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Value</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">{existingExpense ? 'Update Expense' : 'Add Expense'}</button>
    </form>
  );
};

export default ExpenseForm;