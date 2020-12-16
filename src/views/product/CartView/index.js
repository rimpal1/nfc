import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid, makeStyles, Button, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { AppContext } from "../../../state/appStateManagement";

const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: "100%",
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
   },
   table: {
      minWidth: 650
   },
   imageStyle: {
      height: 100,
      width: 100
   },
   tableContainer: {
      maxHeight: 850
   }
}));

const TAX_RATE = 0.09;

const Cart = () => {
   const classes = useStyles();
   const { state, dispatch } = useContext(AppContext);
   const navigate = useNavigate();

   const getTotalItemInCart = () => {
      return state.cart.reduce((sum, { quantity }) => sum + quantity, 0);
   };

   const getTotalPrice = () => {
      return state.cart.reduce((sum, { price, quantity }) => sum + price * quantity, 0);
   };

   const ccyFormat = (num) => {
      return `${num.toFixed(2)}`;
   };

   const invoiceSubtotal = getTotalPrice();
   const invoiceTaxes = TAX_RATE * invoiceSubtotal;
   const invoiceTotal = invoiceTaxes + invoiceSubtotal;

   const onSubmit = () => {
      const payload = {
         totalCost: invoiceTotal,
         customerId: state.tokenData.userInfo.customerId,
         products: state.cart.map((item) => {
            return {
               productId: item.productId,
               quantity: item.quantity
            };
         })
      };
      axios.post("/api/order/create", payload).then((res) => {
         dispatch({
            type: "CLEAR_CART"
         });
         navigate("/app/products", { replace: true });
      });
   };

   return (
      <div className={classes.root}>
         <Container maxWidth={false}>
            <Typography align="center" color="textPrimary" gutterBottom variant="h4">
               YOUR CART ({getTotalItemInCart()} Items)
            </Typography>
            <Grid container spacing={3} direction="column">
               <Grid item xs={12}>
                  <Box mt={2}>
                     <TableContainer component={Paper} className={classes.tableContainer}>
                        <Table stickyHeader className={classes.table}>
                           <TableHead>
                              <TableRow>
                                 <TableCell>Item</TableCell>
                                 <TableCell align="right">Price</TableCell>
                                 <TableCell align="right">Quantity</TableCell>
                                 <TableCell align="right">Total</TableCell>
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              {state.cart.map((product) => (
                                 <TableRow key={product.productId}>
                                    <TableCell component="th" scope="row">
                                       <Box display="flex" justifyContent="flex-start" p={1}>
                                          <img
                                             className={classes.imageStyle}
                                             src={product.imageUrl}
                                          />
                                          <Box ml={2} alignSelf="center">
                                             <Typography
                                                className={classes.fontStyle}
                                                color="textSecondary"
                                                display="inline"
                                                variant="h5"
                                             >
                                                {product.productName}
                                             </Typography>
                                          </Box>
                                       </Box>
                                    </TableCell>
                                    <TableCell align="right">{product.price}</TableCell>
                                    <TableCell align="right">{product.quantity}</TableCell>
                                    <TableCell align="right">
                                       {ccyFormat(product.price * product.quantity)}
                                    </TableCell>
                                 </TableRow>
                              ))}
                              <TableRow>
                                 <TableCell rowSpan={3} />
                                 <TableCell colSpan={2}>Subtotal</TableCell>
                                 <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                              </TableRow>
                              <TableRow>
                                 <TableCell>Tax</TableCell>
                                 <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                                    0
                                 )} %`}</TableCell>
                                 <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                              </TableRow>
                              <TableRow>
                                 <TableCell colSpan={2}>Total</TableCell>
                                 <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                              </TableRow>
                           </TableBody>
                        </Table>
                     </TableContainer>
                  </Box>
               </Grid>
               <Box display="flex" justifyContent="flex-end" p={2}>
                  <Button variant="contained" color="primary" onClick={onSubmit}>
                     Place Order
                  </Button>
               </Box>
            </Grid>
         </Container>
      </div>
   );
};

export default Cart;
