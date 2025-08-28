import createContentOnLoading from "./createContentOnLoading.js";
import { getUnitGroup } from "./state.js";

export default function createContentOnSuccess(data, backgroundImageSrc) {
	if (backgroundImageSrc === undefined) {
		createContentOnLoading();
		return;
	}

	const container = document.querySelector("#contentContainer");
	container.className = "contentContainer";
	container.innerHTML = "";

	container.style.backgroundImage = `url(${backgroundImageSrc})`;
	const h1 = document.createElement("h1");
	const h4 = document.createElement("h4");
	const currentTimeH5 = document.createElement("h5");
	const dataTimeH5 = document.createElement("h5");
	const timeZoneH5 = document.createElement("h5");

	const cloudCoverP = document.createElement("p");
	const conditionsP = document.createElement("p");
	const feelsLikeMeanP = document.createElement("p");
	const humidityP = document.createElement("p");
	const iconP = document.createElement("p");
	const moonPhaseP = document.createElement("p");
	const precipitationP = document.createElement("p");
	const pressureP = document.createElement("p");
	const sourceP = document.createElement("p");
	const tempP = document.createElement("p");
	const uvIndexP = document.createElement("p");
	const visibilityP = document.createElement("p");
	const windSpeedP = document.createElement("p");

	h1.textContent = data.resolvedAddress;
	h4.textContent = data.description;

	const forecastDate = new Date(data.datetimeEpoch * 1000);
	const currentDate = new Date().toLocaleString("en-US", {
		timeZone: data.timezone,
	});

	currentTimeH5.textContent = "Current Local Date: " + currentDate;

	dataTimeH5.textContent =
		"Forecast Date: " +
		forecastDate.toLocaleString("en-US", {
			timeZone: data.timezone,
		});

	timeZoneH5.textContent = "Timezone: " + data.timezone;
	conditionsP.textContent = "Condition: " + data.conditions;
	iconP.textContent = "icon: " + data.icon;
	cloudCoverP.textContent = `Cloud cover: ${data.cloudCover}%`;
	tempP.textContent = `Temperatura (mean): ${data.temp}${
		getUnitGroup() === "metric" ? "°C" : "°F"
	}`;
	feelsLikeMeanP.textContent = `Feels like(mean): ${data.feelsLikeMean}${
		getUnitGroup() === "metric" ? "°C" : "°F"
	}`;
	humidityP.textContent = `Humidity: ${data.humidity}%`;

	precipitationP.textContent = `Precipitation: ${data.precipitation}${
		getUnitGroup() === "metric" ? "(mm)" : "Inches"
	}`;
	pressureP.textContent = `Pressure: ${data.pressure}(mb)`;
	uvIndexP.textContent = "UV index: " + data.uvIndex;
	visibilityP.textContent = `Visibility: ${data.visibility}${
		getUnitGroup() === "metric" ? "km" : "Miles"
	}`;
	windSpeedP.textContent = `Windspeed: ${data.windSpeed}${
		getUnitGroup() === "metric" ? "km/h" : "mph"
	}`;

	function mappingMoonPhase(value) {
		if (value === 0 || value === 1) return "🌑 New Moon";
		if (value < 0.25) {
			return "🌒 Waxing Crescent";
		}
		if (value === 0.25) {
			return "🌓 First Quarter";
		}
		if (value < 0.5) {
			return "🌔 Waxing Gibbous";
		}
		if (value === 0.5) {
			return "🌕 Full Moon";
		}
		if (value < 0.75) {
			return "🌖 Waning Gibbous";
		}
		if (value === 0.75) {
			return "🌗 Last Quarter";
		}
		if (value < 1) {
			return "🌘 Waning Crescent";
		}
	}

	moonPhaseP.textContent = "Moon phase: " + mappingMoonPhase(data.moonPhase);

	function mapSource(value) {
		switch (value) {
			case "obs":
				return "Observed at a local weather station";
			case "fcst":
				return "Forecast data";
			case "hist":
				return "Historical weather data";
			case "comb":
				return "“Blended data (observed & forecast)";
			default:
				return "";
		}
	}

	sourceP.textContent = `Source: ${mapSource(data.source)}`;

	const content = document.createElement("div");
	content.className = "content";

	content.append(
		h1,
		h4,
		currentTimeH5,
		dataTimeH5,
		timeZoneH5,
		conditionsP,
		iconP,
		cloudCoverP,
		tempP,
		feelsLikeMeanP,
		humidityP,
		precipitationP,
		pressureP,
		uvIndexP,
		visibilityP,
		windSpeedP,
		moonPhaseP,
		sourceP
	);

	container.appendChild(content);
}
