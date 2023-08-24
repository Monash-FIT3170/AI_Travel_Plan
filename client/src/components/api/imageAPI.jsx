/*global google*/
const google = (window.google = window.google ? window.google : {});

export function PlaceSearch(query) {
  
  // Define search query
  const request = {
    query: query,
  };

  // Initialize the Places Service
  const service = new google.maps.places.PlacesService(
    document.createElement("div")
  );

  return new Promise((resolve, reject) => {
    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        const url = results[0].photos[0].getUrl({
          maxWidth: 500,
          maxHeight: 500,
        });
        resolve(url);
      } else {
        reject("Error fetching places: " + status);
      }
    }

    try {
      // Perform the Places Text Search
      service.textSearch(request, callback);
    } catch (error) {
      reject("Error fetching places: " + error);
    }
  });

  // function callback(results, status) {
  //   if (status == google.maps.places.PlacesServiceStatus.OK) {
  //     // console.log(results);
  //     const url = results[0].photos[0].getUrl({
  //       maxWidth: 500,
  //       maxHeight: 500,
  //     });
  //     console.log(url);
  //   } else {
  //     console.error("Error fetching places:", status);
  //   }
  // }

  // try {
  //   // Perform the Places Text Search
  //   service.textSearch(request, callback);
  //   } catch (error) {
  //   console.error("Error fetching places:", error);
  // }
}
