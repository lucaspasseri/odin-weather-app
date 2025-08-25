export default function createContentOnError() {
	const container = document.querySelector("#contentContainer");
	container.className = "contentContainer";
	container.innerHTML = "";

	const h1 = document.createElement("h1");

	h1.textContent = "(Location not set)";
	container.appendChild(h1);
}
