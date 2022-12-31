import { Button, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode } from 'react';
import { useGlobalNavigationContext } from '../context/GlobalNavigationContext';

interface NavlinkProp {
	children: ReactNode;
	icon: ReactElement;
	noActive?: boolean;
	href?: string;
	newTab?: boolean;
}

function NavLink({
	children,
	icon,
	noActive = false,
	href = '/coming-soon',
	newTab = false,
}: NavlinkProp) {
	const { setIsOpen } = useGlobalNavigationContext();
	const { pathname } = useRouter();

	const active = noActive || href == '/coming-soon' ? false : pathname == href;

	return (
		<Link
			style={{ textDecoration: 'none' }}
			href={href}
			passHref
			target={newTab ? '_blank' : ''}
		>
			<Button
				onClick={() => setIsOpen(false)}
				h="auto"
				isFullWidth
				leftIcon={icon}
				justifyContent="flex-start"
				variant={active ? 'solid' : 'ghost'}
				px={3}
				py={2}
				_focus={{ boxShadow: 'none' }}
			>
				<Text fontSize="sm" fontWeight={500}>
					{children}
				</Text>
			</Button>
		</Link>
	);
}

export default NavLink;
