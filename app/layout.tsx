import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Bricolage_Grotesque } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

const bricolageGrotesque = Bricolage_Grotesque({ 
  subsets: ['latin'],
  variable: '--font-bricolage-grotesque',
});

export const metadata: Metadata = {
  title: 'CodeSnippet - Share & Run Code (Python, React & More)',
  description: 'Save, organize, and share your code snippets with beautiful syntax highlighting and live execution',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${bricolageGrotesque.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
