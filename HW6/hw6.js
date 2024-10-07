const DEFAULT_URL = 'https://jsonplaceholder.typicode.com/posts';

class DataHandler {
    #data;
    #url;

    constructor(url = DEFAULT_URL) {
        this.#data = new Map();
        
        try {
            this.#url = new URL(url);
        } catch (error) {
            throw new Error(`${url} is not a valid url`);
        }
    }

    async fetchPosts() {
        try {
            const response = await fetch(this.#url);

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const data = await response.json();
            this.#storePosts(data);
        } catch (error) {
            throw new Error(`Failed to fetch with the error: ${error.message}`);
        }
    }

    listPosts() {
        if (this.#data.size === 0) {
            return null;
        }

        const posts = [...this.#data.values()];
        posts.sort(this.#compareByTitle);

        return posts;
    } 

    getPost(id) {
        if (!Number.isInteger(id) || id < 1) {
            throw TypeError(`${id} is not a valid id`);
        }

        if (!this.#data.has(id)) {
            return null;
        }

        return this.#data.get(id);
    }

    clearPosts() {
        this.#data.clear();
    }

    #storePosts(data) {
        if (!Array.isArray(data)) {
            throw TypeError('Expected an array of posts');
        }

        for (const obj of data) {
            if (!obj.id) {
                throw Error('Invalid post data');
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
const promise = dataHandler.fetchPosts();

promise.then(
    () => console.log(dataHandler.getPost(1))
);


//     .then(
//         () => console.log(dataHandler.listPosts())
//     )
//     .then(
//         () => console.log(dataHandler.getPost(1))
//     )

// const wrongArdessDataHandler = new DataHandler('https://wrongpagewrongpage.com');
// wrongArdessDataHandler.fetchPosts();