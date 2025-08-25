import createNavbar from "./createNavbar.js";
import getWeatherDataByLocation, {
	getLocationNameByCoordinates,
} from "./api.js";
import createContentContainer from "./createContentContainer.js";
import { setLoading } from "./state.js";

async function init() {
	let weatherData;
	navigator.geolocation.getCurrentPosition(
		async position => {
			setLoading(true);
			createContentContainer(weatherData);

			const { latitude, longitude } = position.coords;

			const locationName = await getLocationNameByCoordinates(
				latitude,
				longitude
			);
			weatherData = await getWeatherDataByLocation(locationName);

			setLoading(false);
			createContentContainer(weatherData);
		},
		e => {
			console.error(`${e.name}: ${e.message}`);
			setLoading(false);
			createContentContainer(weatherData);
		}
	);

	createNavbar();
}

init();
