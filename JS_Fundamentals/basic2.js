function magic_multiply(x, y){
    //test2
    if (x === 0 && y === 0){
        return "All inputs 0";
    }
    //test3
    if(x.constructor === Array){
        for(let i = 0; i < x.length; i++){
            x[i] = x[i] * y;
        }
        return x;
    }

    //test4
    if(y.constructor === String){
        return "Error: can not multiply by string";
    }
    //test5
    if(x.constructor === String){
        let new_string = "";
        for(let i = 0; i < y; i++){
            new_string += x;
        }
        return new_string;
    }
    //test1
    return x * y;
}
let test1 = magic_multiply(5, 2);
let test2 = magic_multiply(0,0);
let test3 = magic_multiply([1,2,3], 2);
let test4 = magic_multiply(7, "three");
let test5 = magic_multiply("Brendo", 4);

//Print values for each of the above
console.log(test1);
console.log(test2);
console.log(test3);
console.log(test4);
console.log(test5);