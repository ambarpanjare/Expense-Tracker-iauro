import { useState } from 'react';
import axios from 'axios';

function ExpenseForm({ expense, onSubmit }) {
  const [category, setCategory] = useState(expense ? expense.category : '');
  const [amount, setAmount] = useState(expense ? expense.amount : '');
  const [comments, setComments] = useState(expense ? expense.comments : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expenseData = { category, amount, comments };
    try {
      await onSubmit(expenseData);
    } catch (err) {
      console.error('Error submitting expense', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Comments"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      />
      <button type="submit">{expense ? 'Update' : 'Add'} Expense</button>
    </form>
  );
}

export default ExpenseForm;
