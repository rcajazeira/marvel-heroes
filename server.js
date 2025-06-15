// server.js
const express = require('express');
const crypto = require('crypto');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

// Chaves da Marvel (adicione ao .env do backend)
const PUBLIC_KEY = 'ce24dfc4af1386baacfce0107b990784';
const PRIVATE_KEY = 'fb9c3c82bcfbae8726b4203c7ae0c647ad2a06e0';

// Rota para buscar herói
app.get('/api/hero/:name', async (req, res) => {
  const ts = Date.now();
  const hash = crypto.createHash('md5').update(ts + PRIVATE_KEY + PUBLIC_KEY).digest('hex');
  const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${req.params.name}&ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro na API Marvel' });
  }
});

// Rota para buscar quadrinhos
app.get('/api/comics/:heroId', async (req, res) => {
  const ts = Date.now();
  const hash = crypto.createHash('md5').update(ts + PRIVATE_KEY + PUBLIC_KEY).digest('hex');
  const url = `https://gateway.marvel.com/v1/public/characters/${req.params.heroId}/comics?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro na API Marvel' });
  }
});

// Rota para buscar histórias
app.get('/api/stories/:heroId', async (req, res) => {
  const ts = Date.now();
  const hash = crypto.createHash('md5').update(ts + PRIVATE_KEY + PUBLIC_KEY).digest('hex');
  const url = `https://gateway.marvel.com/v1/public/characters/${req.params.heroId}/stories?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro na API Marvel' });
  }
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
