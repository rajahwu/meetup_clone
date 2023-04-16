export default function CardImage({
  imageWidth,
  imageHeight,
  imageUrl,
  altText,
  styleSheet,
  styleClassName
}) {
  return (
    <div className={styleSheet?.["container"]}>
      <img
        className={styleSheet?.["image"]}
        width={imageWidth}
        height={imageHeight}
        src={imageUrl}
        alt={altText}
      ></img>
    </div>
  );
}
