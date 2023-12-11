import React, { useEffect, useState } from "react";
import { useApi } from "../../context";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  MenuItem,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  Grid,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { Formik } from "formik";
import * as yup from "yup";
import MuiAlert from "@mui/material/Alert";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  usercode: yup.string().required("required"),
  password: yup.string().required("required"),
  rol: yup.string().required("required"),
  jobArea: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  usercode: "",
  password: "",
  rol: "",
  jobArea: "",
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RegForm = () => {
  const { apiBaseUrl } = useApi();
  const [pageType, setPageType] = useState("register");
  const [rol, setRol] = useState("");
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isRegister = pageType === "register";
  const [open, setOpen] = React.useState(false);
  const [error, setErrorOpen] = React.useState(false);
  const serverRegister = `${apiBaseUrl}/users/register`;

  const register = async (values, onSubmitProps) => {
    const savedUserResponse = await fetch(serverRegister, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser && !savedUser.error) {
      console.log("Registrado");
      setOpen(true);
    } else {
      console.log("Error al registrar");
      setErrorOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setErrorOpen(false);
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <div className="formulario form-signin w-100 m-auto text-center">
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesRegister}
        validationSchema={registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          resetForm,
        }) => (
          <form>
            <h1 className="h3 mb-3 fw-normal">Registrar Colaborador</h1>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombre"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helpertext={touched.firstName && errors.firstName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Apellido"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helpertext={touched.lastName && errors.lastName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="area">Area de Trabajo</InputLabel>
                  <Select
                    labelId="area"
                    id="area"
                    onBlur={handleBlur}
                    name="jobArea"
                    value={values.jobArea}
                    onChange={handleChange}
                    error={Boolean(touched.jobArea) && Boolean(errors.jobArea)}
                    helpertext={touched.jobArea && errors.jobArea}
                  >
                    <MenuItem value="tecnologia">Tecnología</MenuItem>
                    <MenuItem value="mantenimiento">Mantenimiento</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="rol">Tipo de Usuario</InputLabel>
                  <Select
                    labelId="rol"
                    id="rol"
                    onBlur={handleBlur}
                    name="rol"
                    value={values.rol}
                    onChange={handleChange}
                    error={Boolean(touched.rol) && Boolean(errors.rol)}
                    helpertext={touched.rol && errors.rol}
                  >
                    <MenuItem value="usuario">Usuario</MenuItem>
                    <MenuItem value="administrador">Administrador</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Codigo de Usuario"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.usercode}
                  name="usercode"
                  error={Boolean(touched.usercode) && Boolean(errors.usercode)}
                  helpertext={touched.usercode && errors.usercode}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contraseña"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helpertext={touched.password && errors.password}
                  fullWidth
                />
              </Grid>
            </Grid>

            {/* BUTTONS */}
            <Box mt={2}>
              <Button
                fullWidth
                type="submit"
                sx={{
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                }}
                onClick={handleSubmit}
              >
                <Typography>{"Registrar"}</Typography>
              </Button>
              <Snackbar
                open={error}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  No se Registro el Usuario!
                </Alert>
              </Snackbar>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Usuario Registrado!
                </Alert>
              </Snackbar>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default RegForm;
