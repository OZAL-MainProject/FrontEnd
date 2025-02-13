import { useState } from "react";
import "../style/ImageUpload.scss";

const ImageUpload = ({ onImagesChange }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const handleImageUpload = (e) => {
    const files = e.target.files;

    if (files.length > 10) {
      alert("이미지는 최대 10개까지 선택 가능합니다.");
      return;
    }

    const newFiles = Array.from(files);
    const newUrls = newFiles.map((file) => URL.createObjectURL(file));

    setImageFiles((prev) => [...prev, ...newFiles]);
    setImageUrls((prev) => [...prev, ...newUrls]);

    onImagesChange([...imageFiles, ...newFiles]);
  };

  const handleDeleteImage = (indexToDelete) => {
    setImageUrls((prev) => prev.filter((_, index) => index !== indexToDelete));
    setImageFiles((prev) => prev.filter((_, index) => index !== indexToDelete));

    const updatedFiles = imageFiles.filter(
      (_, index) => index !== indexToDelete
    );
    onImagesChange(updatedFiles);
  };

  return (
    <div className="image-upload-container">
      <div className="file-input-wrapper">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          max="10"
        />
      </div>
      <p className="info-text">* 이미지는 최대 10개까지 선택 가능합니다.</p>
      <div className="image-preview-container">
        {imageUrls.map((url, index) => (
          <div key={index} className="preview-item">
            <img src={url} alt={`preview-${index}`} className="preview-image" />
            <button
              className="delete-button"
              onClick={() => handleDeleteImage(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
