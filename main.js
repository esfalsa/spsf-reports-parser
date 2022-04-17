let input = document.getElementById("report");

let result = "";

input.addEventListener("input", (e) => {
	document.querySelector("#output").value = "";

	let reports = input.value.split(/(?=(?:Minor|Major) \d{4}-\d{2}-\d{2})/g);

	for (let report of reports) {
		let lines = report.split("\n");
		for (let i = lines.length - 1; i >= 0; i--) {
			if (!lines[i].match(/https?:\/\/.*\.nationstates.net\/.*/gm)) {
				lines.pop();
			} else {
				break;
			}
		}
		if (lines.join("\n")) {
			result += `"${lines.join("\n")}"\n`
		}
	}

	document.querySelector("#output").value = result;
});

document.querySelector("#copy").addEventListener("click", () => {
	document.querySelector("#copy").disabled = true;
	navigator.clipboard.writeText(document.querySelector("#output").value).then(() => {
		let orig = document.querySelector("#copy").textContent;
    document.querySelector("#copy").textContent = "Copied!";
    setTimeout(() => {
      document.querySelector("#copy").textContent = orig;
      document.querySelector("#copy").disabled = false;
    }, 1000);
	});
})
