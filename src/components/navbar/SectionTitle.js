import { Text } from '@chakra-ui/react';
import Link from 'next/link';

export default function SectionTitle({ p_href = '/', children }) {
	return (
		<Text fontSize="sm" fontWeight="semibold" color="gray.400" pl={3} mb={2}>
			<Link href={p_href} passHref>
				{children}
			</Link>
		</Text>
	);
}
