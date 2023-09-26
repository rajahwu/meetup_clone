import { useSelector } from "react-redux";

const LandingPageTitle = () => {
  const user = useSelector(state => state.session.user)

  return (
    <section className="">
      <div>
        <h1 className="">{user ? `Hey, ${user.firstName} let's do some stuff!` :  "Hey, you wanna do stuff!"}</h1>
        <p className="">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          m{" "}
        </p>
      </div>
      <div className="">
        <img
          width="250"
          height="250"
          src="../../../assets/images/title-image.png"
          alt="title"
        />
      </div>
    </section>
  );
};

export default LandingPageTitle;
