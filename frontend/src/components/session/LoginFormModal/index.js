import { useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
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
    <div className="w-full h-full max-w-xs card flex items-center justify-center my-5">
      <h1 className="card-title text-center">Log In</h1>
      {errors.credential && <p>{errors.credential}</p>}
      <form className="rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="credential">
          <input
            id="credential"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder="Username or Email"
            required
          />
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
          className="mr-5 bg-primary hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={credential.length < 4 || password.length < 6}
        >
          Log In
        </button>

        <button
          className="ml-5 bg-primary hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
