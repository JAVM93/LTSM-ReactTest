import { Box, useTheme, useMediaQuery } from "@mui/material";
import RegForm from "./Form";
import Navbar from "../navbar/Sidebar";
import { useSelector } from "react-redux";

const RegisterPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 800px)");
  const user = useSelector((state) => state.user);
  

  return (
    <Box>    
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <RegForm />
      </Box>
      </Box>
  );
};

export default RegisterPage;
