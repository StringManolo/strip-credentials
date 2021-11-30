const send = require('gmail-send')({
  user: /* REPLACE EMAIL BETWEEN ''*/'manolo@example.com',
  pass: /* REPLACE PASSWORD BETWEEN ""*/"mypass",
  to:   /* REPLACE EMAIL BETWEEN '' */'example@example.com',
  subject: 'test subject',
});


send({
  text: 'gmail-send example 1',
}, (error, result, fullResult) => {
  if (error) console.error(error);
  conso