import createNavbar from "./createNavbar.js";
import getWeatherDataByLocation, {
	getLocationNameByCoordinates,
} from "./api.js";
import createContentContainer from "./createContentContainer.js";
import { setLoading } from "./state.js";

async function init() {
	navigator.geolocation.getCurrentPosition(
		async position => {
			setLoading(true);
			createContentContainer();

			const { latitude, longitude } = position.coords;
			await getLocationNameByCoordinates(latitude, longitude);
			await getWeatherDataByLocation();
			setLoading(false);
			createContentContainer();
		},
		e => {
			console.error(`${e.name}: ${e.message}`);
			setLoading(false);
			createContentContainer();
		}
	);

	createNavbar();
}

init();
