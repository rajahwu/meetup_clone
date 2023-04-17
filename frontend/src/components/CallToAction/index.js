import { useSelector } from "react-redux";
import OpenModelButton from "../Navigation/OpenModalButton";
import { SignupFormModal } from "../session";

const CallToAction = ({ styleSheet }) => {
  console.log("cta component", styleSheet)
  const sessisonUser = useSelector((state) => state.session.user);
  return (
    !sessisonUser && (
      <section className={styleSheet["cta-container"]}>
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
