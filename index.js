const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Configurazioni
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Dati sulle razze (25 razze)
const dogBreeds = {
  'labrador': { lifespan: 12, size: 'large' },
  'golden_retriever': { lifespan: 11, size: 'large' },
  'german_shepherd': { lifespan: 10, size: 'large' },
  'poodle_standard': { lifespan: 14, size: 'medium' },
  'poodle_miniature': { lifespan: 15, size: 'small' },
  'beagle': { lifespan: 13, size: 'medium' },
  'dachshund': { lifespan: 15, size: 'small' },
  'chihuahua': { lifespan: 17, size: 'small' },
  'bulldog': { lifespan: 8, size: 'medium' },
  'siberian_husky': { lifespan: 13, size: 'large' },
  'rottweiler': { lifespan: 9, size: 'large' },
  'yorkshire_terrier': { lifespan: 14, size: 'small' },
  'boxer': { lifespan: 10, size: 'large' },
  'doberman': { lifespan: 11, size: 'large' },
  'great_dane': { lifespan: 7, size: 'giant' },
  'shih_tzu': { lifespan: 13, size: 'small' },
  'corgi': { lifespan: 13, size: 'small' },
  'pomeranian': { lifespan: 14, size: 'small' },
  'maltese': { lifespan: 13, size: 'small' },
  'saint_bernard': { lifespan: 8, size: 'giant' },
  'boston_terrier': { lifespan: 12, size: 'small' },
  'border_collie': { lifespan: 13, size: 'medium' },
  'australian_shepherd': { lifespan: 13, size: 'medium' },
  'cavalier_king_charles': { lifespan: 11, size: 'small' },
  'jack_russell': { lifespan: 14, size: 'small' }
};

app.get('/', (req, res) => {
  try {
    res.render('index', { 
      breeds: Object.keys(dogBreeds),
      error: null 
    });
  } catch (error) {
    console.error('Errore nel rendering della pagina:', error.message);
    res.status(500).send('Errore interno del server');
  }
});

app.post('/calculate', (req, res) => {
  try {
    const { breed, weight, age, dogName } = req.body;

    // Validazione input
    if (!breed || !weight || !age || !dogName) {
      return res.render('index', {
        breeds: Object.keys(dogBreeds),
        error: 'Compila tutti i campi!'
      });
    }

    const parsedAge = parseFloat(age);
    const parsedWeight = parseFloat(weight);

    if (isNaN(parsedAge) || isNaN(parsedWeight)) {
      return res.render('index', {
        breeds: Object.keys(dogBreeds),
        error: 'Inserisci valori numerici validi per peso ed età'
      });
    }

    // Calcolo età umana
    const breedData = dogBreeds[breed];
    if (!breedData) {
      return res.render('index', {
        breeds: Object.keys(dogBreeds),
        error: 'Razza non riconosciuta'
      });
    }

    const humanAge = (parsedAge / breedData.lifespan) * 80;

    res.render('result', {
      dogName: dogName.trim(),
      humanAge: humanAge.toFixed(1)
    });

  } catch (error) {
    console.error('Errore nel calcolo:', error.message);
    res.status(500).send('Errore durante il calcolo');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});