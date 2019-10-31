const power = function(base, exponent){
    let result =1;
    for (let count = 0; count < exponent; count++){
        result *= base;
    }
    return result;
}
console.log(power(3,6));

//prog with no params
let makeNoise = function(){
    console.log('Pling');
};
makeNoise();
//its only result is a side effect