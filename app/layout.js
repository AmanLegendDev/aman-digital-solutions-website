import "./globals.css";


export const metadata = {
  title: "Aman Digital Solutions",
  description:
    "Professional websites, QR ordering systems and digital solutions for local businesses in Shimla.",
      icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
