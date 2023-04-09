import { useSelector } from "react-redux";
import {
  Card,
  TitleSection,
  SubTitleSection,
  CallToAction,
  CardImage,
} from "../../components";
import LandingPageCSS from "./LandingPage.module.css";

const LandingPageCardContainer = ({ styleClassName, children }) => (
  <section className={LandingPageCSS[styleClassName]}>{children}</section>
);

export default function LandingPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const isLoggedIn = () => (sessionUser ? true : false);

  return (
    <>
      <TitleSection styleClassName="title-container" />

      <SubTitleSection styleClassName="subtitle-container" />

      <LandingPageCardContainer styleClassName="card-container">
        <Card
          titleText="See all groups"
          linkTo="/groups"
          textContent="
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco"
        >
          <CardImage
            imageWidth="100"
            imageHeight="100"
            imageUrl="../../../assets/group_selfie.png"
            altText="group"
          />
        </Card>

        <Card
          titleText="Find an event"
          linkTo="/events"
          textContent="
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco"
        >
          <CardImage
            imageWidth="100"
            imageHeight="100"
            imageUrl="../../../assets/group_selfie.png"
            altText="group"
          />
        </Card>

        <Card
          titleText="Start a group"
          linkTo="/test"
          isLoggedIn={isLoggedIn()}
          textContent="
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco"
        >
          <CardImage
            imageWidth="100"
            imageHeight="100"
            imageUrl="../../../assets/group_selfie.png"
            altText="group"
          />
        </Card>
      </LandingPageCardContainer>

      <CallToAction styleClassName="cta-container" />
    </>
  );
}
