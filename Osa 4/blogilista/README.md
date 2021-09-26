- npm init (ei luo kansiota)
- tee ite index.js
- npm install express
- npm update
- npm install --save-dev nodemon
- npm install cors (onkohan tämä vielä edes tarpeellinen?)
- npm install mongoose
- yhdistetään mongoose, niin, että luodaan admin ja whitelistataan kaikki IPt
- npm install dotenv

## Käynnistyskomennot
- `npm run dev`
- `npm test`


## Testit
blog_api.test.js -tiedoston testit saa suoritettua komennolla `npm test -- tests/blog_api.test.js`.
Kunkin verbin testit voi suorittaa kommennolla
- `npm test -- -t 'delete'`
- `npm test -- -t 'post'`
- `npm test -- -t 'get'`

