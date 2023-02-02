const listElement = document.querySelector(".posts")
const fetchButton = document.querySelector("#available-posts button")
const postTemplate = document.querySelector("template")

async function sendHttpRequest(method, url){
    //with XHR
    // const promise = new Promise((resolve, reject) => {
    //     const xhr = new XMLHttpRequest()
    //     xhr.open(method, url)
    //     xhr.onload = function(){
    //         if(xhr.status >= 200 && xhr.status < 300){
    //             //return the data back
    //             resolve(xhr.response)
    //         }else{
    //             reject("Something went wrong..... :<")
    //         }
    //     }
    //     xhr.send();
    // })

    // return promise

    //with fetch() function
    // const response = await fetch(url, {method})
    // const result = await response.json()
    // return result

    // return await fetch(url, {method}).then(r => r.json())

    //with axios
    const { data } = await axios(url, { method })
    return data
    // return axios.get(url)
}

async function fetchPosts() {
    const responseData = await sendHttpRequest("GET", "https://jsonplaceholder.typicode.com/posts")

    console.log(responseData)
    if(responseData.length > 0){
        for(const post of responseData){
            const postElClone = document.importNode(postTemplate.content, true)
            postElClone.querySelector("h2").textContent = post.title
            postElClone.querySelector("p").textContent = post.body
            postElClone.querySelector("li").id = post.id
            listElement.appendChild(postElClone)
        }
    }
}

// READ/GET
fetchButton.addEventListener("click", fetchPosts)