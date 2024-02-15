const API =
  "https://youtube-v31.p.rapidapi.com/search?channelId=UClG8odDC8TS6Zpqk9CGVQiQ&part=snippet%2Cid&order=date&maxResults=9";

  //Referencia donde se agrega el llamado a la api

const content = null || document.getElementById("content");
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "62119b1c5dmsh12811a50e84f4d1p18773fjsn864acd5853c3",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

//Funcion asincrona para manejar el fetch de datos
async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

// funcion anonima, se llama asi misma
(async () => {
  try {
    const videos = await fetchData(API);
    //template que itera sobre cada item usando la funcion map aplicandole el html
    //${video.snippet.thumbnails.high.url} accede a la imagen, ${video.snippet.description} accede a la descripcion
    //Esto se inserta el llamdo en el div id = "content"
    let view = `
    ${videos.items
      .map(
        (video) => `
    <div class="group relative">
    <div
      class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
      <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
    </div>
    <div class="mt-4 flex justify-between">
      <h3 class="text-sm text-gray-700">
        <span aria-hidden="true" class="absolute inset-0"></span>
        ${video.snippet.title}
      </h3>
    </div>
  </div> 
    `
      )
      .slice(0, 8)
      .join("")}     
      `;      
      //Insertar la vista
    content.innerHTML = view;
  } catch (error) {
    console.log(error);
  }
})();

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }
