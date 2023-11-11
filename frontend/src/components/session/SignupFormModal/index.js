import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import { useSetModalClass } from "../../../hooks";

export default function SignupFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { setModalContent } = useModal();

  useSetModalClass();

  const isDisabled = () => {
    const fields = [
      email,
      username,
      firstName,
      lastName,
      password,
      confirmPassword,
    ];
    const emptyFields = fields.filter((field) => field.length === 0).length > 0;
    if (emptyFields) return true;
    if (username.length < 4) return true;
    if (password.length < 6) return true;
    return false;
  };

  isDisabled();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(() => history.push("/"))
        .then(() => setModalContent(null))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <div className="w-full h-full max-w-xs card flex items-center justify-center my-5">
      <h1 className="card-title text-center">Sign Up</h1>
      <form className="rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">

          Username
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">

          First Name
          <input
            id="first_name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">

          Last Name
          <input
            id="last_name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">

          Password
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm">
          Confirm Password
          <input
            id="confirm"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button
          className="mr-5 bg-primary hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={isDisabled()}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
