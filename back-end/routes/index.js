const express = require('express'),
  path = require('path'),
  app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('index', { title: 'Express' })
})
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('/error', (req, res) => {
  const error = req.error || req.query.error || ''
  res
    .status(500)
    .render('error', { error })
})
app.get('*', (req, res) => {
  res.status(400).render('404')
})

app.use(genericErrorHandler)
module.exports = router;
