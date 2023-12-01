//import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Navbar from "../navbar/Sidebar";
import RegReporte from "../reportes/regReporte";
import "./home.css";
import { Box, Button, useMediaQuery } from "@mui/material";
import AddReport from "../components/addReport";
import RegisterPage from "../registrarcolaborador";
import { useDispatch, useSelector } from "react-redux";
import UserWidget from "../widgets/UserWidget";
// import UserList from "../users/UserList";
import PostWidget from "../widgets/PostWidget";

const Home = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.user);
  const { _id } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setOpenModal(true);
  };

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} />
        </Box>
        <Box
          fullWidth
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {" "}
          {/* {!openModal && <Reportes />} */}
          {openModal && <RegReporte />}
          {/* <MyPostWidget />*/}
          {!openModal && <PostWidget userId={_id} /> }
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            {/* <AdvertWidget /> */}
            <Box m="2rem 0" />
          </Box>
        )}
      </Box>
      <AddReport handleClick={handleClick} />
    </Box>
  );
};
export default Home;
