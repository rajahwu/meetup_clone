import { useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch } from "react-redux";
import {useHistory} from "react-router-dom"
import { useModal } from "../../../context/Modal";
import { useSetModalClass } from "../../../hooks";

export default function LoginFormModel() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { setModalContent } = useModal();

  useSetModalClass();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => setModalContent(null))
      .then(() => history.push("/"))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className="">
      <h1>Log In</h1>
      {errors.credential && <p>{errors.credential}</p>}
      <form onSubmit={handleSubmit}>
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
        <button
          type="submit"
          className=""
          disabled={credential.length < 4 || password.length < 6}
        >
          Log In
        </button>

        <button
          type="button"
          onClick={() => {
            const demoUser = {
              credential: "Demo-lition",
              password: "password",
            };
            dispatch(sessionActions.login(demoUser));
            setModalContent(null);
            history.push("/")
          }}
        >
          Demo User
        </button>
      </form>
    </div>
  );
}
