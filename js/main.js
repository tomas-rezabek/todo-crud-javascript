let postTitleLabel = document.getElementById("postTitleLabel");
let form = document.getElementById("addNewPost");
let title = document.getElementById("postTitle");
let content = document.getElementById("postContent");
let msg = document.getElementById("msg");
let posts = document.getElementById("posts");
let add = document.getElementById("add");
let test = "Error: ";

form.addEventListener("submit", (e) => {
	e.preventDefault();
	console.log("button clicked");

	formValidation();
});

let formValidation = () => {
	if (title.value === "") {
		msg.style.color = "red";
		msg.innerHTML = test + "Title cannot be blank";
		console.log("error");
	} else if (content.value === "") {
		msg.innerHTML = test + "Content cannot be blank";
	} else {
		console.log("OK");
		msg.style.color = "green";
		msg.innerHTML = "OK. Task added";
		acceptData();
	}
};

let data = [];

let acceptData = () => {
	let date = new Date().toLocaleDateString("cs-CZ");
	data.push({
		title: title.value,
		text: content.value,
		time: date,
	});

	localStorage.setItem("data", JSON.stringify(data));
	console.log(data);
	createPost();
};

let editPost = (e) => {
	let selectedPost = e.parentElement.parentElement;
	title.value = selectedPost.children[0].innerHTML;
	content.value = selectedPost.children[1].innerHTML;
	deletePost(e);
};

let createPost = () => {
	posts.innerHTML = "";
	data.map((x, y) => {
		return (posts.innerHTML += `
      <div class="post" id=${y}>
      <h2 id="title">${x.title}</h2>
      <p id="content">${x.text}</p>
  	    <span class="options">
		      <i onClick="editPost(this)" class="fas fa-edit" id="Edit"></i>
		      <i onClick="deletePost(this)" class="fas fa-trash-alt" id="Delete"></i>
         </span>
      <p class="time"><small>Date creation: ${x.time}</small></p>
  </div>`);
	});

	clearForm();
};

let deletePost = (e) => {
	e.parentElement.parentElement.remove();
	data.splice(e.parentElement.parentElement.id, 1);
	localStorage.setItem("data", JSON.stringify(data));
	console.log("deleted");
};

let clearForm = () => {
	title.value = "";
	content.value = "";
};

(() => {
	data = JSON.parse(localStorage.getItem("data")) || [];
	console.log(data);
	createPost();
})();
