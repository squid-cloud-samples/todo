import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { SquidContextProvider } from "@squidcloud/react";
import { Tutorial } from "@squidcloud/samples/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SquidContextProvider
    options={{
      appId: import.meta.env.VITE_SQUID_APP_ID,
      region: import.meta.env.VITE_SQUID_REGION,
      environmentId: import.meta.env.VITE_SQUID_ENVIRONMENT_ID,
      squidDeveloperId: import.meta.env.VITE_SQUID_DEVELOPER_ID,
    }}
  >
    <Tutorial title="todo" />
    <App />
  </SquidContextProvider>,
);
