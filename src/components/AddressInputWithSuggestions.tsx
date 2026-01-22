import { useState, useEffect, useRef } from 'react';
import { MapPin, Flag, Loader2 } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface AddressSuggestion {
  display_name: string;
  lat: string;
  lon: string;
}

interface AddressInputWithSuggestionsProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
  loaderClassName?: string;
}

const AddressInputWithSuggestions = ({
  value,
  onChange,
  placeholder,
  icon: Icon,
  className = '',
  iconClassName = '',
  loaderClassName = 'text-white/60',
}: AddressInputWithSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Recherche d'adresses avec Nominatim (gratuit, pas de clé requise)
  const searchAddress = async (query: string): Promise<AddressSuggestion[]> => {
    if (query.length < 2) {
      return [];
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=fr&limit=5&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'TaxiMalacrida/1.0',
          },
        }
      );

      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error('Erreur recherche adresse:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce de la recherche
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (value.length >= 2) {
      debounceTimerRef.current = setTimeout(async () => {
        const results = await searchAddress(value);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [value]);

  // Fermer les suggestions en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (suggestion: AddressSuggestion) => {
    onChange(suggestion.display_name);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full" style={{ zIndex: 1 }}>
      <div className="relative">
        <Icon
          className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconClassName}`}
          size={16}
          strokeWidth={1.5}
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className={className}
        />
        {isLoading && (
          <Loader2
            className={`absolute right-3 top-1/2 -translate-y-1/2 animate-spin ${loaderClassName}`}
            size={14}
          />
        )}
      </div>

      {/* Dropdown des suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 max-h-60 overflow-y-auto"
          style={{ 
            zIndex: 9999,
            backgroundColor: '#ffffff',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 bg-white"
            >
              <div className="font-medium text-gray-900 text-sm">
                {suggestion.display_name.split(',')[0]}
              </div>
              <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                {suggestion.display_name}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressInputWithSuggestions;
