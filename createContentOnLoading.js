export default function createContentOnLoading() {
	const container = document.querySelector("#contentContainer");
	container.innerHTML = "";
	container.style.backgroundImage = "unset";
	container.classList.add("contentContainer");

	const icon = document.createElement("i");
	icon.setAttribute("data-lucide", "loader-pinwheel");
	icon.className = "loadingIcon";

	const div = document.createElement("div");
	div.appendChild(icon);
	container.appendChild(div);

	lucide.createIcons();
}
