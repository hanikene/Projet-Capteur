const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
let state = { opened: false };

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/api/state', (req, res) => res.json(state));
app.post('/api/state', (req, res) => {
  state.opened = req.body.opened;
  res.json(state);
});
app.get('/', (req, res) => res.render('home', { state }));

app.listen(PORT, () => console.log(`server connected on port: ${PORT}`));
