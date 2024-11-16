import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import store from "./redux/store";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Toaster />
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
