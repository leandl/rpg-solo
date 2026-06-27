import { Battle } from "../screens/battle";
import { SanityTest } from "../screens/sanity-test";
import { SkillTest } from "../screens/skill-test";
import { TypewriterNotebook } from "../screens/typewriter-notebook";

export const routes = {
  battle: () => <Battle />,
  "skill-test": () => <SkillTest />,
  "sanity-test": () => <SanityTest />,
  notes: () => <TypewriterNotebook />,
  "not-found": () => <h1>404</h1>,
} as const;

export type RouteNames = keyof typeof routes;
