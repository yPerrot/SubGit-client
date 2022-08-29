const loadingDialog = document.querySelector("#loading-dialog");
const failedDialog = document.querySelector("#failed-dialog");
const successDialog = document.querySelector("#success-dialog");

const closeModalBtn = document.querySelectorAll(".close-modal-btn");
const form = document.querySelector('#form');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	e.stopPropagation();

	const gitLink = form.elements['link'].value;

	fetch(`http://localhost:3000/download?link=${gitLink}`).then(async (response) => {
		if (response.ok) {
			successDialog.showModal();

			const blobData = await response.blob();

			const link = document.createElement("a");
			link.href = window.URL.createObjectURL(blobData);
			link.download = gitLink.split('/').pop() + ".zip"
			document.body.appendChild(link); // Required for FF
			link.click();
		} else {
			failedDialog.showModal();
		}

	}).catch(err => {
		failedDialog.showModal();
		console.error(err);
	}).finally(() => {
		loadingDialog.close();
	})

	loadingDialog.showModal();
})

closeModalBtn.forEach(btn => {
	btn.addEventListener('click', () => {
		if (loadingDialog.open) loadingDialog.close()
		if (failedDialog.open) failedDialog.close()
		if (successDialog.open) successDialog.close()
	})
})

