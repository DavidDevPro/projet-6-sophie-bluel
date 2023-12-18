//test swagger
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const responseJson = await response.json();
  console.log(responseJson);
}
getWorks();

//remove gallery et son contenue dans le index.html
const removeGallery = document.querySelector("#portfolio .gallery");
removeGallery.remove("#portfolio .gallery");
