import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

// Fix pour les icônes Leaflet par défaut
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MapWithAutocompleteProps {
  depart: string;
  arrivee: string;
  onDepartChange: (value: string) => void;
  onArriveeChange: (value: string) => void;
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

const MapWithAutocomplete = ({ 
  depart, 
  arrivee, 
  onDepartChange, 
  onArriveeChange,
  routeCoordinates 
}: MapWithAutocompleteProps) => {
  const [departSuggestions, setDepartSuggestions] = useState<any[]>([]);
  const [arriveeSuggestions, setArriveeSuggestions] = useState<any[]>([]);
  const [showDepartSuggestions, setShowDepartSuggestions] = useState(false);
  const [showArriveeSuggestions, setShowArriveeSuggestions] = useState(false);
  const [departCoords, setDepartCoords] = useState<[number, number] | null>(null);
  const [arriveeCoords, setArriveeCoords] = useState<[number, number] | null>(null);
  const departInputRef = useRef<HTMLInputElement>(null);
  const arriveeInputRef = useRef<HTMLInputElement>(null);

  // Recherche d'adresses avec Nominatim
  const searchAddress = async (query: string) => {
    if (query.length < 3) return [];
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=fr&limit=5`,
        {
          headers: {
            'User-Agent': 'TaxiMalacrida/1.0'
          }
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur recherche adresse:', error);
      return [];
    }
  };

  // Gestion du changement de départ
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (depart.length >= 3) {
        const results = await searchAddress(depart);
        setDepartSuggestions(results);
        setShowDepartSuggestions(true);
      } else {
        setDepartSuggestions([]);
        setShowDepartSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [depart]);

  // Gestion du changement d'arrivée
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (arrivee.length >= 3) {
        const results = await searchAddress(arrivee);
        setArriveeSuggestions(results);
        setShowArriveeSuggestions(true);
      } else {
        setArriveeSuggestions([]);
        setShowArriveeSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [arrivee]);

  // Géocodage des adresses sélectionnées
  const geocodeAddress = async (address: string, isDepart: boolean) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=fr&limit=1`,
        {
          headers: {
            'User-Agent': 'TaxiMalacrida/1.0'
          }
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
    }
  };

  const handleSuggestionClick = (suggestion: any, isDepart: boolean) => {
    const address = suggestion.display_name;
    if (isDepart) {
      onDepartChange(address);
      setShowDepartSuggestions(false);
      geocodeAddress(address, true);
    } else {
      onArriveeChange(address);
      setShowArriveeSuggestions(false);
      geocodeAddress(address, false);
    }
  };

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

  return (
    <div className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden border border-gray-200 relative">
      {/* Inputs avec autocomplete au-dessus de la carte */}
      <div className="absolute top-4 left-4 right-4 z-[1000] flex flex-col gap-2">
        {/* Départ */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
            <MapPin className="w-4 h-4 text-gray-500" />
          </div>
          <input
            ref={departInputRef}
            type="text"
            value={depart}
            onChange={(e) => onDepartChange(e.target.value)}
            onFocus={() => setShowDepartSuggestions(true)}
            onBlur={() => setTimeout(() => setShowDepartSuggestions(false), 200)}
            placeholder="Adresse de départ"
            className="w-full pl-10 pr-3 py-2.5 bg-white/95 backdrop-blur-sm border border-gray-300 rounded-lg shadow-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#001F3F] focus:border-transparent"
          />
          {showDepartSuggestions && departSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-48 overflow-y-auto z-[1001]">
              {departSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion, true)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm border-b border-gray-100 last:border-0"
                >
                  <div className="font-medium text-gray-900">{suggestion.display_name.split(',')[0]}</div>
                  <div className="text-xs text-gray-500">{suggestion.display_name}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Arrivée */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
            <MapPin className="w-4 h-4 text-gray-500" />
          </div>
          <input
            ref={arriveeInputRef}
            type="text"
            value={arrivee}
            onChange={(e) => onArriveeChange(e.target.value)}
            onFocus={() => setShowArriveeSuggestions(true)}
            onBlur={() => setTimeout(() => setShowArriveeSuggestions(false), 200)}
            placeholder="Adresse d'arrivée"
            className="w-full pl-10 pr-3 py-2.5 bg-white/95 backdrop-blur-sm border border-gray-300 rounded-lg shadow-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#001F3F] focus:border-transparent"
          />
          {showArriveeSuggestions && arriveeSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-48 overflow-y-auto z-[1001]">
              {arriveeSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion, false)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm border-b border-gray-100 last:border-0"
                >
                  <div className="font-medium text-gray-900">{suggestion.display_name.split(',')[0]}</div>
                  <div className="text-xs text-gray-500">{suggestion.display_name}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Carte Leaflet */}
      <MapContainer
        center={center}
        zoom={bounds ? undefined : 12}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {bounds && <MapBounds bounds={bounds} />}
        
        {departCoords && (
          <Marker 
            position={departCoords} 
            icon={L.icon({
              iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
              shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            })}
          />
        )}
        
        {arriveeCoords && (
          <Marker 
            position={arriveeCoords}
            icon={L.icon({
              iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
              shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            })}
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

export default MapWithAutocomplete;
