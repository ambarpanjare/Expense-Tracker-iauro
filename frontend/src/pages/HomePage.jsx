import { Link } from 'react-router-dom';
import Header from '../components/Header';

function HomePage() {
  return (
    <div>
      <Header />
      <h1>Welcome to the Full Stack Expense Tracker</h1>
      <p>
        Track your expenses efficiently and visualize your spending by category.
      </p>
      <div>
        <h3>Getting Started</h3>
        <ul>
          <li>
            <Link to="/register">Sign Up</Link> to create a new account.
          </li>
          <li>
            <Link to="/login">Login</Link> if you already have an account.
          </li>
          <li>
            <Link to="/expenses">Go to Expenses</Link> to manage your expenses.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
