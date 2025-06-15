import CryptoJS from 'crypto-js'; // Importante!
// Função para gerar o hash para autenticação
/* function generateHash(ts, privateKey, publicKey) {
  return CryptoJS.MD5(ts + privateKey + publicKey).toString();
} */
function generateHash(ts, privateKey, publicKey) {
  return CryptoJS.MD5(ts + privateKey + publicKey).toString();
}

// Buscar herói pela API
async function searchHero(name) {
  const ts = Date.now();
  const publickey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
  const privatekey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
  const hash = generateHash(ts, privatekey, publickey);

  const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&ts=${ts}&apikey=${publickey}&hash=${hash}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.data.results.length > 0) {
      displayHero(data.data.results[0]);
      displayComics(data.data.results[0].id);
      displayStories(data.data.results[0].id);
    } else {
      alert("Herói não encontrado!");
    }
  } catch (error) {
    console.error("Erro na API:", error);
  }
}

// Exibir informações do herói
function displayHero(hero) {
  const heroCard = document.getElementById("heroCard");
  heroCard.innerHTML = `
    <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" />
    <h2>${hero.name}</h2>
    <p>${hero.description || "Descrição não disponível."}</p>
  `;
}

// Exibir quadrinhos relacionados
async function displayComics(heroId) {
  const ts = Date.now();
  const publickey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
  const privatekey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
  const hash = generateHash(ts, privatekey, publickey);

  const url = `https://gateway.marvel.com/v1/public/characters/${heroId}/comics?ts=${ts}&apikey=${publickey}&hash=${hash}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    const comicsSection = document.getElementById("comicsSection");
    comicsSection.innerHTML = data.data.results.slice(0, 6).map(comic => `
      <div class="comic-card">
        <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}" />
        <p>${comic.title}</p>
      </div>
    `).join("");
  } catch (error) {
    console.error("Erro ao carregar quadrinhos:", error);
  }
}

// Exibir histórias relacionadas
async function displayStories(heroId) {
  const ts = Date.now();
  const publickey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
  const privatekey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
  const hash = generateHash(ts, privatekey, publickey);

  const url = `https://gateway.marvel.com/v1/public/characters/${heroId}/stories?ts=${ts}&apikey=${publickey}&hash=${hash}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    const storiesSection = document.getElementById("storiesSection");
    storiesSection.innerHTML = data.data.results.slice(0, 6).map(story => `
      <div class="story-card">
        <h3>${story.title}</h3>
        <p>${story.description || "Sem descrição."}</p>
      </div>
    `).join("");
  } catch (error) {
    console.error("Erro ao carregar histórias:", error);
  }
}

// Evento de busca
document.getElementById("search").addEventListener("input", (e) => {
  const name = e.target.value.trim();
  if (name.length > 2) {
    searchHero(name);
  }
});