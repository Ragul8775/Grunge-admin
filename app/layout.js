import { Inter, Roboto_Mono, Oswald} from 'next/font/google'
import "../styles/globals.css";
import Provider from "@/components/Provider";
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

const oswald = Oswald({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-oswald',
})
 

export const metadata = {
  title: "GrungeAdmin",
  description: "Content Management for Grunge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${roboto_mono.variable} ${oswald.variable}`}>
        <Provider>
        {children}

        </Provider>
        </body>
    </html>
  );
}
