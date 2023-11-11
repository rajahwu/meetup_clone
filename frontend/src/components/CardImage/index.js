export default function CardImage({
  imageWidth,
  imageHeight,
  imageUrl,
  altText,
}) {
  return (
      <img
        className="w-56 h-56 rounded-xl m-5"
        width={imageWidth}
        height={imageHeight}
        src={imageUrl}
        alt={altText}
      ></img>
  );
}
