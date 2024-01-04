/********** création et ajout des projets dans la modal **********/
async function projetsModal() {
  const projetContainer = document.querySelector(".modal__content");
  projetContainer.innerHTML = "";
  const modalProjets = await getWorks();
  console.log(modalProjets);
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
  /********** => => => ATTENTION !!! faire jouer la fonction deleteProjet
                  une fois que la fonction projectModal ai fini d'être lu !!! ATTENTION **********/
}
projetsModal();

/********** suppéssion au click d'une image dans la modal **********/
