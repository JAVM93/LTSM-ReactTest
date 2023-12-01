//import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
//import "../estilos/addReport.css";



const loginSchema = yup.object().shape({
  usercode: yup.string().required("Ingrese su Codigo de Usuario"),
  password: yup.string().required("Debe ingresar su Contraseña"),
});


const initialValuesLogin = {
  usercode: "",
  password: "",
};

const Form = () => {
  const [pageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";

  
  const serverLogin ="http://localhost:5000/auth/login";
  //const serverLogin ="http://172.16.4.107:3001/auth/login";


  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(
      serverLogin,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
  };

  return (
    <div className="formulario form-signin w-100 m-auto text-center">
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesLogin}
        validationSchema={loginSchema}
      >
      {/* <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
      > */}
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          }) => (
          <form>
            <img className="logo mb-4" src="../img/Logo-1.png" alt="" />
            <h1 className="h3 mb-3 fw-normal">Bienvenido</h1>
            <Box
              display="grid"
              gap="1.875em"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              
              <TextField
                label="Codigo de Usuario"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.usercode}
                name="usercode"
                error={Boolean(touched.usercode) && Boolean(errors.usercode)}
                helperText={touched.usercode && errors.usercode}
                sx={{ gridColumn: "span 4", width: "100%" }} // Hacer el campo más ancho
              />
              <TextField
                label="Contraseña"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4", width: "100%" }} // Hacer el campo más ancho
              />
            </Box>

            {/* BUTTONS */}
            <Box>
              <Button
                // fullWidth
                type="submit"
                sx={{
                  m: "2rem 0",
                  p: "1rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                  width: "100%", // Hacer el botón más ancho
                }}
                onClick={handleSubmit}
              ><Typography>{"Ingresar"}</Typography></Button>
               
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Form;
