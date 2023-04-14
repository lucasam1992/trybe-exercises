interface Character {
    name: string;
    specialMove: string;
}
  
interface DbCharacter extends Character {
  id: number;
}
  
const db: DbCharacter[] = [];

interface IModel {
    create: (character: Character ) => Promise<DbCharacter>;
    read: () => Promise<DbCharacter[]>;
    readById: (id: number) => Promise<DbCharacter>;
    update: (id: number, character: Character) => Promise<DbCharacter>;
    remove: (id: number) => Promise<boolean>;
}