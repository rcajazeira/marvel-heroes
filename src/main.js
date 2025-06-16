// Função para buscar herói
async function searchHero(name) {
  try {
    const response = await fetch(`https://marvel-back-end-nine.vercel.app/api/hero/${name}`); 
    const data = await response.json();
    if (data.data.results.length > 0) {
      displayHero(data.data.results[0]);
      displayComics(data.data.results[0].id);
      displayStories(data.data.results[0].id);
    } else {
      alert("Herói não encontrado!");
    }
  } catch (error) {
    console.error("Erro ao buscar herói:", error);
    alert("Ocorreu um erro ao buscar o herói.");
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

// Função para buscar quadrinhos
async function displayComics(heroId) {
  try {
    const response = await fetch(`https://marvel-back-end-nine.vercel.app/api/comics/${heroId}`); 
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
    document.getElementById("comicsSection").innerHTML = "<p>Nenhum quadrinho encontrado.</p>";
  }
}

// Função para buscar histórias
async function displayStories(heroId) {
  try {
    const response = await fetch(`https://marvel-back-end-nine.vercel.app/api/stories/${heroId}`); 
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
    document.getElementById("storiesSection").innerHTML = "<p>Nenhuma história encontrada.</p>";
  }
}

// Evento de busca
document.getElementById("search").addEventListener("input", (e) => {
  const name = e.target.value.trim();
  if (name.length > 2) {
    searchHero(name);
  }
});
