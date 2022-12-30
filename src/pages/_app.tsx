import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';
import { useEffect } from 'react';
import { Flex, useMediaQuery } from '@chakra-ui/react';
import Navbar from '@/components/navbar';
import Providers from '@/components/providers';
import { useGlobalNavigationContext } from '@/components/context/GlobalNavigationContext';
import { _AppProps } from '@/lib/types';

function MyApp({ Component, pageProps }: _AppProps) {
	const getLayout = Component.getLayout || ((page) => page);

	const { isOpen, setIsOpen } = useGlobalNavigationContext();
	const [isLargerThan800] = useMediaQuery('(min-width: 800px)');

	useEffect(() => {
		if (isLargerThan800) {
			setIsOpen(false);
		}
	}, [isLargerThan800, setIsOpen]);

	return (
		<Providers>
			<Flex>
				<Navbar />

				<Flex
					display={{
						base: !isOpen ? 'flex' : 'none',
						md: 'flex',
						lg: 'flex',
					}}
					w={['100%', '100%', '85%']}
					minH="100vh"
					flexDirection="column"
					justifyContent={['flex-start', 'flex-start', 'center']}
				>
					{getLayout(<Component {...pageProps} />)}
				</Flex>
			</Flex>
		</Providers>
	);
}



export default MyApp;
