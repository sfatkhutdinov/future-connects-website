'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline, InfoWindow } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '@/lib/config';
import { Coordinates } from '@/types';

interface MoveMapProps {
  origin: Coordinates;
  destination: Coordinates;
  currentLocation?: Coordinates;
  eta?: string;
  className?: string;
}

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.375rem',
};

const libraries: ["places", "geometry"] = ["places", "geometry"];

const MoveMap: React.FC<MoveMapProps> = ({
  origin,
  destination,
  currentLocation,
  eta,
  className = 'h-64',
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [routePath, setRoutePath] = useState<google.maps.LatLng[]>([]);

  // Function to calculate and display route
  const calculateRoute = useCallback(() => {
    if (!map || !isLoaded) return;

    const directionsService = new google.maps.DirectionsService();
    
    directionsService.route(
      {
        origin: new google.maps.LatLng(origin.lat, origin.lng),
        destination: new google.maps.LatLng(destination.lat, destination.lng),
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          // Extract path points from the result
          const points: google.maps.LatLng[] = [];
          const route = result.routes[0];
          
          if (route && route.overview_path) {
            route.overview_path.forEach(point => {
              points.push(new google.maps.LatLng(point.lat(), point.lng()));
            });
            setRoutePath(points);
          }
        }
      }
    );
  }, [map, isLoaded, origin, destination]);

  // Function to fit bounds to show all markers
  const fitMapToBounds = useCallback(() => {
    if (!map || !isLoaded) return;
    
    const newBounds = new google.maps.LatLngBounds();
    newBounds.extend(new google.maps.LatLng(origin.lat, origin.lng));
    newBounds.extend(new google.maps.LatLng(destination.lat, destination.lng));
    
    if (currentLocation) {
      newBounds.extend(new google.maps.LatLng(currentLocation.lat, currentLocation.lng));
    }
    
    map.fitBounds(newBounds);
  }, [map, isLoaded, origin, destination, currentLocation]);

  // Handle map load
  const onLoad = useCallback(
    (map: google.maps.Map) => {
      setMap(map);
    },
    []
  );

  // Handle map unmount
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Calculate route and fit bounds when map is loaded
  useEffect(() => {
    if (map && isLoaded) {
      calculateRoute();
      fitMapToBounds();
    }
  }, [map, isLoaded, calculateRoute, fitMapToBounds]);

  // If the Google Maps API fails to load, display error message
  if (loadError) {
    return (
      <div className={`bg-gray-200 rounded flex items-center justify-center ${className}`}>
        <p className="text-gray-500">Error loading maps. Please try again later.</p>
      </div>
    );
  }

  // Show a loading state while the API is loading
  if (!isLoaded) {
    return (
      <div className={`bg-gray-200 rounded flex items-center justify-center ${className}`}>
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-800"></div>
      </div>
    );
  }

  return (
    <div className={className}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={
          currentLocation
            ? { lat: currentLocation.lat, lng: currentLocation.lng }
            : { lat: origin.lat, lng: origin.lng }
        }
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          fullscreenControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          zoomControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        }}
      >
        {/* Origin Marker */}
        <Marker
          position={{ lat: origin.lat, lng: origin.lng }}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
            scaledSize: new window.google.maps.Size(40, 40)
          }}
        />
        
        {/* Destination Marker */}
        <Marker
          position={{ lat: destination.lat, lng: destination.lng }}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            scaledSize: new window.google.maps.Size(40, 40)
          }}
        />
        
        {/* Current Location Marker (Truck) */}
        {currentLocation && (
          <>
            <Marker
              position={{ lat: currentLocation.lat, lng: currentLocation.lng }}
              icon={{
                url: '/truck-icon.png',
                scaledSize: new window.google.maps.Size(50, 30)
              }}
              onClick={() => setShowInfoWindow(true)}
            />
            
            {showInfoWindow && (
              <InfoWindow
                position={{ lat: currentLocation.lat, lng: currentLocation.lng }}
                onCloseClick={() => setShowInfoWindow(false)}
              >
                <div className="p-2">
                  <p className="font-medium">Future Connects Moving</p>
                  {eta && <p className="text-sm">ETA: {new Date(eta).toLocaleTimeString()}</p>}
                </div>
              </InfoWindow>
            )}
          </>
        )}
        
        {/* Route Path */}
        {routePath.length > 0 && (
          <Polyline
            path={routePath}
            options={{
              strokeColor: '#4A90E2',
              strokeOpacity: 0.8,
              strokeWeight: 5,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MoveMap; 