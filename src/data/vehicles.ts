import { 
  Volume2, 
  BatteryCharging, 
  Monitor, 
  Wind, 
  Wifi, 
  Sparkles,
  Armchair,
  Maximize2,
  Plug,
  Coffee,
  LucideIcon
} from 'lucide-react';

export interface VehicleFeature {
  icon: LucideIcon;
  label: string;
}

export interface Vehicle {
  id: number;
  title: string;
  description: string;
  image: string;
  passengers: string;
  luggage: string;
  features: VehicleFeature[];
}

export const vehicles: Vehicle[] = [
  {
    id: 1,
    title: "TESLA MODEL Y",
    description: "Un silence absolu et un espace généreux pour 4 passagers. Profitez d'une expérience 100% électrique dans un habitacle moderne et lumineux, équipé des dernières technologies pour vos trajets urbains et interurbains.",
    image: "/images/tesla-yy-png.png",
    passengers: "4",
    luggage: "3",
    features: [
      { icon: Volume2, label: "Silence total" },
      { icon: BatteryCharging, label: "Chargeurs USB-C" },
      { icon: Monitor, label: "Écran 15\" tactile" },
      { icon: Wind, label: "Clim bi-zone" },
      { icon: Wifi, label: "WiFi gratuit" },
      { icon: Sparkles, label: "Toit panoramique" }
    ]
  },
  {
    id: 2,
    title: "MERCEDES V-CLASS",
    description: "L'espace et le luxe Mercedes pour vos transferts en groupe. Jusqu'à 8 passagers dans un confort absolu, avec sièges cuir modulables, espace jambes généreux et finitions haut de gamme pour familles et groupes.",
    image: "/images/Van-merecedes-png.png",
    passengers: "6-8",
    luggage: "4-5",
    features: [
      { icon: Armchair, label: "Sièges cuir confort" },
      { icon: Maximize2, label: "Espace XXL" },
      { icon: Wind, label: "Clim 3 zones" },
      { icon: Wifi, label: "WiFi gratuit" },
      { icon: Plug, label: "Prises 220V + USB" },
      { icon: Coffee, label: "Rafraîchissements" }
    ]
  },
  {
    id: 3,
    title: "TESLA MODEL 3",
    description: "Berline sportive et raffinée offrant un confort optimal pour vos trajets d'affaires. Sièges ergonomiques, silence de roulage exceptionnel et design minimaliste pour une expérience de voyage zen et productive.",
    image: "/images/Tesla-3-png.png",
    passengers: "4",
    luggage: "2",
    features: [
      { icon: Volume2, label: "Silence total" },
      { icon: BatteryCharging, label: "Chargeurs USB-C" },
      { icon: Monitor, label: "Écran 15\" tactile" },
      { icon: Wind, label: "Clim automatique" },
      { icon: Wifi, label: "WiFi gratuit" },
      { icon: Armchair, label: "Sièges ergonomiques" }
    ]
  }
];
