import { Text } from '@chakra-ui/react';

export default function SectionTitle({ children }) {
	return (
		<Text fontSize="sm" fontWeight="semibold" color="gray.400" pl={3} mb={2}>
			{children}
		</Text>
	);
}
