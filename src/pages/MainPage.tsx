import { useState } from "react";
import axios from "axios";
import Header from "../layouts/Header/Header";
import Footer from "../layouts/Footer/Footer";
import Main from "../layouts/Main/Main";

const MainPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Функція для обробки вибору файлу
  const handleFileSelected = (file: File | null) => {
    setSelectedFile(file);
  };

  // Функція для обробки натискання кнопки "Analyze File"
  const handleAnalyzeFile = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append("cppFile", selectedFile);

    try {
      // Відправляємо POST запит з файлом на сервер
      const response = await axios.post(
        "http://localhost:8080/api/check",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Оголошуємо тип даних як файл
          },
        }
      );

      // Якщо успішно, обробляємо відповідь
      console.log("File analyzed successfully:", response.data);
    } catch (error) {
      setErrorMessage("There was an error uploading the file.");
      console.error("Error uploading file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header onAnalyzeFile={handleAnalyzeFile} />
      <Main onFileSelected={handleFileSelected} />
      {isLoading && <p>Loading...</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <Footer />
    </>
  );
};

export default MainPage;
