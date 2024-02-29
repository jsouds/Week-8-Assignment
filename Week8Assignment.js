//classes to structure brands and flavors
//Flavor class which takes brands and quantities
class Flavor {
    constructor(brand, quantity) {
        this.brand = brand;
        this.quantity = quantity;
    }
//prints info about flavors
    describe() {
        return `${this.brand} has this much ordered: ${this.quantity}.`};
}
//Order class takes brand name, each order created includes array which holds all the flavors for the order
class Order {
    constructor(brand) {
        this.brand = brand;
        this.flavors = [];
    }
//takes a flavor and checks to see if it is an instance of player class so random strings or numbers can't just be passed in
    addFlavor(flavor) {
        if (flavor instanceof Flavor) {
            this.flavors.push(flavor);
        } else {
//Error message in case they use this code incorrectly
            throw new Error(`You can only add an instance of Flavor. Argument is not a flavor: ${flavor}`);
        }
    }
//brand description which gives info about brand. 
    describe() {
        return `${this.brand} has ${this.flavors.length} flavors.`;
    }
}
//class for driving menu application
class Menu {
    constructor() {
//initialize orders (array of orders)
        this.orders = [];
//initializes selected order so we can tell which order is selected
        this.selectedOrder = null;
    }
//start method to act as entry point to application
    start(){
//top down development used here (using methods that don't exist then adding in later)
        let selection = this.showMainMenuOptions();
//selection variable to get user input of which option is selected
//will return what user has selected
        while (selection != 0) {
//switch to determine what user has selected and give a reaction
            switch (selection) {
                case '1': 
                this.createOrder();
                break;
                case '2':
                this.viewOrder();
                break;
                case '3':
                this.deleteOrder();
                break;
                case '4': 
                this.displayOrders();
                break;
                default:
                    selection = 0;
            }
//selection inside of loop so it continues to loop as long as anything besides 1-4 is not selected
                selection = this.showMainMenuOptions();
        }
//'Goodbye' for if user selects 0
        alert('Goodbye');
    }
//implimentation of methods in application

//returns prompt of options for user input
//used template literals to avoid using concatination or new line indicators
    showMainMenuOptions(){
        return prompt(`
        0) exit
        1) create new order
        2) view order
        3) delete order
        4) display all orders
        `);
    }
//prints the info for order menu and returns user input
showOrderMenuOptions(orderInfo) {
    return prompt(`
        0) back
        1) request flavor
        2) delete flavor 
        
        ${orderInfo}
    `);
}
//will show user orders
//starts with blank string to build string with all info for order to be put into message box
    displayOrders() {
    let orderString = ``;
//iterate through orders and grab each order 
    for (let i = 0; i < this.orders.length; i++) {
//get brand for each order and add new line so order names show up on different lines with index attached
        orderString += i + ') ' + this.orders[i].brand + '\n';
     }
    //shows all orders
     alert(orderString);
    }
//prompts user for the brand of beer they would like
    createOrder(){
        let brand = prompt('Enter brand for requested beer:');
//pushes brand to order array
        this.orders.push(new Order(brand));
    }
//asks user which order they want to view
    viewOrder(){
        let index = prompt('Enter the index of the order you wish to view:');
//if user input is validated, then allow user to view order
        if (index > -1 && index < this.orders.length) {
            this.selectedOrder = this.orders[index];
//concatenated description for order to print
            let description = 'Requested Brand of Beer: ' + this.selectedOrder.brand + '\n';
            
//concatenated description for flavors added to order using a loop
            for (let i = 0; i < this.selectedOrder.flavors.length; i++) {
                                            //array.flavors[specific flavor]. of brand
                description += i + ') ' + this.selectedOrder.flavors[i].brand 
                + ' - ' + this.selectedOrder.flavors[i].quantity + '\n';
            }
//pass in description and implement method to display order menu options (sub menu of full menu)
            let selection = this.showOrderMenuOptions(description);
            switch (selection) {
                case '1':
                    this.requestFlavor();
                    break;
                case '2':
                    this.deleteFlavor();
            } 
        }
    }
//allows user to delete entire orders at once
    deleteOrder(){
        let index = prompt('Enter the index of the order you wish to delete:');
        if (index > -1 && index < this.orders.length) {
            this.orders.splice(index, 1);
        }
    }
//prompts user for the brand and quantity they wants for the brand of beer
    requestFlavor() {
        let flavor = prompt('Enter flavor for requested beer:');
        let quantity = prompt('Enter quantity for requested flavor (ex. 12 cases):');
//creates flavor and quantity of the requested brand of beer and creates instance then pushes it to selected team
        this.selectedOrder.flavors.push(new Flavor(flavor, quantity));
    }
//prompts user to select flavor to delete, then validates user input, removes selected flavor at position (index, 1)
deleteFlavor() {
    let index = prompt('Enter the index of the flavor you wish to delete:');
    if (index > -1 && index < this.selectedOrder.flavors.length) {
        this.selectedOrder.flavors.splice(index, 1);
        }
    }
}
//creates instance of menu 
let menu = new Menu();
menu.start();