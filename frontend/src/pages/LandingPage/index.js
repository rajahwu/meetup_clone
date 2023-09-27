import { TitleSection } from "./Titles";
import { CardContainer } from "./CardContainer";
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
    <div className="text-gray-600 body-font">
      <div className="container px-5 mx-auto">
        <TitleSection />
        <CardContainer
          cardContent={cardContent}
          cardImage={cardImageProps}
        ></CardContainer>
      </div>
    </div>
  );
}
