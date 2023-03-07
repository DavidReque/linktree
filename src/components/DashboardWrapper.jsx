import { Link } from "react-router-dom";

export default function DashboardWrapper({ children }) {
  return (
    <div>
      <nav>
        <div>Logo</div>
        <Link to="/dashboard">Links</Link>
        <Link to="/dashboard/profile">Profile</Link>
        <Link to="/singout">Singout</Link>
      </nav>
      <div>{children}</div>
    </div>
  );
}
