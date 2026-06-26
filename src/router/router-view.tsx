import { useMemo } from "react";
import { useRouter, type Routes } from "../contexts/router-context";

type RouterViewProps<T extends string> = {
  routes: Routes<T>;
};

export function RouterView<T extends string>({ routes }: RouterViewProps<T>) {
  const { route } = useRouter<T>();

  const ComponentRouteContent = useMemo(() => {
    if (!routes[route]) {
      return routes["not-found"];
    }

    return routes[route];
  }, [routes, route]);

  return <ComponentRouteContent />;
}
