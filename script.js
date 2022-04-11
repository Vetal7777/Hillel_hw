let counter = [];
function unshiftElem(massive,n){
    if (n == 1) {
        massive.unshift(n);
    } else {
        massive.unshift(n);
        unshiftElem(massive,n - 1);
    }
    return massive;
}

counter = unshiftElem(counter,7);

console.log(counter);

function sumElem(massive,index){
    return index === 0 ? massive[index] : massive[index] + sumElem(massive,index - 1);
}

console.log(sumElem(counter,counter.length - 1));
//