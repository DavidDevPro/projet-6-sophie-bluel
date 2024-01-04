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
    trash.addEventListener("click", (e) => {
      const id = trash.id;
      const response = fetch("http://localhost:5678/api/works/" + id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("la delete a réussi voici la data :", data);
        projetsModal();
        displayWorks();
      } else {
        console.error("Erreur lors de la suppréssion:", response.statusText);
      }
    });
  });
}

/********** création et affichage de la deuxième modal **********/

/*********** variables de la deuxième modal ***********/
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