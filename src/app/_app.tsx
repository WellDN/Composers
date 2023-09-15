import { AppProps } from "next/app";
import RootLayout from "./layout";
import { PageProps } from "../../.next/types/app/layout";

export default function App({ Component, pageProps }: AppProps<PageProps>) {

    return (
            <RootLayout>
            <Component {...pageProps}/>
            </RootLayout>
           );
}
