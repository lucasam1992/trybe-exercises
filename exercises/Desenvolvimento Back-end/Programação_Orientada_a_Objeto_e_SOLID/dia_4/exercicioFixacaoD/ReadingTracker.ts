// import EmailNotitication from './EmailNotification';
import ConsoleNotification from './ConsoleNotification';
import Notificator from './Notificator';

export default class ReadingTracker {
    private readingGoal: number;
    private booksRead: number;
    
    // Deixa-se de instanciar Notificator e passa a receber ele como parâmetro
    // notificator: Notificator;
    

    constructor(
        readingGoal: number, /*email: string,*/
        public notificator: Notificator = new ConsoleNotification('console')
    ) {
        this.booksRead = 0;
        // this.notificator = new EmailNotitication(email);
        this.readingGoal = readingGoal;
    }

    trackReadings(readsCount: number): void{
        this.booksRead += readsCount;
        
        if(this.booksRead >= this.readingGoal) {
            this.notificator.sendNotification('Parabéns! Você bateu a meta de livros lidos');
            return ;
        }
        this.notificator.sendNotification('Falta alguns livros');
    }
}