import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import ReactHotToast from "./main/components/ReactHotToast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback="loading">
    <App />
    <ReactHotToast>
      <Toaster
        position="top-right"
        toastOptions={{ className: "react-hot-toast" }}
      />
    </ReactHotToast>
  </Suspense>
);
