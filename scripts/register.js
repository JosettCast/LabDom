/**
 * Para acceder a elementos del DOM, siempre es mediante el document la primera vez
 * versión old
 * .getElementById() //regresa el primer elemento con ese id
 * version más nueva
 * .querySelector() //recibe un selector css, regresa igualmente el primero que encuentra 
 * . clases
 * # ids
 * div selector de elemento
 * Seleciionar más de un elemento
 *  .querySelectorAll();
 * .getElementsByClassName();
 */

const formEl = document.querySelector("form");
const divEl = document.querySelector(".message");

/*agregando evento al elemento
Recibe dos elementos:
1. Tipo de evento
2. Una función de callback,
que evento se va a desencadenar cuando ocurra ese evento.

Para evitar efectos por defecto de los elementos usamos preventDefault
*/
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    divEl.innerHTML = " ";
    //console.log(event);
    
    // const fullName = event.target.elements["exampleInputName"].value;
    // console.log(fullName);

    //forma de obtener todos los valores de un formulario
    const formData = new FormData(formEl);
    //for(const [key, value] of formData){
        //console.log(`Key ${key} : Value ${value}`);
    
    const arrayData = [...formData];
    // console.log((arrayData));
    const objectData = Object.fromEntries(arrayData);
    if(!checkPasswords(objectData.namePassword, objectData.nameConfirmPassword)){
        renderError("Las contraseñas no coinciden");
        return;
    };
    //console.log(objectData);
    //console.log(JSON.stringify(objectData));
    localStorage.setItem(objectData.nameEmail, JSON.stringify(objectData));
    renderSuccess("Registro exitoso");
    formEl.reset();
    setTimeout(() => {
       window.location.href ="./pages/login.html"
    }, 3000)
});

//función para checar que ambas contraseñas sean iguales.
const checkPasswords = (namePassword, nameConfirmPassword) => namePassword === nameConfirmPassword;
//función para renderizar un mensaje de error
const renderError = (message) => {
    const alert = `
    <div class="alert alert-danger" role="alert">
       ${message}
    </div>
  `;
  // el inner reemplaza el contenido html anterior por el nuevo
  // divEl.innerHTML += alert;
  divEl.insertAdjacentHTML("afterbegin", alert);
}

const renderSuccess = (message) => {
    const alert = `
    <div class="alert alert-success" role="alert">
      ${message}
    </div>
  `;
  divEl.insertAdjacentHTML("afterbegin", alert);
}
