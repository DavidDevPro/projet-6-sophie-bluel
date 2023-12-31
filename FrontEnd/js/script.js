/********** variables du projet work & categories **********/
const gallery = document.querySelector(".gallery");
const btnCategories = document.querySelector(".gallery__filter");

/********** récupération des projets sur l'API **********/
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

/********** création d'un seul projet **********/
function createWork(work) {
  const baliseFigure = document.createElement("figure");
  const images = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  images.src = work.imageUrl;
  images.alt = work.title;
  figcaption.innerHTML = work.title;
  gallery.appendChild(baliseFigure);
  baliseFigure.appendChild(images);
  baliseFigure.appendChild(figcaption);
}

/********** affichage des projets sur le dom **********/
async function displayWorks() {
  gallery.innerHTML = "";
  const arrayWorks = await getWorks(); //tableau des projets
  arrayWorks.forEach((work) => {
    createWork(work);
  });
}

/********** récupération des catégories sur l'API **********/
async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}

/********** création et affichage des boutons sur le dom **********/
async function displayCategories() {
  const arrayCategories = await getCategories(); //tableau des catégories
  for (i = 0; i < arrayCategories.length; i++) {
    const btn = document.createElement("button");
    btn.classList.add("button");
    btn.innerHTML = arrayCategories[i].name;
    btn.id = arrayCategories[i].id;
    btnCategories.appendChild(btn);
  }
}

/********** filtrage des projets par catégories **********/
async function btnFilter() {
  const arrayWorks = await getWorks();
  const arrayBtn = document.querySelectorAll(".gallery__filter button");
  arrayBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      const btnId = e.target.id;
      gallery.innerHTML = "";
      arrayWorks.forEach((work) => {
        if (btnId == work.categoryId) {
          createWork(work);
        } else if (btnId == "0") {
          createWork(work);
        }
      });
    });
  });
}

/********** suite et fin du code une fois la connection ok **********/

/********** fonction principal main **********/
function main() {
  getWorks();
  displayWorks();
  getCategories();
  displayCategories();
  btnFilter();
}
main();
