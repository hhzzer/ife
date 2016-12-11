//var array = [];

function randomArray(num) {
    var array = [];
    for (var i = 0; i < num; i++) {
        array.push(Math.floor(Math.random() * 91 + 10));
        //console.log(array);

    }

    return array;
}

function maopao(array) {
    var i, j, tmp;
    for (var i = 0; i < array.length; i++) {
        for (var j = i + 1; j < array.length; j++) {
        	console.log("  i=" + i + ";j=" + j)
            if (array[i] > array[j]) {
                tmp = array[j];
                array[j] = array[i];
                array[i] = tmp;
                console.log(array+"  change");
            } else { console.log(array  + " no change"); }

        }

    }

}
var test = randomArray(50);

console.log(test);
console.log(maopao(test));
