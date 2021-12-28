let housekeepers = []
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
        document.getElementById("address").value = data.address;
        document.getElementById("size").value = data.size;
    })
    .catch()
}

function update() {
    const token = localStorage.getItem("token");
    data = {
        name : document.getElementById("name").value,
        phone : document.getElementById("phone").value,
        address : document.getElementById("address").value,
        size : Number(document.getElementById("size").value)
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

function showHousekeepers(data) {
    let result = "";
    if(housekeepers.length == data.length)
        return
    housekeepers = data
    data.forEach(elem => {
        result = result + '<ion-item>' +
                '<img src="img/defaultProfile.jpg" class="ProfileImg">' +
                '<div>' +
                `name: ${elem.name} <br/>` + 
                `price per square meter (lei): ${elem.price} <br/>` +
                `<ion-button id="update-button" onclick="request('${elem.username}')">` +
                '    request cleaning' +
                '</ion-button>' +
                '</div>' +
                '</ion-item>' 
    });
    document.getElementById("housekeepersTab").innerHTML = result
}

function getHousekeepers() {
    const token = localStorage.getItem("token");
    axios.get("https://limpid-backend.herokuapp.com/users/housekeepers", {
        headers: {
            'Authorization' : `Bearer ${token}`,
        }
    })
    .then(res => {
        showHousekeepers(res.data)
    })
    .catch()
}

function request(username) {
    const token = localStorage.getItem("token");
    const data = {
        username : username,
        name : document.getElementById("name").value,
        phone : document.getElementById("phone").value,
        address : document.getElementById("address").value,
        size : Number(document.getElementById("size").value)
    }
    axios.post("https://limpid-backend.herokuapp.com/users/housekeepers", data, {
        headers: {
            'Authorization' : `Bearer ${token}`,
        }
    })
    .then( res => {
        getHousekeepers()
        getRequests()
    })
    .catch()
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
    data.forEach(elem => {
        if(elem.status == "FINISHED") {
            result = result + '<ion-item>' +
                    '<img src="img/defaultProfile.jpg" class="ProfileImg">' +
                    '<div>' +
                    `Housekeeper: ${elem.nameHousekeeper} <br/>` +
                    `Total: ${elem.price * elem.size} <br/>` +
                    `Status: ${elem.status} <br/>` +
                    '<ion-label>Feedback:</ion-label>' +
                    `<ion-input id="feedback-${elem.usernameHousekeeper.replaceAll(" ","")}" placeholder="Write feedback here" type="text"></ion-input>` +
                    `<ion-button id="update-button" onclick="feedback('${elem.usernameHousekeeper}')">` +
                    '  submit feedback' +
                    '</ion-button>' +
                    '</div>' +
                    '</ion-item>' 
        } else {
            result = result + '<ion-item>' +
                    '<img src="img/defaultProfile.jpg" class="ProfileImg">' +
                    '<div>' +
                    `Housekeeper: ${elem.nameHousekeeper} <br/>` +
                    `Total: ${elem.price * elem.size} <br/>` +
                    `Status: ${elem.status} <br/>` +
                    `<ion-button id="update-button" onclick="cancel('${elem.usernameHousekeeper}')">` +
                    '  CANCEL' +
                    '</ion-button>' +
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
        getHousekeepers()
        getRequests()
    })
    .catch()
}

function feedback(username) {
    const text = document.getElementById('feedback-' + username.replaceAll(" ","")).value;
    const token = localStorage.getItem("token");
    const data = {
        username : username,
        feedback : text
    }
    axios.post("https://limpid-backend.herokuapp.com/users/myRequests/feedback", data, {
        headers: {
            'Authorization' : `Bearer ${token}`,
        }
    })
    .then( res => {
        getHousekeepers()
        getRequests()
    })
    .catch()
}

function refreshPageData() {
    getHousekeepers()
    getRequests()
    console.log("refresh")
}

refreshPageData()
getProfile()

setInterval(refreshPageData, 600000);