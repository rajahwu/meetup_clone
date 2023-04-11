import { TitleSection, SubTitleSection } from "./Titles";
import { CardContainer } from "./CardContainer";

import { CardImage, CallToAction } from "../../components";
import { getCardContent, card1, card2, card3 } from "./CardContainer/content";
import LandingPageCSS from "./LandingPage.module.css";

const cardContent = Object.values(getCardContent([card1, card2, card3]));

export default function LandingPage() {
  return (
    <>
      <TitleSection styleClassName="title-container" />

      <SubTitleSection styleClassName="subtitle-container" />

      <CardContainer
        styleSheet={LandingPageCSS}
        styleClassName="card-container"
        cardContent={cardContent}
      >
        <CardImage
          imageWidth="100"
          imageHeight="100"
          imageUrl="../../../assets/group_selfie.png"
          altText="group"
        />

      </CardContainer>

      <CallToAction styleClassName="cta-container" />
    </>
  );
}
