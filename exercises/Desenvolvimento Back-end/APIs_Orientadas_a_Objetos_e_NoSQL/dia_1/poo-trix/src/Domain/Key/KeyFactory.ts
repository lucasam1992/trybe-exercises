import  IKey from '../../Interface/IKey';
import KeyTypes from '../../utils/KeyTypes';
import CPF from './CPF';
import PhoneNumber from './PhoneNumber';
import IValid from '../../Interface/IValid';

class KeyFactory { 
    // metodo static, que permitirá a criação de uma chave sem a necessidade de uma instancia do objeto KeyFactory 
    public static create(key: IKey): IKey & IValid { // Cenário definido pela lei de Liskov, que sugere q objetos podem ser substituídos por seus subtipos sem que isso afete a execução correta do programa
        if(key.type === KeyTypes.CPF) {
            return new CPF(key.value, key.owner);
        }
        if (key.type === KeyTypes.PHONE_NUMBER) {
            return new PhoneNumber(key.value, key.owner);
        }
        throw new Error('Invalid key type');
    }
}

export default KeyFactory;