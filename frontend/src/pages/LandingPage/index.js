import { TitleSection, SubTitleSection } from "./Titles";
import { CardContainer } from "./CardContainer";
import { CardImage, CallToAction } from "../../components";
import LandingPageCSS from "./LandingPage.module.css";

import { getCardContent, card1, card2, card3 } from "./content";
const cardContent = Object.values(getCardContent([card1, card2, card3]));

export default function LandingPage() {
  const css = LandingPageCSS;
  const classNames = [
    {
      title: "title-container",
      subTitle: "subtitle-container",
      card: "card-container",
    },
  ];
  const [container] = classNames;
  
  return (
    <>
      <TitleSection styleSheet={css} styleClassName={container.title} />

      <SubTitleSection styleSheet={css} styleClassName={container.subTitle} />

      <CardContainer
        styleSheet={css}
        styleClassName={container.card}
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
