import { Card, CardImage } from "../../../components";
import LandingPageCSS from "../LandingPage.module.css";

const LandingPageCardContainer = ({ cardContent, cardImage }) => {
  return (
    <section className={LandingPageCSS["card-container"]}>
      <Card
        styleSheet={LandingPageCSS}
        titleText={cardContent[0].titleText}
        linkTo={cardContent[0].linkTo}
        textContent={cardContent[0].textContent}
      >
        <CardImage
          imageWidth={cardImage.width}
          imageHeight={cardImage.height}
          imageUrl={cardImage.src[0]}
          altText={cardImage.alt[0]}
        />
      </Card>
      <Card
        styleSheet={LandingPageCSS}
        titleText={cardContent[1].titleText}
        linkTo={cardContent[1].linkTo}
        textContent={cardContent[1].textContent}
      >
        <CardImage
          imageWidth={cardImage.width}
          imageHeight={cardImage.height}
          imageUrl={cardImage.src[1]}
          altText={cardImage.alt[1]}
        />
      </Card>
      <Card
        styleSheet={LandingPageCSS}
        titleText={cardContent[2].titleText}
        linkTo={cardContent[2].linkTo}
        textContent={cardContent[2].textContent}
      >
        <CardImage
          imageWidth={cardImage.width}
          imageHeight={cardImage.height}
          imageUrl={cardImage.src[2]}
          altText={cardImage.alt[2]}
        />
      </Card>
    </section>
  );
};

export { LandingPageCardContainer as CardContainer };
