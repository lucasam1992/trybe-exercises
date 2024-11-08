class Passenger {
    constructor(public nome: string, public cpf: number) { }
}
  
  class ShippedItem {
    constructor(
      public nome: string, 
      public id: number, 
      public customerID: string,
    ) { }
  }
  
  class Flight {
    // constructor(public num: number, public passengers: Passenger[]) { }
    constructor(public num: number, public payload:(Passenger | ShippedItem)[]){}
  
    /*
    add(newPassenger: Passenger): void {
      this.passengers.push(newPassenger); 
    }
    */

    add(newPayload: Passenger | ShippedItem): void {
        this.payload.push(newPayload);
    }
  
    /*
    remove(removedPassenger: Passenger): void {
      const index = this.passengers.indexOf(removedPassenger, 0);
      if (index > -1) {
        this.passengers.splice(index, 1);
      }
    }
    */

    remove(removedPayload: Passenger | ShippedItem): void {
        const index = this.payload.indexOf(removedPayload, 0);
        if (index > -1) {
            this.payload.splice(index, 1);
        }
    }
  }
  
  class Company {
    constructor(public nome: string, public flights: Flight[]) { }
    //newFlight(flightNum: number): void { }
    newFlight(flightNum: number): void {
        const newFlight = new Flight(flightNum, []);
        this.flights.push(newFlight);
    }
    addToFlight(flightNum: number, payload: Passenger | ShippedItem): void { }
    removeFromFlight(flightNum: number, payload: Passenger | ShippedItem): void { }
  }
  
  class TravelingCompany extends Company {
    /*  
    newFlight(flightNum: number): void {
      const newFlight = new Flight(flightNum, []);
      this.flights.push(newFlight);
    }
    */
  
    addToFlight(flightNum: number, passenger: Passenger): void {
      const currentFlight = this.flights.find((f) => f.num === flightNum);
      if (currentFlight) {
        currentFlight.add(passenger);
      }
    }
  
    removeFromFlight(flightNum: number, passenger: Passenger): void {
      const currentFlight = this.flights.find((f) => f.num === flightNum);
      if (currentFlight) {
        currentFlight.remove(passenger);
      }
    }
  }
  
  class ShippingCompany extends Company {
    /*
    newFlight(flightNum: number): void {
      const newFlight = new Flight(flightNum, []);
      this.flights.push(newFlight);
    }
    */
  
    addToFlight(flightNum: number, item: ShippedItem): void {
      const currentFlight = this.flights.find((f) => f.num === flightNum);
      if (currentFlight) {
        currentFlight.add(item);
      }
    }

    removeFromFlight(flightNum: number, item: ShippedItem): void {
        const currentFlight = this.flights.find((f) => f.num === flightNum);
        if (currentFlight) {
          currentFlight.remove(item);
        }
      }
  }