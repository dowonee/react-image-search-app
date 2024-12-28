import Image from "../Image";
import "./styles.css";

export default function ImageSection({imageData}) {

  return (
    <div className="image-section">
      {imageData.length > 0 && imageData.map((image) => (
        <Image
          key={image.id}
          url={image.urls.small}
          description={image.alt_description}
        />
      ))}
    </div>
  );
}
