const send = require('gmail-send')({
  user: /* REPLACE EMAIL BETWEEN ''*/'example@gmail.com',
  pass: /* REPLACE PASSWORD BETWEEN ""*/"12345678",
  to:   /* REPLACE EMAIL BETWEEN '' */'example@gmail.com',
  subject: 'test subject',
});


send({
  text: 'gmail-send example 1',
}, (error, result, fullResult) => {
  if (error) console.error(error);
  console.log(result);