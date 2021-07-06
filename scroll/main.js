const postsContainer = document.getElementById("posts-container");
const loder = document.getElementById("loader");
const filter = document.getElementById("filter");
let limit = 5;
let page = 1;

showPosts();

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();

  return data;
}

async function showPosts() {
  const posts = await getPosts();
  //   console.log(posts);
  posts.forEach((post) => {
    const postContainer = document.createElement("div");
    postContainer.classList.add("post-container");
    postContainer.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post">
          <div class="post-info">
            <h2 class='post-title'>${post.title}</h2>
            <p class='post-body'>
              ${post.body}
            </p>
          </div>
        </div>
     `;
    postsContainer.appendChild(postContainer);
  });
}
function triggle() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
}

function filterPosts() {
  const keyWord = filter.value.toUpperCase();
  const posts = document.querySelectorAll(".post-container");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    if (!(title.includes(keyWord) || body.includes(keyWord))) {
      post.style.display = "none";
    } else {
      post.style.display = "block";
    }
  });
}

function showLoading() {
  loder.classList.add("show");
  window.removeEventListener("scroll", triggle);
  setTimeout(() => {
    loder.classList.remove("show");

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
  window.addEventListener("scroll", triggle);
}
window.addEventListener("scroll", triggle);

filter.addEventListener("input", filterPosts);
