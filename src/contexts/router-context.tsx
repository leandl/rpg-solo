import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type ReactComponent = () => ReactNode;

export type Routes<T extends string> = Record<T, ReactComponent> & {
  "not-found": ReactComponent;
};

export type RouterContextData<T extends string> = {
  route: T;
  navigate: (to: T) => void;
};

const RouterContext = createContext<RouterContextData<any> | null>(null);

type RouterProviderProps<T extends string> = {
  initialRoute: T;
  routes: Routes<T>;
  children: ReactNode;
};

export function RouterProvider<T extends string>({
  initialRoute,
  routes,
  children,
}: RouterProviderProps<T>) {
  const [route, setRoute] = useState<T>(initialRoute);

  const navigate = useCallback(
    (to: T) => {
      if (!routes[to]) {
        setRoute("not-found" as T);
        return;
      }
      setRoute(to);
    },
    [routes],
  );

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter<T extends string>() {
  const context = useContext(RouterContext);

  if (!context) {
    throw new Error("useRouter deve ser usado dentro do RouterProvider");
  }

  return context as RouterContextData<T>;
}
