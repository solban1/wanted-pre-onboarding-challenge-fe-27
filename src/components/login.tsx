import { Link } from "react-router-dom";
import LoginForm from "./login-form";
import { API_PATH_LOGIN, API_URL } from "../util/constant";

export default function Login() {
  return (
    <>
      <h1>로그인</h1>
      <LoginForm url={API_URL + API_PATH_LOGIN} />
      <Link to="/auth/signup">회원가입</Link>
    </>
  );
}
