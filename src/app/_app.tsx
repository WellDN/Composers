import { AppProps } from "next/app";
import RootLayout from "./layout";
import { PageProps } from "../../.next/types/app/layout";
import jwt, { JwtPayload } from "jsonwebtoken";
import { useAuth } from "./context/authContext";
import Cookies from 'js-cookie'
import { User } from "./backend/user";

export default function App({ Component, pageProps }: AppProps<PageProps>) {

  const { setUser } = useAuth(); 

  const token = Cookies.get('token') || '';
 

  if (token) {
    try {
      const decoded = jwt.decode(token) as JwtPayload;
      const user: User = {
          id: 0,
          email: "",
          password: "",
          userId: decoded.userId as string,
      };
      setUser(user);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
    return (
            <RootLayout>
            <Component {...pageProps}/>
            </RootLayout>
           );
}
