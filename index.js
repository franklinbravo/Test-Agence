const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const path = require('path');
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


//Routes
app.use(require('./server/routes/caol.routes'));

//Static Files
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => console.log('Server on port:' + PORT))