function action(name){
    return  require(`./${name}`);
}
const calculator = [
    action('add'),
    action('division'),
    action('minus'),
    action('multiplication')
];

calculator
    .forEach(elem => {
        Object.keys(elem)
            .forEach(func => {
                module.exports[func] = elem[func];
            })
    })