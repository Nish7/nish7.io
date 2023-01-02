import { Text } from '@chakra-ui/react';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function SectionTitle({
	p_href = '/',
	children,
}: {
	p_href?: string;
	children: ReactNode;
}) {
	return (
		<Text fontSize="sm" fontWeight="semibold" color="gray.400" pl={3} mb={2}>
			<Link href={p_href} passHref>
				{children}
			</Link>
		</Text>
	);
}
