import { getImageSrcByWeatherData } from "./api.js";

export default async function createContentContainer(data) {
	const container = document.querySelector("#contentContainer");
	container.className = "contentContainer";
	container.innerHTML = "";

	const h1 = document.createElement("h1");
	const h3 = document.createElement("h3");
	const h4 = document.createElement("h4");

	if (data === undefined) {
		h1.textContent = "(Location not set)";
		h3.textContent = "(Location not set)";
		h4.textContent = "(Location not set)";
		container.append(h1, h3, h4);
		return;
	}

	const currentTimeH5 = document.createElement("h5");
	const dataTimeH5 = document.createElement("h5");
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

	const src = await getImageSrcByWeatherData(data);

	container.style.backgroundImage = `url(${src})`;
	container.style.backgroundSize = "cover";
	container.style.backgroundPosition = "center";

	h1.textContent = data.resolvedAddress;
	h3.textContent = data.address;
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

	cloudCoverP.textContent = "cloudCover: " + data.cloudCover;
	conditionsP.textContent = "condition: " + data.conditions;
	feelsLikeMeanP.textContent = "feelsLikeMean: " + data.feelsLikeMean;
	humidityP.textContent = "humidity: " + data.humidity;
	iconP.textContent = "icon: " + data.icon;
	moonPhaseP.textContent = "moonPhase: " + data.moonPhase;
	precipitationP.textContent = "precipitation: " + data.precipitation;
	pressureP.textContent = "pressure: " + data.pressure;
	sourceP.textContent = "source: " + data.source;
	tempP.textContent = "temp: " + data.temp;
	uvIndexP.textContent = "uvIndex: " + data.uvIndex;
	visibilityP.textContent = "visibility: " + data.visibility;
	windSpeedP.textContent = "windSpeed: " + data.windSpeed;

	const content = document.createElement("div");
	content.className = "content";

	content.append(
		h1,
		h3,
		h4,
		currentTimeH5,
		dataTimeH5,
		cloudCoverP,
		conditionsP,
		feelsLikeMeanP,
		humidityP,
		iconP,
		moonPhaseP,
		precipitationP,
		pressureP,
		sourceP,
		tempP,
		uvIndexP,
		visibilityP,
		windSpeedP
	);

	const containerFilter = document.createElement("div");
	containerFilter.className = "filter";
	containerFilter.appendChild(content);

	container.appendChild(containerFilter);
}
