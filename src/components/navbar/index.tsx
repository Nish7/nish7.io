import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { AiFillBook, AiFillHome } from 'react-icons/ai';
import { FaPen } from 'react-icons/fa';
import CurrentPlaying from './CurrentPlaying';
import ColorModeBtn from '../btn/ColorModeBtn';
import { useGlobalNavigationContext } from '../context/GlobalNavigationContext';
import HamburgerMenuIcon from './HamburgerMenuIcon';
import GoBackBtn from './GoBackBtn';
import NavLink from './NavLink';
import SocialList from './SocialList';
import ProjectList from './ProjectList';
import { memo } from 'react';
import { RiGameFill } from 'react-icons/ri';

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
					<NavLink href="/blog" icon={<FaPen />}>Writing</NavLink>
					<NavLink href="/bookmarks" icon={<AiFillBook />}>
						Bookmarks
					</NavLink>
					<NavLink href="/misc" icon={<RiGameFill />}>
						Misc
					</NavLink>
				</Box>

				<ProjectList />

				<SocialList />

				<Box mt="auto" w="100%">
					{/* <CurrentPlaying />  // for local development */}
					<ColorModeBtn />
				</Box>
			</Flex>
		</>
	);
}

export default memo(Navbar);
