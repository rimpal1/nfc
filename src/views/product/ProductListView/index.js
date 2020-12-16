import React, { useContext, useState } from "react";
import {
   Box,
   Container,
   Grid,
   makeStyles,
   Button,
   Card,
   CardContent,
   TextField,
   InputAdornment,
   SvgIcon
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import ProductCard from "./ProductCard";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { Search as SearchIcon } from "react-feather";
import { AppContext } from "../../../state/appStateManagement";

const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: "100%",
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
   },
   productCard: {
      height: "100%"
   }
}));

const ProductList = () => {
   const classes = useStyles();
   const [search, setSearch] = useState("");
   const { state } = useContext(AppContext);
   const { status, data, error, isFetching, isLoading } = useQuery("products", async () => {
      const res = await axios.get("/api/product/getAll");
      return res.data;
   });

   if (isLoading) return "Loading, Please wait...";
   if (error) return "An error has occurred: " + error.message;

   return (
      <div className={classes.root}>
         <Container maxWidth={false}>
            {state.role !== "customer" && (
               <Box display="flex" justifyContent="flex-end">
                  <Button color="primary" variant="contained">
                     Add product
                  </Button>
               </Box>
            )}
            <Box mt={3}>
               <Card>
                  <CardContent>
                     <Box maxWidth={500}>
                        <TextField
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                           fullWidth
                           InputProps={{
                              startAdornment: (
                                 <InputAdornment position="start">
                                    <SvgIcon fontSize="small" color="action">
                                       <SearchIcon />
                                    </SvgIcon>
                                 </InputAdornment>
                              )
                           }}
                           placeholder="Search product"
                           variant="outlined"
                        />
                     </Box>
                  </CardContent>
               </Card>
            </Box>
            <Box mt={3}>
               <Grid container spacing={3}>
                  {data
                     .filter((item) => {
                        if (search === "") {
                           return item;
                        } else if (item.productName.toLowerCase().includes(search.toLowerCase())) {
                           return data;
                        }
                     })
                     .map((product) => (
                        <Grid item key={product.productId} lg={3} md={5} xs={12}>
                           <ProductCard className={classes.productCard} product={product} />
                        </Grid>
                     ))}
               </Grid>
            </Box>
            <Box mt={3} display="flex" justifyContent="center">
               <Pagination color="primary" count={3} size="small" />
            </Box>
         </Container>
      </div>
   );
};

export default ProductList;
