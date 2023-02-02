const listElement = document.querySelector(".posts")
const fetchButton = document.querySelector("#available-posts button")
const postTemplate = document.querySelector("template")
const postForm = document.querySelector("form");

async function sendHttpRequest(method, url, dataObj = {title: "default", body: "default"}){
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
    if(method === "GET") {
        const { data } = await axios(url, { method })
        return data
    } else if(method === "POST") {
        const { data } = await axios(url, { method, data: {title: dataObj.title, body: dataObj.body}})
        return data
    }
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

async function addPost(e) {

    e.preventDefault();
    const title = e.target.querySelector("#title").value;
    const body = e.target.querySelector("#content").value;

    const responseData = await sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", {title, body})
    
    console.log(responseData);
    const postElClone = document.importNode(postTemplate.content, true)
    postElClone.querySelector("h2").textContent = responseData.title
    postElClone.querySelector("p").textContent = responseData.body
    postElClone.querySelector("li").id = responseData.id
    listElement.appendChild(postElClone);

}

// READ/GET
fetchButton.addEventListener("click", fetchPosts)
postForm.addEventListener("submit", addPost)