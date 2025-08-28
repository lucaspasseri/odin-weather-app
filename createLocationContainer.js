import { setLoading, setLocation, toggleUnitGroup } from "./state.js";
import createContentContainer from "./createContentContainer.js";
import { getWeatherDataByLocation, getLocationBySearchQuery } from "./api.js";

export default function createLocationContainer() {
	const container = document.querySelector("#locationContainer");
	container.className = "locationContainer";

	const searchLabel = document.createElement("label");
	searchLabel.htmlFor = "searchInput";
	searchLabel.textContent = "Location:";

	const searchInput = document.createElement("input");
	searchInput.id = "searchInput";
	searchInput.type = "search";
	searchInput.setAttribute("list", "locationSuggestionList");

	searchInput.addEventListener("input", async e => {
		const value = e.currentTarget.value;

		const possibleLocations = await getLocationBySearchQuery(value);
		console.log({ possibleLocations });

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

	const celsiusFahrenheitIcon = document.createElement("img");
	celsiusFahrenheitIcon.alt = "Celsius vc Fahrenheit";
	celsiusFahrenheitIcon.src = "./imgs/try2.png";
	celsiusFahrenheitIcon.height = 55;
	celsiusFahrenheitIcon.width = 55;

	metricSystemButton.appendChild(celsiusFahrenheitIcon);

	metricSystemButton.addEventListener("click", async () => {
		toggleUnitGroup();
		setLoading(true);
		createContentContainer();
		await getWeatherDataByLocation();
		setLoading(false);
		createContentContainer();
	});

	const icon = document.createElement("i");
	icon.setAttribute("data-lucide", "map-pin-house");
	icon.className = "locationIcon";

	const locationDialogButton = document.createElement("button");
	locationDialogButton.appendChild(icon);

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

	lucide.createIcons();
}
