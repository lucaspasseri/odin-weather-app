export default function createNavbar() {
	const navbar = document.querySelector("#navbar");
	navbar.className = "navbar";

	const logo = document.createElement("img");
	logo.src = "./imgs/sun-behind-cloud.png";
	logo.height = 120;
	logo.width = 120;

	const h1 = document.createElement("h1");
	h1.textContent = "Numbrella";

	navbar.append(logo, h1);
}
