import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';

import app from '../../../src/app';
import loginMock from '../../mocks/login.mock';
import UserModel from '../../../src/database/models/user.model';

chai.use(chaiHttp);

describe('POST /login', () => {
    beforeEach(function () { sinon.restore(); });

    it('ao não receber um email, retorne erro', async () => {
        const httpRequestBody = loginMock.noEmailLoginBody;

        const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

        expect(httpResponse.status).to.equal(400);
        expect(httpResponse.body).to.be.deep.equal({ message: 'Dados Inválidos' });
    });

    it('ao não receber uma senha, retorne um erro', async () => {
        const httpRequestBody = loginMock.noPasswordLoginBody;

        const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

        expect(httpResponse.status).to.equal(400);
        expect(httpResponse.body).to.be.deep.equal({ message: 'Dados Inválidos' });
    });

    it('ao receber um email q não existe, retorne um erro', async () => {
        const httpRequestBody = loginMock.notExistingUserBody;
        sinon.stub(UserModel, 'findOne').resolves(null);

        const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

        expect(httpResponse.status).to.equal(401);
        expect(httpResponse.body).to.be.deep.equal({ message: 'E-mail ou senha inválidos'});
    });

    it('ao receber um email existente e uma senha errada, retorne um erro', async () => {
        const httpRequestBody = loginMock.existingUserWithWrongPasswordBody;
        const mockFindOnetReturn = UserModel.build(loginMock.existingUser);

        sinon.stub(UserModel, 'findOne').resolves(mockFindOnetReturn);

        const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

        expect(httpResponse.status).to.equal(401);
        expect(httpResponse.body).to.be.deep.equal({ message: 'E-mail ou senha inválidos' });
    });

    it('ao receber um email e uma senha válida, retorne token de login', async () => {
        const httpRequestBody = loginMock.validLoginBody;
        const mockFindOnetReturn = UserModel.build(loginMock.existingUser);

        sinon.stub(UserModel, 'findOne').resolves(mockFindOnetReturn);

        const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

        expect(httpResponse.status).to.equal(200);
        expect(httpResponse.body).to.have.key('token');
    });
})