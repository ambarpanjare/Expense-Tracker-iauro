const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// console.log('hi');
mongoose
  .connect(process.env.MONGO_URI,)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

  // console.log('hi');
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
