returnTodaysDate = function () {
	var date = new Date;
	var day = date.getDate();
	var month = date.getMonth() +1;
	var year = date.getFullYear();
	var today = day + "-" + month + "-" + year;
	return today;
};

returnHourDiff = function (date1, date2) {
	 var hour1 = date1.getHour();
	 var hour2 = date2.getHour();
	 return hour2 - hour1;
};

niceDateTime = function (date) {
	var day = date.getDate();
	var month = date.getMonth();
	var year = date.getFullYear();
	var hour = date.getHour();
	var minutes = date.getMinutes();
};