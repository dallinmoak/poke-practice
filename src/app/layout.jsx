import CurrentUserProviderWrapper from "@/lib/client/providers/currentUserWrapper";
import "./globals.css";
import UserChecker from "@/components/client/UserChecker";

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
