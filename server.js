//Express server looking at port 8080

const express = require('express');
const app = express();

app.use('/', express.static('files', {extensions: ['htm', 'html']}));

app.get("*", function (req, res) {
  res.end("");
});
  
app.listen(8080);