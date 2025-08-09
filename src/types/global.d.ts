interface DataLayerEvent {
  event: string;
  hostel_data?: {
    id: string;
    name: string;
    location: string;
  };
  search_data?: {
    query: string;
    location: string;
  };
  post_data?: {
    hostel_name: string;
    hostel_type: string;
    city: string;
    area: string;
    facilities_count: number;
    room_types_count: number;
  };
}

interface Window {
  dataLayer: DataLayerEvent[];
}

declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
  }
} 