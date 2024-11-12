const Expense = require('../models/Expense');

const addExpense = async (req, res) => {
  const { category, amount, comments } = req.body;
  try {
    const expense = new Expense({ user: req.user._id, category, amount, comments });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: 'Error adding expense', error });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching expenses', error });
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    if (expense.user.toString() !== req.user._id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    Object.assign(expense, req.body);
    await expense.save();
    res.json(expense);
  } catch (error) {
    res.status(400).json({ message: 'Error updating expense', error });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    if (expense.user.toString() !== req.user._id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await expense.remove();
    res.json({ message: 'Expense removed' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting expense', error });
  }
};

module.exports = { addExpense, getExpenses, updateExpense, deleteExpense };
