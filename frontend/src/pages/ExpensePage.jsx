import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpensePage() {
  const [editingExpense, setEditingExpense] = useState(null);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    axios.get('/api/expenses')
      .then(response => setExpenseData(response.data))
      .catch(error => console.error('Error fetching expenses', error));
  }, []);

  const handleAddExpense = async (expense) => {
    await axios.post('/api/expenses', expense, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setExpenseData([...expenseData, expense]);
  };

  const handleEditExpense = async (expense) => {
    await axios.put(`/api/expenses/${expense._id}`, expense, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setExpenseData(
      expenseData.map((exp) => (exp._id === expense._id ? expense : exp))
    );
  };

  const handleDeleteExpense = async (id) => {
    await axios.delete(`/api/expenses/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setExpenseData(expenseData.filter((exp) => exp._id !== id));
  };

  // Data for pie chart visualization
  const categories = expenseData.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(categories),
    datasets: [{
      data: Object.values(categories),
      backgroundColor: ['#FFB6C1', '#FFD700', '#8A2BE2', '#32CD32', '#FF6347'],
    }],
  };

  return (
    <div>
      <Header />
      <h2>Manage Expenses</h2>
      <ExpenseForm expense={editingExpense} onSubmit={editingExpense ? handleEditExpense : handleAddExpense} />
      <ExpenseList onDelete={handleDeleteExpense} onEdit={setEditingExpense} />
      <div>
        <h3>Expense Distribution</h3>
        <Pie data={chartData} />
      </div>
    </div>
  );
}

export default ExpensePage;
