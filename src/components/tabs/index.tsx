import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type TabsContextType = {
  value: string;
  setValue: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

function useTabs() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("Tabs components must be inside <Tabs>");
  }

  return context;
}

type RootProps = {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
};

function Root({ defaultValue, value, onValueChange, children }: RootProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const current = value ?? internalValue;

  const setValue = (value: string) => {
    if (!onValueChange) {
      setInternalValue(value);
    }

    onValueChange?.(value);
  };

  const context = useMemo(
    () => ({
      value: current,
      setValue,
    }),
    [current],
  );

  return (
    <TabsContext.Provider value={context}>{children}</TabsContext.Provider>
  );
}

function List({ children }: { children: ReactNode }) {
  return <div className="tabs">{children}</div>;
}

type TabProps = {
  className?: string;
  value?: string;
  onClick?: () => void;
  children: ReactNode;
};

function Tab({ className, value, children, onClick }: TabProps) {
  const { value: active, setValue } = useTabs();

  return (
    <button
      className={`tab ${active === value ? "active" : ""} ${className ?? ""}`}
      onClick={() => {
        value && setValue(value);
        onClick?.();
      }}
    >
      {children}
    </button>
  );
}

function Content({ value, children }: TabProps) {
  const { value: active } = useTabs();

  if (active !== value) {
    return null;
  }

  return <>{children}</>;
}

export const Tabs = {
  Root,
  List,
  Tab,
  Content,
};
