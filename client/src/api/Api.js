class Api {
  #BASE_URL = 'https://pdf-analyse.onrender.com/';

  async extractText(file, letters) {
    const formData = new FormData();
    formData.append('pdfFile', file);
    formData.append('letters', letters);

    const response = await fetch(`${this.#BASE_URL}extract-text`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to extract text');
    }

    return await response.json();
  }
}

const apiInstance = new Api();

export default apiInstance;
