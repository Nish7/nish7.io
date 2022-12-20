import { Button, Link, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { GlobalNavigationContext } from '../context/GlobalNavigationContext';

function NavLink({
	children,
	icon,
	noActive,
	isLink,
	href = '/coming-soon',
	newTab = false,
}) {
	const { setIsOpen } = useContext(GlobalNavigationContext);
	const { pathname } = useRouter();

	const active = noActive || href == '/coming-soon' ? false : pathname == href;

	return (
		<Link href={href} passHref target={newTab ? '_blank' : ''}>
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
