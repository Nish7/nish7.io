import { Box, Button, Text, Icon, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiFillHome, AiFillBook, AiFillStar, AiFillFile } from 'react-icons/ai';
import {
	BsStack,
	BsCircleFill,
	BsGithub,
	BsTwitter,
	BsLinkedin,
} from 'react-icons/bs';
import { FaArrowLeft, FaPen } from 'react-icons/fa';
import { RiGameFill } from 'react-icons/ri';
import CurrentPlaying from './CurrentPlaying';
import ColorModeBtn from '../btn/ColorModeBtn';
import { tags_colors } from '../../lib/enums';
import getProjects from '../../lib/getProjects';
import { useState, useEffect, useContext } from 'react';
import { GlobalNavigationContext } from '../context/GlobalNavigationContext';
import { AiOutlineMenu } from 'react-icons/ai';
import { CloseButton } from '@chakra-ui/react';

function Navbar() {
	const { isOpen, setIsOpen } = useContext(GlobalNavigationContext);
	const [projectsData, setProjectData] = useState();
	const { pathname } = useRouter();
	const isPage = pathname.includes('[id]');

	useEffect(() => {
		getProjects().then((data) => setProjectData(data));
	}, []);

	let NavBtn = (
		<Icon
			zIndex={2}
			display={['inline', 'inline', 'none']}
			position={'absolute'}
			sx={{ cursor: 'pointer' }}
			top="5"
			onClick={() => setIsOpen(!isOpen)}
			left="5"
			as={!isOpen ? AiOutlineMenu : CloseButton}
		/>
	);

	if (isPage) {
		NavBtn = (
			<Link href={`/${pathname.split('/')[1]}`} passHref>
				<Icon
					zIndex={2}
					display={['inline', 'inline', 'none']}
					position={'absolute'}
					sx={{ cursor: 'pointer' }}
					top="5"
					left="5"
					as={FaArrowLeft}
				/>
			</Link>
		);
	}

	return (
		<>
			{NavBtn}

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

					{projectsData &&
						projectsData
							.map((p) => (
								<NavLink
									key={p.name}
									noActive
									href={
										'/projects/' + p.name.toLowerCase().split(' ').join('-')
									}
									icon={<StatusIcon color={tags_colors[p.language]} />}
								>
									{p.name}
								</NavLink>
							))
							.slice(0, 4)}
				</Box>

				<Box mt={10}>
					<SectionTitle>Social</SectionTitle>
					<NavLink
						noActive
						icon={<AiFillFile />}
						href="https://drive.google.com/file/d/1QC6G8npqJJXqlJGD1O9LsytvMdtuxtUQ/view?usp=sharing"
					>
						Resume
					</NavLink>
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
		</>
	);
}

function NavLink({ children, icon, noActive, isLink, href = '/coming-soon' }) {
	const { setIsOpen } = useContext(GlobalNavigationContext);

	const { pathname } = useRouter();
	const active = noActive || href == '/coming-soon' ? false : pathname == href;

	return (
		<Link href={href} passHref target="_blank">
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

function SectionTitle({ children }) {
	return (
		<Text fontSize="sm" fontWeight="semibold" color="gray.400" pl={3} mb={2}>
			{children}
		</Text>
	);
}

export function StatusIcon({ color, ...rest }) {
	return (
		<Icon as={BsCircleFill} color={`${color}.500`} boxSize={2} {...rest} />
	);
}
2;
export default Navbar;
