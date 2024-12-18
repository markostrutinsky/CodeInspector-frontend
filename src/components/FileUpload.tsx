import React, { useState } from "react";
import styles from "./fileUpload.module.css";

interface FileUploadProps {
  onFileSelected?: (file: File) => void; // Колбек для передачі одного файлу назовні (опціонально)
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected }) => {
  const [file, setFile] = useState<File | null>(null);

  // Обробка вибраного файлу
  const handleFile = (newFile: File | null) => {
    if (!newFile) return;

    setFile(newFile);

    // Передаємо файл через колбек, якщо він є
    if (onFileSelected) {
      onFileSelected(newFile);
    }
  };

  // Обробка вибору файлу через input
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  // Обробка перетягування файлу
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add("hover");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("hover");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("hover");

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  // Видалення вибраного файлу
  const handleRemoveFile = () => {
    setFile(null);
    if (onFileSelected) {
      onFileSelected(null as unknown as File); // Передаємо null, щоб очистити вибір зовні
    }
  };

  return (
    <div className={styles["upload-container"]}>
      <h2>Choose or drag a file</h2>

      {/* Input для вибору файлу */}
      <input
        type="file"
        id="fileInput"
        className={styles["file-input"]}
        onChange={handleFileInput}
      />

      {/* Кнопка для відкриття провідника */}
      <button
        type="button"
        className={`${styles["upload-button"]} ${
          file ? styles["disabled-button"] : ""
        }`}
        onClick={() => document.getElementById("fileInput")?.click()}
        disabled={!!file} // Деактивація кнопки, якщо файл вибрано
      >
        Upload File
      </button>

      {/* Область для перетягування файлу */}
      <div
        id="dropArea"
        className={styles["drop-area"]}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {file ? (
          <div className={styles["file-preview"]}>
            <p>{file.name}</p>
            <button
              type="button"
              className={styles["remove-button"]}
              onClick={handleRemoveFile}
            >
              Remove File
            </button>
          </div>
        ) : (
          <p>Drag a file here or press the button to choose</p>
        )}
      </div>

      {/* Відображення вибраного файлу */}
      {file && (
        <div className={styles["file-info"]}>
          <h3>Selected file:</h3>
          <p>{file.name}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
