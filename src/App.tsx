import { Navbar } from "./components/navbar/navbar";
import { RouterProvider } from "./contexts/router-context";
import { RouterView } from "./router/router-view";
import { routes, type RouteNames } from "./router/routes";

export function App() {
  return (
    <RouterProvider initialRoute="dice-test" routes={routes}>
      <Navbar<RouteNames>
        links={[
          { label: "Batalha", to: "battle" },
          { label: "Teste", to: "dice-test" },
        ]}
      />
      <RouterView routes={routes} />
    </RouterProvider>
  );
}
