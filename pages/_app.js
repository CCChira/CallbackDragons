import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {UserProvider} from "@auth0/nextjs-auth0";
import initStore from '../store/store';
import Layout from '../Components/Layout';
import '../node_modules/highlight.js/styles/googlecode.css';

export default function MyApp(props) {
    const {Component, pageProps} = props;
    const {store, persistor} = initStore();

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <UserProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ThemeProvider theme={theme}>
                        <Layout>
                            <React.Fragment>
                                <Head>
                                    <title>My page</title>
                                    <meta name="viewport"
                                          content="minimum-scale=1, initial-scale=1, width=device-width"/>
                                </Head>

                                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                                <CssBaseline/>
                                <Component {...pageProps} />
                            </React.Fragment>
                        </Layout>
                    </ThemeProvider>
                </PersistGate>
            </Provider>
        </UserProvider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
