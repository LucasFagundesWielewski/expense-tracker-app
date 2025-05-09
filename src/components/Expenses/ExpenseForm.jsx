import React, { useState, useEffect } from 'react';
import '../../styles/global.css';

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
    <form className="container" onSubmit={handleSubmit}>
      <div>
        <label>Descrição</label>
        <input
          className="input"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Valor</label>
        <input
          className="input"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Data</label>
        <input
          className="input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button className="button button-primary" type="submit">
        {existingExpense ? 'Atualizar Despesa' : 'Adicionar Despesa'}
      </button>
    </form>
  );
};

export default ExpenseForm;