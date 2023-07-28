import { useSelector } from "react-redux";
import TitleSectionCSS from "./TitleSection.module.css";

const Card = ({ title, text, textStyle, children }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      padding: "15px",
      border: "3px solid yellow",
      margin: "3px",
      borderRadius: "16px"
    }}
  >
    <h3>{title}</h3>
    <p className={textStyle}>{text}</p>
    {children}
  </div>
);

const CardImage = ({ css, imageUrl }) => (
  <div className={css["image-container"]}>
    <img
      className={css["image"]}
      width="250"
      height="250"
      src={imageUrl ? imageUrl : "../../../assets/images/noun-radar-242605.svg"}
      alt="title"
    />
  </div>
);

const LandingPageTitle = () => {
  const css = TitleSectionCSS;
  const user = useSelector((state) => state.session.user);

  return (
    <section className={css["container"]}>
      <div>
        <h1 className={css["title"]}>
          {user
            ? `Hey, ${user.firstName} let's do some stuff!`
            : "Hey, you wanna do stuff!"}
        </h1>
        {/* <p className={css["text"]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          m{" "}
        </p> */}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          // border: "3px solid green",
        }}
      >
        <div>
          <Card
            title="Events Near You"
            text="Find amazing group events happening nearby."
            textStyle={css["text"]}
          >
            <CardImage css={css}/>
          </Card>
          {/* <Card title="Acquire Skills" text="Participate in workshops and learn new talents.">
            <CardImage css={css} />
          </Card> */}
        </div>
        <div>
          <Card
            title="Form New Groups"
            text="Create your own tribe to share interests and ideas."
          >
            <CardImage
              css={css}
              imageUrl="../../../assets/images/noun-groups-2298387.svg"
            />
          </Card>
          {/* <Card title="Get Active" text="Stay fit by joining sports or outdoor groups.">
            <CardImage css={css} />
          </Card> */}
        </div>
        <div>
          <Card
            title="Make Friends"
            text="Expand your social circle with like-minded individuals."
          >
            <CardImage
              css={css}
              imageUrl="../../../assets/images/noun-friends-4464209.svg"
            />
          </Card>
          {/* <Card title="Share Experiences" text="Exchange stories and create unforgettable moments.">
            <CardImage css={css} />
          </Card> */}
        </div>
      </div>
    </section>
  );
};

export default LandingPageTitle;
