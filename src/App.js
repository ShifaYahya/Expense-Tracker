
import {BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import LoginPage from "./pages/auth/LoginPage";
import ExpenseTracker from "./pages/auth/expense-tracker/ExpenseTracker";

function App() {
  return (
    <>
   
    <Router>
      <Routes>
        <Route path="/" exact element={<LoginPage/>}></Route>
        <Route path="expense-tracker" exact element={<ExpenseTracker/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
