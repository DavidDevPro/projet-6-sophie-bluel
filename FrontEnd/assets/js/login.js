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
    const email = userEmail.value;
    const password = userPassword.value;

    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const userData = await response.json();
      sessionStorage.setItem("token", userData.token);
      sessionStorage.setItem("userId", userData.userId);
      window.location.href = "./index.html";
    } else {
      messageError.textContent =
        "L'adresse email ou le mot de passe ne sont pas valides. Veuillez réessayer.";
      console.error("Erreur lors de la connexion:", response.statusText);
      borderError();
    }
  });
}
login();

/********** suite et fin du code => fichier script.js **********/
