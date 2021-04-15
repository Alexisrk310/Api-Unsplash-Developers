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

	const resp = await fetch(cdn);
	const respuesta = await resp.json();
	if (respuesta == '') {
	}
	const { results } = respuesta;
	//RECORRE EL ARRAY
	results.forEach((img) => {
		const {
			description,
			alt_description,
			urls: { full: raw, small },
		} = img;
		console.log(raw);

		let codigo = `
        <div class="row">
            <div class="col-6">
                <div class="card m-1 ">
                    <div class="card-body">
                        <img class="card-img-top" src="${small}" alt="${alt_description}">
                        <p class="card-body">${description}</p>
                        <a href="${raw}" target="_blank" class=" btn btn-primary w-100">Ver imagen completa</a>
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
