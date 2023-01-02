import { Text } from '@chakra-ui/react';
import Link from 'next/link';
import { memo, ReactNode } from 'react';
import { useGlobalNavigationContext } from '../context/GlobalNavigationContext';

function SectionTitle({
	p_href = '/',
	children,
}: {
	p_href?: string;
	children: ReactNode;
}) {
	const { setIsOpen } = useGlobalNavigationContext();

	return (
		<Text
			onClick={() => setIsOpen(false)}
			fontSize="sm"
			fontWeight="semibold"
			color="gray.400"
			pl={3}
			mb={2}
		>
			<Link href={p_href} passHref>
				{children}
			</Link>
		</Text>
	);
}

export default memo(SectionTitle);