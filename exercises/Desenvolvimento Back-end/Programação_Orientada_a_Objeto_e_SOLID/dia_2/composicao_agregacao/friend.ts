//Na agregação precisamos pensar no relacionamento entre objetos/classes, assim como na composição. No entanto é um relacionamento que fará parte e não obrigatoriamente dependerá de outro objeto/classe para continuar existindo.
class Friend {
    private nickname: string;

    public getNickname(): string {
        return this.nickname;
    }

    public setNickname(nickname: string) {
        this.nickname = nickname;
    }
}

class SocialMediaAccount {
    private friends = new Array<Friend>();

    public addFriend(friend: Friend) {
        this.friends.push(friend);
    }

    public printFriends() {
        this.friends.map((friend) => console.log(friend)
        )
    }
}

const socialMediaAccount = new SocialMediaAccount();

const friendCarol = new Friend();
friendCarol.setNickname('Carol');


const friendFernando = new Friend();
friendFernando.setNickname('Fernando');

socialMediaAccount.addFriend(friendCarol);
socialMediaAccount.addFriend(friendFernando);
socialMediaAccount.printFriends();

// na agregação os objetos podem existir sem depender do outro objeto, por outro lado, na composição os objetos dependem da existência do outro objeto.