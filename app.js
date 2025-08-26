import createNavbar from "./createNavbar.js";
import createContentContainer from "./createContentContainer.js";
import createLocationContainer from "./createLocationContainer.js";
import createLocationDialog from "./createLocationDialog.js";

function init() {
	createNavbar();
	createLocationContainer();
	createLocationDialog();
	createContentContainer();

	const dialog = document.querySelector("#locationDialogContainer dialog");
	dialog.showModal();
}

init();
