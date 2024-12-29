import CurrentUserProviderWrapper from "@/lib/providers/currentUserWrapper";
import "./globals.css";
import UserChecker from "@/components/UserChecker";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=''>
        <CurrentUserProviderWrapper>
          <UserChecker>
            {children}
          </UserChecker>
        </CurrentUserProviderWrapper>
      </body>
    </html>
  );
}
