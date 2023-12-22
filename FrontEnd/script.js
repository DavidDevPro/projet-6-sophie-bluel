/* variables du projet */
const gallery = document.querySelector(".gallery");

/* test backend + récupération des works */
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
    figcaption.innerHTML = arrayWorks[i].title;
  }
}
showWorks();
