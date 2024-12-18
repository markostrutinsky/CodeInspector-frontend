import React from "react";
import FileUpload from "C:\\Users\\marko\\Desktop\\CodeInspector-frontend\\src\\components\\FileUpload.tsx"; // Шлях до вашого компонента для завантаження файлів

interface MainProps {
  onFileSelected: (file: File | null) => void;
}

const Main: React.FC<MainProps> = ({ onFileSelected }) => {
  return (
    <main>
      <FileUpload onFileSelected={onFileSelected} />
    </main>
  );
};

export default Main;
