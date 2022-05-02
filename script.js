const SIZES = {
    SMALL:{
        price: 50,
        calories: 20,
    },
    MIDDLE:{
        price: 75,
        calories: 30,
    },
    BIG:{
        price: 100,
        calories: 40,
    },
};

const TOPINGS = {
    CHEESE:{
        price: 10,
        calories: 20,
    },
    SALATE:{
        price: 20,
        calories: 5,
    },
    POTATOE:{
        price: 15,
        calories: 10,
    },
    SEASONING:{
        price: 15,
        calories: 0,
    },
    MAYONEZ:{
        price: 20,
        calories: 5,
    },
};

function Hamburger(){
    this.topings = [];
}
const doubleCheeseburger = new Hamburger();
Hamburger.prototype.askBurgerSize = function (){
    const sizeOptions = Object.keys(SIZES);
    console.log(`Ask size of burger one of ${sizeOptions}`);
    let userSize = prompt(`What size of burger do you want?(${sizeOptions})`,'SMALL');
    let result = this.validateSize(userSize,sizeOptions);
    if (result){
        console.log(`User's size is possible`);
        this.size = userSize;
        console.log(`Burger size ${this.size}`);
        this.price = Object.values(SIZES)[sizeOptions.indexOf(this.size)].price;
        console.log(`Burger price ${this.price}$`);
        this.calories = Object.values(SIZES)[sizeOptions.indexOf(this.size)].calories;
        console.log(`Burger calories ${this.calories}cal`);
    }
};
//Ask about size of burger
//Add:
// - size
// - price
// - calories
Hamburger.prototype.validateSize = function (userSize,sizeOptions){
    console.log(`Validate user's size`);
    if (userSize === null
        || !userSize.trim()
        || !sizeOptions.includes(userSize)){
        console.log(`ERROR , size is not possible.`)
        this.askBurgerSize();
        return false;
    }
    return true;
}
//Validate user's answer about size of burger
Hamburger.prototype.askAboutAddToppings = function (){
    console.log(`Ask user ,does he want add topping or no`);
    let addToppings = confirm(`Do yo want add toppings to your burger?`);
    if(addToppings){
        console.log(`Add`);
        this.askTypeOfTopping();
    }else{
        console.log(`Don't add`);
        this.answerOnTheEnd();
    }
}
//Ask user about add toppings for burger
Hamburger.prototype.askTypeOfTopping = function (){
    const typesToppings = Object.keys(TOPINGS);
    console.log(`Ask type of topping from ${typesToppings}`);
    const userTopping = prompt(`What topping do you want?${typesToppings}`,`CHEESE`);
    const result = this.validateTopping(userTopping,typesToppings);
    if(result){
        console.log(`User's topping is possible`);
        this.topings.push(userTopping);
        console.log(`Add topping ${userTopping}`);
        this.price += Object.values(TOPINGS)[typesToppings.indexOf(userTopping)].price;
        console.log(`Plus to price toppings cost ${Object.values(TOPINGS)[typesToppings.indexOf(userTopping)].price}$`);
        this.calories += Object.values(TOPINGS)[typesToppings.indexOf(userTopping)].calories;
        console.log(`Plus to calories toppings calories ${Object.values(TOPINGS)[typesToppings.indexOf(userTopping)].calories}cal`);
        this.askAboutAddToppings();
    }

}
//Ask what type of toppings user want
//Plus:
// - price
// - calories
Hamburger.prototype.validateTopping = function (userTopping,toppingOptions){
    console.log(`Validate user's topping`);
    if (userTopping === null
        || !userTopping.trim()
        || !toppingOptions.includes(userTopping)){
        console.log(`ERROR , topping is not possible.`)
        this.askTypeOfTopping();
        return false;
    }
    return true;
}
//Validate user's answer about topping of burger
Hamburger.prototype.answerOnTheEnd = function (){
    console.log(`Write user's order`);
    alert(`You order ${this.size.toLowerCase()} burger 
    Price ${this.price}$,
    Calories ${this.calories}cal`);
}
Hamburger.prototype.playAllFunc = function (){
    this.askBurgerSize();
    this.askAboutAddToppings();
}
doubleCheeseburger.playAllFunc();
console.log(doubleCheeseburger);