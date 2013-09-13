/**
 * @version: 1.0 Alpha-1
 * @author: Coolite Inc. http://www.coolite.com/
 * @date: 2008-05-13
 * @copyright: Copyright (c) 2006-2008, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * @license: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/.
 * @website: http://www.datejs.com/
 */
Date.CultureInfo = {
	name: "en-US",
	englishName: "English (United States)",
	nativeName: "English (United States)",
	dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	abbreviatedDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	shortestDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
	firstLetterDayNames: ["S", "M", "T", "W", "T", "F", "S"],
	monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	abbreviatedMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	amDesignator: "AM",
	pmDesignator: "PM",
	firstDayOfWeek: 0,
	twoDigitYearMax: 2029,
	dateElementOrder: "mdy",
	formatPatterns: {
		shortDate: "M/d/yyyy",
		longDate: "dddd, MMMM dd, yyyy",
		shortTime: "h:mm tt",
		longTime: "h:mm:ss tt",
		fullDateTime: "dddd, MMMM dd, yyyy h:mm:ss tt",
		sortableDateTime: "yyyy-MM-ddTHH:mm:ss",
		universalSortableDateTime: "yyyy-MM-dd HH:mm:ssZ",
		rfc1123: "ddd, dd MMM yyyy HH:mm:ss GMT",
		monthDay: "MMMM dd",
		yearMonth: "MMMM, yyyy"
	},
	regexPatterns: {
		jan: /^jan(uary)?/i,
		feb: /^feb(ruary)?/i,
		mar: /^mar(ch)?/i,
		apr: /^apr(il)?/i,
		may: /^may/i,
		jun: /^jun(e)?/i,
		jul: /^jul(y)?/i,
		aug: /^aug(ust)?/i,
		sep: /^sep(t(ember)?)?/i,
		oct: /^oct(ober)?/i,
		nov: /^nov(ember)?/i,
		dec: /^dec(ember)?/i,
		sun: /^su(n(day)?)?/i,
		mon: /^mo(n(day)?)?/i,
		tue: /^tu(e(s(day)?)?)?/i,
		wed: /^we(d(nesday)?)?/i,
		thu: /^th(u(r(s(day)?)?)?)?/i,
		fri: /^fr(i(day)?)?/i,
		sat: /^sa(t(urday)?)?/i,
		future: /^next/i,
		past: /^last|past|prev(ious)?/i,
		add: /^(\+|after|from)/i,
		subtract: /^(\-|before|ago)/i,
		yesterday: /^yesterday/i,
		today: /^t(oday)?/i,
		tomorrow: /^tomorrow/i,
		now: /^n(ow)?/i,
		millisecond: /^ms|milli(second)?s?/i,
		second: /^sec(ond)?s?/i,
		minute: /^min(ute)?s?/i,
		hour: /^h(ou)?rs?/i,
		week: /^w(ee)?k/i,
		month: /^m(o(nth)?s?)?/i,
		day: /^d(ays?)?/i,
		year: /^y((ea)?rs?)?/i,
		shortMeridian: /^(a|p)/i,
		longMeridian: /^(a\.?m?\.?|p\.?m?\.?)/i,
		timezone: /^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt)/i,
		ordinalSuffix: /^\s*(st|nd|rd|th)/i,
		timeContext: /^\s*(\:|a|p)/i
	},
	abbreviatedTimeZoneDST: {
		GMT: "-000",
		EDT: "-0400",
		CDT: "-0500",
		MDT: "-0600",
		PDT: "-0700"
	},
	abbreviatedTimeZoneStandard: {
		GMT: "-000",
		EST: "-0500",
		CST: "-0600",
		MST: "-0700",
		PST: "-0800"
	}
};
(function () {
	var $D = Date,
		$P = $D.prototype,
		$C = $D.CultureInfo,
		p = function (s, l) {
			if (!l) {
				l = 2;
			}
			return ("000" + s).slice(l * -1);
		};
	$P.clearTime = function () {
		this.setHours(0);
		this.setMinutes(0);
		this.setSeconds(0);
		this.setMilliseconds(0);
		return this;
	};
	$P.setTimeToNow = function () {
		var n = new Date();
		this.setHours(n.getHours());
		this.setMinutes(n.getMinutes());
		this.setSeconds(n.getSeconds());
		this.setMilliseconds(n.getMilliseconds());
		return this;
	};
	$D.today = function () {
		return new Date().clearTime();
	};
	$D.compare = function (date1, date2) {
		if (isNaN(date1) || isNaN(date2)) {
			throw new Error(date1 + " - " + date2);
		} else if (date1 instanceof Date && date2 instanceof Date) {
			return (date1 < date2) ? -1 : (date1 > date2) ? 1 : 0;
		} else {
			throw new TypeError(date1 + " - " + date2);
		}
	};
	$D.equals = function (date1, date2) {
		return (date1.compareTo(date2) === 0);
	};
	$D.getDayNumberFromName = function (name) {
		var n = $C.dayNames,
			m = $C.abbreviatedDayNames,
			o = $C.shortestDayNames,
			s = name.toLowerCase();
		for (var i = 0; i < n.length; i++) {
			if (n[i].toLowerCase() == s || m[i].toLowerCase() == s || o[i].toLowerCase() == s) {
				return i;
			}
		}
		return -1;
	};
	$D.getMonthNumberFromName = function (name) {
		var n = $C.monthNames,
			m = $C.abbreviatedMonthNames,
			s = name.toLowerCase();
		for (var i = 0; i < n.length; i++) {
			if (n[i].toLowerCase() == s || m[i].toLowerCase() == s) {
				return i;
			}
		}
		return -1;
	};
	$D.isLeapYear = function (year) {
		return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
	};
	$D.getDaysInMonth = function (year, month) {
		return [31, ($D.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	};
	Date.getTimezoneOffset = function (s, dst) {
		return (dst || false) ? Date.CultureInfo.abbreviatedTimeZoneDST[s.toUpperCase()] : Date.CultureInfo.abbreviatedTimeZoneStandard[s.toUpperCase()];
	};
	Date.getTimezoneAbbreviation = function (offset, dst) {
		var n = (dst || false) ? Date.CultureInfo.abbreviatedTimeZoneDST : Date.CultureInfo.abbreviatedTimeZoneStandard,
			p;
		for (p in n) {
			if (n[p] === offset) {
				return p;
			}
		}
		return null;
	};
	$D.getTimezoneOffset = function (name) {
		var z = $C.timezones,
			p;
		for (var i = 0; i < z.length; i++) {
			if (z[i].name === name.toUpperCase()) {
				return z[i].offset;
			}
		}
		return null;
	};
	$P.clone = function () {
		return new Date(this.getTime());
	};
	$P.compareTo = function (date) {
		return Date.compare(this, date);
	};
	$P.equals = function (date) {
		return Date.equals(this, date || new Date());
	};
	$P.between = function (start, end) {
		return this.getTime() >= start.getTime() && this.getTime() <= end.getTime();
	};
	$P.isAfter = function (date) {
		return this.compareTo(date || new Date()) === 1;
	};
	$P.isBefore = function (date) {
		return (this.compareTo(date || new Date()) === -1);
	};
	$P.isToday = function () {
		return this.isSameDay(new Date());
	};
	$P.isSameDay = function (date) {
		return this.clone().clearTime().equals(date.clone().clearTime());
	};
	$P.addMilliseconds = function (value) {
		this.setMilliseconds(this.getMilliseconds() + value);
		return this;
	};
	$P.addSeconds = function (value) {
		return this.addMilliseconds(value * 1000);
	};
	$P.addMinutes = function (value) {
		return this.addMilliseconds(value * 60000);
	};
	$P.addHours = function (value) {
		return this.addMilliseconds(value * 3600000);
	};
	$P.addDays = function (value) {
		this.setDate(this.getDate() + value);
		return this;
	};
	$P.addWeeks = function (value) {
		return this.addDays(value * 7);
	};
	$P.addMonths = function (value) {
		var n = this.getDate();
		this.setDate(1);
		this.setMonth(this.getMonth() + value);
		this.setDate(Math.min(n, $D.getDaysInMonth(this.getFullYear(), this.getMonth())));
		return this;
	};
	$P.addYears = function (value) {
		return this.addMonths(value * 12);
	};
	$P.add = function (config) {
		console.log(config);
		if (typeof config === "number") {
			this._orient = config;
			return this;
		}
		var x = config;
		if (x.milliseconds) {
			this.addMilliseconds(x.milliseconds);
		}
		if (x.seconds) {
			this.addSeconds(x.seconds);
		}
		if (x.minutes) {
			this.addMinutes(x.minutes);
		}
		if (x.hours) {
			this.addHours(x.hours);
		}
		if (x.weeks) {
			this.addWeeks(x.weeks);
		}
		if (x.months) {
			this.addMonths(x.months);
		}
		if (x.years) {
			this.addYears(x.years);
		}
		if (x.days) {
			console.log('adding '+ x.days + ' days');
			this.addDays(x.days);
		}
		return this;
	};
	var $y, $m, $d;
	$P.getWeek = function () {
		var a, b, c, d, e, f, g, n, s, w;
		$y = (!$y) ? this.getFullYear() : $y;
		$m = (!$m) ? this.getMonth() + 1 : $m;
		$d = (!$d) ? this.getDate() : $d;
		if ($m <= 2) {
			a = $y - 1;
			b = (a / 4 | 0) - (a / 100 | 0) + (a / 400 | 0);
			c = ((a - 1) / 4 | 0) - ((a - 1) / 100 | 0) + ((a - 1) / 400 | 0);
			s = b - c;
			e = 0;
			f = $d - 1 + (31 * ($m - 1));
		} else {
			a = $y;
			b = (a / 4 | 0) - (a / 100 | 0) + (a / 400 | 0);
			c = ((a - 1) / 4 | 0) - ((a - 1) / 100 | 0) + ((a - 1) / 400 | 0);
			s = b - c;
			e = s + 1;
			f = $d + ((153 * ($m - 3) + 2) / 5) + 58 + s;
		}
		g = (a + b) % 7;
		d = (f + g - e) % 7;
		n = (f + 3 - d) | 0;
		if (n < 0) {
			w = 53 - ((g - s) / 5 | 0);
		} else if (n > 364 + s) {
			w = 1;
		} else {
			w = (n / 7 | 0) + 1;
		}
		$y = $m = $d = null;
		return w;
	};
	$P.getISOWeek = function () {
		$y = this.getUTCFullYear();
		$m = this.getUTCMonth() + 1;
		$d = this.getUTCDate();
		return p(this.getWeek());
	};
	$P.setWeek = function (n) {
		return this.moveToDayOfWeek(1).addWeeks(n - this.getWeek());
	};
	$D._validate = function (n, min, max, name) {
		if (typeof n == "undefined") {
			return false;
		} else if (typeof n != "number") {
			throw new TypeError(n + " is not a Number.");
		} else if (n < min || n > max) {
			throw new RangeError(n + " is not a valid value for " + name + ".");
		}
		return true;
	};
	$D.validateMillisecond = function (value) {
		return $D._validate(value, 0, 999, "millisecond");
	};
	$D.validateSecond = function (value) {
		return $D._validate(value, 0, 59, "second");
	};
	$D.validateMinute = function (value) {
		return $D._validate(value, 0, 59, "minute");
	};
	$D.validateHour = function (value) {
		return $D._validate(value, 0, 23, "hour");
	};
	$D.validateDay = function (value, year, month) {
		return $D._validate(value, 1, $D.getDaysInMonth(year, month), "day");
	};
	$D.validateMonth = function (value) {
		return $D._validate(value, 0, 11, "month");
	};
	$D.validateYear = function (value) {
		return $D._validate(value, 0, 9999, "year");
	};
	$P.set = function (config) {
		if ($D.validateMillisecond(config.millisecond)) {
			this.addMilliseconds(config.millisecond - this.getMilliseconds());
		}
		if ($D.validateSecond(config.second)) {
			this.addSeconds(config.second - this.getSeconds());
		}
		if ($D.validateMinute(config.minute)) {
			this.addMinutes(config.minute - this.getMinutes());
		}
		if ($D.validateHour(config.hour)) {
			this.addHours(config.hour - this.getHours());
		}
		if ($D.validateMonth(config.month)) {
			this.addMonths(config.month - this.getMonth());
		}
		if ($D.validateYear(config.year)) {
			this.addYears(config.year - this.getFullYear());
		}
		if ($D.validateDay(config.day, this.getFullYear(), this.getMonth())) {
			this.addDays(config.day - this.getDate());
		}
		if (config.timezone) {
			this.setTimezone(config.timezone);
		}
		if (config.timezoneOffset) {
			this.setTimezoneOffset(config.timezoneOffset);
		}
		if (config.week && $D._validate(config.week, 0, 53, "week")) {
			this.setWeek(config.week);
		}
		return this;
	};
	$P.moveToFirstDayOfMonth = function () {
		return this.set({
			day: 1
		});
	};
	$P.moveToLastDayOfMonth = function () {
		return this.set({
			day: $D.getDaysInMonth(this.getFullYear(), this.getMonth())
		});
	};
	$P.moveToNthOccurrence = function (dayOfWeek, occurrence) {
		var shift = 0;
		if (occurrence > 0) {
			shift = occurrence - 1;
		} else if (occurrence === -1) {
			this.moveToLastDayOfMonth();
			if (this.getDay() !== dayOfWeek) {
				this.moveToDayOfWeek(dayOfWeek, -1);
			}
			return this;
		}
		return this.moveToFirstDayOfMonth().addDays(-1).moveToDayOfWeek(dayOfWeek, +1).addWeeks(shift);
	};
	$P.moveToDayOfWeek = function (dayOfWeek, orient) {
		var diff = (dayOfWeek - this.getDay() + 7 * (orient || +1)) % 7;
		return this.addDays((diff === 0) ? diff += 7 * (orient || +1) : diff);
	};
	$P.moveToMonth = function (month, orient) {
		var diff = (month - this.getMonth() + 12 * (orient || +1)) % 12;
		return this.addMonths((diff === 0) ? diff += 12 * (orient || +1) : diff);
	};
	$P.getOrdinalNumber = function () {
		return Math.ceil((this.clone().clearTime() - new Date(this.getFullYear(), 0, 1)) / 86400000) + 1;
	};
	$P.getTimezone = function () {
		return $D.getTimezoneAbbreviation(this.getUTCOffset(), this.isDaylightSavingTime());
	};
	$P.setTimezoneOffset = function (offset) {
		var here = this.getTimezoneOffset(),
			there = Number(offset) * -6 / 10;
		return this.addMinutes(there - here);
	};
	$P.setTimezone = function (offset) {
		return this.setTimezoneOffset($D.getTimezoneOffset(offset));
	};
	$P.hasDaylightSavingTime = function () {
		return (Date.today().set({
			month: 0,
			day: 1
		}).getTimezoneOffset() !== Date.today().set({
			month: 6,
			day: 1
		}).getTimezoneOffset());
	};
	$P.isDaylightSavingTime = function () {
		return (this.hasDaylightSavingTime() && new Date().getTimezoneOffset() === Date.today().set({
			month: 6,
			day: 1
		}).getTimezoneOffset());
	};
	$P.getUTCOffset = function () {
		var n = this.getTimezoneOffset() * -10 / 6,
			r;
		if (n < 0) {
			r = (n - 10000).toString();
			return r.charAt(0) + r.substr(2);
		} else {
			r = (n + 10000).toString();
			return "+" + r.substr(1);
		}
	};
	$P.getElapsed = function (date) {
		return (date || new Date()) - this;
	};
	if (!$P.toISOString) {
		$P.toISOString = function () {
			function f(n) {
				return n < 10 ? '0' + n : n;
			}
			return '"' + this.getUTCFullYear() + '-' +
				f(this.getUTCMonth() + 1) + '-' +
				f(this.getUTCDate()) + 'T' +
				f(this.getUTCHours()) + ':' +
				f(this.getUTCMinutes()) + ':' +
				f(this.getUTCSeconds()) + 'Z"';
		};
	}
	$P._toString = $P.toString;
	$P.toString = function (format) {
		var x = this;
		if (format && format.length == 1) {
			var c = $C.formatPatterns;
			x.t = x.toString;
			switch (format) {
			case "d":
				return x.t(c.shortDate);
			case "D":
				return x.t(c.longDate);
			case "F":
				return x.t(c.fullDateTime);
			case "m":
				return x.t(c.monthDay);
			case "r":
				return x.t(c.rfc1123);
			case "s":
				return x.t(c.sortableDateTime);
			case "t":
				return x.t(c.shortTime);
			case "T":
				return x.t(c.longTime);
			case "u":
				return x.t(c.universalSortableDateTime);
			case "y":
				return x.t(c.yearMonth);
			}
		}
		var ord = function (n) {
			switch (n * 1) {
			case 1:
			case 21:
			case 31:
				return "st";
			case 2:
			case 22:
				return "nd";
			case 3:
			case 23:
				return "rd";
			default:
				return "th";
			}
		};
		return format ? format.replace(/(\\)?(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|S)/g, function (m) {
			if (m.charAt(0) === "\\") {
				return m.replace("\\", "");
			}
			x.h = x.getHours;
			switch (m) {
			case "hh":
				return p(x.h() < 13 ? (x.h() === 0 ? 12 : x.h()) : (x.h() - 12));
			case "h":
				return x.h() < 13 ? (x.h() === 0 ? 12 : x.h()) : (x.h() - 12);
			case "HH":
				return p(x.h());
			case "H":
				return x.h();
			case "mm":
				return p(x.getMinutes());
			case "m":
				return x.getMinutes();
			case "ss":
				return p(x.getSeconds());
			case "s":
				return x.getSeconds();
			case "yyyy":
				return p(x.getFullYear(), 4);
			case "yy":
				return p(x.getFullYear());
			case "dddd":
				return $C.dayNames[x.getDay()];
			case "ddd":
				return $C.abbreviatedDayNames[x.getDay()];
			case "dd":
				return p(x.getDate());
			case "d":
				return x.getDate();
			case "MMMM":
				return $C.monthNames[x.getMonth()];
			case "MMM":
				return $C.abbreviatedMonthNames[x.getMonth()];
			case "MM":
				return p((x.getMonth() + 1));
			case "M":
				return x.getMonth() + 1;
			case "t":
				return x.h() < 12 ? $C.amDesignator.substring(0, 1) : $C.pmDesignator.substring(0, 1);
			case "tt":
				return x.h() < 12 ? $C.amDesignator : $C.pmDesignator;
			case "S":
				return ord(x.getDate());
			default:
				return m;
			}
		}) : this._toString();
	};
}());
(function () {
	var $D = Date,
		$P = $D.prototype,
		$C = $D.CultureInfo,
		$N = Number.prototype;
	$P._orient = +1;
	$P._nth = null;
	$P._is = false;
	$P._same = false;
	$P._isSecond = false;
	$N._dateElement = "days";
	$P.next = function () {
		this._orient = +1;
		return this;
	};
	$D.next = function () {
		return $D.today().next();
	};
	$P.last = $P.prev = $P.previous = function () {
		this._orient = -1;
		return this;
	};
	$D.last = $D.prev = $D.previous = function () {
		return $D.today().last();
	};
	$P.is = function () {
		this._is = true;
		return this;
	};
	$P.same = function () {
		this._same = true;
		this._isSecond = false;
		return this;
	};
	$P.today = function () {
		return this.same().day();
	};
	$P.weekday = function () {
		if (this._is) {
			this._is = false;
			return (!this.is().sat() && !this.is().sun());
		}
		return false;
	};
	$P.at = function (time) {
		return (typeof time === "string") ? $D.parse(this.toString("d") + " " + time) : this.set(time);
	};
	$N.fromNow = $N.after = function (date) {
		var c = {};
		c[this._dateElement] = this;
		return ((!date) ? new Date() : date.clone()).add(c);
	};
	$N.ago = $N.before = function (date) {
		var c = {};
		c[this._dateElement] = this * -1;
		return ((!date) ? new Date() : date.clone()).add(c);
	};
	var dx = ("sunday monday tuesday wednesday thursday friday saturday").split(/\s/),
		mx = ("january february march april may june july august september october november december").split(/\s/),
		px = ("Millisecond Second Minute Hour Day Week Month Year").split(/\s/),
		pxf = ("Milliseconds Seconds Minutes Hours Date Week Month FullYear").split(/\s/),
		nth = ("final first second third fourth fifth").split(/\s/),
		de;
	$P.toObject = function () {
		var o = {};
		for (var i = 0; i < px.length; i++) {
			o[px[i].toLowerCase()] = this["get" + pxf[i]]();
		}
		return o;
	};
	$D.fromObject = function (config) {
		config.week = null;
		return Date.today().set(config);
	};
	var df = function (n) {
		return function () {
			if (this._is) {
				this._is = false;
				return this.getDay() == n;
			}
			if (this._nth !== null) {
				if (this._isSecond) {
					this.addSeconds(this._orient * -1);
				}
				this._isSecond = false;
				var ntemp = this._nth;
				this._nth = null;
				var temp = this.clone().moveToLastDayOfMonth();
				this.moveToNthOccurrence(n, ntemp);
				if (this > temp) {
					throw new RangeError($D.getDayName(n) + " does not occur " + ntemp + " times in the month of " + $D.getMonthName(temp.getMonth()) + " " + temp.getFullYear() + ".");
				}
				return this;
			}
			return this.moveToDayOfWeek(n, this._orient);
		};
	};
	var sdf = function (n) {
		return function () {
			var t = $D.today(),
				shift = n - t.getDay();
			if (n === 0 && $C.firstDayOfWeek === 1 && t.getDay() !== 0) {
				shift = shift + 7;
			}
			return t.addDays(shift);
		};
	};
	for (var i = 0; i < dx.length; i++) {
		$D[dx[i].toUpperCase()] = $D[dx[i].toUpperCase().substring(0, 3)] = i;
		$D[dx[i]] = $D[dx[i].substring(0, 3)] = sdf(i);
		$P[dx[i]] = $P[dx[i].substring(0, 3)] = df(i);
	}
	var mf = function (n) {
		return function () {
			if (this._is) {
				this._is = false;
				return this.getMonth() === n;
			}
			return this.moveToMonth(n, this._orient);
		};
	};
	var smf = function (n) {
		return function () {
			return $D.today().set({
				month: n,
				day: 1
			});
		};
	};
	for (var j = 0; j < mx.length; j++) {
		$D[mx[j].toUpperCase()] = $D[mx[j].toUpperCase().substring(0, 3)] = j;
		$D[mx[j]] = $D[mx[j].substring(0, 3)] = smf(j);
		$P[mx[j]] = $P[mx[j].substring(0, 3)] = mf(j);
	}
	var ef = function (j) {
		return function () {
			if (this._isSecond) {
				this._isSecond = false;
				return this;
			}
			if (this._same) {
				this._same = this._is = false;
				var o1 = this.toObject(),
					o2 = (arguments[0] || new Date()).toObject(),
					v = "",
					k = j.toLowerCase();
				for (var m = (px.length - 1); m > -1; m--) {
					v = px[m].toLowerCase();
					if (o1[v] != o2[v]) {
						return false;
					}
					if (k == v) {
						break;
					}
				}
				return true;
			}
			if (j.substring(j.length - 1) != "s") {
				j += "s";
			}
			return this["add" + j](this._orient);
		};
	};
	var nf = function (n) {
		return function () {
			this._dateElement = n;
			return this;
		};
	};
	for (var k = 0; k < px.length; k++) {
		de = px[k].toLowerCase();
		$P[de] = $P[de + "s"] = ef(px[k]);
		$N[de] = $N[de + "s"] = nf(de);
	}
	$P._ss = ef("Second");
	var nthfn = function (n) {
		return function (dayOfWeek) {
			if (this._same) {
				return this._ss(arguments[0]);
			}
			if (dayOfWeek || dayOfWeek === 0) {
				return this.moveToNthOccurrence(dayOfWeek, n);
			}
			this._nth = n;
			if (n === 2 && (dayOfWeek === undefined || dayOfWeek === null)) {
				this._isSecond = true;
				return this.addSeconds(this._orient);
			}
			return this;
		};
	};
	for (var l = 0; l < nth.length; l++) {
		$P[nth[l]] = (l === 0) ? nthfn(-1) : nthfn(l);
	}
}());
(function () {
	Date.Parsing = {
		Exception: function (s) {
			this.message = "Parse error at '" + s.substring(0, 10) + " ...'";
		}
	};
	var $P = Date.Parsing;
	var _ = $P.Operators = {
		rtoken: function (r) {
			return function (s) {
				var mx = s.match(r);
				if (mx) {
					return ([mx[0], s.substring(mx[0].length)]);
				} else {
					throw new $P.Exception(s);
				}
			};
		},
		token: function (s) {
			return function (s) {
				return _.rtoken(new RegExp("^\s*" + s + "\s*"))(s);
			};
		},
		stoken: function (s) {
			return _.rtoken(new RegExp("^" + s));
		},
		until: function (p) {
			return function (s) {
				var qx = [],
					rx = null;
				while (s.length) {
					try {
						rx = p.call(this, s);
					} catch (e) {
						qx.push(rx[0]);
						s = rx[1];
						continue;
					}
					break;
				}
				return [qx, s];
			};
		},
		many: function (p) {
			return function (s) {
				var rx = [],
					r = null;
				while (s.length) {
					try {
						r = p.call(this, s);
					} catch (e) {
						return [rx, s];
					}
					rx.push(r[0]);
					s = r[1];
				}
				return [rx, s];
			};
		},
		optional: function (p) {
			return function (s) {
				var r = null;
				try {
					r = p.call(this, s);
				} catch (e) {
					return [null, s];
				}
				return [r[0], r[1]];
			};
		},
		not: function (p) {
			return function (s) {
				try {
					p.call(this, s);
				} catch (e) {
					return [null, s];
				}
				throw new $P.Exception(s);
			};
		},
		ignore: function (p) {
			return p ? function (s) {
				var r = null;
				r = p.call(this, s);
				return [null, r[1]];
			} : null;
		},
		product: function () {
			var px = arguments[0],
				qx = Array.prototype.slice.call(arguments, 1),
				rx = [];
			for (var i = 0; i < px.length; i++) {
				rx.push(_.each(px[i], qx));
			}
			return rx;
		},
		cache: function (rule) {
			var cache = {}, r = null;
			return function (s) {
				try {
					r = cache[s] = (cache[s] || rule.call(this, s));
				} catch (e) {
					r = cache[s] = e;
				}
				if (r instanceof $P.Exception) {
					throw r;
				} else {
					return r;
				}
			};
		},
		any: function () {
			var px = arguments;
			return function (s) {
				var r = null;
				for (var i = 0; i < px.length; i++) {
					if (px[i] == null) {
						continue;
					}
					try {
						r = (px[i].call(this, s));
					} catch (e) {
						r = null;
					}
					if (r) {
						return r;
					}
				}
				throw new $P.Exception(s);
			};
		},
		each: function () {
			var px = arguments;
			return function (s) {
				var rx = [],
					r = null;
				for (var i = 0; i < px.length; i++) {
					if (px[i] == null) {
						continue;
					}
					try {
						r = (px[i].call(this, s));
					} catch (e) {
						throw new $P.Exception(s);
					}
					rx.push(r[0]);
					s = r[1];
				}
				return [rx, s];
			};
		},
		all: function () {
			var px = arguments,
				_ = _;
			return _.each(_.optional(px));
		},
		sequence: function (px, d, c) {
			d = d || _.rtoken(/^\s*/);
			c = c || null;
			if (px.length == 1) {
				return px[0];
			}
			return function (s) {
				var r = null,
					q = null;
				var rx = [];
				for (var i = 0; i < px.length; i++) {
					try {
						r = px[i].call(this, s);
					} catch (e) {
						break;
					}
					rx.push(r[0]);
					try {
						q = d.call(this, r[1]);
					} catch (ex) {
						q = null;
						break;
					}
					s = q[1];
				}
				if (!r) {
					throw new $P.Exception(s);
				}
				if (q) {
					throw new $P.Exception(q[1]);
				}
				if (c) {
					try {
						r = c.call(this, r[1]);
					} catch (ey) {
						throw new $P.Exception(r[1]);
					}
				}
				return [rx, (r ? r[1] : s)];
			};
		},
		between: function (d1, p, d2) {
			d2 = d2 || d1;
			var _fn = _.each(_.ignore(d1), p, _.ignore(d2));
			return function (s) {
				var rx = _fn.call(this, s);
				return [[rx[0][0], r[0][2]], rx[1]];
			};
		},
		list: function (p, d, c) {
			d = d || _.rtoken(/^\s*/);
			c = c || null;
			return (p instanceof Array ? _.each(_.product(p.slice(0, -1), _.ignore(d)), p.slice(-1), _.ignore(c)) : _.each(_.many(_.each(p, _.ignore(d))), px, _.ignore(c)));
		},
		set: function (px, d, c) {
			d = d || _.rtoken(/^\s*/);
			c = c || null;
			return function (s) {
				var r = null,
					p = null,
					q = null,
					rx = null,
					best = [
						[], s
					],
					last = false;
				for (var i = 0; i < px.length; i++) {
					q = null;
					p = null;
					r = null;
					last = (px.length == 1);
					try {
						r = px[i].call(this, s);
					} catch (e) {
						continue;
					}
					rx = [
						[r[0]], r[1]
					];
					if (r[1].length > 0 && !last) {
						try {
							q = d.call(this, r[1]);
						} catch (ex) {
							last = true;
						}
					} else {
						last = true;
					}
					if (!last && q[1].length === 0) {
						last = true;
					}
					if (!last) {
						var qx = [];
						for (var j = 0; j < px.length; j++) {
							if (i != j) {
								qx.push(px[j]);
							}
						}
						p = _.set(qx, d).call(this, q[1]);
						if (p[0].length > 0) {
							rx[0] = rx[0].concat(p[0]);
							rx[1] = p[1];
						}
					}
					if (rx[1].length < best[1].length) {
						best = rx;
					}
					if (best[1].length === 0) {
						break;
					}
				}
				if (best[0].length === 0) {
					return best;
				}
				if (c) {
					try {
						q = c.call(this, best[1]);
					} catch (ey) {
						throw new $P.Exception(best[1]);
					}
					best[1] = q[1];
				}
				return best;
			};
		},
		forward: function (gr, fname) {
			return function (s) {
				return gr[fname].call(this, s);
			};
		},
		replace: function (rule, repl) {
			return function (s) {
				var r = rule.call(this, s);
				return [repl, r[1]];
			};
		},
		process: function (rule, fn) {
			return function (s) {
				var r = rule.call(this, s);
				return [fn.call(this, r[0]), r[1]];
			};
		},
		min: function (min, rule) {
			return function (s) {
				var rx = rule.call(this, s);
				if (rx[0].length < min) {
					throw new $P.Exception(s);
				}
				return rx;
			};
		}
	};
	var _generator = function (op) {
		return function () {
			var args = null,
				rx = [];
			if (arguments.length > 1) {
				args = Array.prototype.slice.call(arguments);
			} else if (arguments[0] instanceof Array) {
				args = arguments[0];
			}
			if (args) {
				for (var i = 0, px = args.shift(); i < px.length; i++) {
					args.unshift(px[i]);
					rx.push(op.apply(null, args));
					args.shift();
					return rx;
				}
			} else {
				return op.apply(null, arguments);
			}
		};
	};
	var gx = "optional not ignore cache".split(/\s/);
	for (var i = 0; i < gx.length; i++) {
		_[gx[i]] = _generator(_[gx[i]]);
	}
	var _vector = function (op) {
		return function () {
			if (arguments[0] instanceof Array) {
				return op.apply(null, arguments[0]);
			} else {
				return op.apply(null, arguments);
			}
		};
	};
	var vx = "each any all".split(/\s/);
	for (var j = 0; j < vx.length; j++) {
		_[vx[j]] = _vector(_[vx[j]]);
	}
}());
(function () {
	var $D = Date,
		$P = $D.prototype,
		$C = $D.CultureInfo;
	var flattenAndCompact = function (ax) {
		var rx = [];
		for (var i = 0; i < ax.length; i++) {
			if (ax[i] instanceof Array) {
				rx = rx.concat(flattenAndCompact(ax[i]));
			} else {
				if (ax[i]) {
					rx.push(ax[i]);
				}
			}
		}
		return rx;
	};
	$D.Grammar = {};
	$D.Translator = {
		hour: function (s) {
			return function () {
				this.hour = Number(s);
			};
		},
		minute: function (s) {
			return function () {
				this.minute = Number(s);
			};
		},
		second: function (s) {
			return function () {
				this.second = Number(s);
			};
		},
		meridian: function (s) {
			return function () {
				this.meridian = s.slice(0, 1).toLowerCase();
			};
		},
		timezone: function (s) {
			return function () {
				var n = s.replace(/[^\d\+\-]/g, "");
				if (n.length) {
					this.timezoneOffset = Number(n);
				} else {
					this.timezone = s.toLowerCase();
				}
			};
		},
		day: function (x) {
			var s = x[0];
			return function () {
				this.day = Number(s.match(/\d+/)[0]);
			};
		},
		month: function (s) {
			return function () {
				this.month = (s.length == 3) ? "jan feb mar apr may jun jul aug sep oct nov dec".indexOf(s) / 4 : Number(s) - 1;
			};
		},
		year: function (s) {
			return function () {
				var n = Number(s);
				this.year = ((s.length > 2) ? n : (n + (((n + 2000) < $C.twoDigitYearMax) ? 2000 : 1900)));
			};
		},
		rday: function (s) {
			return function () {
				switch (s) {
				case "yesterday":
					this.days = -1;
					break;
				case "tomorrow":
					this.days = 1;
					break;
				case "today":
					this.days = 0;
					break;
				case "now":
					this.days = 0;
					this.now = true;
					break;
				}
			};
		},
		finishExact: function (x) {
			x = (x instanceof Array) ? x : [x];
			for (var i = 0; i < x.length; i++) {
				if (x[i]) {
					x[i].call(this);
				}
			}
			var now = new Date();
			if ((this.hour || this.minute) && (!this.month && !this.year && !this.day)) {
				this.day = now.getDate();
			}
			if (!this.year) {
				this.year = now.getFullYear();
			}
			if (!this.month && this.month !== 0) {
				this.month = now.getMonth();
			}
			if (!this.day) {
				this.day = 1;
			}
			if (!this.hour) {
				this.hour = 0;
			}
			if (!this.minute) {
				this.minute = 0;
			}
			if (!this.second) {
				this.second = 0;
			}
			if (this.meridian && this.hour) {
				if (this.meridian == "p" && this.hour < 12) {
					this.hour = this.hour + 12;
				} else if (this.meridian == "a" && this.hour == 12) {
					this.hour = 0;
				}
			}
			if (this.day > $D.getDaysInMonth(this.year, this.month)) {
				throw new RangeError(this.day + " is not a valid value for days.");
			}
			var r = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second);
			if (this.timezone) {
				r.set({
					timezone: this.timezone
				});
			} else if (this.timezoneOffset) {
				r.set({
					timezoneOffset: this.timezoneOffset
				});
			}
			return r;
		},
		finish: function (x) {
			x = (x instanceof Array) ? flattenAndCompact(x) : [x];
			if (x.length === 0) {
				return null;
			}
			for (var i = 0; i < x.length; i++) {
				if (typeof x[i] == "function") {
					x[i].call(this);
				}
			}
			var today = $D.today();
			if (this.now && !this.unit && !this.operator) {
				return new Date();
			} else if (this.now) {
				today = new Date();
			}
			var expression = !! (this.days && this.days !== null || this.orient || this.operator);
			var gap, mod, orient;
			orient = ((this.orient == "past" || this.operator == "subtract") ? -1 : 1);
			if (!this.now && "hour minute second".indexOf(this.unit) != -1) {
				today.setTimeToNow();
			}
			if (this.month || this.month === 0) {
				if ("year day hour minute second".indexOf(this.unit) != -1) {
					this.value = this.month + 1;
					this.month = null;
					expression = true;
				}
			}
			if (!expression && this.weekday && !this.day && !this.days) {
				var temp = Date[this.weekday]();
				this.day = temp.getDate();
				if (!this.month) {
					this.month = temp.getMonth();
				}
				this.year = temp.getFullYear();
			}
			if (expression && this.weekday && this.unit != "month") {
				this.unit = "day";
				gap = ($D.getDayNumberFromName(this.weekday) - today.getDay());
				mod = 7;
				this.days = gap ? ((gap + (orient * mod)) % mod) : (orient * mod);
			}
			if (this.month && this.unit == "day" && this.operator) {
				this.value = (this.month + 1);
				this.month = null;
			}
			if (this.value != null && this.month != null && this.year != null) {
				this.day = this.value * 1;
			}
			if (this.month && !this.day && this.value) {
				today.set({
					day: this.value * 1
				});
				if (!expression) {
					this.day = this.value * 1;
				}
			}
			if (!this.month && this.value && this.unit == "month" && !this.now) {
				this.month = this.value;
				expression = true;
			}
			if (expression && (this.month || this.month === 0) && this.unit != "year") {
				this.unit = "month";
				gap = (this.month - today.getMonth());
				mod = 12;
				this.months = gap ? ((gap + (orient * mod)) % mod) : (orient * mod);
				this.month = null;
			}
			if (!this.unit) {
				this.unit = "day";
			}
			if (!this.value && this.operator && this.operator !== null && this[this.unit + "s"] && this[this.unit + "s"] !== null) {
				this[this.unit + "s"] = this[this.unit + "s"] + ((this.operator == "add") ? 1 : -1) + (this.value || 0) * orient;
			} else if (this[this.unit + "s"] == null || this.operator != null) {
				if (!this.value) {
					this.value = 1;
				}
				this[this.unit + "s"] = this.value * orient;
			}
			if (this.meridian && this.hour) {
				if (this.meridian == "p" && this.hour < 12) {
					this.hour = this.hour + 12;
				} else if (this.meridian == "a" && this.hour == 12) {
					this.hour = 0;
				}
			}
			if (this.weekday && !this.day && !this.days) {
				var temp = Date[this.weekday]();
				this.day = temp.getDate();
				if (temp.getMonth() !== today.getMonth()) {
					this.month = temp.getMonth();
				}
			}
			if ((this.month || this.month === 0) && !this.day) {
				this.day = 1;
			}
			if (!this.orient && !this.operator && this.unit == "week" && this.value && !this.day && !this.month) {
				return Date.today().setWeek(this.value);
			}
			if (expression && this.timezone && this.day && this.days) {
				this.day = this.days;
			}
			return (expression) ? today.add(this) : today.set(this);
		}
	};
	var _ = $D.Parsing.Operators,
		g = $D.Grammar,
		t = $D.Translator,
		_fn;
	g.datePartDelimiter = _.rtoken(/^([\s\-\.\,\/\x27]+)/);
	g.timePartDelimiter = _.stoken(":");
	g.whiteSpace = _.rtoken(/^\s*/);
	g.generalDelimiter = _.rtoken(/^(([\s\,]|at|@|on)+)/);
	var _C = {};
	g.ctoken = function (keys) {
		var fn = _C[keys];
		if (!fn) {
			var c = $C.regexPatterns;
			var kx = keys.split(/\s+/),
				px = [];
			for (var i = 0; i < kx.length; i++) {
				px.push(_.replace(_.rtoken(c[kx[i]]), kx[i]));
			}
			fn = _C[keys] = _.any.apply(null, px);
		}
		return fn;
	};
	g.ctoken2 = function (key) {
		return _.rtoken($C.regexPatterns[key]);
	};
	g.h = _.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2]|[1-9])/), t.hour));
	g.hh = _.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2])/), t.hour));
	g.H = _.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/), t.hour));
	g.HH = _.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3])/), t.hour));
	g.m = _.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/), t.minute));
	g.mm = _.cache(_.process(_.rtoken(/^[0-5][0-9]/), t.minute));
	g.s = _.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/), t.second));
	g.ss = _.cache(_.process(_.rtoken(/^[0-5][0-9]/), t.second));
	g.hms = _.cache(_.sequence([g.H, g.m, g.s], g.timePartDelimiter));
	g.t = _.cache(_.process(g.ctoken2("shortMeridian"), t.meridian));
	g.tt = _.cache(_.process(g.ctoken2("longMeridian"), t.meridian));
	g.z = _.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/), t.timezone));
	g.zz = _.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/), t.timezone));
	g.zzz = _.cache(_.process(g.ctoken2("timezone"), t.timezone));
	g.timeSuffix = _.each(_.ignore(g.whiteSpace), _.set([g.tt, g.zzz]));
	g.time = _.each(_.optional(_.ignore(_.stoken("T"))), g.hms, g.timeSuffix);
	g.d = _.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1]|\d)/), _.optional(g.ctoken2("ordinalSuffix"))), t.day));
	g.dd = _.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1])/), _.optional(g.ctoken2("ordinalSuffix"))), t.day));
	g.ddd = g.dddd = _.cache(_.process(g.ctoken("sun mon tue wed thu fri sat"), function (s) {
		return function () {
			this.weekday = s;
		};
	}));
	g.M = _.cache(_.process(_.rtoken(/^(1[0-2]|0\d|\d)/), t.month));
	g.MM = _.cache(_.process(_.rtoken(/^(1[0-2]|0\d)/), t.month));
	g.MMM = g.MMMM = _.cache(_.process(g.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"), t.month));
	g.y = _.cache(_.process(_.rtoken(/^(\d\d?)/), t.year));
	g.yy = _.cache(_.process(_.rtoken(/^(\d\d)/), t.year));
	g.yyy = _.cache(_.process(_.rtoken(/^(\d\d?\d?\d?)/), t.year));
	g.yyyy = _.cache(_.process(_.rtoken(/^(\d\d\d\d)/), t.year));
	_fn = function () {
		return _.each(_.any.apply(null, arguments), _.not(g.ctoken2("timeContext")));
	};
	g.day = _fn(g.d, g.dd);
	g.month = _fn(g.M, g.MMM);
	g.year = _fn(g.yyyy, g.yy);
	g.orientation = _.process(g.ctoken("past future"), function (s) {
		return function () {
			this.orient = s;
		};
	});
	g.operator = _.process(g.ctoken("add subtract"), function (s) {
		return function () {
			this.operator = s;
		};
	});
	g.rday = _.process(g.ctoken("yesterday tomorrow today now"), t.rday);
	g.unit = _.process(g.ctoken("second minute hour day week month year"), function (s) {
		return function () {
			this.unit = s;
		};
	});
	g.value = _.process(_.rtoken(/^\d\d?(st|nd|rd|th)?/), function (s) {
		return function () {
			this.value = s.replace(/\D/g, "");
		};
	});
	g.expression = _.set([g.rday, g.operator, g.value, g.unit, g.orientation, g.ddd, g.MMM]);
	_fn = function () {
		return _.set(arguments, g.datePartDelimiter);
	};
	g.mdy = _fn(g.ddd, g.month, g.day, g.year);
	g.ymd = _fn(g.ddd, g.year, g.month, g.day);
	g.dmy = _fn(g.ddd, g.day, g.month, g.year);
	g.date = function (s) {
		return ((g[$C.dateElementOrder] || g.mdy).call(this, s));
	};
	g.format = _.process(_.many(_.any(_.process(_.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/), function (fmt) {
		if (g[fmt]) {
			return g[fmt];
		} else {
			throw $D.Parsing.Exception(fmt);
		}
	}), _.process(_.rtoken(/^[^dMyhHmstz]+/), function (s) {
		return _.ignore(_.stoken(s));
	}))), function (rules) {
		return _.process(_.each.apply(null, rules), t.finishExact);
	});
	var _F = {};
	var _get = function (f) {
		return _F[f] = (_F[f] || g.format(f)[0]);
	};
	g.formats = function (fx) {
		if (fx instanceof Array) {
			var rx = [];
			for (var i = 0; i < fx.length; i++) {
				rx.push(_get(fx[i]));
			}
			return _.any.apply(null, rx);
		} else {
			return _get(fx);
		}
	};
	g._formats = g.formats(["\"yyyy-MM-ddTHH:mm:ssZ\"", "yyyy-MM-ddTHH:mm:ssZ", "yyyy-MM-ddTHH:mm:ssz", "yyyy-MM-ddTHH:mm:ss", "yyyy-MM-ddTHH:mmZ", "yyyy-MM-ddTHH:mmz", "yyyy-MM-ddTHH:mm", "ddd, MMM dd, yyyy H:mm:ss tt", "ddd MMM d yyyy HH:mm:ss zzz", "MMddyyyy", "ddMMyyyy", "Mddyyyy", "ddMyyyy", "Mdyyyy", "dMyyyy", "yyyy", "Mdyy", "dMyy", "d"]);
	g._start = _.process(_.set([g.date, g.time, g.expression], g.generalDelimiter, g.whiteSpace), t.finish);
	g.start = function (s) {
		try {
			var r = g._formats.call({}, s);
			if (r[1].length === 0) {
				return r;
			}
		} catch (e) {}
		return g._start.call({}, s);
	};
	$D._parse = $D.parse;
	$D.parse = function (s) {
		if (!s) {
			return null;
		}
		if (s instanceof Date) {
			return s;
		}
		var date = new Date(Date._parse(s));
		if (!isNan(tmp.getTime()) { // if NaN then is an Invalid Date (yes, invalid dates are still date objects. Go figure.)
			return date;
		} else {
			try {
				r = $D.Grammar.start.call({}, s.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"));
			} catch (e) {
				return null;
			}
			return ((r[1].length === 0) ? r[0] : null);
		}
	};
	$D.getParseFunction = function (fx) {
		var fn = $D.Grammar.formats(fx);
		return function (s) {
			var r = null;
			try {
				r = fn.call({}, s);
			} catch (e) {
				return null;
			}
			return ((r[1].length === 0) ? r[0] : null);
		};
	};
	$D.parseExact = function (s, fx) {
		return $D.getParseFunction(fx)(s);
	};
}());
/**
 * Date JS Extras
 * @version: 1.0 Alpha-1
 * @author: Coolite Inc. http://www.coolite.com/
 * @date: 2008-04-13
 * @copyright: Copyright (c) 2006-2008, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * @license: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/.
 * @website: http://www.datejs.com/
 */

(function () {
	var $D = Date,
		$P = $D.prototype,
		$C = $D.CultureInfo,
		$f = [],
		p = function (s, l) {
			if (!l) {
				l = 2;
			}
			return ("000" + s).slice(l * -1);
		};

	/**
     * Converts a PHP format string to Java/.NET format string. 
     * A PHP format string can be used with .$format or .format.
     * A Java/.NET format string can be used with .toString().
     * The .parseExact function will only accept a Java/.NET format string
     *
     * Example
     <pre>
     var f1 = "%m/%d/%y"
     var f2 = Date.normalizeFormat(f1); // "MM/dd/yy"
     
     new Date().format(f1);    // "04/13/08"
     new Date().$format(f1);   // "04/13/08"
     new Date().toString(f2);  // "04/13/08"
     
     var date = Date.parseExact("04/13/08", f2); // Sun Apr 13 2008
     </pre>
     * @param {String}   A PHP format string consisting of one or more format spcifiers.
     * @return {String}  The PHP format converted to a Java/.NET format string.
     */
	$D.normalizeFormat = function (format) {
		$f = [];
		var t = new Date().$format(format);
		return $f.join("");
	};

	/**
     * Format a local Unix timestamp according to locale settings
     * 
     * Example
     <pre>
     Date.strftime("%m/%d/%y", new Date());       // "04/13/08"
     Date.strftime("c", "2008-04-13T17:52:03Z");  // "04/13/08"
     </pre>
     * @param {String}   A format string consisting of one or more format spcifiers [Optional].
     * @param {Number}   The number representing the number of seconds that have elapsed since January 1, 1970 (local time). 
     * @return {String}  A string representation of the current Date object.
     */
	$D.strftime = function (format, time) {
		return new Date(time * 1000).$format(format);
	};

	/**
     * Parse any textual datetime description into a Unix timestamp. 
     * A Unix timestamp is the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT).
     * 
     * Example
     <pre>
     Date.strtotime("04/13/08");              // 1208044800
     Date.strtotime("1970-01-01T00:00:00Z");  // 0
     </pre>
     * @param {String}   A format string consisting of one or more format spcifiers [Optional].
     * @param {Object}   A string or date object.
     * @return {String}  A string representation of the current Date object.
     */
	$D.strtotime = function (time) {
		var d = $D.parse(time);
		d.addMinutes(d.getTimezoneOffset() * -1);
		return Math.round($D.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds()) / 1000);
	};

	/**
     * Converts the value of the current Date object to its equivalent string representation using a PHP/Unix style of date format specifiers.
     *
     * The following descriptions are from http://www.php.net/strftime and http://www.php.net/manual/en/function.date.php. 
     * Copyright © 2001-2008 The PHP Group
     * 
     * Format Specifiers
     <pre>
    Format  Description                                                                  Example
    ------  ---------------------------------------------------------------------------  -----------------------
     %a     abbreviated weekday name according to the current localed                    "Mon" through "Sun"
     %A     full weekday name according to the current locale                            "Sunday" through "Saturday"
     %b     abbreviated month name according to the current locale                       "Jan" through "Dec"
     %B     full month name according to the current locale                              "January" through "December"
     %c     preferred date and time representation for the current locale                "4/13/2008 12:33 PM"
     %C     century number (the year divided by 100 and truncated to an integer)         "00" to "99"
     %d     day of the month as a decimal number                                         "01" to "31"
     %D     same as %m/%d/%y                                                             "04/13/08"
     %e     day of the month as a decimal number, a single digit is preceded by a space  "1" to "31"
     %g     like %G, but without the century                                             "08"
     %G     The 4-digit year corresponding to the ISO week number (see %V).              "2008"
            This has the same format and value as %Y, except that if the ISO week number 
            belongs to the previous or next year, that year is used instead.
     %h     same as %b                                                                   "Jan" through "Dec"
     %H     hour as a decimal number using a 24-hour clock                               "00" to "23"
     %I     hour as a decimal number using a 12-hour clock                               "01" to "12"
     %j     day of the year as a decimal number                                          "001" to "366"
     %m     month as a decimal number                                                    "01" to "12"
     %M     minute as a decimal number                                                   "00" to "59"
     %n     newline character                                                            "\n"
     %p     either "am" or "pm" according to the given time value, or the                "am" or "pm"
            corresponding strings for the current locale
     %r     time in a.m. and p.m. notation                                               "8:44 PM"
     %R     time in 24 hour notation                                                     "20:44"
     %S     second as a decimal number                                                   "00" to "59"
     %t     tab character                                                                "\t"
     %T     current time, equal to %H:%M:%S                                              "12:49:11"
     %u     weekday as a decimal number ["1", "7"], with "1" representing Monday         "1" to "7"
     %U     week number of the current year as a decimal number, starting with the       "0" to ("52" or "53")
            first Sunday as the first day of the first week
     %V     The ISO 8601:1988 week number of the current year as a decimal number,       "00" to ("52" or "53")
            range 01 to 53, where week 1 is the first week that has at least 4 days 
            in the current year, and with Monday as the first day of the week. 
            (Use %G or %g for the year component that corresponds to the week number 
            for the specified timestamp.)
     %W     week number of the current year as a decimal number, starting with the       "00" to ("52" or "53")
            first Monday as the first day of the first week
     %w     day of the week as a decimal, Sunday being "0"                               "0" to "6"
     %x     preferred date representation for the current locale without the time        "4/13/2008"
     %X     preferred time representation for the current locale without the date        "12:53:05"
     %y     year as a decimal number without a century                                   "00" "99"
     %Y     year as a decimal number including the century                               "2008"
     %Z     time zone or name or abbreviation                                            "UTC", "EST", "PST"
     %z     same as %Z 
     %%     a literal "%" character                                                      "%"
      
     d      Day of the month, 2 digits with leading zeros                                "01" to "31"
     D      A textual representation of a day, three letters                             "Mon" through "Sun"
     j      Day of the month without leading zeros                                       "1" to "31"
     l      A full textual representation of the day of the week (lowercase "L")         "Sunday" through "Saturday"
     N      ISO-8601 numeric representation of the day of the week (added in PHP 5.1.0)  "1" (for Monday) through "7" (for Sunday)
     S      English ordinal suffix for the day of the month, 2 characters                "st", "nd", "rd" or "th". Works well with j
     w      Numeric representation of the day of the week                                "0" (for Sunday) through "6" (for Saturday)
     z      The day of the year (starting from "0")                                      "0" through "365"      
     W      ISO-8601 week number of year, weeks starting on Monday                       "00" to ("52" or "53")
     F      A full textual representation of a month, such as January or March           "January" through "December"
     m      Numeric representation of a month, with leading zeros                        "01" through "12"
     M      A short textual representation of a month, three letters                     "Jan" through "Dec"
     n      Numeric representation of a month, without leading zeros                     "1" through "12"
     t      Number of days in the given month                                            "28" through "31"
     L      Whether it's a leap year                                                     "1" if it is a leap year, "0" otherwise
     o      ISO-8601 year number. This has the same value as Y, except that if the       "2008"
            ISO week number (W) belongs to the previous or next year, that year 
            is used instead.
     Y      A full numeric representation of a year, 4 digits                            "2008"
     y      A two digit representation of a year                                         "08"
     a      Lowercase Ante meridiem and Post meridiem                                    "am" or "pm"
     A      Uppercase Ante meridiem and Post meridiem                                    "AM" or "PM"
     B      Swatch Internet time                                                         "000" through "999"
     g      12-hour format of an hour without leading zeros                              "1" through "12"
     G      24-hour format of an hour without leading zeros                              "0" through "23"
     h      12-hour format of an hour with leading zeros                                 "01" through "12"
     H      24-hour format of an hour with leading zeros                                 "00" through "23"
     i      Minutes with leading zeros                                                   "00" to "59"
     s      Seconds, with leading zeros                                                  "00" through "59"
     u      Milliseconds                                                                 "54321"
     e      Timezone identifier                                                          "UTC", "EST", "PST"
     I      Whether or not the date is in daylight saving time (uppercase i)             "1" if Daylight Saving Time, "0" otherwise
     O      Difference to Greenwich time (GMT) in hours                                  "+0200", "-0600"
     P      Difference to Greenwich time (GMT) with colon between hours and minutes      "+02:00", "-06:00"
     T      Timezone abbreviation                                                        "UTC", "EST", "PST"
     Z      Timezone offset in seconds. The offset for timezones west of UTC is          "-43200" through "50400"
            always negative, and for those east of UTC is always positive.
     c      ISO 8601 date                                                                "2004-02-12T15:19:21+00:00"
     r      RFC 2822 formatted date                                                      "Thu, 21 Dec 2000 16:01:07 +0200"
     U      Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)                   "0"     
     </pre>
     * @param {String}   A format string consisting of one or more format spcifiers [Optional].
     * @return {String}  A string representation of the current Date object.
     */
	$P.$format = function (format) {
		var x = this,
			y,
			t = function (v) {
				$f.push(v);
				return x.toString(v);
			};

		return format ? format.replace(/(%|\\)?.|%%/g,
			function (m) {
				if (m.charAt(0) === "\\" || m.substring(0, 2) === "%%") {
					return m.replace("\\", "").replace("%%", "%");
				}
				switch (m) {
				case "d":
				case "%d":
					return t("dd");
				case "D":
				case "%a":
					return t("ddd");
				case "j":
				case "%e":
					return t("d");
				case "l":
				case "%A":
					return t("dddd");
				case "N":
				case "%u":
					return x.getDay() + 1;
				case "S":
					return t("S");
				case "w":
				case "%w":
					return x.getDay();
				case "z":
					return x.getOrdinalNumber();
				case "%j":
					return p(x.getOrdinalNumber(), 3);
				case "%U":
					var d1 = x.clone().set({
						month: 0,
						day: 1
					}).addDays(-1).moveToDayOfWeek(0),
						d2 = x.clone().addDays(1).moveToDayOfWeek(0, -1);
					return (d2 < d1) ? "00" : p((d2.getOrdinalNumber() - d1.getOrdinalNumber()) / 7 + 1);
				case "W":
				case "%V":
					return x.getISOWeek();
				case "%W":
					return p(x.getWeek());
				case "F":
				case "%B":
					return t("MMMM");
				case "m":
				case "%m":
					return t("MM");
				case "M":
				case "%b":
				case "%h":
					return t("MMM");
				case "n":
					return t("M");
				case "t":
					return $D.getDaysInMonth(x.getFullYear(), x.getMonth());
				case "L":
					return ($D.isLeapYear(x.getFullYear())) ? 1 : 0;
				case "o":
				case "%G":
					return x.setWeek(x.getISOWeek()).toString("yyyy");
				case "%g":
					return x.$format("%G").slice(-2);
				case "Y":
				case "%Y":
					return t("yyyy");
				case "y":
				case "%y":
					return t("yy");
				case "a":
				case "%p":
					return t("tt").toLowerCase();
				case "A":
					return t("tt").toUpperCase();
				case "g":
				case "%I":
					return t("h");
				case "G":
					return t("H");
				case "h":
					return t("hh");
				case "H":
				case "%H":
					return t("HH");
				case "i":
				case "%M":
					return t("mm");
				case "s":
				case "%S":
					return t("ss");
				case "u":
					return p(x.getMilliseconds(), 3);
				case "I":
					return (x.isDaylightSavingTime()) ? 1 : 0;
				case "O":
					return x.getUTCOffset();
				case "P":
					y = x.getUTCOffset();
					return y.substring(0, y.length - 2) + ":" + y.substring(y.length - 2);
				case "e":
				case "T":
				case "%z":
				case "%Z":
					return x.getTimezone();
				case "Z":
					return x.getTimezoneOffset() * -60;
				case "B":
					var now = new Date();
					return Math.floor(((now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds() + (now.getTimezoneOffset() + 60) * 60) / 86.4);
				case "c":
					return x.toISOString().replace(/\"/g, "");
				case "U":
					return $D.strtotime("now");
				case "%c":
					return t("d") + " " + t("t");
				case "%C":
					return Math.floor(x.getFullYear() / 100 + 1);
				case "%D":
					return t("MM/dd/yy");
				case "%n":
					return "\\n";
				case "%t":
					return "\\t";
				case "%r":
					return t("hh:mm tt");
				case "%R":
					return t("H:mm");
				case "%T":
					return t("H:mm:ss");
				case "%x":
					return t("d");
				case "%X":
					return t("t");
				default:
					$f.push(m);﻿﻿﻿
					return m;
				}
			}
		) : this._toString();
	};

	if (!$P.format) {
		$P.format = $P.$format;
	}
}());