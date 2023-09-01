import { AppProps } from "next/app";
import { AuthProvider } from "./context/authContext";
import { PageProps } from "../../.next/types/app/layout";

function MyApp({ Component, pageProps }: AppProps<PageProps>) {

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
