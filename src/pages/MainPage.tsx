import { useState } from 'react';
import axios from 'axios';
import Header from '../layouts/Header/Header';
import Main from '../layouts/Main/Main';
import styles from './mainPage.module.css';
import { PageLayout } from '../layouts/PagLayout/PageLayout';

const MainPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [syntaxErrors, setSyntaxErrors] = useState<any[]>([]);
  const [fileAnalyzed, setFileAnalyzed] = useState(false);

  const handleFileSelected = (file: File | null) => {
    setSelectedFile(file);
  };

  const onFileDeleted = () => {
    setSyntaxErrors([]);
    setFileAnalyzed(false);
    setErrorMessage(null);
  };

  const handleAnalyzeFile = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSyntaxErrors([]);
    setFileAnalyzed(false);

    const formData = new FormData();
    formData.append('cppFile', selectedFile);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/check',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setTimeout(() => {
        setSyntaxErrors(response.data);
        setFileAnalyzed(true);
      }, 1500);
    } catch (error: any) {
      setTimeout(() => {
        if (error.response?.data?.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('There was an error uploading the file.');
        }
        console.error('Error uploading file:', error);
      }, 1500);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <PageLayout>
      <Header onAnalyzeFile={handleAnalyzeFile} />
      <Main onFileSelected={handleFileSelected} onFileDeleted={onFileDeleted} />
      {isLoading && <p className={styles['loading-text']}>Loading...</p>}
      {!isLoading && errorMessage && (
        <p className={styles['error-message']}>{errorMessage}</p>
      )}

      {!isLoading && fileAnalyzed && syntaxErrors.length > 0 ? (
        <div className={styles['syntax-errors']}>
          <h3>Syntax Errors</h3>
          <ul>
            {syntaxErrors.map((error, index) => (
              <li key={index}>
                Line: {error.line}, Column: {error.column}, Message:{' '}
                {error.message}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        !isLoading &&
        fileAnalyzed && (
          <p className={styles['no-errors-message']}>
            The file has no syntax errors.
          </p>
        )
      )}
    </PageLayout>
  );
};

export default MainPage;
