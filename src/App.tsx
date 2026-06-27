import { Navbar } from "./components/navbar/navbar";
import { RouterProvider } from "./contexts/router-context";
import { RouterView } from "./router/router-view";
import { routes, type RouteNames } from "./router/routes";

import "./App.css";

export function App() {
  return (
    <RouterProvider initialRoute="notes" routes={routes}>
      <Navbar<RouteNames>
        links={[
          { label: "Anotações", to: "notes" },
          { label: "Teste de Perícia", to: "skill-test" },
          { label: "Teste de Sanidade", to: "sanity-test" },
          { label: "Combate", to: "battle" },
        ]}
      />
      <RouterView routes={routes} />
    </RouterProvider>
  );
}
