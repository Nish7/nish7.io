import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const colors = {};

const styles = {
	global: (props) => ({
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
};

export default extendTheme({ config, styles, colors, fonts });
