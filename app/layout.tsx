import type { Metadata } from 'next';
import './globals.css';
import { assetUrl, siteUrl } from '@/lib/site';
import { SITE_DESCRIPTION_DEFAULT, SITE_TITLE_DEFAULT } from '@/lib/meta';

export const metadata: Metadata = { metadataBase: new URL(siteUrl), title: { default: SITE_TITLE_DEFAULT, template: '%s | mono.' }, description: SITE_DESCRIPTION_DEFAULT, icons: [{ rel: 'icon', url: assetUrl('/favicon.svg'), type: 'image/svg+xml' }] };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ru"><body><a className="skip-link" href="#main-content">Перейти к содержанию</a>{children}</body></html>; }