import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';

// to retrieve the place id 
// export const PlaceSearchhhh = async ({ query }) => {
  
//   const placesServiceRef = useRef(null); // Create a ref

//     // Initialize the Places Service
//     placesServiceRef.current = new window.google.maps.places.PlacesService();

//     if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
//       console.log('ok')
//     } else {
//       console.log('no')
//     }

//     const fetchPlaces = async () => {
//       try {
//         // Define search query
//         const request = {
//           query: query,
//         };

//         // Perform the Places Text Search
//         placesServiceRef.current.textSearch(request, (results, status) => {
//           if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//             return results;
//           } else {
//             console.error('Error fetching places:', status);
//             return null;
//           }
//         });
//       } catch (error) {
//         console.error('Error fetching places:', error);
//         return null;
//       }
//     };
    
// };

export function PlaceSearch (query){

  // Define search query
  const request = {
    query: query
  };

  // Initialize the Places Service
  const service = new google.maps.places.PlacesService(document.createElement('div'));

  try {
    // Perform the Places Text Search
    service.textSearch(request, callback);

    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
        return results;
      } else {
        console.error('Error fetching places:', status);
        return null;
      }
    }
  } catch (error) {
    console.error('Error fetching places:', error);
    return null;
  }
};

// export async function PlaceSearch(query) {
//   try {
//     // Initialize the Places Service
//     const placesServiceRef = new window.google.maps.places.PlacesService();

//     // Define search query
//     const request = {
//       query: query,
//     };

//     // Perform the Places Text Search
//     const results = await new Promise((resolve, reject) => {
//       placesServiceRef.textSearch(request, (results, status) => {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//           resolve(results);
//         } else {
//           console.error('Error fetching places:', status);
//           resolve(null); // Resolving with null in case of error
//         }
//       });
//     });

//     return results; // Return the results to the caller
//   } catch (error) {
//     console.error('Error fetching places:', error);
//     return null;
//   }
// }

// retrieve api using web services
// const FetchImageAPI = ({ placeId, apiKey }) => {
//     const [images, setImages] = useState([]);
  
//     useEffect(() => {
//       const fetchImages = async () => {
//         try {
//           const response = await axios.get(
//             `https://maps.googleapis.com/maps/api/place/details/json`,
//             {
//               params: {
//                 key: apiKey,
//                 place_id: placeId,
//                 fields: 'photos',
//               },
//             }
//           );
  
//           const photos = response.data.result.photos || [];
//           const imageUrls = photos.map((photo) => {
//             return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}`;
//           });
//           setImages(imageUrls);
//         } catch (error) {
//           console.error('Error fetching images:', error);
//         }
//       };
  
//       if (placeId && apiKey) {
//         fetchImages();
//       }
//     }, [placeId, apiKey]);
  
//     return (
//       <div>
//         {images.map((imageUrl, index) => (
//           <img key={index} src={imageUrl} alt={`Image ${index + 1}`} />
//         ))}
//       </div>
//     );
//   };

  
  
//   export default FetchImageAPI;

  // const FetchImageAPI = () => {
  //   const apiKey = 'AIzaSyCtRPFx7tsN9zO6n9hSoxFFFGDmEBAm2JM';
  
  //   // State to store the query for the Text Search
  //   const [searchQuery, setSearchQuery] = React.useState('');
  
  //   return (
  //     <div>
  //       <h1>Images from Google Places API</h1>
  //       <PlaceSearch apiKey={apiKey} query={searchQuery} />
  //       <input
  //         type="text"
  //         value={searchQuery}
  //         onChange={(e) => setSearchQuery(e.target.value)}
  //         placeholder="Enter a place name for Text Search"
  //       />
  //       {searchQuery && <ImageGallery apiKey={apiKey} placeId={searchQuery} />}
  //     </div>
  //   );
  // };
  
  // export default FetchImageAPI;
  