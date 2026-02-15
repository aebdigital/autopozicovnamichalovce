import { createClient } from "@/lib/supabase/client";

export interface CarPricing {
  "1day": number;
  "2-3days": number;
  "4-7days": number;
  "7-21days": number;
  "21plus": string;
  deposit: number;
}

export interface CarLimits {
  daily: string;
  excess: string;
}

export interface Car {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  seats: number;
  transmission: string;
  fuel: string;
  luggage: string;
  description: string;
  shortDescription: string;
  features: string[];
  pricing: CarPricing;
  limits: CarLimits;
  show_on_homepage?: boolean;
}

// Fallback pricing if missing
const defaultPricing: CarPricing = {
  "1day": 0,
  "2-3days": 0,
  "4-7days": 0,
  "7-21days": 0,
  "21plus": "Cena dohodou",
  deposit: 0,
};

const defaultLimits: CarLimits = {
  daily: "200km",
  excess: "0.10€/km",
};

export async function getCars(): Promise<Car[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("site_id", process.env.NEXT_PUBLIC_SITE_ID!)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching cars:", error);
    return [];
  }

  // Map Supabase generic car + metadata to Darius Car interface
  return data.map((dbCar: any) => {
    const meta = dbCar.metadata || {};

    // Resolve image URL
    let imageUrl = dbCar.image;
    if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
      // Assuming standard Supabase storage URL pattern if not absolute and not local
      imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/site-uploads/${imageUrl}`;
    }
    if (!imageUrl) imageUrl = "/cars/placeholder.png"; // Fallback

    return {
      id: dbCar.id,
      name: meta.name || `${dbCar.brand} ${dbCar.model}`,
      price: dbCar.price,
      image: imageUrl,
      category: meta.category || dbCar.category || "Kompakt",
      seats: dbCar.seats || 5,
      transmission: dbCar.transmission || "Manuál",
      fuel: dbCar.fuel || "Benzín",
      luggage: dbCar.luggage || meta.luggage || "",
      description: dbCar.description || "",
      shortDescription: meta.shortDescription || "",
      features: dbCar.features || [],
      pricing: meta.pricing || defaultPricing,
      limits: meta.limits || defaultLimits,
      show_on_homepage: dbCar.show_on_homepage,
    };
  });
}

export async function getCarBySlug(slug: string): Promise<Car | undefined> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("id", slug)
    .single();

  if (error || !data) {
    return undefined;
  }

  const dbCar = data;
  const meta = dbCar.metadata || {};

  // Resolve image URL
  let imageUrl = dbCar.image;
  if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
    imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/site-uploads/${imageUrl}`;
  }
  if (!imageUrl) imageUrl = "/cars/placeholder.png";

  return {
    id: dbCar.id,
    name: meta.name || `${dbCar.brand} ${dbCar.model}`,
    price: dbCar.price,
    image: imageUrl,
    category: meta.category || dbCar.category || "Kompakt",
    seats: dbCar.seats || 5,
    transmission: dbCar.transmission || "Manuál",
    fuel: dbCar.fuel || "Benzín",
    luggage: dbCar.luggage || meta.luggage || "",
    description: dbCar.description || "",
    shortDescription: meta.shortDescription || "",
    features: dbCar.features || [],
    pricing: meta.pricing || defaultPricing,
    limits: meta.limits || defaultLimits,
  };
}

export function calculateDailyRate(car: Car, days: number): number {
  if (days === 1) return car.pricing["1day"];
  if (days >= 2 && days <= 3) return car.pricing["2-3days"];
  if (days >= 4 && days <= 6) return car.pricing["4-7days"];
  return car.pricing["7-21days"];
}

export function calculateDaysBetween(start: string, end: string): number {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
  );
}

// Temporary export for build compatibility if synchronous access is still needed somewhere hardcoded
export const cars: Car[] = []; 
