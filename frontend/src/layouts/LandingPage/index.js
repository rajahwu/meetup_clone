import LandingPageCSS from "./LandingPage.module.css";

const LandingPageTitle = ({ styleClassName }) => (
  <section className={LandingPageCSS[styleClassName]}>
    <div>
      <h1>Title</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.{" "}
      </p>
    </div>
    <div>
      <img
        width="250"
        height="250"
        src="../../../assets/group_selfie.png"
        alt="title"
      />
    </div>
  </section>
);

const LandingPageSubtitle = ({ styleClassName }) => (
  <section className={LandingPageCSS[styleClassName]}>
    <h2>SubTitle</h2>
    <p>Duis aute irure dolor in reprehenderit in voluptate </p>
  </section>
);

const LandingPageCardContainer = ({ styleClassName, children }) => (
  <>
    <section className={LandingPageCSS[styleClassName]}>{children}</section>
  </>
);

const Card = ({
  imageUrl,
  altText,
  imageHeight,
  imageWidth,
  titleText,
  textContent,
}) => (
  <div>
    <img
      width={imageWidth}
      height={imageHeight}
      src={imageUrl}
      alt={altText}
    ></img>
    <h3>{titleText}</h3>
    <p>{textContent}</p>
  </div>
);

const CallToAction = ({ styleClassName }) => (
  <section className={LandingPageCSS[styleClassName]}>
    <button>Join Meetup</button>
  </section>
);

export default function LandingPage({ children }) {
  return (
    <>
      <LandingPageTitle styleClassName="title-container" />
      <LandingPageSubtitle styleClassName="subtitle-container" />

      <LandingPageCardContainer styleClassName="card-container">
        <Card
          imageWidth="100"
          imageHeight="100"
          imageUrl="../../../assets/group_selfie.png"
          altText="group"
          titleText="eiusmod tempor incididunt"
          textContent="
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco"
        />
        <Card
          imageWidth="100"
          imageHeight="100"
          imageUrl="../../../assets/group_selfie.png"
          altText="group"
          titleText="eiusmod tempor incididunt"
          textContent="
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco"
        />
        <Card
          imageWidth="100"
          imageHeight="100"
          imageUrl="../../../assets/group_selfie.png"
          altText="group"
          titleText="eiusmod tempor incididunt"
          textContent="
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco"
        />
      </LandingPageCardContainer>
      <CallToAction styleClassName="cta-container" />
    </>
  );
}
