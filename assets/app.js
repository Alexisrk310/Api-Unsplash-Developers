const formulario = document.querySelector('.form');
const container = document.querySelector('.open');
formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const busqueda = document.querySelector('#input').value;
	eliminaHTML();
	getApi(busqueda);
});

//API
const getApi = async (busqueda) => {
	const key = 'elCGDRVhWKKFpHfEc8qOCZ_XCuoEpu_H5VYf8pCRRR8';
	const cdn = `https://api.unsplash.com/search/photos?query=${busqueda}&client_id=${key}`;

	console.log(cdn);
	const resp = await fetch(cdn);
	const respuesta = await resp.json();
	if (respuesta == '') {
	}
	const { results } = respuesta;
	console.log(results.title);
	//RECORRE EL ARRAY

	results.forEach((img) => {
		const {
			description,
			alt_description,
			likes,
			urls: { full: raw, small },
			user: { name, twitter_username },
		} = img;

		let codigo = `
	<div class="row">
		<div class="col-6">
			<div class="card m-2 ">
				
				<div class="card-body">
					<img class="card-img-top" src="${small}" alt="${alt_description}">
					<p class="card-tittle text-success m-3 text-danger"><i class="fas fa-heart "></i> ${likes}</p>
					<h6 class="font-monospace d-inline">
						<p class="d-inline text-info">Photographer: </p> ${name}
					</h6>
					<h6 class="font-monospace d-block">
						<p class="text-info d-inline"><i class="fab fa-twitter"></i></p>${twitter_username}
					</h6>
					<p class="card-body text-muted">${description}</p>
					<a href="${raw}" type="button" target="_blank" class=" btn btn-primary w-100"> <i
							class="fas fa-compress"></i> Ver imagen completa</a>
				</div>

			</div>
		</div>

	</div>
        `;
		container.innerHTML += codigo;
	});
};

function eliminaHTML() {
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
}
