import { 
  Wifi, 
  Tv, 
  Coffee, 
  Utensils, 
  Car, 
  Bike, 
  Dumbbell, 
  BookOpen, 
  Droplets, 
  Bed, 
  Lock, 
  Users, 
  Sun, 
  Snowflake,
  Fan,
  Monitor,
  Printer,
  Gamepad2,
  Music,
  Camera
} from 'lucide-react';

export const FACILITY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  wifi: Wifi,
  tv: Tv,
  coffee: Coffee,
  kitchen: Utensils,
  parking: Car,
  bikeRental: Bike,
  gym: Dumbbell,
  library: BookOpen,
  hotWater: Droplets,
  ac: Bed,
  security: Lock,
  commonRoom: Users,
  balcony: Sun,
  airConditioning: Snowflake,
  fan: Fan,
  computer: Monitor,
  printer: Printer,
  gaming: Gamepad2,
  music: Music,
  photography: Camera
};

export const GENDER_OPTIONS = [
  { value: 'boys', label: 'Boys' },
  { value: 'girls', label: 'Girls' },
  { value: 'co-ed', label: 'Co-ed' }
] as const;

export const HOSTEL_STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' }
] as const; 