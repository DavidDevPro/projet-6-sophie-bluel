/********** variables du projet work & categories **********/
const gallery = document.querySelector(".gallery");
const btnCategories = document.querySelector(".gallery__filter");

/********** récupération des projets sur l'API **********/
async function getWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des projets :", error);
  }
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
  const arrayWorks = await getWorks();
  arrayWorks.forEach((work) => {
    createWork(work);
  });
}
displayWorks();

/********** récupération des catégories sur l'API **********/
async function getCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
  }
}

/********** création et affichage des boutons sur le dom **********/
async function displayCategories() {
  const arrayCategories = await getCategories();
  arrayCategories.forEach((button) => {
    const btn = document.createElement("button");
    btn.id = button.id;
    btn.textContent = button.name;
    btn.classList.add("button");
    btnCategories.appendChild(btn);
  });
}
displayCategories();

/********** filtrage des projets par catégories **********/
async function categoryFilter() {
  const arrayWorks = await getWorks();
  const arrayBtn = document.querySelectorAll(".gallery__filter button");
  arrayBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      const btnId = e.target.id;
      gallery.innerHTML = "";
      if (btnId !== "0") {
        const newArray = arrayWorks.filter((work) => {
          return work.categoryId == btnId;
        });
        newArray.forEach((work) => {
          createWork(work);
        });
      } else {
        displayWorks();
      }
    });
  });
}
categoryFilter();

/********** suite et fin du code une fois la connection ok **********/

/********** variables suite et fin connection ***********/
const loged = window.sessionStorage.loged;
const logout = document.querySelector(".logout");

/********** fonction d'ajout de la partie edition dans le header **********/
function headerEdition() {
  const header = document.getElementById("header");
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
  btnCategories.classList.add("gallery__filter__remove");
  logout.addEventListener("click", () => {
    window.sessionStorage.loged = false;
  });
}

/********** condition de redirection html login/logout**********/
logout.addEventListener("click", () => {
  if (loged === "true") {
    window.location.href = "./index.html";
  } else {
    window.location.href = "./login.html";
  }
});
