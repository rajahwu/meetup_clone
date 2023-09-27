import { useSelector } from "react-redux";
import { CallToAction } from "../../../../components";

const LandingPageTitle = () => {
  const user = useSelector(state => state.session.user)

  return (
    <div>
      <div className="hero w-5/6 bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img
            className="max-w-sm rounded-lg shadow-2xl "
            width="250"
            height="250"
            src="../../../assets/images/title-image.png"
            alt="title"
          />
          <div>
            <h1 className="text-5xl font-bold">{user ? `Hey, ${user.firstName} let's do some stuff!` : "Hey, you wanna do stuff!"}</h1>
            <p className="py-6">
              Welcome to our community of like-minded people who love to connect, share
              experiences, and have fun together. Join us on exciting adventures and
              discover new interests. Whether you're into sports, art, food, or simply
              making new friends, there's something here for everyone.
            </p>

          </div>
        </div>
      </div>
      <div className="hero my-6 w-5/6 bg-base-200 ml-auto">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            className="max-w-sm rounded-lg shadow-2xl"
            width="250"
            height="250"
            src="../../../assets/images/title-image.png"
            alt="title"
          />
          <div>
            <h2 className="text-4xl font-bold">{user ? "Lets Get Started" : "check this out"}</h2>
            <p className=""> Ready to dive into the world of exciting events and meet amazing people?
              Get started now and create your own adventure. Explore local groups and events,
              or start your own community. The possibilities are endless, and it all begins here!</p>
            <CallToAction />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageTitle;
