import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <>
    <ToastContainer theme="dark" closeOnClick draggable />

    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </>
);
