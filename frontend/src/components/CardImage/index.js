export default function CardImage({
  imageWidth,
  imageHeight,
  imageUrl,
  altText,
}) {
  return (
    <div className="">
      <img
        className=""
        width={imageWidth}
        height={imageHeight}
        src={imageUrl}
        alt={altText}
      ></img>
    </div>
  );
}
