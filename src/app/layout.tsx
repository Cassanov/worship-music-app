import './globals.css';

export const metadata = {
  title: 'Bible Centered Church - Music Team',
  description: 'Worship song chords and singer keys',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
