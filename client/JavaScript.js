const blogList = document.getElementById("blogList");

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((blog) => {
      const li = document.createElement("li");
      li.innerHTML = `<h3>${blog.title}</h3><p>${blog.body}</p>`;
      blogList.appendChild(li);
    });
  })
  .catch((error) => {
    console.log("Error:", error);
  });
