import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'sequelize';
import UserModel from '../../../src/database/models/user.model';
import loginMock from '../../mocks/login.mock';
import loginService from '../../../src/services/login.service';

describe('LoginService', () => {
    beforeEach(function () { sinon.restore(); });

    describe('#verifyLogin', () => {
        it('ao não receber um email, retorne um erro', async () =>  {
            const parameters = loginMock.noEmailLoginBody;

            const serviceResponse = await loginService.verifyLogin(parameters);

            expect(serviceResponse.status).to.eq('INVALID_DATA');
            expect(serviceResponse.data).not.to.have.key('token');
            expect(serviceResponse.data).to.deep.eq({ message: 'Dados Inválidos' });
        });

        it('ao receber um email e uma senha válida, retorne um token de login', async () => {
            const parameters = loginMock.validLoginBody;
            const mockFindOnetReturn = UserModel.build(loginMock.existingUser);
            
            sinon.stub(UserModel, 'findOne').resolves(mockFindOnetReturn);

            const serviceResponse = await loginService.verifyLogin(parameters);

            expect(serviceResponse.status).to.eq('SUCCESSFUL');
            expect(serviceResponse.data).to.have.key('token');
        });

        it('ao não receber uma senha, retorne um erro', async function () {
            const parameters = loginMock.noPasswordLoginBody;
      
            const serviceResponse = await loginService.verifyLogin(parameters);
      
            expect(serviceResponse.status).to.eq('INVALID_DATA');
            expect(serviceResponse.data).not.to.have.key('token');
            expect(serviceResponse.data).to.deep.eq({ message: 'Dados Inválidos' });  
          });
      
          it('ao receber um e-mail inexistente, retorne um erro', async function () {
            const parameters = loginMock.notExistingUserBody;
            sinon.stub(UserModel, 'findOne').resolves(null);
      

            const serviceResponse = await loginService.verifyLogin(parameters);
      
            expect(serviceResponse.status).to.eq('UNAUTHORIZED');
            expect(serviceResponse.data).not.to.have.key('token');
            expect(serviceResponse.data).to.deep.eq({ message: 'E-mail ou senha inválidos' });
          });
      
          it('ao receber um e-mail existente e uma senha errada, retorne um erro', async function () {
            const parameters = loginMock.existingUserWithWrongPasswordBody;
            const userInstance = UserModel.build(loginMock.existingUser);
            const mockFindOneReturn = UserModel.build(loginMock.existingUser);
            sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);
      
            const serviceResponse = await loginService.verifyLogin(parameters);
      
            expect(serviceResponse.status).to.eq('UNAUTHORIZED');
            expect(serviceResponse.data).not.to.have.key('token');
            expect(serviceResponse.data).to.deep.eq({ message: 'E-mail ou senha inválidos' });  
          });
    });
});