import { useState } from 'react';
import styles from './mainStyles.module.css';
import { Bar } from './Bar';

export function MainPage() {
  const [letters, setLetters] = useState('');
  const [serverData, setServerData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChanged = (ev) => {
    setSelectedFile(ev.target.files[0]);
  };

  async function fetchData() {
    const formData = new FormData();

    formData.append('pdfFile', selectedFile);
    formData.append('letters', letters);

    const extractedText = await fetch('http://localhost:3001/extract-text', {
      method: 'POST',
      body: formData,
    }).then((resp) => resp.json());

    setServerData(extractedText);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.btnContainer}>
        <input
          type='file'
          className={styles.inpFile}
          onChange={handleFileChanged}
          accept='application/pdf'
        />
        <input
          type='text'
          value={letters}
          className={styles.lookingLet}
          placeholder='Введите искомые буквы...'
          onInput={(e) => setLetters(e.target.value)}
        />
        <button
          type='button'
          className={styles.bntUpload}
          onClick={fetchData}
          disabled={!selectedFile}
        >
          Обработать данные
        </button>
      </div>

      <div className={styles.barList}>
        {serverData && <h1>Общее число букв: {serverData.letterCounter}</h1>}
        {serverData &&
          serverData.letters &&
          Object.keys(serverData.letters).map((key) => (
            <Bar
              key={key}
              id={key}
              label={key}
              percentage={serverData.letters[key] / serverData.letterCounter}
              maxWidth={1000}
            />
          ))}
      </div>

      <textarea
        className={styles.resultText}
        placeholder='Ваш PDF текст будет располагаться здесь...'
        value={serverData?.extractedText || ''}
        readOnly
      ></textarea>
    </div>
  );
}
