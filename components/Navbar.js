import { Box, Button, Text, Icon, Flex } from '@chakra-ui/react';
import { AiFillHome, AiFillBook, AiFillStar } from 'react-icons/ai';
import {
	BsStack,
	BsCircleFill,
	BsSpotify,
	BsGithub,
	BsArrowUpRight,
	BsTwitter,
} from 'react-icons/bs';
import { FaPen } from 'react-icons/fa';
import CurrentPlaying from './CurrentPlaying';

function Navbar({ ...rest }) {
	return (
		<Flex {...rest} p={3} flexDir="column">
			<Text fontWeight="semibold" pl={3} justifySelf="flex-start"></Text>

			<Box mt={5}>
				<NavLink icon={<AiFillHome />} active>
					Home
				</NavLink>
				<NavLink icon={<FaPen />}>Writing</NavLink>
			</Box>

			{/* Me */}
			<Box mt={10}>
				<SectionTitle>Me</SectionTitle>

				<NavLink icon={<AiFillBook />}>Bookmarks</NavLink>
				<NavLink icon={<BsStack />}>Stack</NavLink>
				<NavLink icon={<AiFillStar />}>Technologies</NavLink>
			</Box>

			{/* Projects */}
			<Box mt={10}>
				<SectionTitle>Recent Projects</SectionTitle>
				<NavLink
					icon={<Icon as={BsCircleFill} color="yellow.500" boxSize={2} />}
				>
					B2C
				</NavLink>
				<NavLink icon={<Icon as={BsCircleFill} color="green" boxSize={2} />}>
					Humans of Surat
				</NavLink>
				<NavLink icon={<Icon as={BsCircleFill} color="green" boxSize={2} />}>
					TheTray
				</NavLink>
				<NavLink icon={<Icon as={BsCircleFill} color="red.500" boxSize={2} />}>
					TodoKage
				</NavLink>
			</Box>

			<Box mt={10}>
				<SectionTitle>Social</SectionTitle>
				<NavLink icon={<BsTwitter />} isLink>
					Twitter
				</NavLink>
				<NavLink icon={<BsGithub />}>Github</NavLink>
			</Box>

			<CurrentPlaying />
		</Flex>
	);
}

function NavLink({ children, icon, active, isLink }) {
	return (
		<Flex mb="3px" align="center" justify="space-between">
			<Button
				h="auto"
				isFullWidth
				leftIcon={icon}
				justifyContent="flex-start"
				variant={active ? 'solid' : 'ghost'}
				px={3}
				py={2}
			>
				<Text fontSize="sm" fontWeight={500}>
					{children}
				</Text>
			</Button>

			{isLink && <Icon as={BsArrowUpRight} boxSize={3} color="gray.500" />}
		</Flex>
	);
}

function SectionTitle({ children }) {
	return (
		<Text fontSize="sm" fontWeight="semibold" color="gray.400" pl={3} mb={2}>
			{children}
		</Text>
	);
}

export default Navbar;
