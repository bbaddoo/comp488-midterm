const express = require('express');
const path = require("path");
const app = express();
const PORT = 3000;

//path to my front end folder with my webiste details
app.use(express.static(path.join(__dirname, 'frontend')));

//my index file to root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});
//access to port
app.listen(PORT, () => {
    console.log(`frontend running on http://localhost:${PORT}`);
});


