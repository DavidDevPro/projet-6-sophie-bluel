/****** variables du projet ******/
const gallery = document.querySelector(".gallery");
const filterCategories = document.querySelector(".gallery__filter");

/****** test backend + récupération des projets ******/
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}
getWorks();

async function showWorks() {
  const arrayWorks = await getWorks();
  console.log(arrayWorks);
  for (i = 0; i < arrayWorks.length; i++) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    gallery.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(figcaption);
    img.src = arrayWorks[i].imageUrl;
    img.alt = arrayWorks[i].title;
    figcaption.innerHTML = arrayWorks[i].title;
  }
}
showWorks();

/****** affichage des boutons filtres par catégories *****/

/* première étape: récuperer le tableau des catégories via l'api*/
async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}
getCategories();

async function showCategories() {
  const arrayCategories = await getCategories();
  for (i = 0; i < arrayCategories.length; i++) {
    const btn = document.createElement("button");
    filterCategories.appendChild(btn);
    btn.classList.add("button");
    btn.innerHTML = arrayCategories[i].name;
    btn.id = arrayCategories[i].id;
    console.log(btn.id);
  }
}
showCategories();

/* deuxième étape: filtrer l'affichage des catégories au click */
