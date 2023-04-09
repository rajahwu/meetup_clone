export default function CardImage({
  imageWidth,
  imageHeight,
  imageUrl,
  altText,
}) {
  return (
    <img
      width={imageWidth}
      height={imageHeight}
      src={imageUrl}
      alt={altText}
    ></img>
  );
}
