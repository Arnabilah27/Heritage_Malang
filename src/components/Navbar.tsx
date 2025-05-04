import { NavLink } from "react-router-dom";

interface Route {
  name: string;
  path: string;
}

const routes: Route[] = [
  { name: "Home", path: "/" },
  { name: "Maps", path: "/maps" },
  { name: "Destination", path: "/destination" },
  { name: "Review", path: "/review" },
];

export default function Navbar() {
  return (
    <nav>
      <ul style={{ display: "flex", gap: "1rem" }}>
        {routes.map((route) => (
          <li key={route.path}>
            <NavLink
              to={route.path}
              style={({ isActive }) => ({
                textDecoration: isActive ? "underline" : "none",
                color: isActive ? "blue" : "black",
              })}
            >
              {route.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}