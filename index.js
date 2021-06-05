const express = require('express');
const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';
app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');

// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/dockerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('MongoDB connected');
});

const dockerSchema = new mongoose.Schema({
  name: String,
});

app.get('/', async (req, res) => {
  const Docker = mongoose.model('Docker', dockerSchema);
  const container = new Docker({
    name: 'Hi Docker we have created a container!',
  });

  await container.save(function (err, container) {
    if (err) {
      return console.error(err);
    } else {
      return console.log('Successfully Added');
    }
  });
  const data = await Docker.find({});
  console.log(data);

  res.render('home', { data });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
