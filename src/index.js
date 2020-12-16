import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import App from "./App";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import { AppProvider } from "./state/appStateManagement";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
   <>
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
               <ThemeProvider theme={theme}>
                  <AppProvider>
                     <App />
                  </AppProvider>
               </ThemeProvider>
            </MuiPickersUtilsProvider>
         </BrowserRouter>
      </QueryClientProvider>
   </>,
   document.getElementById("root")
);
