import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  makeStyles,
  Box,
  Typography,
} from "@material-ui/core";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";

const useStyles = makeStyles({
  root: {},
  toolbar: {
    height: 64,
  },
  logo: {
    color: "white",
  },
  nfcLogo: {
    color: "white",
    marginTop: "5px",
  },
});

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <Box display="flex" flexDirection="row">
            <DoubleArrowIcon className={classes.logo} fontSize="large" />
            <Typography className={classes.nfcLogo} variant="h4">
              NFC
            </Typography>
          </Box>
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};

export default TopBar;
