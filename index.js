const https = require('https');

(async function () {
  if (process.argv[2]) {
    const fundName = process.argv[2]

    https.get('https://codequiz.azurewebsites.net/', {
      headers: {
        Cookie: 'hasCookie=true'
      }
    }, (res) => {
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          const regex = new RegExp(`<td>\\W?${fundName}\\W?<\/td><td>([\\d.]+)<\/td>`)
          const match = regex.exec(rawData)

          if (match) {
            console.log(match[1])
          } else {
            console.log('Not found NAV')
          }
        } catch (e) {
          console.error(e.message);
        }
      });
    })
  }
})();