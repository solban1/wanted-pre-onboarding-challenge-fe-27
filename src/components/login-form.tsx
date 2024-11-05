import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthResponse, ErrorResponse } from "../util/types";

interface LoginFormProps {
  // action?: string;
  // onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  // message?: string;
  url?: string;
}

export default function LoginForm({ url }: LoginFormProps) {
  const location = useLocation();
  const locationState = location.state as { message?: string } | null;
  const stateMessage = locationState?.message;

  const [message, setMessage] = useState<string | undefined>(stateMessage);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const emailEl = useRef<HTMLInputElement>(null);
  const passwordEl = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleEmailChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  };

  const handlePasswordChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  };

  function isValidForm() {
    return emailEl.current?.validity.valid && passwordEl.current?.validity.valid;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!url) {
      return;
    }
    const formData = new FormData(e.currentTarget);
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    };
    fetch(url, options)
      .then(async (res) => {
        const json = (await res.json()) as AuthResponse | ErrorResponse;
        const responseMessage = "message" in json ? json.message : json.details;

        if (res.ok && "token" in json) {
          localStorage.setItem("token", json.token);
          navigate("/", { state: { message: responseMessage } });
        } else {
          setMessage(responseMessage);
        }
      })
      .catch(() => {
        setMessage("Error");
      });
  }

  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          required
          pattern="\S+@\S+\.\S+"
          placeholder="Email"
          onChange={handleEmailChange}
          ref={emailEl}
        />
        <input
          type="password"
          name="password"
          value={password}
          required
          minLength={8}
          placeholder="Password"
          onChange={handlePasswordChange}
          ref={passwordEl}
        />
        <button disabled={!isValidForm()}>제출</button>
      </form>
      <div>{message}</div>
    </>
  );
}
