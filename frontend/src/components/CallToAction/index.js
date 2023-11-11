import { useSelector } from "react-redux";
import OpenModelButton from "../Navigation/OpenModalButton";
import { SignupFormModal } from "../session";

const CallToAction = () => {
  const sessisonUser = useSelector((state) => state.session.user);
  return (
    !sessisonUser && (
      <section className="btn btn-primary">
        <OpenModelButton
          buttonText="Join Meetup"
          modalComponent={<SignupFormModal />}
        />
      </section>
    )
  );
};

export default CallToAction;
