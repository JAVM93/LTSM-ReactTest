import { Box, useTheme, useMediaQuery, Typography } from "@mui/material";
import RegForm from "./Form";
import Navbar from "../navbar/Sidebar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 800px)");
  const user = useSelector((state) => state.user);
  const userRol = `${user.rol}`;

  return (
    <Box><Navbar />
    
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="0.25rem 6%"
        textAlign="center"
      >
      </Box>{userRol === "administrador" && (
      <Box
        width={isNonMobileScreens ? "70%" : "93%"}
        p="2rem"
        m="1rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <RegForm />
      </Box>)}
      {userRol === "usuario" && (<Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="1rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      > <Typography> Hola {user.firstName} No deberias estar Aqui!!
      <img src="../img/error404.webp" alt="" /></Typography>
      </Box> )}
    </Box>
  );
};

export default RegisterPage;
