import Navbar from './components/Navbar'
import './globals.css'

export const metadata = {
  title: 'MyApp',
  description: 'Aplikasi saya',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
