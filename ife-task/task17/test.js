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
    for (var i = 1; i < 30; i++) {
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
            var xinqi = new Date(item).getDay();
            if (xinqi == 6) {
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


/*function randerChart(wripeData) {
    var divNum = Object.getOwnPropertyNames(wripeData).length;
    var aqiChartWrap = {};
    var aqiChartWrap = document.getElementById('aqi-chart-wrap');
    //removeChildren(aqiChartWrap);
    for (var item in wripeData) {
        var cube = [];
        cube[item] = document.createElement("div");
        cube[item].setAttribute("class", "aqi-num");
        cube[item].setAttribute("style", "height:" + cubl[item] + "px;width:" + 800 / divNum + "px;");
        cube[item].setAttribute("title", item + ":" + cubl[item]);
        //cube[item].setAttribute("onmouseover", "alert(1);");

        aqiChartWrap.appendChild(cube[item]);
    }
    return console.log(aqiChartWrap);
}*/
var pageStatus = {
    city: "北京",
    size: "week"
};

function init() {
    var wripeData = createWripeData(pageStatus);
    console.log(wripeData);

}

init();
//createWripeData(pageStatus);
