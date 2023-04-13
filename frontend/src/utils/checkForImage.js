const checkForImage = (images, defaultImages, key = "url") => {
  if (
    !images[0]?.[key]?.split(".").includes("unsplash") &&
    !["png", "jpg", "jpeg"].includes(
      images[0]?.[key]?.split(".")[images[0]?.[key].split(".").length - 1].trim()
    )
  ) {
    return defaultImages[0];
  } else return images[0]?.[key];
};

export { checkForImage };
