import { useSelector } from "react-redux";
import { CallToAction } from "../../../../components";

const LandingPageTitle = () => {
  const user = useSelector(state => state.session.user)

  return (
    <div className="hero my-6 bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <img
          className="max-w-sm rounded-lg shadow-2xl"
          width="250"
          height="250"
          src="../../../assets/images/title-image.png"
          alt="title"
        />
        <div>
          <h1 className="text-5xl font-bold">{user ? `Hey, ${user.firstName} let's do some stuff!` : "Hey, you wanna do stuff!"}</h1>
          <p className="py-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            m{" "}
          </p>
          <h2 className="">{user ? "Lets Get Started" : "check this out"}</h2>
          <p className="">Duis aute irure dolor in reprehenderit in voluptate </p>
          <CallToAction />
        </div>
      </div>
    </div>
  );
};

export default LandingPageTitle;
