import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { AiFillHome } from 'react-icons/ai';
import { FaPen } from 'react-icons/fa';
import CurrentPlaying from './CurrentPlaying';
import ColorModeBtn from '../btn/ColorModeBtn';
import { useGlobalNavigationContext } from '../context/GlobalNavigationContext';
import HamburgerMenuIcon from './HamburgerMenuIcon';
import GoBackBtn from './GoBackBtn';
import NavLink from './NavLink';
import SocialList from './SocialList';
import ProjectList from './ProjectList';
import MeList from './MeList';

function Navbar() {
	const { isOpen, setIsOpen } = useGlobalNavigationContext();
	const { pathname } = useRouter();
	const isPage = pathname.includes('[id]');

	return (
		<>
			{isPage ? (
				<GoBackBtn />
			) : (
				<HamburgerMenuIcon setIsOpen={setIsOpen} isOpen={isOpen} />
			)}

			<Flex
				display={{
					base: isOpen ? 'flex' : 'none',
					md: 'flex',
					lg: 'flex',
				}}
				w={['100%', '100%', '15%']}
				h="100vh"
				position="sticky"
				alignSelf="flex-start"
				top={0}
				p={3}
				flexDir="column"
			>
				<Box mt={[12, 14, 5]}>
					<NavLink href="/" icon={<AiFillHome />}>
						Home
					</NavLink>
					<NavLink icon={<FaPen />}>Writing</NavLink>
				</Box>

				<MeList />

				<ProjectList />

				<SocialList />

				<Box mt="auto" w="100%">
					<CurrentPlaying />
					<ColorModeBtn />
				</Box>
			</Flex>
		</>
	);
}

export default Navbar;
