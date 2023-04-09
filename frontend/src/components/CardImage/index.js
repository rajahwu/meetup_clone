export default function CardImage({
  imageWidth,
  imageHeight,
  imageUrl,
  altText,
}) {
  return (
    <div style={{
      width: "100px",
      height: "100px",
      border: "3px solid black"
    }}>
      <img
        width={imageWidth}
        height={imageHeight}
        src={imageUrl}
        alt={altText}
      ></img>
    </div>
  );
}
