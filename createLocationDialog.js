import { setLoading } from "./state.js";
import {
	getLocationNameByCoordinates,
	getWeatherDataByLocation,
} from "./api.js";
import createContentContainer from "./createContentContainer.js";

export default function createLocationDialog() {
	const container = document.querySelector("#locationDialogContainer");
	container.className = "locationDialogContainer";

	const dialog = document.createElement("dialog");
	dialog.setAttribute("closedby", "any");
	const h3 = document.createElement("h3");
	const span1 = document.createElement("span");
	span1.textContent = "Wellcome to";
	const span2 = document.createElement("span");
	span2.textContent = "Numbrella!";

	h3.append(span1, span2);

	const h5 = document.createElement("h5");
	h5.textContent = "Please, share you location:";

	const confirmDialog = document.createElement("button");
	confirmDialog.textContent = "Confirm";
	confirmDialog.addEventListener("click", () => {
		navigator.geolocation.getCurrentPosition(
			async position => {
				dialog.close();
				setLoading(true);
				createContentContainer();
				const { latitude, longitude } = position.coords;
				await getLocationNameByCoordinates(latitude, longitude);
				await getWeatherDataByLocation();
				setLoading(false);
				createContentContainer();
			},
			e => {
				dialog.close();
				console.error(`${e.name}: ${e.message}`);
				setLoading(false);
				createContentContainer();
			}
		);
	});

	const closeDialog = document.createElement("button");
	closeDialog.textContent = "Close";
	closeDialog.autofocus = true;
	closeDialog.addEventListener("click", () => {
		dialog.close();
	});

	const buttonsContainer = document.createElement("div");
	buttonsContainer.className = "buttonsContainer";
	buttonsContainer.append(confirmDialog, closeDialog);

	dialog.append(h3, h5, buttonsContainer);
	container.appendChild(dialog);
}
