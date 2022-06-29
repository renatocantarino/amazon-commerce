import { useEffect } from 'react';
import '../styles/globals.css';
import { StoreProvide } from '../utils/context/Store';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <StoreProvide>
      <Component {...pageProps} />
    </StoreProvide>
  );
}

export default MyApp;
