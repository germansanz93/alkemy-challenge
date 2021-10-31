import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PieChartIcon from '@mui/icons-material/PieChart';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import withStyles from "@mui/styles/withStyles";

import styles from "./styles/AppbarStyles";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function PersistentDrawerLeft(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { classes, balance, title } = props;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar className={classes.appbar} position="fixed" open={open} >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Alkemy Challenge
          </Typography>
          <Button color="inherit"><AccountCircleIcon fontSize="large" /></Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <div className={classes.leftUsrPanel}>
            <div>
              <Typography variant="h6" noWrap>User</Typography>
              <Typography variant="h6" noWrap>Balance: ${balance}</Typography>
            </div>
          </div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button key="Dashboard" onClick={handleDrawerClose}>
            <Link className={classes.link} to={"/"}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </Link>
          </ListItem>
          <ListItem button key="Movements" onClick={handleDrawerClose}>
            <Link className={classes.link} to={"/movements"}>
              <ListItemIcon>
                <ShuffleIcon />
              </ListItemIcon>
              <ListItemText primary="Movements" />
            </Link>
          </ListItem>
          <ListItem button key="Incomes" onClick={handleDrawerClose}>
            <Link className={classes.link} to={"/incomes"}>
              <ListItemIcon>
                <KeyboardArrowUpIcon />
              </ListItemIcon>
              <ListItemText primary="Incomes" />
            </Link>
          </ListItem>
          <ListItem button key="Expenses" onClick={handleDrawerClose}>
            <Link className={classes.link} to={"/expenses"}>
              <ListItemIcon>
                <KeyboardArrowDownIcon />
              </ListItemIcon>
              <ListItemText primary="Expenses" />
            </Link>
          </ListItem>
          <ListItem button key="Categories" onClick={handleDrawerClose}>
            <Link className={classes.link} to={"/"}>
              <ListItemIcon>
                <PieChartIcon />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </Link>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open} className={classes.root}>
        <DrawerHeader>
          <h2 className={classes.title}>{title}</h2>
        </DrawerHeader>
        <div className={classes.childs}>
          {props.children}
        </div>
      </Main>
    </Box>
  );
}

export default withStyles(styles)(PersistentDrawerLeft);