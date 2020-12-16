import React, { useState, useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
   AppBar,
   Badge,
   Box,
   IconButton,
   Toolbar,
   makeStyles,
   Typography,
   Tooltip
} from "@material-ui/core";
import InputIcon from "@material-ui/icons/Input";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { AppContext } from "../../state/appStateManagement";

const useStyles = makeStyles(() => ({
   avatar: {
      width: 60,
      height: 60
   },
   logo: {
      color: "white"
   },
   nfcLogo: {
      color: "white",
      marginTop: "5px"
   },
   cartButton: {
      color: "white"
   }
}));

const TopBar = () => {
   const classes = useStyles();
   const [notifications] = useState([]);
   const { state } = useContext(AppContext);
   const navigate = useNavigate();

   const getTotalItemInCart = () => {
      return state.cart.reduce((sum, { quantity }) => sum + quantity, 0);
   };

   const logout = () => {
      window.localStorage.removeItem("tokenData");
      navigate("/app", { replace: true });
   };

   return (
      <AppBar elevation={0}>
         <Toolbar>
            <RouterLink to="/">
               <Box display="flex" flexDirection="row">
                  <DoubleArrowIcon className={classes.logo} fontSize="large" />
                  <Typography className={classes.nfcLogo} variant="h4">
                     NFC
                  </Typography>
               </Box>
            </RouterLink>
            <Box flexGrow={1} />
            <RouterLink to="/app/cart">
               <Tooltip title="Go to Cart" arrow>
                  <IconButton color="inherit" className={classes.cartButton}>
                     <Badge badgeContent={getTotalItemInCart()} color="error">
                        <ShoppingCartIcon />
                     </Badge>
                  </IconButton>
               </Tooltip>
            </RouterLink>
            <Tooltip title="Logout" arrow>
               <IconButton color="inherit" onClick={logout}>
                  <InputIcon />
               </IconButton>
            </Tooltip>
         </Toolbar>
      </AppBar>
   );
};

export default TopBar;
