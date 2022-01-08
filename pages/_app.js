import theme from '../theme';
import { ChakraProvider } from '@chakra-ui/provider';
import Navbar from '@/components/Navbar';

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<Navbar />
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
