import { useSelector } from "react-redux";

import  SubTitleSectionCSS  from "./SubtitleSection.module.css";

const LandingPageSubtitle = () => {
  const css = SubTitleSectionCSS
  const user = useSelector(state => state.session.user)

  return (
    <section className={css["container"]}>
    <div className={css["text-container"]}>
      <h2 className={css["title"]}>{user ? "Lets Get Started" : "check this out"}</h2>
      <p className={css["text"]}>Duis aute irure dolor in reprehenderit in voluptate </p>
    </div>
    </section>
  );
};

export default LandingPageSubtitle;
