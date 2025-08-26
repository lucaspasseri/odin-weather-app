import { setLoading, setLocation, toggleUnitGroup } from "./state.js";
import createContentContainer from "./createContentContainer.js";
import { getWeatherDataByLocation, getLocationBySearchQuery } from "./api.js";

export default function createLocationContainer() {
	const container = document.querySelector("#locationContainer");
	container.className = "locationContainer";

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

	const locationDialogButton = document.createElement("button");
	locationDialogButton.textContent = "Use your Location";

	locationDialogButton.addEventListener("click", () => {
		const dialog = document.querySelector("#locationDialogContainer dialog");
		dialog.showModal();
	});

	container.append(
		searchLabel,
		searchInput,
		list,
		locationDialogButton,
		metricSystemButton
	);

	return container;
}
