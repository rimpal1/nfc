import React, { useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
   Box,
   Button,
   Container,
   Grid,
   Link,
   TextField,
   Typography,
   makeStyles
} from "@material-ui/core";
import axios from "axios";
import { AppContext } from "../../state/appStateManagement";

const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: theme.palette.background.dark,
      height: "100%",
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
   }
}));

const LoginView = () => {
   const classes = useStyles();
   const navigate = useNavigate();
   const { dispatch } = useContext(AppContext);

   const onSubmit = (values) => {};

   return (
      <div className={classes.root}>
         <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
            <Container maxWidth="sm">
               <Formik
                  initialValues={{
                     email: "",
                     password: ""
                  }}
                  validationSchema={Yup.object().shape({
                     email: Yup.string()
                        .email("Must be a valid email")
                        .max(255)
                        .required("Email is required"),
                     password: Yup.string().max(255).required("Password is required")
                  })}
                  onSubmit={(values, { setSubmitting, setFieldError }) => {
                     setSubmitting(true);
                     axios
                        .post("/api/auth/login", values)
                        .then((response) => {
                           dispatch({
                              type: "LOGIN_SUCCESS",
                              payload: response.data
                           });
                           navigate("/", { replace: true });
                        })
                        .catch((err) => {
                           if (err.response.status === 401) {
                              setFieldError("password", err.response.data);
                           } else if (err.response.status === 404) {
                              setFieldError("email", err.response.data);
                           }
                        })
                        .finally(() => {
                           setSubmitting(false);
                        });
                  }}
               >
                  {({
                     errors,
                     handleBlur,
                     handleChange,
                     handleSubmit,
                     isSubmitting,
                     touched,
                     values
                  }) => (
                     <form onSubmit={handleSubmit}>
                        <Box mb={3}>
                           <Typography color="textPrimary" variant="h2">
                              Sign in
                           </Typography>
                           <Box mt={1}>
                              <Typography color="textSecondary" variant="body2">
                                 Sign in on the Newark Fullfilment center
                              </Typography>
                           </Box>
                        </Box>
                        <TextField
                           error={Boolean(touched.email && errors.email)}
                           fullWidth
                           helperText={touched.email && errors.email}
                           label="Email Address"
                           margin="normal"
                           name="email"
                           onBlur={handleBlur}
                           onChange={handleChange}
                           type="email"
                           value={values.email}
                           variant="outlined"
                        />
                        <TextField
                           error={Boolean(touched.password && errors.password)}
                           fullWidth
                           helperText={touched.password && errors.password}
                           label="Password"
                           margin="normal"
                           name="password"
                           onBlur={handleBlur}
                           onChange={handleChange}
                           type="password"
                           value={values.password}
                           variant="outlined"
                        />
                        <Box my={2}>
                           <Button
                              color="primary"
                              disabled={isSubmitting}
                              fullWidth
                              size="large"
                              type="submit"
                              variant="contained"
                           >
                              Sign in now
                           </Button>
                        </Box>
                        <Typography color="textSecondary" variant="body1">
                           Don&apos;t have an account?{" "}
                           <Link component={RouterLink} to="/register" variant="h6">
                              Sign up
                           </Link>
                        </Typography>
                     </form>
                  )}
               </Formik>
            </Container>
         </Box>
      </div>
   );
};

export default LoginView;
