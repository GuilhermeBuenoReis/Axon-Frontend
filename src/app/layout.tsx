import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers/provider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Axon | Gerencie sua vida com inteligência',
  description:
    'Organize tarefas, rotinas e sua produtividade com clareza e foco usando o Axon.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.variable} font-sans antialiased text-foreground`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
