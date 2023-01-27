const usuarios = (url = "https://reqres.in/api/users?delay=3") => { //Imprime los datos que contiene la URL
    let caduca = localStorage.getItem("Caduca");
    if (Object.is(null, caduca) || new Date().getTime() > caduca) {
        console.log("Fetch");
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((users) => {
                localStorage.setItem("users", JSON.stringify(users.data));
                localStorage.setItem("fechaCaducidad", (new Date().getTime()) + 60_000);
                insertaUsuarios(users.data);
            })
            .catch((error) => console.log(error));
    } else {
        insertaUsuarios(JSON.parse(localStorage.getItem("users")));
        console.log("Datos locales");
    }
};

//Mostrar los usuarios
function insertaUsuarios(users) {
    let container = document.querySelector(".tbody");
        container.innerHTML = "";
    localStorage.setItem("users", JSON.stringify(users));
    for (let user of users) {
        const dom = document.createElement("tr");
        dom.classList.add("principal-container");
        dom.innerHTML = `
            <td>${user.id}</td>
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>${user.email} </td>
            <img src="${user.avatar}" alt="profile picture" class="rounded-circle columnprofile img-fluid">`
        container.appendChild(dom);
    }
}