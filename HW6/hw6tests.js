mocha.setup('bdd');
const ASSERT = chai.assert;

describe('class DataHandler', function() {
    const dataHandler = new DataHandler();
    const promise = dataHandler.fetchPosts();

    it('constructor', function() {
        ASSERT.throws(() => {
            new DataHandler(123);
        }, Error);
    });

    it(`fetchPosts`, function() {
        const wrongArdessDataHandler = new DataHandler('https://wrongpagewrongpage.com');
        return wrongArdessDataHandler.fetchPosts().catch(
            (error) => {
                ASSERT.equal(error instanceof Error, true);
            }
        )
    });

    it('listPosts', function() {
        ASSERT.equal(dataHandler.listPosts(), null);
        return promise.then(() => {
                ASSERT.equal(dataHandler.listPosts()[0].id, 30)
            }
        );
    });

    it('getPost', function() {
        ASSERT.throws(() => {
            dataHandler.getPost('a');
        }, Error);
        return promise.then(() => {
            ASSERT.equal(dataHandler.getPost(30).userId, 3);
        })
    });

    it('clearPosts', function() {
        return promise.then(() => {
            dataHandler.clearPosts();
            ASSERT.equal(dataHandler.getPost(1), null);
        })
    });
});

mocha.run();