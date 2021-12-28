function login(){
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    axios.post("https://limpid-backend.herokuapp.com/users/login", {
        username : username.value,
        password : password.value
    })
    .then(res => {
        if(res.data.token != undefined) {
            localStorage.setItem("token", res.data.token)
            username.value = "";
            password.value = "";
            if(res.data.role == "CLIENT")
                window.location.href = "./homeClient.html";
            else
                window.location.href = "./homeHousekeeper.html";
        } else {
            alert(res.data)
        }
    })
    .catch();
}