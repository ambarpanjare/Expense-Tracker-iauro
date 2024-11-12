import { useEffect, useState } from 'react';
import axios from 'axios';

function ExpenseList({ onDelete, onEdit }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('/api/expenses')
      .then((response) => setExpenses(response.data))
      .catch((error) => console.error('Error fetching expenses:', error));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Amount</th>
          <th>Comments</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense._id}>
            <td>{expense.category}</td>
            <td>{expense.amount}</td>
            <td>{expense.comments}</td>
            <td>
              <button onClick={() => onEdit(expense)}>Edit</button>
              <button onClick={() => onDelete(expense._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExpenseList;
