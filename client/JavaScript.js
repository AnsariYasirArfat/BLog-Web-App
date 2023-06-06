const blogList = document.getElementById("blogList");

// Fetching data through API
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((blog) => {
      const div = createBlogDiv(blog);
      blogList.appendChild(div);
    });
  })
  .catch((error) => {
    console.log("Error:", error);
  });

// Helper function to create a blog div element
function createBlogDiv(blog) {
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>${blog.title}</h3>
    <p>${blog.body}</p>
    <button class="delete-btn" data-id="${blog.id}">Delete</button>
  `;

  const deleteButton = div.querySelector(".delete-btn");
  deleteButton.addEventListener("click", deleteBlog);

  return div;
}

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

    const div = createBlogDiv(newBlog);
    blogList.appendChild(div);
  }

  titleInput.value = "";
  contentInput.value = "";
});

// Function to delete a blog
function deleteBlog(event) {
  const blogId = event.target.dataset.id;
  const blogDiv = event.target.parentNode;

  // Make a DELETE request to the API
  fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`, {
    method: "DELETE",
  })
    .then(() => {
      // Remove the blog div from the UI
      blogDiv.remove();
      console.log("removed");
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}
