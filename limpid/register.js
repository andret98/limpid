function registerC(){
    const username = document.getElementById("usernameC");
    const password = document.getElementById("passwordC");
    const phone = document.getElementById("phoneC");
    const name = document.getElementById("nameC");
    const size = document.getElementById("size");
    const address = document.getElementById("address");
    const role = "CLIENT"

    if(username.value.length < 1 || password.value.length < 1 || phone.value.length < 1 || name.value.length < 1 || size.value.length < 1 || address.value.length < 1) {
        alert("Please complet all entries")
        return
    }

    if(Number(size.value) < 0) {
        alert("Invalid size")
        size.value = "";
        return
    }
    axios.post("https://limpid-backend.herokuapp.com/users/register", {
        username : username.value,
        password : password.value,
        role : role,
        phone : phone.value,
        name : name.value,
        size : Number(size.value),
        address : address.value
    })
    .then(res => {
        if(res.data.token != undefined) {
            localStorage.setItem("token", res.data.token)
            username.value = "";
            password.value = "";
            phone.value = "";
            name.value = "";
            size.value = "";
            window.location.href = "./homeClient.html";
        } else {
            alert(res.data)
        }
    })
    .catch();
}


function registerH(){
    const username = document.getElementById("usernameH");
    const password = document.getElementById("passwordH");
    const phone = document.getElementById("phoneH");
    const name = document.getElementById("nameH");
    const price = document.getElementById("price");
    const role = "HOUSEKEEPER"

    if(username.value.length < 1 || password.value.length < 1 || phone.value.length < 1 || name.value.length < 1 || price.value.length < 1) {
        alert("Please complet all entries")
        return
    }

    if(Number(price.value) < 0) {
        alert("Invalid price")
        price.value = "";
        return
    }
    axios.post("https://limpid-backend.herokuapp.com/users/register", {
        username : username.value,
        password : password.value,
        role : role,
        phone : phone.value,
        name : name.value,
        price : Number(price.value)
    })
    .then(res => {
        if(res.data.token != undefined) {
            localStorage.setItem("token", res.data.token)
            username.value = "";
            password.value = "";
            phone.value = "";
            name.value = "";
            price.value = "";
            window.location.href = "./homeClient.html";
        } else {
            alert(res.data)
        }
    })
    .catch();
}