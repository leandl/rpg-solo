import { useRouter, type Routes } from "../contexts/router-context";

type RouterViewProps<T extends string> = {
  routes: Routes<T>;
};

export function RouterView<T extends string>({ routes }: RouterViewProps<T>) {
  const { route } = useRouter<T>();

  return <>{routes[route] ?? routes["not-found"]}</>;
}
