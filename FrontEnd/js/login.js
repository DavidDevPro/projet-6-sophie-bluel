/********** variables du projet login **********/
const Form = document.getElementById("form__user");
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("password");
const messageError = document.getElementById("message__error");

/********** ajout de la class border__error en cas d'echec de connection **********/
function borderError() {
  userEmail.classList.add("border__error");
  userPassword.classList.add("border__error");
}

/********** fonction principal de connection **********/
async function login() {
  Form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = userEmail.value; // récupération de la valeur saisie de email
    const password = userPassword.value; // récupération de la valeur saisie de password

    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), // email et password au format json
    });

    if (response.ok) {
      const userData = await response.json();
      localStorage.setItem("token", userData.token);
      //console.log(userData);
      window.sessionStorage.loged = true;
      window.location.href = "./index.html"; // rediréction page d'accueil du site
    } else if (response.status === 401) {
      messageError.textContent =
        "L'adresse mail ou le mot de passe ne sont pas valides.";
      borderError();
    } else {
      messageError.textContent =
        "Une erreur s'est produite lors de la connexion. Veuillez réessayer.";
      console.error("Erreur lors de la connexion:", response.statusText);
      borderError();
    }
  });
}
login();

/********** suite et fin du code => fichier works.js **********/
