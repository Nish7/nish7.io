import { colorSchemes } from '@/lib/consts';
import { Tag, Text } from '@chakra-ui/react';
import { memo, ReactNode } from 'react';

const TagLabel = ({
	color = 'gray',
	children,
}: {
	color?: string;
	children: ReactNode;
}) => {
	const scheme = colorSchemes[color] ?? colorSchemes.gray;

	return (
		<Tag
			size="sm"
			variant="solid"
			bg={scheme.bg}
			py={1.5}
			px={3}
			my={2}
			mr={1}
			borderRadius={10}
			borderWidth="0.1px"
			borderColor={scheme.borderColor}
		>
			<Text color={scheme.color}>{children}</Text>
		</Tag>
	);
};

export default memo(TagLabel);
