import './styles.css';

export default function Image({
  url,
  description
}) {
  return (
    <div className="image-form">
      <img src={url} alt={description} />
    </div>
  );
}
