import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix pour les icônes Leaflet par défaut
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface SimpleRouteMapProps {
  departure: string;
  arrival: string;
  routeCoordinates?: [number, number][];
}

// Composant pour ajuster la vue de la carte
function MapBounds({ bounds }: { bounds: L.LatLngBounds | null }) {
  const map = useMap();
  
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [bounds, map]);

  return null;
}

const SimpleRouteMap = ({ departure, arrival, routeCoordinates }: SimpleRouteMapProps) => {
  const [departCoords, setDepartCoords] = useState<[number, number] | null>(null);
  const [arriveeCoords, setArriveeCoords] = useState<[number, number] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Géocodage des adresses
  useEffect(() => {
    const geocodeAddress = async (address: string, isDepart: boolean) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=fr&limit=1`,
          {
            headers: {
              'User-Agent': 'TaxiMalacrida/1.0',
            },
          }
        );
        const data = await response.json();
        if (data.length > 0) {
          const coords: [number, number] = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
          if (isDepart) {
            setDepartCoords(coords);
          } else {
            setArriveeCoords(coords);
          }
        }
      } catch (error) {
        console.error('Erreur géocodage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (departure && departure.length >= 5) {
      geocodeAddress(departure, true);
    }
    if (arrival && arrival.length >= 5) {
      geocodeAddress(arrival, false);
    }
  }, [departure, arrival]);

  // Calculer les bounds pour la carte
  const getBounds = (): L.LatLngBounds | null => {
    if (departCoords && arriveeCoords) {
      return L.latLngBounds([departCoords, arriveeCoords]);
    }
    if (departCoords) {
      return L.latLngBounds([departCoords, departCoords]);
    }
    if (arriveeCoords) {
      return L.latLngBounds([arriveeCoords, arriveeCoords]);
    }
    return null;
  };

  const bounds = getBounds();
  const center: [number, number] = departCoords || arriveeCoords || [43.5297, 5.4474]; // Aix-en-Provence par défaut

  // Créer des marqueurs personnalisés SVG
  const createCustomIcon = (color: string, borderColor: string) => {
    const svgIcon = `
      <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 11.5 16 24 16 24s16-12.5 16-24C32 7.163 24.837 0 16 0z" fill="${color}" stroke="${borderColor}" stroke-width="2"/>
        <circle cx="16" cy="16" r="6" fill="${borderColor}"/>
      </svg>
    `;
    return L.divIcon({
      className: 'custom-marker',
      html: svgIcon,
      iconSize: [32, 40],
      iconAnchor: [16, 40],
      popupAnchor: [0, -40]
    });
  };

  const departIcon = createCustomIcon('#001F3F', '#ffffff');
  const arriveeIcon = createCustomIcon('#ffffff', '#001F3F');

  if (isLoading) {
    return (
      <div className="w-full h-40 md:h-48 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
        <p className="text-sm text-gray-400">Chargement de la carte...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-40 md:h-48 rounded-lg overflow-hidden border border-gray-200">
      <MapContainer
        center={center}
        zoom={bounds ? undefined : 12}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {bounds && <MapBounds bounds={bounds} />}
        
        {departCoords && (
          <Marker 
            position={departCoords} 
            icon={departIcon}
          />
        )}
        
        {arriveeCoords && (
          <Marker 
            position={arriveeCoords}
            icon={arriveeIcon}
          />
        )}

        {routeCoordinates && routeCoordinates.length > 0 && (
          <Polyline
            positions={routeCoordinates}
            color="#00ffff"
            weight={4}
            opacity={0.8}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default SimpleRouteMap;
