/*var aqiSourceData = {
    "北京": {
        "2016-01-01": 10,
        "2016-01-02": 10,
        "2016-01-03": 10,
        "2016-01-04": 100
    }
};*/

//以下两个函数用于随机模拟生成测试数据
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
    for (var i = 1; i < 50; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}
// 生成原始数据
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
// 定义页面状态，作为绘制柱状图函数参数
var pageStatus = {
    city: "北京",
    size: "day"
};
// 处理原始数据，根据页面状态生成“日”，“周”，“月”数据
function createWripeData(pageStatus) {

    var orignData = aqiSourceData[pageStatus.city];
    var wripeData = {};
    if (pageStatus.size === "day") {
        wripeData = orignData;
    }
    if (pageStatus.size === "week") {
        var countSum = 0,
            daySum = 0,
            week = 0;
        for (var item in orignData) {
            countSum = countSum + orignData[item];
            daySum++;
            if ((new Date(item)).getDay() == 6) {
                week++;
                wripeData["第" + week + "周"] = Math.floor(countSum / daySum);
                countSum = 0;
                daySum = 0;
            }
        }
        if (daySum != 0) {
            week++;
            wripeData["第" + week + "周"] = Math.floor(countSum / daySum);
        }
    }
    if (pageStatus.size === "month") {
        var countSum = 0,
            daySum = 0,
            month = 0;
        for (var item in orignData) {
            countSum = countSum + orignData[item];
            daySum++;
            if ((new Date(item)).getMonth() !== month) {
                month++;
                wripeData["第" + month + "月"] = Math.floor(countSum / daySum);
                countSum = 0;
                daySum = 0;
            }
        }
        if (daySum != 0) {
            month++;
            wripeData["第" + month + "月"] = Math.floor(countSum / daySum);
        }
    }

    return wripeData;
}

//根据绘图数据，绘制柱状图
function randerChart(wripeData) {
    var divNum = Object.getOwnPropertyNames(wripeData).length;
    var aqiChartWrap = document.getElementById('aqi-chart-wrap');
    removeChildren(aqiChartWrap);
    for (var item in wripeData) {
        var cube = [];
        cube[item] = document.createElement("div");
        cube[item].setAttribute("class", "aqi-num");
        cube[item].setAttribute("style", "height:" + wripeData[item]*0.8 + "px;width:" + 1000 / divNum + "px;");
        cube[item].setAttribute("title", item + ":" + wripeData[item]);
        //cube[item].setAttribute("onmouseover", "alert(1);");

        aqiChartWrap.appendChild(cube[item]);
    }
    //return console.log(aqiChartWrap);
}
//给radio元素和select元素绑定onchange事件函数
function bandEvent() {
    var radio = document.getElementsByName("gra-time");
    //var select = document.getElementsByTagName("option");
    var city = document.getElementById("city-select");
    city.setAttribute("onchange", "cityChange(this.value);");
    for (var i = 0; i < radio.length; i++) {
        radio[i].setAttribute("onchange", "radioChange(this.value);");
    }
}
// 城市选项框onchange函数
function cityChange(city) {
    pageStatus.city = city;
    //console.log(pageStatus);
    init();
}
// radio function
function radioChange(time) {
    pageStatus.size = time;
    init();
}
// 根据源数据，生成下拉框选项
function createSelect() {
    var select = document.getElementById("city-select");
    //var option = aqiSourceData;
    for (var item in aqiSourceData) {
        var option = [];
        option[item] = document.createElement("option");
        option[item].setAttribute("value", item);
        option[item].innerHTML = item;
        select.appendChild(option[item]);
        //console.log(item);
    }
}

function init() {
    var wripeData = createWripeData(pageStatus);
    randerChart(wripeData);
    //console.log(Object.getOwnPropertyNames(wripeData).length);

}


window.onload = function() {
    createSelect();
    bandEvent();
    init();

}
