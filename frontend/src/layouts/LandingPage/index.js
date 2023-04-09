import LandingPageCSS from "./LandingPage.module.css";
import { Card, TitleSection, SubTitleSection, CallToAction } from "../../components";

const LandingPageCardContainer = ({ styleClassName, children }) => (
  <>
    <section className={LandingPageCSS[styleClassName]}>{children}</section>
  </>
);

export default function LandingPage() {
  return (
    <>
      <TitleSection styleClassName="title-container" />

      <SubTitleSection styleClassName="subtitle-container" />

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
