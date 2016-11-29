var aqi_data = {};

function addAqiData() {
    var city = document.getElementById('aqi-city-input').value.trim();
    var number = document.getElementById("aqi-value-input").value.trim();
    var i = 0;
    aqi_data[i] = [city, number];
    if (!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
        aqi_data = {};
        alert("城市名必须是中英文");

    }
    if (!number.match(/^\d+$/)) {
        aqi_data = {};
        return alert("空气质量指数必须是数字");

    }


    //alert(aqi_data[i]);
}

function randerAqiList() {
    var table = document.getElementById("aqi-table");
    var tr = document.createElement("tr");
    for (var i = 0; i < 2; i++) {
        var td = document.createElement("td");
        var text = document.createTextNode(aqi_data[0][i]);

        td.appendChild(text);
        tr.appendChild(td);

    }
    var tb_btn = document.createElement("button");
    tb_btn.innerHTML = "删除";
    tb_btn.onclick = function() {
        //alert(this.parentNode.parentNode);
        var table = this.parentNode.parentNode;
        table.removeChild(this.parentNode);
    }
    tr.appendChild(tb_btn);

    table.appendChild(tr);
}


function init() {

    var btn = document.getElementById("add-btn");
    btn.onclick = function() {
        //checkNumber();
        addAqiData();
        randerAqiList();

    };
}
window.onload = init();
