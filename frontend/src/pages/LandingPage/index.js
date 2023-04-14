import { TitleSection, SubTitleSection } from "./Titles";
import { CardContainer } from "./CardContainer";
import { CallToAction } from "../../components";
import LandingPageCSS from "./LandingPage.module.css";

import { getCardContent, card1, card2, card3 } from "./content";
const cardContent = Object.values(getCardContent([card1, card2, card3]));
const imageContent = {
  width: card1.image.width,
  height: card1.image.height,
  src: [card1.image.src, card2.image.src, card3.image.src],
  alt: [card1.image.alt, card2.image.alt, card3.image.src]
}

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
        cardImage={imageContent}
      >
       
      </CardContainer>

      <CallToAction styleClassName="cta-container" />
    </>
  );
}
