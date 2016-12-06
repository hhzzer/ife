var queueSource = [];

function removeChildren(pnode) {
    var childs = pnode.childNodes;
    for (var i = childs.length - 1; i >= 0; i--) {
        pnode.removeChild(childs.item(i));
    }
}

function createQueue(queue) {

    var queueDiv = document.getElementById('queue');
    var queMen = [];
    removeChildren(queueDiv);
    for (var i = 0; i < queue.length; i++) {
        queMen[i] = document.createElement("div");
        queMen[i].setAttribute("class", "queueMenber");
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
    if (input) {
        queueSource.unshift(Number(input));
        createQueue(queueSource);
    } else { alert("请输入数字"); }
}

function rightIn() {
    var input = document.getElementById("input").value;
    if (input) {
        queueSource.push(Number(input));
        createQueue(queueSource);
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
}
window.onload = function() {

    bandEvent();
    createQueue(queueSource);
}
