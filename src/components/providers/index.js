import { useState } from 'react';
import theme from '../../../theme';
import { ChakraProvider } from '@chakra-ui/provider';
import { GlobalNavigationContext } from '../context/GlobalNavigationContext';

function Providers({ children }) {
	const [state, setState] = useState({
		isOpen: false,
		setIsOpen,
	});

	function setIsOpen(isOpen) {
		return setState({ ...state, isOpen });
	}

	return (
		<GlobalNavigationContext.Provider value={state}>
			<ChakraProvider theme={theme}>{children}</ChakraProvider>
		</GlobalNavigationContext.Provider>
	);
}

export default Providers;
