
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
window.onload = function() {
	var cubl=aqiSourceData["北京"];
	console.log(cubl);
	//获取Object属性个数方法
	console.log(Object.getOwnPropertyNames("北京").length);
    //var cubl = [10, 20, 30, 30, 50, 100, 80];
    var aqiChartWrap = document.getElementById('aqi-chart-wrap');
    for (var i = 0; i < cubl.length; i++) {

        var cube = []
        cube[i] = document.createElement("div");
        cube[i].setAttribute("class", "aqi-num");
        cube[i].setAttribute("style", "height:" + cubl[i] + "px;width:" + 300 / cubl.length + "px;");

        aqiChartWrap.appendChild(cube[i]);
        //console.log(typeof(cubl[i]));
    }
}
