import { useEffect } from "react";

function GoogleMapsLoader() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`;
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return null;
}

export default GoogleMapsLoader;
