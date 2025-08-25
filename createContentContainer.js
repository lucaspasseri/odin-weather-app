import { getImageSrcByWeatherData } from "./api.js";
import createContentOnError from "./createContentOnError.js";
import createContentOnLoading from "./createContentOnLoading.js";
import createContentOnSuccess from "./createContentOnSuccess.js";
import { getLoading, setLoading } from "./state.js";

export default async function createContentContainer(data) {
	if (getLoading()) {
		createContentOnLoading();
		return;
	}

	if (data === undefined) {
		createContentOnError();
		return;
	}

	let backgroundImageSrc;
	setLoading(true);
	createContentOnSuccess(data, backgroundImageSrc);
	backgroundImageSrc = await getImageSrcByWeatherData(data);

	setLoading(false);
	createContentOnSuccess(data, backgroundImageSrc);
}
