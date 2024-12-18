import { useState } from "react";
import axios from "axios";
import Header from "../layouts/Header/Header";
import Footer from "../layouts/Footer/Footer";
import Main from "../layouts/Main/Main";
import styles from "./mainPage.module.css"; // Підключення CSS стилів

const MainPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [syntaxErrors, setSyntaxErrors] = useState<any[]>([]);
  const [fileAnalyzed, setFileAnalyzed] = useState(false); // Новий стан для перевірки завершення аналізу

  // Функція для обробки вибору файлу
  const handleFileSelected = (file: File | null) => {
    setSelectedFile(file);
  };

  const onFileDeleted = () => {
    setSyntaxErrors([]);
    setFileAnalyzed(false);
    setErrorMessage(null);
  };

  // Функція для обробки натискання кнопки "Analyze File"
  const handleAnalyzeFile = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSyntaxErrors([]); // Очищаємо помилки перед новим аналізом
    setFileAnalyzed(false); // Скидаємо стан до початкового

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

      // Якщо успішно, зберігаємо дані, але показуємо після затримки
      setTimeout(() => {
        setSyntaxErrors(response.data); // Зберігаємо помилки в стан
        setFileAnalyzed(true); // Встановлюємо, що аналіз завершено
      }, 1500); // 1.5 секунди
    } catch (error: any) {
      // Відображаємо помилку після затримки
      setTimeout(() => {
        if (error.response?.data?.message) {
          setErrorMessage(error.response.data.message); // Виводимо повідомлення від бекенду
        } else {
          setErrorMessage("There was an error uploading the file.");
        }
        console.error("Error uploading file:", error);
      }, 1500); // 1.5 секунди
    } finally {
      // Приховуємо `Loading...` після 1.5 секунд
      setTimeout(() => {
        setIsLoading(false);
      }, 1500); // 1.5 секунди
    }
  };

  return (
    <>
      <div className={styles["main-container"]}>
        <Header onAnalyzeFile={handleAnalyzeFile} />
        <Main
          onFileSelected={handleFileSelected}
          onFileDeleted={onFileDeleted}
        />
        {isLoading && <p className={styles["loading-text"]}>Loading...</p>}
        {!isLoading && errorMessage && (
          <p className={styles["error-message"]}>{errorMessage}</p>
        )}

        {/* Виведення помилок синтаксису з додаванням класу для стилізації */}
        {!isLoading && fileAnalyzed && syntaxErrors.length > 0 ? (
          <div className={styles["syntax-errors"]}>
            <h3>Syntax Errors</h3>
            <ul>
              {syntaxErrors.map((error, index) => (
                <li key={index}>
                  Line: {error.line}, Column: {error.column}, Message:{" "}
                  {error.message}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          !isLoading &&
          fileAnalyzed && (
            <p className={styles["no-errors-message"]}>
              The file has no syntax errors.
            </p>
          )
        )}

        <Footer />
      </div>
    </>
  );
};

export default MainPage;
