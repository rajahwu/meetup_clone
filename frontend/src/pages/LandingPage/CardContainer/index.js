import { Card } from "../../../components";

const LandingPageCardContainer = ({
  styleSheet,
  styleClassName,
  cardContent,
  children,
}) => {
  console.log(cardContent)
  return (
  <section className={styleSheet[styleClassName]}>
    <Card
      titleText={cardContent[0].titleText}
      linkTo={cardContent[0].linkTo}
      textContent={cardContent[0].textContent}
    >
      {children}
    </Card>
    <Card
      titleText={cardContent[1].titleText}
      linkTo={cardContent[1].linkTo}
      textContent={cardContent[1].textContent}
    >
      {children}
    </Card>
    <Card
      titleText={cardContent[2].titleText}
      linkTo={cardContent[2].linkTo}
      textContent={cardContent[2].textContent}
    >
      {children}
    </Card>
  </section>
)};

export { LandingPageCardContainer as CardContainer };
