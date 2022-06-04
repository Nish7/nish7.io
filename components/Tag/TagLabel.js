import { Tag, Text } from '@chakra-ui/react';
import React from 'react';

const TagLabel = ({ color = 'gray', children }) => {
	const colorSchemes = {
		red: {
			bg: 'rgba(228, 62, 62, 0.1)',
			borderColor: 'rgba(171, 119, 119,0.1)',
			color: 'red.500',
		},
		blue: {
			bg: 'rgba(0, 67, 255,0.1)',
			borderColor: 'rgba(0, 67, 255,0.1)',
			color: 'blue.500',
		},
		gray: {
			bg: 'rgb(91, 91, 91,0.15)',
			borderColor: 'rgba(91, 91, 91,0.1)',
			color: 'gray.500',
		},
		purple: {
			bg: 'rgba(140, 0, 255,0.1)',
			borderColor: 'rgba(140, 0, 255,0.1)',
			color: 'purple.500',
		},
	};

	return (
		<Tag
			size="sm"
			variant="solid"
			bg={colorSchemes[color].bg}
			py={1.5}
			px={3}
			my={2}
			borderRadius={10}
			borderWidth="0.1px"
			borderColor={colorSchemes[color].borderColor}
		>
			<Text color={colorSchemes[color].color}>{children}</Text>
		</Tag>
	);
};

export default TagLabel;