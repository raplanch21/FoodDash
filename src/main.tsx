import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { StoreProvider } from "./lib/StoreProvider.tsx";
import { UIProvider } from "./lib/UIProvider.tsx";
import { getVisitorId } from "./lib/visitorId.ts";

pendo.initialize({
  visitor: {
    id: getVisitorId(),
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <StoreProvider>
        <UIProvider>
          <App />
        </UIProvider>
      </StoreProvider>
    </BrowserRouter>
  </StrictMode>,
);
