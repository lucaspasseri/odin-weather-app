import getWeatherDataByLocation, { getLocationBySearchQuery } from "./api.js";
import createContentContainer from "./createContentContainer.js";
import {
	setLoading,
	setLocation,
	setWeatherData,
	toggleUnitGroup,
} from "./state.js";

export default function createNavbar() {
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

		const possibleLocations = await getLocationBySearchQuery(value);

		const list = document.querySelector("#locationSuggestionList");
		list.innerHTML = "";

		possibleLocations.forEach(location => {
			const opt = document.createElement("option");
			opt.value = `${location.name} - ${location.fullAddress}`;
			list.appendChild(opt);
		});
	});

	searchInput.addEventListener("change", async e => {
		const value = e.currentTarget.value;

		if (value.trim().length < 5) return;
		setLocation(value);
		setLoading(true);
		createContentContainer();
		await getWeatherDataByLocation();
		setLoading(false);
		createContentContainer();
	});

	const list = document.createElement("datalist");
	list.id = "locationSuggestionList";

	const metricSystemButton = document.createElement("button");
	metricSystemButton.textContent = "Sys1/Sys2";
	metricSystemButton.addEventListener("click", async () => {
		toggleUnitGroup();
		setLoading(true);
		createContentContainer();
		await getWeatherDataByLocation();
		setLoading(false);
		createContentContainer();
	});

	navbar.append(searchLabel, searchInput, list, metricSystemButton);
}
