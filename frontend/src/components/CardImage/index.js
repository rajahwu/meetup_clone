export default function CardImage({
  imageWidth,
  imageHeight,
  imageUrl,
  altText,
}) {
  return (
    <div>
      <img
        width={imageWidth}
        height={imageHeight}
        src={imageUrl}
        alt={altText}
      ></img>
    </div>
  );
}
