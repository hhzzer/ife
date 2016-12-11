var queueSource = [];

function removeChildren(pnode) {
    var childs = pnode.childNodes;
    for (var i = childs.length - 1; i >= 0; i--) {
        pnode.removeChild(childs.item(i));
    }
}

function randomArray(num) {
    var array = [];
    for (var i = 0; i < num; i++) {
        array.push(Math.floor(Math.random() * 91 + 10));
        //console.log(array);

    }

    return array;
}

function sleep(n) {
    var start = new Date().getTime();
    while (true)
        if (new Date().getTime() - start > n) break;
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
                console.log(array + "  change");
                createQueue(array);
                sleep(100);
            } else {
                console.log(array + " no change");
                createQueue(array);
                sleep(100);
            }

        }

    }


}

function createQueue(queue) {

    var queueDiv = document.getElementById('queue');
    var queMen = [];
    removeChildren(queueDiv);
    for (var i = 0; i < queue.length; i++) {
        queMen[i] = document.createElement("div");
        queMen[i].setAttribute("class", "queueMenber");
        queMen[i].setAttribute("style", "height:" + queue[i] + "px;width:" + 1000 / queue.length + "px;top:" + (100 - queue[i]) + "px;");
        queMen[i].setAttribute("onclick", "delNum(this.innerHTML);");
        queMen[i].innerHTML = queue[i];
        queueDiv.appendChild(queMen[i]);
    }

}

function delNum(num) {
    var index = queueSource.indexOf(Number(num));
    //console.log(index);
    //console.log(queueSource);
    queueSource.splice(index, 1);
    createQueue(queueSource);
}

function leftIn() {
    var input = document.getElementById("input").value;
    if ((/^[0-9]+$/).test(input)) {
        if (Number(input) > 9 && Number(input) < 101) {
            if (queueSource.length > 21) { alert("最多60"); } else {
                queueSource.unshift(Number(input));
                createQueue(queueSource);
            }
        } else { alert("请输入10~100数字"); }
    } else { alert("请输入数字"); }
}

function rightIn() {
    var input = document.getElementById("input").value;

    if ((/^[0-9]+$/).test(input)) {
        if (Number(input) > 9 && Number(input) < 101) {
            if (queueSource.length > 61) { alert("最多60"); } else {
                queueSource.push(Number(input));
                createQueue(queueSource);
            }
        } else { alert("请输入10~100数字"); }
    } else { alert("请输入数字"); }
}

function leftOut() {
    alert("操作将删除" + queueSource[0]);
    queueSource.shift();
    createQueue(queueSource);
}

function rightOut() {
    var length = queueSource.length;
    alert("操作将删除" + queueSource[length - 1]);
    queueSource.pop();
    createQueue(queueSource);
}

function bandEvent() {
    var left_in = document.getElementById("left-in");
    left_in.setAttribute("onclick", "leftIn();");
    var right_in = document.getElementById("right-in");
    right_in.setAttribute("onclick", "rightIn();");
    var left_out = document.getElementById("left-out");
    left_out.setAttribute("onclick", "leftOut();");
    var right_out = document.getElementById("right-out");
    right_out.setAttribute("onclick", "rightOut();");
    var sort_bottom = document.getElementById("sort");
    sort_bottom.setAttribute("onclick", "maopao(queueSource);");
}

function sortArray() {
    var array = queueSource.sort(compare);
    createQueue(array);

}

function compare(value1, value2) {
    return value2 - value1;
}
window.onload = function() {

    bandEvent();
    createQueue(queueSource);
}
