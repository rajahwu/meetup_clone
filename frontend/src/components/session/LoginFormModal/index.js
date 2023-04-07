import { useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import LoginFormCSS from "./LoginForm.module.css";

export default function LoginFormModel() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const {closeModal} = useModal()


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
    .then(closeModal)
    .catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className={LoginFormCSS.container}>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className={LoginFormCSS.form}>
          <label htmlFor="credential">
            <input
              id="credential"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              placeholder="Username or Email"
              required
            />
          </label>
          <label htmlFor="password">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </label>
        {errors.credential && <p>{errors.credential}</p>}
        <button type="submit" className={LoginFormCSS.btn} 
        disabled={credential < 4 || password < 6}
        >
          Log In
        </button>

        <button type="button">Demo User</button>
      </form>
    </div>
  );
}