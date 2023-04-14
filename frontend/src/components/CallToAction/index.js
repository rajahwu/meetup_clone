import { useSelector } from "react-redux";
import OpenModelButton from "../Navigation/OpenModalButton";
import { SignupFormModal } from "../session";

const CallToAction = ({ StyleSheet }) => {
  const sessisonUser = useSelector((state) => state.session.user);
  console.log(!sessisonUser);
  return (
    !sessisonUser && (
      <section className={StyleSheet["cta-container"]}>
        <OpenModelButton
          buttonText={
            <button className={StyleSheet["cta-btn"]}>Join Meetup</button>
          }
          modalComponent={<SignupFormModal />}
        />
      </section>
    )
  );
};

export default CallToAction;
