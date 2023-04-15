import { TitleSection, SubTitleSection } from "./Titles";
import { CardContainer } from "./CardContainer";
import { CallToAction } from "../../components";
import LandingPageCSS from "./LandingPage.module.css";

import { getCardContent, card1, card2, card3 } from "./content";

export default function LandingPage() {
  const cardContent = Object.values(getCardContent([card1, card2, card3]));
  const cardImageProps = {
    width: card1.image.width,
    height: card1.image.height,
    src: [card1.image.src, card2.image.src, card3.image.src],
    alt: [card1.image.alt, card2.image.alt, card3.image.src],
  };


  return (
    <div className={LandingPageCSS["container"]}>
      <TitleSection />

      <SubTitleSection  />

      <CardContainer
        cardContent={cardContent}
        cardImage={cardImageProps}
      ></CardContainer>

      <CallToAction StyleSheet={LandingPageCSS} />
    </div>
  );
}
