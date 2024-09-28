const fileUpload = require('express-fileupload');
const pdfParse = require('pdf-parse');

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const pdfFile = body.pdfFile; // передать файл в формате Base64

  const buffer = Buffer.from(pdfFile, 'base64');

  const uniqueLettersMap = new Map(
    [
      ...new Set(
        body.letters
          .toLowerCase()
          .split('')
          .filter((char) => /[a-zа-яё]/.test(char))
      ),
    ].map((char) => [char, 0])
  );

  let letterCounter = 0;

  const result = await pdfParse(buffer);
  result.text
    .toLowerCase()
    .split('')
    .forEach((symb) => {
      if (/[a-zа-яё]/.test(symb) && uniqueLettersMap.has(symb)) {
        uniqueLettersMap.set(symb, uniqueLettersMap.get(symb) + 1);
      }

      if (/[a-zа-яё]/.test(symb)) {
        ++letterCounter;
      }
    });

  const respObj = {
    extractedText: result.text,
    letters: Object.fromEntries(uniqueLettersMap),
    letterCounter: letterCounter,
  };

  return {
    statusCode: 200,
    body: JSON.stringify(respObj),
  };
};
