// Remova as linhas de importação de variáveis de ambiente
// import.meta.env.VITE_MARVEL_PUBLIC_KEY e VITE_MARVEL_PRIVATE_KEY

// Função para buscar herói
async function searchHero(name) {
  const response = await fetch(`https://seu-backend.vercel.app/api/hero/${name}`); 
  const data = await response.json();
  if (data.data.results.length > 0) {
    displayHero(data.data.results[0]);
    displayComics(data.data.results[0].id);
    displayStories(data.data.results[0].id);
  } else {
    alert("Herói não encontrado!");
  }
}

// Função para buscar quadrinhos
async function displayComics(heroId) {
  const response = await fetch(`https://seu-backend.vercel.app/api/comics/${heroId}`); 
  const data = await response.json();
  const comicsSection = document.getElementById("comicsSection");
  comicsSection.innerHTML = data.data.results.slice(0, 6).map(comic => `
    <div class="comic-card">
      <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}" />
      <p>${comic.title}</p>
    </div>
  `).join("");
}

// Função para buscar histórias
async function displayStories(heroId) {
  const response = await fetch(`https://seu-backend.vercel.app/api/stories/${heroId}`); 
  const data = await response.json();
  const storiesSection = document.getElementById("storiesSection");
  storiesSection.innerHTML = data.data.results.slice(0, 6).map(story => `
    <div class="story-card">
      <h3>${story.title}</h3>
      <p>${story.description || "Sem descrição."}</p>
    </div>
  `).join("");
}
