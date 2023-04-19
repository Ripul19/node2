//general---------------------------------------------------------------------------------------------	
/*var data =[na ='Ripul',	
 age = 23,	
 hobbies = true	
];	
const summarizeUser= (name, age, hobby) => {	
    return (name+ ' ' + age+ ' ' +hobby);	
}	
const add = (a,b) => a+b;	
const addOne = (a) => a+1;	
const randomValue = () => 3+9;	
console.log(data);	
console.log(na);	
console.log(summarizeUser(na,age,hobbies));	
console.log(summarizeUser(data));	
console.log(summarizeUser(data,data,data));	
console.log(add(1,2));	
console.log(addOne(1));	
console.log(randomValue());*/	

//Functions---------------------------------------------------------------------------	
/*const data ={na :'Ripul',	
 age : 23,	
 hobbies : true,	
 //correct form	
 daa() {	
    console.log(this.na+ ' '+ this.age+' '+ this.hobbies) 	
 },	
 //correct form	
 /*daa : function() {	
    console.log(this.na+ ' '+ this.age+' '+ this.hobbies) 	
 },	
 //incorrect form	
 daa : () => {	
    console.log(this.na+ ' '+ this.age+' '+ this.hobbies) 	
 },*/	
/*};	
data.daa();	
console.log(data);*/	

//Arrays---------------------------------------------------------------------------------------------	
/*const hobbies = ['Sports','Cooking'];	
for(let hobby of hobbies){	
    console.log(hobby);	
}	
console.log(hobbies);	
hobbies.push('Fishing');	
console.log(hobbies);	
console.log(hobbies.map(hobby =>  'Hobby: '+hobby));*/	

//Spread and Rest operators-------------------------------------------------------------------------------	
//spread operator- ... these are three dots	
//copy array with slice or create a new aarray	
//rest operator- ... these are three dots, 	
//both rest and spread operators are denoted woth three dots but the way those used are different.	
//rest is used to bind the properties or objects	
//spread is used to pull properties or objects	
/*const hobbies = ['Sports','Cooking'];	
const copiedArray= hobbies.slice();	
console.log(copiedArray);	
const coppiedArray =[hobbies]; //this makes an internal array, to remove this	
console.log(coppiedArray);	
const copiedArray2 = [...hobbies];	
console.log(copiedArray2);	
const data ={na :'Ripul',	
 age : 23,	
 hobbies : true,	
 //correct form	
 daa() {	
    console.log(this.na+ ' '+ this.age+' '+ this.hobbies)	
 },	
}	
const copiedData = {...data};	
console.log(copiedData);	
const copiedData1 = {data};	
console.log(copiedData1);	
//rest operator  to return the data in form of array	
const toArray = (arg1, arg2, arg3) => {	
    return [arg1 , arg2 , arg3];	
};	
console.log(toArray(1,2,3));	
const toArrays = (...args) => {	
    return args;	
};	
console.log(toArrays(1,2,3,4)); */	

//Destructuring---------------------------------------------------------------------------------------------	
/*const data ={na :'Ripul',	
 age : 23,	
 hobbies : true,	
 //correct form	
 daa() {	
    console.log(this.na+ ' '+ this.age+' '+ this.hobbies) 	
 },	
};	
const printName = (person) => {	
    console.log(data.na);	
}	
printName(data);	
const printName1 = ({na}) => {	
    console.log(na + ' with destructuring');	
}	
printName1(data);	
 // Argument name must ne same if we are copying	
const {na , age} = data;	
console.log(na , age);	
const hobbies = ['Sports','Cooking', 'Dancing'];	
const [hobby1, hobby2]= hobbies;	
console.log('hobby1: '+hobby1, 'hobby2: '+ hobby2); */	

//Asynchronous code and Promises--------------------------------------------------------------------	

/*const fetchData = () => {	
    const promise = new Promise((resolve, reject) => {	
        setTimeout(() => {	
            resolve('Done!');	
        }, 2000);	
    });	
    return promise;	
};	
setTimeout(() => {	
    console.log('Timer is done!');	
    fetchData().then(text => {	
        console.log(text);	
        return fetchData();	
        })	
        .then(text2 => {	
            console.log(text2);	
    });	
}, 2000);	
console.log('Hello!');	
console.log('Hi!'); */	

//Backticks---------------------------------------------------------------------------------------------	
//used to add objects easily than concatinating the primitive way:	
/* const nam = 'Ripul';	
const age = 23;	
console.log(`My name is ${nam} and I am ${age} years old`); */	
