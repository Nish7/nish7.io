import theme from '../../../theme';
import { ChakraProvider } from '@chakra-ui/provider';
import GlobalNavigationProvider from './GlobalNavigationProvider';

function Providers({ children }) {
	return (
		<GlobalNavigationProvider>
			<ChakraProvider theme={theme}>{children}</ChakraProvider>
		</GlobalNavigationProvider>
	);
}

export default Providers;
