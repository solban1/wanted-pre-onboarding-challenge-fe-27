import { API_PATH_SIGNUP, API_URL } from "../util/constant";
import LoginForm from "./login-form";

export default function Signup() {
  return (
    <>
      <h1>회원가입</h1>
      <LoginForm url={API_URL + API_PATH_SIGNUP} />
    </>
  );
}
