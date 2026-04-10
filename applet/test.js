import fs from 'fs';
fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTslaZTTQMWKHnvJpOlcGD17cID00ToZPG9oEhi8_1nuouRk8kLyGS9-1UrmqsR5Xi1s2---uNqCFJ-/pub?output=csv&gid=2043352103').then(r=>r.text()).then(t=>console.log([...new Set(t.split('\n').map(l=>l.split(',')[0]))]));
