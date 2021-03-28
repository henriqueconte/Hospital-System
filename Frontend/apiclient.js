// fetch(`${location.host}/user/${1}`)
const ApiClient = {
    get: getData,
    post : postData,
    delete: deleteData,
    put: putData
}

async function getData(path) {
    let url = `http://${location.host}/${path}`
    try {
        let result = await fetch(url)
        return result.  json()
    } catch (err) {
        console.error(err)
    }
}

function postData(path, data) {
    let url = `http://${location.host}/${path}`
    try {
        let result = await fetch(url, {method: "POST", body: data})
        return result.json()
    } catch (err) {
        console.error(err)
    }
}


function putData(path, data) {
    let url = `http://${location.host}/${path}`
    try {
        let result = await fetch(url, {method: "PUT", body: data})
        return result.json()
    } catch (err) {
        console.error(err)
    }
}


function deleteData(path) {
    let url = `http://${location.host}/${path}`
    try {
        let result = await fetch(url, {method: "DELETE"})
        return result.json()
    } catch (err) {
        console.error(err)
    }
}