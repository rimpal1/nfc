import React, { useContext } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import ProfileDetails from "./ProfileDetails";
import { AppContext } from "../../../state/appStateManagement";

const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: "100%",
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
   }
}));

const Account = () => {
   const classes = useStyles();
   const { state } = useContext(AppContext);

   return (
      <Container maxWidth="lg">
         <Grid container spacing={3} alignItems="center" justifyContent="center">
            <Grid item xs={12}>
               <ProfileDetails />
            </Grid>
         </Grid>
      </Container>
   );
};

export default Account;
