const sinon = require('sinon');
const {expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

//importando o modulo q abre a conexão nos nossos models para poder fazer o seu `double`
const mongoConnection = require('../../models/connection');


const MoviesModel = require('../../models/movieModel');

/*
const MoviesModel = {
    create: () => {}
};
*/


describe('Insere um novo filme no BD', () => {

    let connectionMock; //objeto com mock da conexão como uma variavel global 

    const payloadMovie = {
        title: 'Example Movie',
        directedBy: 'Jane Dow',
        releaseYear: 1999
    }


    //forma provisoria para mockar a função insertOne - Nao vai chamar o banco real para fazer o teste
    before( async() => {
        const DBServer = new MongoMemoryServer();
        const URLMock = await DBServer.getUri();

        connectionMock = await MongoClient
            .connect(URLMock, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then((conn) => conn.db('model_example'));

        sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
    });

    after(() => {
        mongoConnection.getConnection.restore();
    });

    describe('quando é inserido com sucesso', () => {
        it('retorna um objeto', async() => {
            const response = await MoviesModel.create(payloadMovie);

            expect(response).to.be.a('object')
        });

        it('tal objeto possui o "id" do novo filme inserido', async() => {
            const response = await MoviesModel.create(payloadMovie);

            expect(response).to.be.property('id')
        });

        it('deve existir um filme com o titulo cadastrado!', async () =>{
            await MoviesModel.create(payloadMovie);
            const movieCreated = await connectionMock.collection('movies').findOne({title:payloadMovie.title});
            expect(movieCreated).to.be.not.null;
        });
    });
});