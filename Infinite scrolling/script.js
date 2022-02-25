const postsContainer = document.querySelector('.post-container');
const filter = document.querySelector('.filter-container');
const loading = document.querySelector('.loader');

let limit = 5;
let page = 1;


// Fetch post from API
async function getPost() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

    const data = await res.json();

    return data;
}

// Show posts in DOM
async function showPosts() {
    const posts = await getPost();

    await posts.forEach( post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `

        postsContainer.appendChild(postEl);
    });
}

function showAnimation() {
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show');

        
        setTimeout(() => {
            page++;
            showPosts();    
        }, 300)
        
    }, 1000)
}

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    if (scrollTop + clientHeight == scrollHeight) {
        showAnimation();
    }
});

showPosts();
