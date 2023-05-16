import IKey from '../../Interface/IKey';
import IValid from '../../Interface/IValid';
import KeyTypes from '../../utils/KeyTypes';

class Mail implements IKey, IValid {
    readonly value: string;
    readonly owner: string;
    readonly type: string;

    constructor(value: string, KeyOwner: string) {
        if(!this.isValid(value)) throw Error('Invalid Key');
        this.value = value;
        this.owner = KeyOwner;
        this.type = KeyTypes.MAIL;
    }

    isValid(value: string): boolean {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(value);
    }
}
export default Mail;