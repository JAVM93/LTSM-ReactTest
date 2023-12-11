import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  TextField,
  MenuItem,
  Grid,
  InputLabel,
  Select,
} from "@mui/material";
import axios from "axios";

const initialValues = {
  fecha: "",
  personaQueReporta: "",
  sitioOLugar: "",
  problema: "",
  descripcionDelProblema: "",
  personaAsignada: "",
  solucionado: false,
  descripcionDeLaSolucion: "",
  fechaDeLaSolucion: "",
};

const validationSchema = Yup.object().shape({
  fecha: Yup.date().required("La fecha es requerida"),
  personaQueReporta: Yup.string().required(
    "La persona que reporta es requerida"
  ),
  sitioOLugar: Yup.string().required("El sitio o lugar es requerido"),
  problema: Yup.string().required("El problema es requerido"),
  descripcionDelProblema: Yup.string().required(
    "La descripción del problema es requerida"
  ),
  personaAsignada: Yup.string().required("La persona asignada es requerida"),
  solucionado: Yup.boolean().required("La solución es requerida"),
  descripcionDeLaSolucion: Yup.string().when("solucionado", {
    is: true,
    then: Yup.string().required("La descripción de la solución es requerida"),
  }),
  fechaDeLaSolucion: Yup.date().when("solucionado", {
    is: true,
    then: Yup.date().required("La fecha de la solución es requerida"),
  }),
});

const RegReporte = () => {
  const values = "Hola Mundo";
  const formik = useFormik({
    initialValues,
    validationSchema,
    //handleSubmit,
    onSubmit: (values) => {
      // Aquí puedes enviar los datos del formulario al backend
      
      console.log(values);
    },
  });

 /*  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  }; */

  const [users, setUsers] = useState([]);
  const [solucionado, setSolucionado] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get("/users/getUserlist/"); // URL para obtener la lista de usuarios
      setUsers(response.data);
    };
    getUsers();
  }, []);
  

  const handleSolucionadoChange = (event) => {
    setSolucionado(event.target.checked);

    if (!event.target.checked) {
      formik.setFieldValue("descripcionDeLaSolucion", "");
      formik.setFieldError("descripcionDeLaSolucion", undefined);
      formik.setFieldTouched("descripcionDeLaSolucion", false);
      formik.setFieldRequired("descripcionDeLaSolucion", false);
    } else {
      formik.setFieldRequired("descripcionDeLaSolucion", true);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="fecha"
              name="fecha"
              label="Fecha"
              type="date"
              InputLabelProps={{ shrink: true }}
              error={formik.touched.fecha && Boolean(formik.errors.fecha)}
              helperText={formik.touched.fecha && formik.errors.fecha}
              {...formik.getFieldProps("fecha")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="personaQueReporta"
              name="personaQueReporta"
              label="Persona que Reporto"
              error={
                formik.touched.personaQueReporta &&
                Boolean(formik.errors.personaQueReporta)
              }
              helperText={
                formik.touched.personaQueReporta &&
                formik.errors.personaQueReporta
              }
              {...formik.getFieldProps("personaQueReporta")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="sitioOLugar"
              name="sitioOLugar"
              label="Sitio o lugar"
              error={
                formik.touched.sitioOLugar && Boolean(formik.errors.sitioOLugar)
              }
              helperText={
                formik.touched.sitioOLugar && formik.errors.sitioOLugar
              }
              {...formik.getFieldProps("sitioOLugar")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="problema"
              name="problema"
              label="problema"
              error={formik.touched.problema && Boolean(formik.errors.problema)}
              helperText={formik.touched.problema && formik.errors.problema}
              {...formik.getFieldProps("problema")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="descripcionDelProblema"
              name="descripcionDelProblema"
              label="Descripcion Del Problema"
              error={
                formik.touched.descripcionDelProblema &&
                Boolean(formik.errors.descripcionDelProblema)
              }
              helperText={
                formik.touched.descripcionDelProblema &&
                formik.errors.descripcionDelProblema
              }
              {...formik.getFieldProps("descripcionDelProblema")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <InputLabel
                fullWidth
                id="persona-asignada-label"
                name="persona-asignada-label"
                label="persona-asignada-label"
              >
                Persona Asignada
              </InputLabel>
              <Select
                sx={{ minWidth: 300 }}
                labelId="persona-asignada-label"
                id="personaAsignada"
                name="personaAsignada"
                value={formik.values.personaAsignada}
                onChange={formik.handleChange}
                error={
                  formik.touched.personaAsignada &&
                  Boolean(formik.errors.personaAsignada)
                }
              >
                {users.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Checkbox
              fullWidth
              id="solucionado"
              name="solucionado"
              label="¿Fue solucionado?"
              type="checkbox"
              checked={formik.values.solucionado}
              onChange={formik.handleChange}
              error={
                formik.touched.solucionado && Boolean(formik.errors.solucionado)
              }
            />
            ¿Fue solucionado?
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="descripcionDeLaSolucion"
              name="descripcionDeLaSolucion"
              label="Descripción de la solución"
              type="text"
              value={formik.values.descripcionDeLaSolucion}
              onChange={formik.handleChange}
              error={
                formik.touched.descripcionDeLaSolucion &&
                Boolean(formik.errors.descripcionDeLaSolucion)
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={formik.handleSubmit}
            >
              Enviar
            </Button>
          </Grid>{" "}
        </Grid>
      </form>
    </Box>
  );
};

export default RegReporte;
