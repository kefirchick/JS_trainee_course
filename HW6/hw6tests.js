mocha.setup('bdd');
const ASSERT = chai.assert;

describe('class DataHandler', function() {
    const dataHandler = new DataHandler();
    const promise = dataHandler.fetchPosts();

    it('constructor', function() {
        ASSERT.throws(() => {
            new DataHandler(123);
        }, Error, '123 is not a valid url');
    });

    it(`fetchPosts`, function() {
        const wrongArdessDataHandler = new DataHandler('https://wrongpagewrongpage.com');

        return wrongArdessDataHandler.fetchPosts().catch(
            (error) => {
                ASSERT.equal(error.message, 'Failed to fetch with the error: Failed to fetch');
            }
        )
    });

    it('listPosts', function() {
        ASSERT.equal(dataHandler.listPosts(), undefined);

        return promise.then(() => {
                ASSERT.equal(dataHandler.listPosts()[0].id, 30)
            }
        );
    });

    it('getPost', function() {
        ASSERT.throws(() => {
            dataHandler.getPost('abc');
        }, TypeError, 'abc is not a valid id');

        return promise.then(() => {
            ASSERT.equal(dataHandler.getPost(30).userId, 3);
        })
    });

    it('clearPosts', function() {
        return promise.then(() => {
            dataHandler.clearPosts();
            ASSERT.equal(dataHandler.getPost(1), undefined);
        })
    });
});

mocha.run();