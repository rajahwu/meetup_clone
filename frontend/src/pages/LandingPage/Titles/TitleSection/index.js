import { useSelector } from "react-redux";
import TitleSectionCSS from "./TitleSection.module.css";

const Card = ({title, text}) => (
  <div style={{
    border: "3px solid black"
  }}>
    <h3>{title}</h3>
    <p>{text}</p>
  </div>
)

const LandingPageTitle = () => {
  const css = TitleSectionCSS;
  const user = useSelector(state => state.session.user)



  return (
    <section className={css["container"]}>
      <div>
        <h1 className={css["title"]}>{user ? `Hey, ${user.firstName} let's do some stuff!` :  "Hey, you wanna do stuff!"}</h1>
        {/* <p className={css["text"]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          m{" "}
        </p> */}
      </div>
      <div style={{
        display: "flex"
      }}>
      <div>
        <Card title="Card Link" text="some stuff about this link"/>
        <Card title="Card Link" text="some stuff about this link"/>
      </div>
      <div>
        <Card title="Card Link" text="some stuff about this link"/>
        <Card title="Card Link" text="some stuff about this link"/>
      </div>
      <div>
        <Card title="Card Link" text="some stuff about this link"/>
        <Card title="Card Link" text="some stuff about this link"/>
      </div>
      </div>
      <div className={css["image-container"]}>
        {/* <img
        className={css["image"]}
          width="250"
          height="250"
          src="../../../assets/images/title-image.jpg"
          alt="title"
        /> */}
      </div>
    </section>
  );
};

export default LandingPageTitle;
