import './globals.css';

export const metadata = {
  title: 'SimplyTek — Technology. Simplified.',
  description: 'Premium gadgets and smarter technology, all in one place. Shop headphones, laptops, smartphones, cameras, and drones with confidence.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&family=Manrope:wght@300;400;500;600;700;800&family=Rock+Salt&family=Russo+One&family=Space+Grotesk:wght@400;500;600;700;800&family=Zen+Dots&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
