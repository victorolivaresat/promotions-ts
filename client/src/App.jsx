import { AuthProvider } from "./contexts/AuthProvider";
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/index";

//Styles
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
