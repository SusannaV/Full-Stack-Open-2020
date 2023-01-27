# Blogilista (backend) 2023

npm run dev

## Testit
blog_api.test.js -tiedoston testit saa suoritettua komennolla `npm test -- tests/blog_api.test.js`.
Kunkin verbin testit voi suorittaa kommennolla
- `npm test -- -t 'delete'`



## REST-requestit
VSC:n rest-requestit on tosi tarkkoja muodosta. Bodyn sisällä viimeinen merkki ei saa olla pilkku, ja headereiden ja bodyn välissä pitää olla tyhjä rivi (Error: Header name must be a valid HTTP token ["{"])