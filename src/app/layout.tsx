// app/layout.tsx
/*import { Providers } from './providers'
import './styles/globals.css'

export const metadata = {
  title: 'ReSources Relationnelles',
  description: "L'application du ministère",
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params :{
    locale:string
  }
}) {
  const { locale } = params

  // Vérifie que la locale est correcte avant de l'utiliser
  if (!['en', 'fr'].includes(locale)) {
    throw new Error(`La locale '${locale}' n'est pas supportée.`)
  }
  return (
    <html lang="fr"> 
      <body>
        <Providers locale={locale}>
          {children}
        </Providers>
        </body>
    </html>
  )
}*/
/*'use client'

import '@/app/styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}*/

import {NextIntlClientProvider} from 'next-intl';
import {getLocale} from 'next-intl/server';
import "./styles/globals.css";
 
export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
 
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}


