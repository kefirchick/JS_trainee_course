const DEFAULT_URL = 'https://jsonplaceholder.typicode.com/posts';

class DataHandler {
    #url;
    #data;

    constructor(url = DEFAULT_URL) {
        this.#data = new Map();
        this.#url = url;
    }

    async fetchPosts() {
        const response = await fetch(this.#url);
        
        if (response.ok) {
            const data = await response.json();
            this.#storePosts(data);
        } else {
            throw new Error(`HTTP error: ${response.status}`);
        }
    }

    listPosts() {
        if (this.#data.size === 0) {
            throw Error(`Data is empty`);
        }

        const posts = [...this.#data.values()];
        posts.sort(this.#compareByTitle);

        return posts;
    } 

    getPost(id) {
        if (!Number.isInteger(id) || id < 1) {
            throw Error(`${id} is not a valid id`);
        }

        if (!this.#data.has(id)) {
            throw Error(`No post with the id = ${id}`);
        }

        return this.#data.get(id);
    }

    clearPosts() {
        this.#data.clear();
    }

    #storePosts(data) {
        for (const obj of data) {
            if (!obj.id) {
                throw Error(`Post data reading error`);
            }

            this.#data.set(obj.id, obj);
        }
    }

    #compareByTitle(obj1, obj2) {
        const str1 = obj1.title.toLowerCase();
        const str2 = obj2.title.toLowerCase();
        
        return str1.localeCompare(str2);
    }
}

const dataHandler = new DataHandler();
dataHandler.fetchPosts()
    .then(
        () => console.log(dataHandler.getPost(1))
    )