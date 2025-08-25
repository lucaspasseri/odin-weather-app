import getWeatherData, { getLocationBySearchQuery } from "./api.js";
import createContentContainer from "./createContentContainer.js";

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
		const data = await getWeatherData(value);

		createContentContainer(data);
	});

	const list = document.createElement("datalist");
	list.id = "locationSuggestionList";

	navbar.append(searchLabel, searchInput, list);
}
