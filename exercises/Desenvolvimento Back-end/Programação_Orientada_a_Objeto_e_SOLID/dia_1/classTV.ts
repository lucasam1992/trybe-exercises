class TV {
    brand: string;
    size: number;
    resolution: string;
    connections: string[];
    connectedTo: string;

    constructor(b: string, s: number, r: string, c: string[]) {
        this.brand = b;
        this.size = s;
        this.resolution = r;
        this.connections = c;
    }

    turnOn(): void {
        console.log(`${this.brand}, ${this.size}, ${this.resolution}, ${this.connections}`);
    }
}

const tv1 = new TV('Sansung', 48, 'FullHD', ['VGA', 'HDMI', 'Wi-Fi']);
tv1.turnOn();