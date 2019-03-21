//Math 1

function zero_negativity(array){
    if(array.constructor === Array){
        for (let i = 0; i < array.length; i++){
            if (array[i] < 0){
                return false;
            }else{
                return true;
            }
        }
    }
}
let math1 = zero_negativity([1,2,3,4,0]);
console.log(math1);

//Math 2
 function is_even(num){
    if (num % 2 === 0){
        return true;
    }else{
        return false;
    }
}
let math2 = is_even(23);
console.log(math2);

 //Math 3
function how_many_even(array){
    let counter = 0;
    for(let i = 0; i<array.length; i++){
        if(is_even(array[i])){
            counter += array[i];
        }
    }
    return counter;
}

//Math 4
function create_dummy_array(n){
    let array = [];
    for(let i = 0; i < n; i++){
        array.push(Math.floor(Math.random() * 10));
    }
    return array;
}

//Math 5
function random_choice(array){
    let index = Math.floor(Math.random() * array.length);
    return array[index];
}
random_choice([1,2,3,4,5,6,7,8,9]);
console.log(array[index]);
