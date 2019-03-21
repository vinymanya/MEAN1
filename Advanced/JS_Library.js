function each(arr, callback){
    for(let index = 0; index < arr.length; index++){
        callback(arr[index], index);
    }
}
const numArray = ["1", "string", "2", "3", "4", "5", "6", "7", "array", "8"];

each(numArray, function(item, index){
    console.log(`Item: ${ item } Index: ${ index }`);
    console.log("Item:" + " " + item + "Index:" + " " + index );
});

//another way
each(numArray, listItem);

function listItem(item){
    console.log(item);
};

//map function takes an array, then delegate it to the callback function,
//the callback will transform it and return a new array.
function map(array, callback){
    const results = [];
    for(let index = 0; index < array.length; index++){
        results.push(callback(array[index], index));
    }

    return results;
}

let results = map(numArray, function(num){
    return parseInt(num, 10);
});


//filter function takes in an array and a callback, then evaluate the array with the callback
//then return another array based on the evaluation.
function filter(array, callback){
    const results = [];
    for(let index = 0; index < array.length; index++){
        if(callback(array[index], index)){
            results.push(array[index]);
        }
    }
    return results;
}
//reject function is just the opposite of the filter function
function reject(array, callback){
    const results = [];
    for(let index = 0; index < array.length; index++){
        if(!callback(array[index], index)){
            results.push(array[index]);
        }
    }
    return results;
}

results = reject(numArray, function(item){
    return isNaN(item);
});

results = filter(numArray, function(item){
    return item % 2 === 0;
})
console.log(results);

//find function finds a particular element in an array and return that element.
function find(array, callback){
    for(let index = 0; index < array.length; index++){
        if(callback(array[index], index)){
            return array[index];
        }
    }
}
console.log(find(results, function(item){
    return item === 4;
}));

//reduce function takes in an array, and boils it down into a single value,
//and return that value.
function reduce(array, callback, memo){
    const results = [].concat(array);
    if(memo === undefined){
        memo = results.pop();
    }
    for(let index = 0; index < array.length; index++){
       memo =  callback(memo, array[index], index);
    }
    return memo;
}

results = reduce(results, add);

function add(num1, num2, num3){
    return num1 + num2 + num3;
}

console.log(results);