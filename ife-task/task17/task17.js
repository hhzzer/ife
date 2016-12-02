/*var aqiSourceData = {
    "北京": {
        "2016-01-01": 10,
        "2016-01-02": 10,
        "2016-01-03": 10,
        "2016-01-04": 100
    }
};*/


//一下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 12; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}
var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};
//删除一个节点所有子节点
function removeChildren(pnode) {
    var childs = pnode.childNodes;
    for (var i = childs.length - 1; i >= 0; i--) {
        pnode.removeChild(childs.item(i));
    }
}

function changeToWeek(data) {
    var aqiSourceData_week = {};

    var city = "北京";
    //console.log(city);
    var count = 0;
    var cityData = new Array();
    var cityData[0] = new Array();
    var cityData[1] = new Array();
    //aqiSourceData_week
    for (var date in data[city]) {


        cityData[0][count] = data;
        cityData[1][count] = data[city][date];
        //console.log(count % 7);
        console.log(cityData);
        count = count + 1;

    }

}


function init() {
    //alert("sss");
    var city = arguments[0];
    var cubl = aqiSourceData[city];
    // console.log(cubl instanceof Array);
    //获取Object属性个数方法
    var objectLenght = Object.getOwnPropertyNames(city).length;
    // console.log(objectLenght);
    var aqiChartWrap = document.getElementById('aqi-chart-wrap');
    removeChildren(aqiChartWrap);
    for (var property in cubl) {
        //console.log(property);
        //console.log(cubl[property]);
        var cube = [];
        cube[property] = document.createElement("div");
        cube[property].setAttribute("class", "aqi-num");
        cube[property].setAttribute("style", "height:" + cubl[property] + "px;width:" + 800 / 91 + "px;");
        cube[property].setAttribute("title", property + ":" + cubl[property]);
        //cube[property].setAttribute("onmouseover", "alert(1);");

        aqiChartWrap.appendChild(cube[property]);

    }
}

window.onload = function() {
    var city = document.getElementById("city-select");
    city.setAttribute("onchange", "init(this.value);")
    console.log(city.value);
    init(city.value);
    changeToWeek(aqiSourceData);
}
