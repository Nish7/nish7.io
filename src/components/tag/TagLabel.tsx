import { colorSchemes } from '@/lib/consts';
import { Tag, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

const TagLabel = ({
	color = 'gray',
	children,
}: {
	color?: string;
	children: ReactNode;
}) => {
	return (
		<Tag
			size="sm"
			variant="solid"
			bg={colorSchemes[color].bg}
			py={1.5}
			px={3}
			my={2}
			mr={1}
			borderRadius={10}
			borderWidth="0.1px"
			borderColor={colorSchemes[color].borderColor}
		>
			<Text color={colorSchemes[color].color}>{children}</Text>
		</Tag>
	);
};

export default TagLabel;
