// fetch(`${location.host}/user/${1}`)
const ApiClient = {
    get: getData,
}


async function getData(path) {
    let url = `http://${location.host}/${path}`
    try {
        let result = await fetch(url)
        return result.json()
    } catch (err) {
        console.error(err)
    }
}

function postData(path, data) {


}