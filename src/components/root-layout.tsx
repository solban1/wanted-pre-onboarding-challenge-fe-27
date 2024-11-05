import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function RootLayout() {
  // const [message, setMessage] = useState<string | undefined>(undefined);
  // const location = useLocation();
  // useEffect(() => {
  //   const locationState = location.state as { message?: string };
  //   const stateMessage = locationState.message;
  //   if (stateMessage) {
  //     setMessage(stateMessage);
  //     setTimeout(() => {
  //       setMessage(undefined);
  //     }, 3000);
  //   }
  // }, [location]);
  return (
    <>
      <nav>
        <ul style={{ display: "flex", gap: "2rem", listStyle: "none" }}>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/auth/login">login</Link>
          </li>
          <li>
            <Link to="/auth/signup">signup</Link>
          </li>
          <li>
            <Link to="/auth/logout">logout</Link>
          </li>
          {/* {message && <li>{message}</li>} */}
        </ul>
      </nav>
      <hr />
      <Outlet />
    </>
  );
}
