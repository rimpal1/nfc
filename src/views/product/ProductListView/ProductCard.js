import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
   Avatar,
   Box,
   Card,
   CardContent,
   CardMedia,
   Divider,
   Grid,
   Typography,
   makeStyles,
   Button,
   Tooltip,
   Chip
} from "@material-ui/core";
import _ from "lodash";
import { green } from "@material-ui/core/colors";
import { AppContext } from "../../../state/appStateManagement";

const useStyles = makeStyles((theme) => ({
   root: {
      display: "flex",
      flexDirection: "column"
   },
   statsItem: {
      alignItems: "center",
      display: "flex"
   },
   statsIcon: {
      marginRight: theme.spacing(1)
   },
   media: {
      height: 0,
      paddingTop: "56.25%", // 16:9,
      backgroundSize: "contain !important"
   },
   fontStyle: {
      fontWeight: 600
   },
   chip: {
      backgroundColor: green[700],
      color: "white"
   }
}));

const getInstock = (instock) => {
   return `Instock - ${instock}`;
};

const ProductCard = ({ className, product, ...rest }) => {
   const classes = useStyles();
   const { state, dispatch } = useContext(AppContext);

   useEffect(() => {
      console.log(state.cart);
   }, [state]);

   return (
      <Card className={clsx(classes.root, className)} {...rest}>
         <Box display="flex" justifyContent="flex-start" width={3} ml={1} pt={1}>
            <Chip className={classes.chip} size="small" label={getInstock(product.inStock)} />
         </Box>

         <CardMedia className={classes.media} image={product.imageUrl} />
         <Tooltip title={product.description} arrow placement="bottom">
            <CardContent>
               <Typography align="center" color="textPrimary" gutterBottom variant="h4">
                  {product.productName}
               </Typography>
               <Typography align="center" color="textPrimary" variant="body1">
                  {_.truncate(product.description, { length: 150, separator: " " })}
               </Typography>
            </CardContent>
         </Tooltip>
         <Box flexGrow={1} />
         <Divider />
         <Box p={2}>
            <Grid container justify="space-between" spacing={2}>
               <Grid className={classes.statsItem} item>
                  <Typography
                     className={classes.fontStyle}
                     color="textSecondary"
                     display="inline"
                     variant="body1"
                  >
                     ${product.price}
                  </Typography>
               </Grid>
               <Grid className={classes.statsItem} item>
                  <Button
                     variant="contained"
                     color="primary"
                     onClick={() => {
                        console.log("products inside medis", product);
                        dispatch({
                           type: "ADD_TO_CART",
                           payload: product
                        });
                     }}
                  >
                     Add to Cart
                  </Button>
               </Grid>
            </Grid>
         </Box>
      </Card>
   );
};

ProductCard.propTypes = {
   className: PropTypes.string,
   product: PropTypes.object.isRequired
};

export default ProductCard;
