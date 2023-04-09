const Card = ({
  imageUrl,
  altText,
  imageHeight,
  imageWidth,
  titleText,
  textContent,
}) => (
  <div>
    <img
      width={imageWidth}
      height={imageHeight}
      src={imageUrl}
      alt={altText}
    ></img>
    <h3>{titleText}</h3>
    <p>{textContent}</p>
  </div>
);

export default Card;
