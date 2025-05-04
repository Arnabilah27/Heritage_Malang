import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul style={{ display: "flex", gap: "1rem" }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/maps">Maps</Link>
        </li>
        <li>
          <Link to="/destination">Destination</Link>
        </li>
        <li>
          <Link to="/review">Review</Link>
        </li>
      </ul>
    </nav>
  );
}
