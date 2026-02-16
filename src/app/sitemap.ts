import { MetadataRoute } from 'next';
import { getCars } from '@/data/cars';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://autopozicovnamichalovce.sk';

    // Static routes
    const staticRoutes = [
        '',
        '/ponuka-vozidiel',
        '/kontakt',
        '/ochrana-osobnych-udajov',
        '/podmienky-prenajmu',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic car routes
    const cars = await getCars();
    const carRoutes = cars.map((car) => ({
        url: `${baseUrl}/vozidlo/${car.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...carRoutes];
}
