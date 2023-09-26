import { useSelector } from "react-redux";

const LandingPageSubtitle = () => {
  const user = useSelector(state => state.session.user)

  return (
    <section className="">
    <div className="">
      <h2 className="">{user ? "Lets Get Started" : "check this out"}</h2>
      <p className="">Duis aute irure dolor in reprehenderit in voluptate </p>
    </div>
    </section>
  );
};

export default LandingPageSubtitle;
