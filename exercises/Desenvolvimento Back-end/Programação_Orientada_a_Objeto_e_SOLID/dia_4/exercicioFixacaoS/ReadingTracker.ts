import progressNotification from "./notifications";

class ReadingTracker {
    private readingGoal: number;
    private booksRead: number;
    constructor(readingGoal: number){
        this.readingGoal = readingGoal;
        this.booksRead = 0;
    }

    trackReadings(readsCount: number): void {
        this.booksRead += readsCount;
        if (this.booksRead >= this.readingGoal) {
            progressNotification('Parabéns, meta alcançada');
            return;
        }
        progressNotification('Há mais livros para ler')
    }
}

const readTracker = new ReadingTracker(20);
readTracker.trackReadings(12);
readTracker.trackReadings(22);