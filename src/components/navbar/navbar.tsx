import { useState } from "react";
import { useRouter } from "../../contexts/router-context";
import "./navbar-styles.css";

type Link<T extends string> = {
  label: string;
  to: T;
};

type NavbarProps<T extends string> = {
  links: Link<T>[];
};

export function Navbar<T extends string>({ links }: NavbarProps<T>) {
  const { route, navigate } = useRouter<T>();
  const [open, setOpen] = useState(false);

  const handleNavigate = (to: T) => {
    navigate(to);
    setOpen(false);
  };

  return (
    <>
      {/* BOTÃO */}
      <button
        className={`menu-toggle ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        {open ? "✕" : "☰"}
      </button>

      {/* OVERLAY */}
      <div
        className={`menu-overlay ${open ? "open" : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* MENU */}
      <nav className={`side-menu ${open ? "open" : ""}`}>
        {links.map((link) => {
          const isActive = route === link.to;

          return (
            <button
              key={link.to}
              onClick={() => handleNavigate(link.to)}
              className={isActive ? "active" : ""}
            >
              {link.label}
            </button>
          );
        })}
      </nav>
    </>
  );
}
