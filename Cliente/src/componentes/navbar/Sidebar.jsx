import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ConstructionIcon from "@mui/icons-material/Construction";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupsIcon from "@mui/icons-material/Groups";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../components/FlexBetween";
import "../estilos/addReport.css";
import BadgeUnstyled, { badgeUnstyledClasses } from "@mui/base/BadgeUnstyled";
import { BrowserRouter, Link } from "react-router-dom";
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: "3.875em",
  height: "2.125em",
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(0.375em)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(1.375em)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="1.25em" width="1.25em" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#181818",
    width: "2em",
    height: "2em",
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="1.25em" width="1.25em" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#181818"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const blue = {
  500: "#007FFF",
};

const grey = {
  300: "#afb8c1",
  400: "#bdbdbd",
  900: "#24292f",
};
const StyledBadge = styled(BadgeUnstyled)(
  ({ theme }) => `
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-variant: tabular-nums;
  list-style: none;
  font-family: IBM Plex Sans, sans-serif;
  position: relative;
  display: inline-block;
  line-height: 1;

  & .${badgeUnstyledClasses.badge} {
    z-index: auto;
    position: absolute;
    top: 0;
    right: 0;
    min-width: 14px;
    height: 14px;
    padding: 0 6px;
    color: #fff;
    font-weight: 600;
    font-size: 11px;
    line-height: 14px;
    white-space: nowrap;
    text-align: center;
    border-radius: 7px;
    background: ${blue[500]};
    box-shadow: 0px 4px 8px ${
      theme.palette.mode === "dark" ? grey[900] : grey[300]
    };
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
  }
  & .${badgeUnstyledClasses.invisible} {
    display: none;
  }
  `
);
const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 800px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;
  const Name = `${user.firstName}`;
  const userArea = `${user.jobArea}`;

  const handleGroup = () => {
    navigate("/home/register");
  };

  return (
    <FlexBetween padding="0.2rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          className="tracking-in-expand"
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
        >
          <img className="logobar" src="../img/Logo-1.png" alt="" />
          {userArea.charAt(0).toUpperCase() + userArea.slice(1)}
        </Typography>
        {/* {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Buscar..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )} */}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <SummarizeIcon sx={{ fontSize: "1.563em" }} />
          <StyledBadge badgeContent={11} max={10}>
            <Notifications sx={{ fontSize: "1.563em" }} />
          </StyledBadge>
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "9.6em",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{Name}</Typography>
              </MenuItem>
              <MenuItem>
                <MaterialUISwitch
                  sx={{ m: 1, alignContent: "center" }}
                  onClick={() => dispatch(setMode())}
                >
                  {theme.palette.mode === "dark" ? (
                    <LightMode sx={{ color: dark, fontSize: "1.563em" }} />
                  ) : (
                    <DarkMode sx={{ fontSize: "1.563em" }} />
                  )}{" "}
                </MaterialUISwitch>
              </MenuItem>
              <MenuItem onClick={() => navigate("/home")}>
                <ConstructionIcon sx={{ m: 1 }} /> Todos los Reportes
              </MenuItem>
              <MenuItem onClick={() => navigate("/home")}>
                <SummarizeIcon sx={{ m: 1 }} /> Gestionar Problemas
              </MenuItem>{" "}
              {user.rol === "administrador" && (
                <MenuItem onClick={handleGroup}>
                  <GroupsIcon sx={{ m: 1 }} />
                  Colaboradores
                </MenuItem>
              )}
              ;
              <MenuItem onClick={() => navigate("/home")}>
                <CalendarMonthIcon sx={{ m: 1 }} />
                Calendario
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>
                <LogoutIcon sx={{ m: 1 }} /> Cerrar Sesión
              </MenuItem>
            </Select>
          </FormControl>          
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      

      {/* MOBILE NAV tha autoclose when user touch or click in other place, with a responsive design*/}
      {!isNonMobileScreens && !isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          top="1.75rem"
          height="100%"
          zIndex="10"
          maxWidth="6.25em"
          minWidth="3.125em"
          backgroundColor={background}
          borderRadius="0.25rem"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.25)"
          overflow="hidden"
        ><div onClick={() => setIsMobileMenuToggled(false)}>
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            sx={{
              position: "absolute",
              top: "0.25rem",
              right: "0.25rem",
              color: "primary",
            }}
          >
            <Close />
          </IconButton>
          <FlexBetween
            flexDirection="column"
            gap="1.5rem"
            padding="1.5rem 0.5rem"
          >
            <FlexBetween
              flexDirection="column"
              gap="1.5rem"
              padding="1.5rem 0.5rem"
            >
              <IconButton>
                <SummarizeIcon sx={{ fontSize: "1.563em" }} />
              </IconButton>
              <IconButton>
                <Notifications sx={{ fontSize: "1.563em" }} />
              </IconButton>
              <IconButton>
                <FormControl variant="standard" value={fullName}>
                  <Select
                    value={fullName}
                    sx={{
                      backgroundColor: neutralLight,
                      width: "9.6em",
                      borderRadius: "0.25rem",
                      p: "0.25rem 1rem",
                      "& .MuiSvgIcon-root": {
                        pr: "0.25rem",
                        width: "3rem",
                      },
                      "& .MuiSelect-select:focus": {
                        backgroundColor: neutralLight,
                      },
                    }}
                    input={<InputBase />}
                  >
                    <MenuItem value={fullName}>
                      <Typography>{Name}</Typography>
                    </MenuItem>
                    <MenuItem>
                      <MaterialUISwitch
                        sx={{ m: 1, alignContent: "center" }}
                        onClick={() => dispatch(setMode())}
                      >
                        {theme.palette.mode === "dark" ? (
                          <LightMode sx={{ color: dark, fontSize: "1.563em" }} />
                        ) : (
                          <DarkMode sx={{ fontSize: "1.563em" }} />
                        )}{" "}
                      </MaterialUISwitch>
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/home")}>
                      <ConstructionIcon sx={{ m: 1 }} /> Todos los Reportes
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/home")}>
                      <SummarizeIcon sx={{ m: 1 }} /> Gestionar Problemas
                    </MenuItem>{" "}
                    {user.rol === "administrador" && (
                      <MenuItem onClick={handleGroup}>
                        <GroupsIcon sx={{ m: 1 }} />
                        Colaboradores
                      </MenuItem>
                    )}
                    ;
                    <MenuItem onClick={() => navigate("/home")}>
                      <CalendarMonthIcon sx={{ m: 1 }} />
                      Calendario
                    </MenuItem>
                    <MenuItem onClick={() => dispatch(setLogout())}>
                      <LogoutIcon sx={{ m: 1 }} /> Cerrar Sesión
                    </MenuItem>
                  </Select>
                </FormControl>
              </IconButton>
              </FlexBetween>
              </FlexBetween>
              </div>
              </Box> )}   




    </FlexBetween>
  );
};

export default Navbar;
