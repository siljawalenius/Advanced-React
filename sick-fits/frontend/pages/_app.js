//THIS IS A SPECIAL FILE FOR GLOBAL LAYOUTS
import Page from "../components/Page";
//nprogress is for our progress bars
import NProgress from 'nprogress';
import Router from 'next/router';

import '../components/styles/nprogress.css';


Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())


export default function MyApp({Component, pageProps}){
    return (
        <Page>
            <Component {...pageProps} />
        </Page>
    )
}