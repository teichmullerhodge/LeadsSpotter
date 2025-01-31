declare global {
    interface Window {
      initMap: () => void;
    }
  }

export function init_google_maps(){

    const mapElement: HTMLDivElement | null = document.querySelector("#map")
    if(!mapElement) {
        console.log("Elemento não renderizado.")
        return;
    }

    const location: google.maps.LatLngLiteral = {
        lat: -52.4587,
        lng: -46.6487
    };

    const mapOptions: google.maps.MapOptions = {

        zoom: 12,
        center: location
    };

    const map = new google.maps.Map(mapElement, mapOptions);

    new google.maps.marker.AdvancedMarkerElement({
        position: location,
        map: map,
        title: "Localização Exemplo"
      });
};
