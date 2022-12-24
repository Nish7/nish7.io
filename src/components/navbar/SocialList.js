import { Box } from '@chakra-ui/react';
import React from 'react';
import { AiFillFile } from 'react-icons/ai';
import { BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs';
import NavLink from './NavLink';
import SectionTitle from './SectionTitle';

function SocialList() {
	return (
		<Box mt={10}>
			<SectionTitle>Social</SectionTitle>

			<NavLink
				newTab
				noActive
				icon={<AiFillFile />}
				href="https://drive.google.com/file/d/1QC6G8npqJJXqlJGD1O9LsytvMdtuxtUQ/view?usp=sharing"
			>
				Resume
			</NavLink>

			<NavLink
				newTab
				noActive
				icon={<BsTwitter />}
				href="https://twitter.com/nishilkapadia"
			>
				Twitter
			</NavLink>

			<NavLink
				newTab
				noActive
				icon={<BsGithub />}
				href="https://github.com/Nish7"
			>
				Github
			</NavLink>

			<NavLink
				newTab
				noActive
				icon={<BsLinkedin />}
				href="https://www.linkedin.com/in/nishil-kapadia/"
			>
				LinkedIn
			</NavLink>
		</Box>
	);
}

export default SocialList;
