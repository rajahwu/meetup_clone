import HeaderCSS from "./Header.module.css";
import { useHistory } from "react-router-dom";

export default function Header({ children }) {

  const Logo = () => {
    const history = useHistory();
    const handleClick = (e) => {
      history.push("/");
    };
    return (
      <img
        className={HeaderCSS["logo"]}
        src="../../../assets/hiwdt-logo.png"
        alt="logo"
        width="100"
        height="100"
        onClick={handleClick}
      />
    );
  };

  return (
    <div id="header" className={HeaderCSS["container"]}>
      <Logo />
      {children}
    </div>
  );
}
