const blogList = document.getElementById("blogList");

// Fetching data through API
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((blog) => {
      const blogcard = createBlogDiv(blog);
      blogList.appendChild(blogcard);
    });
  })
  .catch((error) => {
    console.log("Error:", error);
  });

// Helper function to create a blog div element
function createBlogDiv(blog) {
  const div = document.createElement("div");
  div.innerHTML = `
    <h3 class="text-lg font-bold text-sky-950 p-1">${blog.title}</h3>
    <p class="h-44 bg-sky-200 rounded-md p-2  overflow-hidden hover:overflow-y-auto scroll">${blog.body}</p>
    <button class="delete-btn bg-red-400 hover:bg-red-500 text-sky-100 py-1 px-2 rounded text-sm font-semibold mt-2 mx-auto" data-id="${blog.id}">Delete</button>
  `;
  div.classList.add(
    "bg-sky-100",
    "hover:shadow-sky-950",
    "p-4",
    "m-4",
    "rounded-lg",
    "shadow-md",
    "hover:shadow-xl",
    "flex",
    "flex-col",
    "justify-between"
  );
  const deleteButton = div.querySelector(".delete-btn");
  deleteButton.addEventListener("click", deleteBlog);

  return div;
}

// Adding blog
const newlyAddedBLog = document.getElementById("newlyAddedBLog");
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

    const newBLog = createBlogDiv(newBlog);
    newlyAddedBLog.appendChild(newBLog);
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
