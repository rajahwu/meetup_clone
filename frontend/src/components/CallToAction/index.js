import { useSelector } from "react-redux";
import OpenModelButton from "../Navigation/OpenModalButton";
import { SignupFormModal } from "../session";

const CallToAction = ({ styleSheet }) => {
  const sessisonUser = useSelector((state) => state.session.user);
  return (
    !sessisonUser && (
      <section className={styleSheet["cta-container"]}>
      <h1>Do You Want To Do Stuff</h1>
      <p>Tall about the app and why to sign up. It's a really cool awesome site.
      If you wanna, you can do stuff, just say Hey, I wanna do that.
      </p>
        <OpenModelButton
          buttonText="Join Meetup"
          modalComponent={<SignupFormModal />}
          styleSheet={styleSheet}
          styleClassNames="cta-btn"
        />
      </section>
    )
  );
};

export default CallToAction;
