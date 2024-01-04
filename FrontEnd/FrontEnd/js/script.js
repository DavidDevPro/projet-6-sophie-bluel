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
displayWorks();

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
displayCategories();

/********** filtrage des projets par catégories **********/
async function btnFilter() {
  const arrayWorks = await getWorks();
  const arrayBtn = document.querySelectorAll(".gallery__filter button");
  arrayBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      const btnId = e.target.id;
      console.log(btnId);
      gallery.innerHTML = "";
      arrayWorks.forEach((work) => {
        if (btnId == work.categoryId || btnId == "0") {
          createWork(work);
        }
      });
    });
  });
}
btnFilter();

/********** suite et fin du code une fois la connection ok **********/

/********** variables suite et fin connection ***********/
const loged = window.sessionStorage.loged;
const logout = document.querySelector(".logout");
const header = document.getElementById("header");
const token = window.sessionStorage.token;
const userId = window.sessionStorage.userId;
console.log(token, userId);

/********** fonction d'ajout de la partie edition dans le header **********/
function headerEdition() {
  const editionBanner = document.createElement("div");
  editionBanner.classList.add("edition__mode");
  editionBanner.innerHTML = `<p><i class="fa-regular fa-pen-to-square"></i>Mode édition</p>`;
  header.classList.add("header__margin");
  header.appendChild(editionBanner);
}

/********** fonction d'ajout du bouton d'edition **********/
function createBtnModifier() {
  const parentTitle = document.querySelector(".portfolio__title");
  const createBtn = document.createElement("div");
  createBtn.classList.add("btn__modifier");
  parentTitle.appendChild(createBtn);
  createBtn.innerHTML =
    '<i class="fa-regular fa-pen-to-square"></i>Mode édition';
}

/********** bouton logout, admin et logique de déconnection ***********/
if (loged === "true") {
  logout.textContent = "Logout";
  headerEdition();
  createBtnModifier();
  displayModal();

  btnCategories.classList.add("gallery__filter__remove");
  logout.addEventListener("click", () => {
    window.sessionStorage.loged = false;
  });
}

logout.addEventListener("click", () => {
  if (loged === "true") {
    window.location.href = "./index.html";
  } else {
    window.location.href = "./login.html";
  }
});

/********** fonction d'affichage de la modal au click sur le bouton modifier ***********/
function displayModal() {
  const btnModal = document.querySelector(".btn__modifier");
  const containerModal = document.querySelector(".modal__container");
  const xmark = document.querySelector(".modal__container .fa-xmark");
  btnModal.addEventListener("click", () => {
    containerModal.style.display = "flex";
  });
  xmark.addEventListener("click", () => {
    containerModal.style.display = "none";
  });
  containerModal.addEventListener("click", (e) => {
    if (e.target.className === "modal__container") {
      containerModal.style.display = "none";
    }
  });
}
