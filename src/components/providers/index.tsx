import theme from '../../../theme';
import { ChakraProvider } from '@chakra-ui/provider';
import GlobalNavigationProvider from './GlobalNavigationProvider';
import { ReactNode } from 'react';

function Providers({ children }: { children?: ReactNode }) {
	return (
		<GlobalNavigationProvider>
			<ChakraProvider theme={theme}>{children}</ChakraProvider>
		</GlobalNavigationProvider>
	);
}

export default Providers;
