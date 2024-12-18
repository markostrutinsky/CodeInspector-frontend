import React from 'react';
import FileUpload from '../../components/FileUpload';

interface MainProps {
  onFileSelected: (file: File | null) => void;
  onFileDeleted: () => void;
}

const Main: React.FC<MainProps> = ({ onFileSelected, onFileDeleted }) => {
  return (
    <main>
      <FileUpload
        onFileSelected={onFileSelected}
        onFileDeleted={onFileDeleted}
      />
    </main>
  );
};

export default Main;
