import "react-perfect-scrollbar/dist/css/styles.css";
import routes from "./routes";
import { useRoutes } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles";
import { useContext } from "react";
import { AppContext } from "./state/appStateManagement";

function App() {
   const { state } = useContext(AppContext);
   const routing = useRoutes(routes(state.isAuthenticated, state.role));

   return (
      <>
         <GlobalStyles />
         {routing}
      </>
   );
}

export default App;
