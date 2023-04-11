const landingPage_card_1 = {
  titleText: "See all Groups",
  linkTo: "/groups",
  textContent:
    "eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim veniam, quis nostrud exercitation ullamco",
};

const landingPage_card_2 = {
  titleText: "Find an event",
  linkTo: "/events",
  textContent:
    "eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
};

const landingPage_card_3 = {
  titleText: "Start a group",
  linkTo: "/groups/new",
  textContent:
    "eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
};

export function parseContent(cardContent) {
  const content = {};
  cardContent.forEach((card, index) => {
    Object.assign(content, {
      [index]: {
        titleText: card.titleText,
        linkTo: card.linkTo,
        textContent: card.textContent,
      },
    });
  });
  return content;
}

export {
  parseContent as getCardContent,
  landingPage_card_1 as card1,
  landingPage_card_2 as card2,
  landingPage_card_3 as card3,
};
