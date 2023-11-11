const landingPage_card_1 = {
  titleText: "Explore Local Communities",
  linkTo: "/groups",
  textContent:
    "Discover vibrant local communities in your area. Join groups of people who share your interests and passions, from hiking to cooking, and everything in between.",
  image: {
    height: 150,
    width: 150,
    src: "../../../../assets/images/see-all-groups.png", // Replace with your actual image source
    alt: "see all groups",
  },
};

const landingPage_card_2 = {
  titleText: "Find Exciting Events",
  linkTo: "/events",
  textContent:
    "Find exciting events happening near you. Explore a wide range of events, from concerts to workshops, and never miss out on the fun again.",
  image: {
    height: 300,
    width: 300,
    src: "../../../../assets/images/see-all-events.png", // Replace with your actual image source
    alt: "see all events",
  },
};

const landingPage_card_3 = {
  titleText: "Start Your Own Community",
  linkTo: "/groups/new",
  textContent:
    "Ready to create your own community? Start a new group and bring people together around your interests. Share your passion with others!",
  image: {
    height: 300,
    width: 300,
    src: "../../../../assets/images/start-a-group.png", // Replace with your actual image source
    alt: "start a group",
  },
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
