import LandingPageCSS from "../../layouts/LandingPage/LandingPage.module.css";

const LandingPageSubtitle = ({ styleClassName }) => (
  <section className={LandingPageCSS[styleClassName]}>
    <h2>SubTitle</h2>
    <p>Duis aute irure dolor in reprehenderit in voluptate </p>
  </section>
);

export default LandingPageSubtitle;
