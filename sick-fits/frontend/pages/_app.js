//THIS IS A SPECIAL FILE FOR GLOBAL LAYOUTS
import Page from "../components/Page";
//nprogress is for our progress bars
import NProgress from 'nprogress';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client'
import withData from '../lib/withData'
import '../components/styles/nprogress.css';


Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())


 function MyApp({Component, pageProps, apollo}){
    // console.log(apollo)
    return (
        //we wanta provider here 
        <ApolloProvider client = {apollo}>
            <Page>
                <Component {...pageProps} />
            </Page>
        </ApolloProvider>
        
    )
}

MyApp.getInitialProps = async function({ Component, ctx }){
    let pageProps = {};
    if(Component.getInitialProps){
        pageProps = await Component.getInitialProps(ctx)
    }

    pageProps.query = ctx.query;
    return { pageProps}

} //nextJS built in async methods
//inject the apollo client to my app
export default withData(MyApp);