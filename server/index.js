const express = require('express');
const fileUpload = require('express-fileupload');
const pdfParse = require('pdf-parse');
const cors = require('cors');

const PORT = 3001;

const app = express();

app.use(cors());
app.use('/', express.static('public'));
app.use(fileUpload());

app.post('/extract-text', (req, res) => {
  const uniqueLettersMap = new Map(
    [
      ...new Set(
        req.body.letters
          .toLowerCase()
          .split('')
          .filter((char) => /[a-zа-яё]/.test(char))
      ),
    ].map((char) => [char, 0])
  );

  let letterCounter = 0;
  pdfParse(req.files.pdfFile).then((result) => {
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

    const respObj = {};
    respObj['extractedText'] = result.text;
    respObj['letters'] = Object.fromEntries(uniqueLettersMap);
    respObj['letterCounter'] = letterCounter;
    console.log(respObj);
    res.send(respObj);
  });
});

app.listen(PORT);
