import { Battle } from "../screens/battle";
import { DiceTest } from "../screens/dice-test";

export const routes = {
  battle: <Battle />,
  "dice-test": <DiceTest />,
  "not-found": <h1>404</h1>,
} as const;

export type RouteNames = keyof typeof routes;
