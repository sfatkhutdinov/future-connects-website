'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY, SERVICE_AREA_BOUNDS } from '@/lib/config';
import { AddressDetails } from '@/types';

// Libraries to load
const libraries: ["places"] = ["places"];

interface AddressAutocompleteProps {
  label: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  onChange: (address: string, placeDetails?: google.maps.places.PlaceResult | null) => void;
  className?: string;
  id: string;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  label,
  placeholder = 'Enter an address',
  defaultValue = '',
  required = false,
  onChange,
  className = '',
  id,
}) => {
  const [address, setAddress] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingAutocomplete, setLoadingAutocomplete] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  // Load Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (isLoaded && !autocompleteRef.current) {
      autocompleteRef.current = new google.maps.places.AutocompleteService();
      sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken();
      
      // Create a dummy div for PlacesService (it requires a DOM element)
      const dummyDiv = document.createElement('div');
      placesServiceRef.current = new google.maps.places.PlacesService(dummyDiv);
    }
  }, [isLoaded]);

  // Handle input change to fetch address suggestions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
    onChange(value, null);
    
    if (!value) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (isLoaded && autocompleteRef.current && sessionTokenRef.current) {
      setLoadingAutocomplete(true);
      
      // Restrict to addresses in the DMV area for better results
      const request: google.maps.places.AutocompletionRequest = {
        input: value,
        sessionToken: sessionTokenRef.current,
        componentRestrictions: { country: 'us' },
        types: ['address'],
        bounds: new google.maps.LatLngBounds(
          // DMV area bounds from config
          new google.maps.LatLng(SERVICE_AREA_BOUNDS.southwest.lat, SERVICE_AREA_BOUNDS.southwest.lng),
          new google.maps.LatLng(SERVICE_AREA_BOUNDS.northeast.lat, SERVICE_AREA_BOUNDS.northeast.lng)
        ),
      };

      autocompleteRef.current.getPlacePredictions(
        request,
        (predictions, status) => {
          setLoadingAutocomplete(false);
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            setSuggestions(predictions);
            setShowSuggestions(true);
          } else {
            setSuggestions([]);
            setShowSuggestions(false);
          }
        }
      );
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: google.maps.places.AutocompletePrediction) => {
    // Immediately update the input field with the selected address
    setAddress(suggestion.description);
    setShowSuggestions(false);
    
    // Get place details for the selected address
    if (placesServiceRef.current && sessionTokenRef.current) {
      placesServiceRef.current.getDetails(
        {
          placeId: suggestion.place_id,
          fields: ['address_components', 'geometry', 'formatted_address'],
          sessionToken: sessionTokenRef.current,
        },
        (placeResult, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && placeResult) {
            // Extract address components
            const details: AddressDetails = {
              fullAddress: placeResult.formatted_address || suggestion.description,
              lat: placeResult.geometry?.location?.lat(),
              lng: placeResult.geometry?.location?.lng(),
            };
            
            if (placeResult.address_components) {
              for (const component of placeResult.address_components) {
                const types = component.types;
                
                if (types.includes('street_number')) {
                  details.streetNumber = component.long_name;
                } else if (types.includes('route')) {
                  details.route = component.long_name;
                } else if (types.includes('locality')) {
                  details.city = component.long_name;
                } else if (types.includes('administrative_area_level_1')) {
                  details.state = component.short_name;
                } else if (types.includes('postal_code')) {
                  details.zipCode = component.long_name;
                } else if (types.includes('country')) {
                  details.country = component.long_name;
                }
              }
            }
            
            // Ensure we have valid coordinates before calling onChange
            if (placeResult.geometry?.location) {
              details.lat = placeResult.geometry.location.lat();
              details.lng = placeResult.geometry.location.lng();
              
              // Update the input value with the formatted address
              setAddress(details.fullAddress);
              
              // Call onChange with the formatted address and place details
              onChange(details.fullAddress, placeResult);
              
              // Create a new session token for the next request
              sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken();
            } else {
              // If no geometry is provided, just use the description
              onChange(suggestion.description, null);
              console.error('No geometry data available for the selected place');
            }
          } else {
            // Handle error case
            onChange(suggestion.description, null);
            console.error('Error fetching place details:', status);
          }
        }
      );
    } else {
      // Fallback if services aren't available
      onChange(suggestion.description, null);
    }
  };

  // Handle input blur
  const handleBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setShowSuggestions(false);
    }, 300);
  };

  // Handle input focus
  const handleFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  if (loadError) {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          id={id}
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            onChange(e.target.value, null);
          }}
          placeholder={placeholder}
          required={required}
          className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800 ${className}`}
        />
        <p className="mt-1 text-xs text-red-500">Error loading Google Maps. Using fallback text input.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-neutral-800 mb-1">
          {label} {required && <span className="text-error-600">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          id={id}
          ref={inputRef}
          placeholder={placeholder}
          value={address}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={`w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-700 ${className}`}
          autoComplete="off"
          required={required}
        />
        {loadingAutocomplete && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-800"></div>
          </div>
        )}
      </div>
      
      <div className="relative">
        {showSuggestions && suggestions.length > 0 && (
          <ul 
            className="absolute z-[9999] mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm"
            style={{
              top: '0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
          >
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.place_id}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-primary-50 text-neutral-900"
                onMouseDown={(e) => {
                  e.preventDefault(); // Prevent blur event from firing
                  handleSuggestionClick(suggestion);
                }}
              >
                {suggestion.structured_formatting ? (
                  <>
                    <div className="font-medium">{suggestion.structured_formatting.main_text}</div>
                    <div className="text-neutral-500 text-sm">{suggestion.structured_formatting.secondary_text}</div>
                  </>
                ) : (
                  <div>{suggestion.description}</div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddressAutocomplete; 