import React from 'react';
import SidebarLayout from '../layouts/SidebarLayout';
import ProjectItem from './ProjectItem';
import { useRouter } from 'next/router';

const ProjectSidebar = ({ projects = [] }) => {
	const {
		query: { id },
	} = useRouter();

	return (
		<SidebarLayout title="Projects">
			{projects.map(({ name, language, id: projectId }) => (
				<ProjectItem
					active={id == name.toLowerCase().split(' ').join('-')}
					title={name}
					language={language}
					key={projectId}
				/>
			))}
		</SidebarLayout>
	);
};

export default ProjectSidebar;
