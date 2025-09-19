import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Crosshair } from 'lucide-react';

interface LocationMapPickerProps {
  onLocationSelect?: (coordinates: [number, number], address: string) => void;
  initialLocation?: [number, number];
  className?: string;
}

// Dubai location coordinates
const DUBAI_LOCATIONS = {
  'palm-jumeirah': { center: [55.1184, 25.1124], zoom: 13, name: 'Palm Jumeirah' },
  'dubai-hills': { center: [55.2500, 25.1165], zoom: 13, name: 'Dubai Hills Estate' },
  'jumeirah-islands': { center: [55.1950, 25.0370], zoom: 13, name: 'Jumeirah Islands' },
  'emirates-hills': { center: [55.1590, 25.0870], zoom: 13, name: 'Emirates Hills' },
  'jumeirah-golf-estate': { center: [55.2770, 25.0790], zoom: 13, name: 'Jumeirah Golf Estates' },
  'al-barari': { center: [55.2380, 25.0820], zoom: 13, name: 'Al Barari' }
};

export function LocationMapPicker({ 
  onLocationSelect, 
  initialLocation = [55.2708, 25.2048], // Dubai center
  className = "h-64"
}: LocationMapPickerProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [selectedCoords, setSelectedCoords] = useState<[number, number]>(initialLocation);
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (!mapContainer.current) return;

    // Get Mapbox token from Supabase secrets
    mapboxgl.accessToken = 'pk.eyJ1IjoibHV4dXJ5bGFicyIsImEiOiJjbTRlc2Q1ZjAwOG45MmlzOGZha3B5ZXNuIn0.placeholder'; // This will be replaced with actual token

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: initialLocation,
      zoom: 11,
      pitch: 0,
      bearing: 0
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Create initial marker
    marker.current = new mapboxgl.Marker({
      color: '#8B5CF6',
      draggable: true
    })
      .setLngLat(initialLocation)
      .addTo(map.current);

    // Handle marker drag
    marker.current.on('dragend', () => {
      if (marker.current) {
        const lngLat = marker.current.getLngLat();
        const coords: [number, number] = [lngLat.lng, lngLat.lat];
        setSelectedCoords(coords);
        reverseGeocode(coords);
        onLocationSelect?.(coords, address);
      }
    });

    // Handle map clicks
    map.current.on('click', (e) => {
      const coords: [number, number] = [e.lngLat.lng, e.lngLat.lat];
      setSelectedCoords(coords);
      
      if (marker.current) {
        marker.current.setLngLat(coords);
      }
      
      reverseGeocode(coords);
      onLocationSelect?.(coords, address);
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [initialLocation]);

  const reverseGeocode = async (coords: [number, number]) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords[0]},${coords[1]}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const place = data.features[0].place_name;
        setAddress(place);
        onLocationSelect?.(coords, place);
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      setAddress('Unknown location');
    }
  };

  const flyToLocation = (locationKey: keyof typeof DUBAI_LOCATIONS) => {
    const location = DUBAI_LOCATIONS[locationKey];
    if (map.current && marker.current) {
      map.current.flyTo({
        center: location.center as [number, number],
        zoom: location.zoom,
        essential: true
      });
      
      marker.current.setLngLat(location.center as [number, number]);
      setSelectedCoords(location.center as [number, number]);
      setAddress(location.name);
      onLocationSelect?.(location.center as [number, number], location.name);
    }
  };

  return (
    <Card className={className}>
      <CardContent className="p-0">
        <div className="relative">
          <div ref={mapContainer} className={`w-full ${className} rounded-lg`} />
          
          {/* Quick location buttons */}
          <div className="absolute top-2 left-2 z-10 space-y-1">
            <div className="bg-background/90 backdrop-blur-sm rounded-lg p-2 space-y-1 max-h-32 overflow-y-auto">
              <div className="text-xs font-medium text-muted-foreground mb-1">Quick Select:</div>
              {Object.entries(DUBAI_LOCATIONS).map(([key, location]) => (
                <Button
                  key={key}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs h-6 px-2"
                  onClick={() => flyToLocation(key as keyof typeof DUBAI_LOCATIONS)}
                >
                  <MapPin className="h-3 w-3 mr-1" />
                  {location.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Current location indicator */}
          {address && (
            <div className="absolute bottom-2 left-2 right-2 z-10">
              <Card className="bg-background/90 backdrop-blur-sm border">
                <CardContent className="p-2">
                  <div className="flex items-center gap-2">
                    <Crosshair className="h-4 w-4 text-primary" />
                    <div>
                      <div className="text-xs font-medium">Selected Location</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {address}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {selectedCoords[1].toFixed(6)}, {selectedCoords[0].toFixed(6)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}