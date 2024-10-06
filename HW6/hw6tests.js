mocha.setup('bdd');
const ASSERT = chai.assert;

describe('class DataHandler', function() {
    const dataHandler = new DataHandler();
    const dataHandlerFetched = dataHandler.fetchPosts();

    it('constructor', function() {
        ASSERT.throws(() => {
            new DataHandler(123);
        }, Error);
    });

    it(`fetchPosts`, function() {
        const wrongArdessDataHandler = new DataHandler('https://wrongpagewrongpage.com');
        ASSERT.throws(() => {
            wrongArdessDataHandler.fetchPosts();
        }, Error);
    });

    it('listPosts', function() {
        ASSERT.equal(dataHandler.listPosts(), null);
        dataHandlerFetched.then(() => {
            ASSERT.equal(dataHandlerFetched.listPosts()[0].id, 30);
        })
    });

    it('getPost', function() {
        ASSERT.throws(() => {
            dataHandler.getPost('a');
        }, Error);
        ASSERT.equal(dataHandler.getPost(1), null);
        dataHandlerFetched.then(() => {
            ASSERT.equal(dataHandlerFetched.getPost(1).userId, 1);
        })
    });

    it('clearPosts', function() {
        dataHandlerFetched.then(() => {
            dataHandler.clearPosts();
            ASSERT.throws(() => {
                dataHandler.listPosts();
            }, Error);
        })
    });
});

mocha.run();