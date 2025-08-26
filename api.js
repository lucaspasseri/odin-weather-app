import {
	getUnitGroup,
	getLocation,
	setLocation,
	getWeatherData,
	setWeatherData,
} from "./state.js";

export async function getWeatherDataByLocation() {
	if (getLocation().trim().length < 5) return;

	try {
		const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${getLocation()}?unitGroup=${getUnitGroup()}&key=NN7P4KNN357GTQRG7EKARYR6R&contentType=json`;
		const data = await fetch(url).then(res => res.json());

		const preparedData = {
			address: data.address,
			resolvedAddress: data.resolvedAddress,
			description: data.description,
			timezone: data.timezone,
			datetimeEpoch: data.currentConditions.datetimeEpoch,
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

		setWeatherData(preparedData);
	} catch (e) {
		console.error(`${e.name}: ${e.message}`);
	}
}

export async function getLocationBySearchQuery(searchQuery) {
	try {
		const query = searchQuery ? searchQuery : "";
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
		return preparedData;
	} catch (e) {
		console.error(`${e.name}: ${e.message}`);
	}
}

export async function getLocationNameByCoordinates(latitude, longitude) {
	if (typeof latitude !== "number" || typeof longitude !== "number") return;

	try {
		const url = `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitude}&latitude=${latitude}&access_token=pk.eyJ1IjoibHVjYXNwYXNzZXJpIiwiYSI6ImNtZW5sdnE5bzEzcXIycm9od2hyOWgxam0ifQ.4c1-vOSslsToJ4ZO7CChUw`;
		const res = await fetch(url);
		const data = await res.json();

		const place = data.features.filter(
			loc => loc.properties.feature_type === "place"
		)[0];

		setLocation(place.properties.name);
	} catch (e) {
		console.error(`${e.name}: ${e.message}`);
	}
}

export async function getImageSrcByWeatherData() {
	const data = getWeatherData();

	try {
		const query = `${data.resolvedAddress}_${data.icon}_${data.conditions}`;
		const imageGeneratorUrl = `https://image.pollinations.ai/prompt/${query}`;

		const res = await fetch(imageGeneratorUrl);
		const blob = await res.blob();
		const objectUrl = URL.createObjectURL(blob);

		return objectUrl;
	} catch (e) {
		console.error(`${e.name}: ${e.message}`);
	}
}
