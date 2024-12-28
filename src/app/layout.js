import { CurrentUserProvider } from "@/lib/providers/currentUser";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=''>
        <CurrentUserProvider>
          {children}
        </CurrentUserProvider>
      </body>
    </html>
  );
}
