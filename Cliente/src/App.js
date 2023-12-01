import Home from "./componentes/homePage/Home"
import Form from "./componentes/loginPage/Login"
import RegisterPage from "./componentes/registrarcolaborador/index";
import { useState, useMemo } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { ProSidebarProvider } from 'react-pro-sidebar';
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { ProfileForm } from "./componentes/profilePage/Profile";


function App(){
  const mode = useSelector((state) => state.mode);
  //const user = useSelector((state) => state.user);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  //const userRol = `${user.rol}`;

  return(
    <div className="App">
      <BrowserRouter><ProSidebarProvider>
      <ThemeProvider theme={theme}>
          <CssBaseline />
        <Routes>
          <Route path="/" element={<Form/>}/> 
          <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/" />}/>
          <Route path="/home/register" element={isAuth ? <RegisterPage /> : <Navigate to="/" />}/>
          <Route path="/profile" element={<ProfileForm />}/>
          {/* <Route path="/register2" element={<RegisterPage2 />}/> */}
          {/* <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            /> */}
          {/*  <Route path="/home/add" element={isAuth ? <AddUser /> : <Navigate to="/" />}/>
           <Route path="/home/edit/:id" element={isAuth ? <EditUser /> : <Navigate to="/" />}/>
         */}</Routes>
        </ThemeProvider></ProSidebarProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;
