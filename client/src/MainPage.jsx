import { useState } from 'react';
import styles from './mainStyles.module.css';
import { Bar } from './components/Bar/Bar';
import Api from './api/Api';

export function MainPage() {
  const [letters, setLetters] = useState('');
  const [serverData, setServerData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleTextChange = (event) => {
    setLetters(event.target.value);
  };

  const fetchData = async () => {
    if (!selectedFile || !letters) return;

    setIsLoading(true);
    try {
      const data = await Api.extractText(selectedFile, letters);
      setServerData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderBars = () => {
    if (!serverData?.letters) return null;

    return Object.keys(serverData.letters).map((key) => (
      <Bar
        key={key}
        id={key}
        label={key}
        percentage={serverData.letters[key] / serverData.letterCounter}
        maxWidth={1000}
      />
    ));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.btnContainer}>
        <div className={styles.fileUploadWrapper}>
          <label className={styles.customFileButton} htmlFor='fileUpload'>
            Выберите файл
          </label>
          <input
            id='fileUpload'
            type='file'
            className={styles.inpFile}
            onChange={handleFileChange}
            accept='application/pdf'
          />
          <span className={styles.selectedFileName}>
            {selectedFile ? selectedFile.name : 'Файл не выбран'}
          </span>
        </div>

        <input
          type='text'
          value={letters}
          className={styles.lookingLet}
          placeholder='Введите искомые буквы...'
          onChange={handleTextChange}
        />

        <button
          type='button'
          className={styles.bntUpload}
          onClick={fetchData}
          disabled={!selectedFile || isLoading}
        >
          {isLoading ? 'Обработка...' : 'Обработать данные'}
        </button>
      </div>

      {isLoading && <div className={styles.loader}>Загрузка...</div>}

      <textarea
        className={styles.resultText}
        placeholder='Ваш PDF текст будет располагаться здесь...'
        value={serverData?.extractedText || ''}
        readOnly
      />

      <div className={styles.barList}>
        {serverData && <h1>Общее число букв: {serverData.letterCounter}</h1>}
        {renderBars()}
      </div>
    </div>
  );
}
