import LandingPageCSS from "../../layouts/LandingPage/LandingPage.module.css";

const CallToAction = ({ styleClassName }) => (
    <section className={LandingPageCSS[styleClassName]}>
      <button>Join Meetup</button>
    </section>
  );

  export default CallToAction