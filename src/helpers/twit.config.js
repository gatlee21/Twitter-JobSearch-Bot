
const Twit = require('twit')

const T = new Twit({
    consumer_key:         '95FP7prmP9wni6AEg9tD9mD81',
    consumer_secret:      'bOZEkFXETmlkuXUyYFY8s3a2AxGVAoHEoBXWRgQrJLHYn1txyg',
    access_token:         '...',
    access_token_secret:  '...',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
  })


module.exports = T