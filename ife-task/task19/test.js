function sortArray(array) {
    var tmp;
    for (var i = 0; i < array.length; i++) {
        if(array[i]>array[i+1])
        tmp = array[i];
        array[i]=array[i+1];
        array[i+1] = tmp;
        //sortArray(array);
    }
    return array;
}

 function compare(value1, value2) {
        return value2 - value1;
    }
var result = [1,2,4,1,9,10,2].sort();
console.log(result);