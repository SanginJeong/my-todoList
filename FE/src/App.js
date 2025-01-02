import logo from './logo.svg';
import './App.css';
import { Routes,Route } from 'react-router';
import Layout from './layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LogPage from './pages/LogPage';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/logs' element={<LogPage/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
