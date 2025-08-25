import createNavbar from "./createNavbar.js";
import getWeatherDataByLocation, {
	getLocationNameByCoordinates,
} from "./api.js";
import createContentContainer from "./createContentContainer.js";

async function init() {
	let weatherData;
	navigator.geolocation.getCurrentPosition(
		async position => {
			const { latitude, longitude } = position.coords;

			const locationName = await getLocationNameByCoordinates(
				latitude,
				longitude
			);
			weatherData = await getWeatherDataByLocation(locationName);
			createContentContainer(weatherData);
		},
		e => {
			console.error(`${e.name}: ${e.message}`);
		}
	);

	createNavbar();
	createContentContainer(weatherData);
}

init();
