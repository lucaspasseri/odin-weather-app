function renderNavbar() {
	const navbar = document.querySelector("#navbar");
	navbar.className = "navbar";

	const searchLabel = document.createElement("label");
	searchLabel.htmlFor = "searchInput";
	searchLabel.textContent = "Enter the desired location:";

	const searchInput = document.createElement("input");
	searchInput.id = "searchInput";
	searchInput.type = "search";
	searchInput.setAttribute("list", "locationSuggestionList");

	searchInput.addEventListener("input", async e => {
		const value = e.currentTarget.value;
		console.log({ value, e });

		const possibleLocations = await getLocationWithQuery(value);

		console.log({ possibleLocations });

		const list = document.querySelector("#locationSuggestionList");
		list.innerHTML = "";

		console.log({ list });

		possibleLocations.forEach(location => {
			const opt = document.createElement("option");
			opt.value = `${location.name} - ${location.fullAddress}`;
			list.appendChild(opt);
		});
	});

	searchInput.addEventListener("change", async e => {
		const value = e.currentTarget.value;
		console.log({ value, e });

		if (value.trim().length < 5) return;
		const data = await getWeatherData(value);

		renderContentContainer(data);
	});

	const list = document.createElement("datalist");
	list.id = "locationSuggestionList";

	navbar.append(searchLabel, searchInput, list);
}

const basicUrl =
	"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]?key=NN7P4KNN357GTQRG7EKARYR6R";

async function getWeatherData(location) {
	if (location.trim().length < 5) return;
	const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=NN7P4KNN357GTQRG7EKARYR6R&contentType=json`;
	const data = await fetch(url).then(res => res.json());
	console.log({ data });
	const preparedData = {
		address: data.address,
		resolvedAddress: data.resolvedAddress,
		description: data.description,
		cloudCover: data.currentConditions.cloudcover,
		conditions: data.currentConditions.conditions,
		feelsLikeMean: data.currentConditions.feelslike,
		humidity: data.currentConditions.humidity,
		icon: data.currentConditions.icon,
		moonPhase: data.currentConditions.moonphase,
		precipitation: data.currentConditions.precip,
		pressure: data.currentConditions.pressure,
		source: data.currentConditions.source,
		temp: data.currentConditions.temp,
		uvIndex: data.currentConditions.uvindex,
		visibility: data.currentConditions.visibility,
		windSpeed: data.currentConditions.windspeed,
	};

	return preparedData;
}

async function renderContentContainer(data) {
	const container = document.querySelector("#contentContainer");
	container.className = "contentContainer";
	container.innerHTML = "";

	const h1 = document.createElement("h1");
	const h3 = document.createElement("h3");
	const h4 = document.createElement("h4");
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

	const generatedImage = document.createElement("img");
	generatedImage.width = "300";
	generatedImage.height = "300";
	generatedImage.alt =
		"Image generated with IA with current weather conditions.";

	const query = `${data.resolvedAddress}_${data.icon}_${data.conditions}`;

	const imageGeneratorUrl = `https://image.pollinations.ai/prompt/${query}`;

	const res = await fetch(imageGeneratorUrl);
	console.log({ res });
	const blob = await res.blob();
	const objectUrl = URL.createObjectURL(blob);

	generatedImage.src = objectUrl;

	h1.textContent = "Address: " + data.resolvedAddress;
	h3.textContent = "Search for: " + data.address;
	h4.textContent = "description: " + data.description;
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

	container.append(
		h1,
		h3,
		h4,
		generatedImage,
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
}

async function init() {
	try {
		const data = await getWeatherData("de%20janeiro");
		console.log({ preparedData: data });
		renderNavbar();
		renderContentContainer(data);
	} catch (err) {
		console.error("Failed to fetch", err);
	}
}

async function getLocationWithQuery(searchParameter) {
	const query = searchParameter ? searchParameter : "";

	const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${query}&access_token=pk.eyJ1IjoibHVjYXNwYXNzZXJpIiwiYSI6ImNtZW5sdnE5bzEzcXIycm9od2hyOWgxam0ifQ.4c1-vOSslsToJ4ZO7CChUw`;
	const res = await fetch(url);
	const data = await res.json();

	const preparedData = data.features.map(elem => {
		return {
			fullAddress: elem.properties.full_address,
			name: elem.properties.name,
			latitude: elem.properties.coordinates.latitude,
			longitude: elem.properties.coordinates.longitude,
		};
	});
	console.log({ preparedData });
	return preparedData;
}

init();
