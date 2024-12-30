import CurrentUserProviderWrapper from "@/lib/client/providers/currentUserWrapper";
import "./globals.css";
import UserChecker from "@/components/client/UserChecker";
import Header from "@/components/client/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=''>
        <CurrentUserProviderWrapper>
          <UserChecker>
            <Header />
            <hr />
            {children}
          </UserChecker>
        </CurrentUserProviderWrapper>
      </body>
    </html>
  );
}
