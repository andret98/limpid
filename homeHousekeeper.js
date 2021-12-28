let requests = []

function getProfile() {
    const token = localStorage.getItem("token");
    axios.get("https://limpid-backend.herokuapp.com/users/myProfile", {
        headers: {
            'Authorization' : `Bearer ${token}`,
        }
    })
    .then(res => {
        const data = res.data;
        document.getElementById("username").innerHTML = data.username;
        document.getElementById("name").value = data.name;
        document.getElementById("phone").value = data.phone;
        document.getElementById("price").value = data.price;
    })
    .catch()
}

function update() {
    const token = localStorage.getItem("token");
    data = {
        name : document.getElementById("name").value,
        phone : document.getElementById("phone").value,
        price : Number(document.getElementById("price").value)
    }
    axios.post("https://limpid-backend.herokuapp.com/users/myProfile", data, {
        headers: {
            'Authorization' : `Bearer ${token}`,
        }
    }
    ).then( res => {
        alert(res.data)
    }).catch( e => console.log(e))
}

function showRequests(data) {
    let result = "";
    let ok = true;
    if(requests.length == data.length) {
        for(let i = 0; i< data.length; i++) {
            if(requests[i].status != data[i].status) {
                ok = false;
                break
            }
        }
    } else {
        ok = false
    }
    if(ok)
        return
    requests = data;
    console.log("da")
    data.forEach(elem => {
        let button = "";
        let phone = "";
        if(elem.status == "PENDING") {
            button = `<ion-button id="update-button" onclick="cancel('${elem.usernameClient}')">` +
                    '  CANCEL' +
                    '</ion-button>' + 
                    `<ion-button id="update-button" onclick="accept('${elem.usernameClient}')">` +
                    '  ACCEPT' +
                    '</ion-button>'
        } else if(elem.status == "ACCEPTED") {
            button = `<ion-button id="update-button" onclick="done('${elem.usernameClient}')">` +
            '  DONE CLEANNING' +
            '</ion-button>' 
        }

        if(elem.phone != undefined) {
            phone = `Phone: ${elem.phone}<br/>`;
        }
        if(elem.status != "FINISHED") {
            result = result + '<ion-item>' +
                    '<img src="img/defaultProfile.jpg" class="ProfileImg">' +
                    '<div>' +
                    `Client: ${elem.nameClient} <br/>` +
                    `Total: ${elem.price * elem.size} <br/>` +
                    phone +
                    `Address: ${elem.address} <br/>`+
                    `Status: ${elem.status} <br/>` +
                    button +
                    '</div>' +
                    '</ion-item>'
        }
    });
    document.getElementById("requestTab").innerHTML = result
}

function getRequests() {
    const token = localStorage.getItem("token");
    axios.get("https://limpid-backend.herokuapp.com/users/myRequests",{
        headers: {
            'Authorization' : `Bearer ${token}`,
        }
    })
    .then( res => {
        showRequests(res.data)
    })
    .catch()
}

function cancel(username) {
    const token = localStorage.getItem("token");
    const data = {
        username : username,
    }
    axios.post("https://limpid-backend.herokuapp.com/users/myRequests/cancel", data, {
        headers: {
            'Authorization' : `Bearer ${token}`,
        }
    })
    .then( res => {
        getRequests()
    })
    .catch()
}

function accept(username) {
    const token = localStorage.getItem("token");
    const data = {
        username : username,
    }
    axios.post("https://limpid-backend.herokuapp.com/users/myRequests/accept", data, {
        headers: {
            'Authorization' : `Bearer ${token}`,
        }
    })
    .then( res => {
        getRequests()
    })
    .catch()
}

function done(username) {
    const token = localStorage.getItem("token");
    const data = {
        username : username,
    }
    axios.post("https://limpid-backend.herokuapp.com/users/myRequests/done", data, {
        headers: {
            'Authorization' : `Bearer ${token}`,
        }
    })
    .then( res => {
        getRequests()
    })
    .catch()
}


getProfile()
getRequests()

setInterval(getRequests, 600000);