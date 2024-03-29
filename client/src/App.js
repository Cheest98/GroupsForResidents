import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from './scenes/homePage';
import LoginPage from './scenes/loginPage';
import ProfilePage from './scenes/profilePage';
import TaskPage from './scenes/taskPage';
import ShoppingListPage from './scenes/shoppingPage';
import CalendarPage from './scenes/calendarPage';
import './App.css';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import { themeSettings } from "./theme";

function App() {
  
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const isAuth= Boolean(useSelector(({ token }) => token ));

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={ isAuth ? <HomePage /> : <Navigate to="/"/>}/>
            <Route path="/tasks" element={ isAuth ? <TaskPage /> : <Navigate to="/"/> }/>
            <Route path="/profile/:userId" element={  isAuth ?  <ProfilePage /> : <Navigate to="/" />}/>
            <Route path="/lists" element={ isAuth ? <ShoppingListPage /> : <Navigate to="/"/>}/>
            <Route path="/events" element={ isAuth ? <CalendarPage /> : <Navigate to="/"/>}/>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
