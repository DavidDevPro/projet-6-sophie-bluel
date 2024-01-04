/********** création et ajout des projets dans la modal **********/
async function projetsModal() {
  const projetContainer = document.querySelector(".modal__content");
  projetContainer.innerHTML = "";
  const modalProjets = await getWorks();
  modalProjets.forEach((projet) => {
    const figure = document.createElement("figure");
    const imgModal = document.createElement("img");
    const span = document.createElement("span");
    const trash = document.createElement("i");
    trash.classList.add("fa-solid", "fa-trash-can");
    trash.id = projet.id;
    imgModal.src = projet.imageUrl;
    projetContainer.appendChild(figure);
    figure.appendChild(imgModal);
    figure.appendChild(span);
    span.appendChild(trash);
  });
  deleteProjet(); /********** => => => ATTENTION !!! faire jouer la fonction deleteProjet
                  une fois que la fonction projectModal ai fini d'être lu !!! ATTENTION **********/
}
projetsModal();

/********** suppréssion au click d'une image dans la modal **********/
function deleteProjet() {
  const trashIcons = document.querySelectorAll(".fa-trash-can");
  trashIcons.forEach((trash) => {
    trash.addEventListener("click", async (e) => {
      const id = trash.id;
      const response = await fetch("http://localhost:5678/api/works/" + id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("La suppression a réussi.");
        projetsModal();
        displayWorks();
      } else {
        console.error("Erreur lors de la suppression:", response.statusText);
      }
    });
  });
}

/********** création et affichage de la deuxième modal **********/

/********** variables de la deuxième modal ***********/
const btnDisplayModal = document.querySelector(".modal__projets button");
const modalAddProjects = document.querySelector(".modal__addProjets");
const modalProjets = document.querySelector(".modal__projets");
const arrowLeft = document.querySelector(".modal__addProjets .fa-arrow-left");
const modalXmark = document.querySelector(".modal__addProjets .fa-xmark");
const containerModal = document.querySelector(".modal__container");

/*********** fonction display de la deuxième modal ***********/
function displaySecondModal() {
  btnDisplayModal.addEventListener("click", () => {
    modalAddProjects.style.display = "flex";
    modalProjets.style.display = "none";
  });
  arrowLeft.addEventListener("click", () => {
    modalAddProjects.style.display = "none";
    modalProjets.style.display = "flex";
  });
  modalXmark.addEventListener("click", () => {
    containerModal.style.display = "none";
    window.location = "index.html";
  });
}
displaySecondModal();

/********** prévisualisation de l'image du projet **********/
const containerFile = document.querySelector(".modal__containerFile");
const inputFile = containerFile.querySelector("#file");
const previewImg = containerFile.querySelector("img");
const labelFile = containerFile.querySelector("label");
const iconFile = containerFile.querySelector(".fa-image");
const pFile = containerFile.querySelector("p");

inputFile.addEventListener("change", () => {
  console.log("Input file changed!");
  const file = inputFile.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;
      containerFile.style.display = "flex";
      [labelFile, iconFile, pFile].forEach((element) => {
        element.style.display = "none";
      });
      /******* Affichage de l'image une fois chargée *******/
      previewImg.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

/********** Faire une requéte POST pour ajouter ajouter un projet **********/
const form = document.querySelector("form");
const title = document.querySelector("#modal__title");
const category = document.querySelector("#modal__category");
const formError = document.querySelector(".error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  /* Vérifier si les champs titre et catégorie sont vides */
  if (!title.value.trim() || !category.value.trim()) {
    formError.textContent =
      "Veuillez renseigner un titre et choisir une catégorie.";
    form.appendChild(formError);

    /* Afficher une erreur et empêcher l'envoi du formulaire */
    console.error("Veuillez remplir tous les champs du formulaire.");
    return;
  }
  const formData = new FormData();
  formData.append("image", inputFile.files[0]);
  formData.append("title", title.value);
  formData.append("category", category.value);

  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      console.log("Nouveau projet créé !");
      /* Actualisation dynamique du DOM pour ajouter le nouveau projet */
      projetsModal();
      displayWorks();
    } else {
      console.error("Erreur lors de l'envoi :", response.statusText);
    }
  } catch (error) {
    console.error("Une erreur est survenue lors de l'envoi :", error);
  }
});
