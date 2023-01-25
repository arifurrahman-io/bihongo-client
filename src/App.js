import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import router from "./Router/Routes";

function App() {
  return (
    <div className="mx-auto px-0">
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
