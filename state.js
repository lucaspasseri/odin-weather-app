let isLoading = false;
let unitGroup = "metric";
let location = "";
let weatherData;

export function setLoading(value) {
	isLoading = value;
}

export function getLoading() {
	return isLoading;
}

export function getUnitGroup() {
	return unitGroup;
}

export function toggleUnitGroup() {
	if (unitGroup === "metric") {
		unitGroup = "us";
	} else {
		unitGroup = "metric";
	}
}

export function getLocation() {
	return location;
}

export function setLocation(value) {
	location = value;
}

export function getWeatherData() {
	if (weatherData === undefined) return weatherData;

	return { ...weatherData };
}

export function setWeatherData(data) {
	weatherData = { ...data };
}
