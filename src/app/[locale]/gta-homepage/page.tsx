import { setRequestLocale } from 'next-intl/server';
import GTAHomepagePageComponent from './PageComponent';

export default async function GTAHomepagePage({ params: { locale = '' } }: { params: { locale: string } }) {
  // Enable static rendering
  setRequestLocale(locale);

  return <GTAHomepagePageComponent locale={locale} />;
}

export async function generateMetadata() {
  return {
    title: 'GTA AI - Free Magical GTA Art Image Generator',
    description: 'Transform your photos into Grand Theft Auto style with AI. Experience the 80s Miami neon aesthetic with our advanced artificial intelligence.',
    keywords: 'GTA AI, Grand Theft Auto, AI art generator, photo transformation, Vice City, neon art',
  };
}