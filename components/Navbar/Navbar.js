import { Box, Button, Text, Icon, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiFillHome, AiFillBook, AiFillStar } from 'react-icons/ai';
import {
	BsStack,
	BsCircleFill,
	BsGithub,
	BsTwitter,
	BsLinkedin,
} from 'react-icons/bs';
import { FaPen } from 'react-icons/fa';
import { RiGameFill } from 'react-icons/ri';
import CurrentPlaying from './CurrentPlaying';
import ColorModeBtn from '../btn/ColorModeBtn';


function Navbar({ ...rest }) {
	return (
		<Flex {...rest} p={3} flexDir="column">
			<Text fontWeight="semibold" pl={3} justifySelf="flex-start"></Text>

			<Box mt={5}>
				<NavLink href="/" icon={<AiFillHome />}>
					Home
				</NavLink>
				<NavLink icon={<FaPen />}>Writing</NavLink>
			</Box>

			{/* Me */}
			<Box mt={10}>
				<SectionTitle>
					<Link href="/me">Me</Link>
				</SectionTitle>

				<NavLink href="/bookmarks" icon={<AiFillBook />}>
					Bookmarks
				</NavLink>
				<NavLink icon={<BsStack />}>Stack</NavLink>
				<NavLink icon={<AiFillStar />}>Gear</NavLink>
				<NavLink icon={<RiGameFill />}>Misc</NavLink>
			</Box>

			{/* Projects */}
			<Box mt={10}>
				<SectionTitle>
					<Link href="/projects">Recent Projects</Link>
				</SectionTitle>
				<NavLink noActive icon={<StatusIcon color="yellow" />}>
					B2C
				</NavLink>
				<NavLink noActive icon={<StatusIcon color="yellow" />}>
					Humans of Surat
				</NavLink>
				<NavLink noActive icon={<StatusIcon color="yellow" />}>
					TheTray
				</NavLink>
				<NavLink noActive icon={<StatusIcon color="yellow" />}>
					TodoKage
				</NavLink>
			</Box>

			<Box mt={10}>
				<SectionTitle>Social</SectionTitle>
				<NavLink
					noActive
					icon={<BsTwitter />}
					href="https://twitter.com/nishilkapadia"
				>
					Twitter
				</NavLink>
				<NavLink noActive icon={<BsGithub />} href="https://github.com/Nish7">
					Github
				</NavLink>
				<NavLink
					noActive
					icon={<BsLinkedin />}
					href="https://www.linkedin.com/in/nishil-kapadia/"
				>
					LinkedIn
				</NavLink>
			</Box>

			<Box mt="auto" w="100%">
				<CurrentPlaying />
				<ColorModeBtn />
			</Box>
		</Flex>
	);
}

function NavLink({ children, icon, noActive, isLink, href = '/coming-soon' }) {
	const { pathname } = useRouter();
	const active = noActive || href == '/coming-soon' ? false : pathname == href;

	return (
		<Link href={href} passHref target="_blank">
			<Button
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

function SectionTitle({ children }) {
	return (
		<Text fontSize="sm" fontWeight="semibold" color="gray.400" pl={3} mb={2}>
			{children}
		</Text>
	);
}

function StatusIcon({ color }) {
	return <Icon as={BsCircleFill} color={`${color}.500`} boxSize={2} />;
}

export default Navbar;
