import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { Dict } from '@chakra-ui/utils';

const styles = {
	global: (props: Dict<any>) => ({
		body: {
			bg: mode('white', '#111')(props),
			color: mode('black', 'whiteAlpha.900')(props),
		},
	}),
};

const fonts = {
	body: 'IBM Plex Sans',
};

export const config = {
	initialColorMode: 'dark',
	useSystemColorMode: true,
} as const;

export default extendTheme({ config, styles, fonts });
