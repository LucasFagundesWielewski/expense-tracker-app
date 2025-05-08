import React from 'react';

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  const { id, description, value, date } = expense;

  const handleEdit = () => {
    onEdit(id);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="expense-item">
      <h3>{description}</h3>
      <p>Value: ${value.toFixed(2)}</p>
      <p>Date: {new Date(date).toLocaleDateString()}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ExpenseItem;