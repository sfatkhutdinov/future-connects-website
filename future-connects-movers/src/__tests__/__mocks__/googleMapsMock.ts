// Mock implementation of Google Maps API
class MockGeometry {
  location: { lat: () => number; lng: () => number };

  constructor(lat: number, lng: number) {
    this.location = {
      lat: () => lat,
      lng: () => lng
    };
  }
}

// Mock Google Maps API
const mockGoogleMapsApi = () => {
  // Mock Google Maps API
  (global as any).google = {
    maps: {
      places: {
        AutocompleteService: class {
          getPlacePredictions(
            request: any,
            callback: (predictions: any, status: string) => void
          ) {
            callback(
              [
                {
                  place_id: 'place123',
                  description: '123 Test Street, City, ST, USA',
                  structured_formatting: {
                    main_text: '123 Test Street',
                    secondary_text: 'City, ST, USA'
                  }
                }
              ],
              'OK'
            );
          }
        },
        PlacesService: class {
          constructor(attrContainer: any) {}

          getDetails(
            request: any,
            callback: (result: any, status: string) => void
          ) {
            callback(
              {
                place_id: 'place123',
                formatted_address: '123 Test Street, Test City, ST 12345, USA',
                geometry: new MockGeometry(38.9071923, -77.0368707),
                address_components: [
                  { long_name: '123', short_name: '123', types: ['street_number'] },
                  { long_name: 'Test Street', short_name: 'Test St', types: ['route'] },
                  { long_name: 'Test City', short_name: 'Test City', types: ['locality'] },
                  { long_name: 'State', short_name: 'ST', types: ['administrative_area_level_1'] },
                  { long_name: '12345', short_name: '12345', types: ['postal_code'] },
                  { long_name: 'United States', short_name: 'US', types: ['country'] }
                ]
              },
              'OK'
            );
          }
        },
        AutocompleteSessionToken: class {
          constructor() {}
        },
        PlacesServiceStatus: {
          OK: 'OK'
        }
      },
      LatLng: class {
        constructor(lat: number, lng: number) {
          this.lat = lat;
          this.lng = lng;
        }
        lat: number;
        lng: number;
      },
      LatLngBounds: class {
        constructor(sw: any, ne: any) {
          this.sw = sw;
          this.ne = ne;
        }
        sw: any;
        ne: any;
      }
    }
  };
};

export { mockGoogleMapsApi }; 