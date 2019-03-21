//1
//undefined!
console.log(hello);
var hello = 'world';

//2
//magnet calling a function before it was assigned;
var needle = 'haystack';
test();

function test(){
	var needle = 'magnet';
	console.log(needle);
}

//3
// super cool
//the variable brendan in global scope is different from the one in local scope inside a function
//so in this instance only the global console.log will run
var brendan = 'super cool';
function print(){
	brendan = 'only okay';
	console.log(brendan);
}
console.log(brendan);

//4
//chicken
//global console will run. the function eat will not run;
//because we are calling it before it was defined!
var food = 'chicken';
console.log(food);
eat();
function eat(){
	food = 'half-chicken';
	console.log(food);
	var food = "gone";
}

//5
//ReferenceError main is not a function!
mean();
console.log(food);
var mean = function() {
	food = "chicken";
	console.log(food);
	var food = "fish";
	console.log(food);
}
console.log(food);

//6
//trying to print a variable before it was assigned!
// undefined!
//rock
//r&b
//disco
console.log(genre);
var genre = "disco";
rewind();
function rewind() {
	genre = "rock";
	console.log(genre);
	var genre = "r&b";
	console.log(genre);
}
console.log(genre);

//7
// san jose
//seattle
//burbank
//san jose
dojo = "san jose";
console.log(dojo);
learn();
function learn() {
	dojo = "seattle";
	console.log(dojo);
	var dojo = "burbank";
	console.log(dojo);
}
console.log(dojo);

//constructor function
function Person(name, age){
    var self = this;
    var privateVariable = "This is a private variable";
    var privateMethod = function(){
        console.log("This is a private method!:" + self.name);
        console.log(self);
    }
    this.name = name;
    this.age = age;
    this.greet = function(){
        console.log(`Hi, my name is ${this.name} and I am ${this.age} years old.`)
    }
    //call private method
    privateMethod();
}

var steve = new Person("Steve", 27);
steve.greet();
