const blogList = document.getElementById("blogList");

// fetching data through API
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((blog) => {
      const div = document.createElement("div");
      div.innerHTML = `<h3>${blog.title}</h3><p>${blog.body}</p>`;
      blogList.appendChild(div);
    });
  })
  .catch((error) => {
    console.log("Error:", error);
  });

// Adding blog

const blogForm = document.getElementById("blogForm");
const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");

blogForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value;
  const content = contentInput.value;

  if (title && content) {
    const newBlog = {
      title: title,
      body: content,
    };

    const div = document.createElement("div");
    div.innerHTML = `<h3>${newBlog.title}</h3><p>${newBlog.body}</p>`;
    blogList.appendChild(div);

    titleInput.value = "";
    contentInput.value = "";
  }
});
