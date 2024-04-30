import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { SquidContextProvider } from "@squidcloud/react";
import { Tutorial } from "@squidcloud/samples/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SquidContextProvider
    options={{
      appId: 'YOUR_APP_ID',
      region: 'us-east-1.aws',
      environmentId: 'dev',
      squidDeveloperId: 'YOUR_SQUID_DEVELOPER_ID',
    }}
  >
    <Tutorial title="todo" />
    <App />
  </SquidContextProvider>,
);
