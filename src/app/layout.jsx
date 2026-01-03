import './globals.css';
import { ThemeProvider } from '../components/theme-provider.jsx';
import { Navbar } from '../components/layout/navbar.jsx';
import { Footer } from '../components/layout/footer.jsx';
import { Toaster } from '../components/ui/toaster.jsx';
import { cn } from '../lib/utils.js';

export const metadata = {
  title: 'MLera - Interactive Machine Learning',
  description: 'Recreation of the MLera UI for the internship assignment.',
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased min-h-screen flex flex-col')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
