import fs from 'fs';
import path from 'path';

async function download() {
  const url1 = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTslaZTTQMWKHnvJpOlcGD17cID00ToZPG9oEhi8_1nuouRk8kLyGS9-1UrmqsR5Xi1s2---uNqCFJ-/pub?output=csv&gid=0';
  const url2 = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTslaZTTQMWKHnvJpOlcGD17cID00ToZPG9oEhi8_1nuouRk8kLyGS9-1UrmqsR5Xi1s2---uNqCFJ-/pub?output=csv&gid=2043352103';

  const res1 = await fetch(url1);
  const text1 = await res1.text();
  fs.mkdirSync('src/data', { recursive: true });
  fs.writeFileSync('src/data/trending.csv', text1);

  const res2 = await fetch(url2);
  const text2 = await res2.text();
  fs.writeFileSync('src/data/fields.csv', text2);

  console.log("Downloaded both CSVs to src/data.");
}

download();
