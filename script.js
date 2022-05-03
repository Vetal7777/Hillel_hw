const sizes = {
    small:{
        price: 50,
        calories: 20,
    },
    middle:{
        price: 75,
        calories: 30,
    },
    big:{
        price: 100,
        calories: 40,
    },
};

const toppings = {
    cheese:{
        price: 10,
        calories: 20,
    },
    salade:{
        price: 20,
        calories: 5,
    },
    potato:{
        price: 15,
        calories: 10,
    },
    condiment:{
        price: 15,
        calories: 0,
    },
    mayonnaise:{
        price: 20,
        calories: 5,
    },
};

function Hamburger(){
    this.toppings = [];
}
//Parent hamburger

const order = new Hamburger;
//Новый бургер

const containerE = document.getElementById('container');
const startContainerE = document.getElementById('start');
const sizeContainerE = document.getElementById('sizes-container');
const quastionContainerE = document.getElementById('question-container');
const toppingsContainerE = document.getElementById('toppings-container');
const resultContainerE = document.getElementById('result-container');
//Контейнер сайта

containerE.addEventListener('click',playOrderFunc);

function playOrderFunc(event){
    if(event.target.closest('.start-btn')){
        order.hideContainer(startContainerE);
        order.showContainer(sizeContainerE);
    }
    if(event.target.closest('.size')){
        order.addUserSize(event);
        order.hideContainer(sizeContainerE);
        order.showContainer(quastionContainerE);
    }
    if (event.target.closest('.value')){
        order.hideContainer(quastionContainerE);
        if(event.target.closest('#yes')){
            order.showContainer(toppingsContainerE);
        }
        else if(event.target.closest('#no')){
            order.showContainer(resultContainerE);
            order.createResult();
        }
    }
    if (event.target.closest('.topping')){
        order.addUserTopping(event);
        order.hideContainer(toppingsContainerE);
        order.showContainer(quastionContainerE);
    }
    console.log(order);
}
Hamburger.prototype.hideContainer = function (containerE){
    containerE.classList.toggle('active');
}
Hamburger.prototype.showContainer = function (containerE){
    containerE.classList.toggle('active');
}
Hamburger.prototype.addUserSize = function (event){
    const userSize = event.target.closest('.size').id;
    this.size = userSize;
    this.price = Object.values(sizes)[Object.keys(sizes).indexOf(this.size)].price;
    this.calories = Object.values(sizes)[Object.keys(sizes).indexOf(this.size)].calories;
}
Hamburger.prototype.addUserTopping = function (event){
   let userToppingName = event.target.closest('.topping').id;
   let newTopping = {
       name : userToppingName,
       quality : 1,
   };
   this.toppings.push({...newTopping});
   this.price += (Object.values(toppings)[Object.keys(toppings).indexOf(userToppingName)]).price;
   this.calories += (Object.values(toppings)[Object.keys(toppings).indexOf(userToppingName)]).calories;
}
Hamburger.prototype.createResult = function (){
    const sizeName = document.querySelector('.user-size span');
    sizeName.innerText = this.size + ' burger';
    const priceAndCaloies = document.getElementById('price-calories');
    priceAndCaloies.innerHTML += `
    <span>Price: ${this.price} $</span>
    <span>Calories: ${this.calories} cal</span>
    `;
    if(this.toppings.length){
        const titleToppings = document.getElementById('toppings-title');
        titleToppings.classList.toggle('active');
        const userOrder = document.getElementById('order');
        const resultHTML = this.toppings.reduce((acc,elem) => acc += `                <div class="toppings">
                    <div class="topping">
                    <span class="img-container">
                        <img src="images/${elem.name}.jpeg" alt="topping">
                    </span>
                        <span>${elem.name}</span>
                    </div>`,``);
        userOrder.innerHTML += resultHTML;
    }
}