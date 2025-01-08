import logo from './logo.svg';
import './App.css';
import { Routes,Route } from 'react-router';
import Layout from './layout/Layout';
import LoginPage from './pages/LoginPage/LoginPage';
import LogPage from './pages/LogPage/LogPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import PrivatePage from './private/PrivatePage';
import LogDetailPage from './pages/LogDetailPage/LogDetailPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<PrivatePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignUpPage/>}/>
          <Route path='/logs' element={<LogPage/>}>
            <Route path=':id' element={<LogDetailPage/>}/>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
