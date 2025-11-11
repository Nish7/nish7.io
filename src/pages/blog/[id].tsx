import React from 'react';
import TagLabel from '@/components/tag/TagLabel';
import { Text, Box, Heading, List, ListItem, Code, Link as ChakraLink, useColorModeValue, Flex } from '@chakra-ui/react';
import HeadMeta from '@/components/layouts/HeadMeta';
import { IParams, PostProp } from '@/lib/types/interface';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { getAllPostIds, getPostData } from '@/lib/getPosts';
import { SyntaxHighlighterProps, Prism as Highlight } from "react-syntax-highlighter";
const SyntaxHighlighter = (Highlight as any) as React.FC<SyntaxHighlighterProps>;
import { oneLight, atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import Link from 'next/link';

const BlogPage = ({ post }: { post: PostProp }) => {
	const {
		title,
		date,
		content,
	} = post;

	const theme = useColorModeValue(oneLight, atomDark);

	return (
		<>
			<HeadMeta title={title} />

			<Box
				w={['100%', '100%', '65%']}
				mt={[10, 10, 10]}
				p={[4, 4, 8]}
				mx="auto"
				minH="90vh"
			>
				<Text fontWeight="bold" fontSize="4xl">
					{title.split('-').join(' ')}
				</Text>

				<Box mt={2} mb={10} fontWeight="light" color="light-grey" fontSize="md">
					<TagLabel>{date}</TagLabel>
				</Box>

				<Box color="grey.300" fontSize="md">
					<ReactMarkdown
						remarkPlugins={[remarkGfm]}
						components={{
							p: ({ node, ...props }) => <Text lineHeight="1.6" mb="1em" {...props} />,
							h1: ({ node, ...props }) => (
								<Heading as="h1" size="xl" mt="1.5em" mb="0.75em" lineHeight="1.6" {...props} />
							),
							h2: ({ node, ...props }) => (
								<Heading as="h2" size="lg" mt="1.5em" mb="0.75em" lineHeight="1.6" {...props} />
							),
							h3: ({ node, ...props }) => (
								<Heading as="h3" size="md" mt="1.25em" mb="0.5em" lineHeight="1.6" {...props} />
							),
							ul: ({ node, ...props }) => (
								<List styleType="disc" pl="1.25em" mb="2em" {...props} />
							),
							ol: ({ node, ...props }) => (
								<List as="ol" styleType="decimal" pl="1.25em" mb="2em" {...props} />
							),
							li: ({ node, ...props }) => <ListItem mb="1em" mt="1em" pl={1} {...props} />,
							blockquote: ({ children, ...props }) => (
								<blockquote
									style={{
										borderLeft: "4px solid gray",
										paddingLeft: "1em",
										color: "gray.400",
										fontStyle: "italic",
										marginBottom: "1em",
									}}
									{...props}
								>
									{children}
								</blockquote>
							),
							code(props) {
								const { children, className, node, ...rest } = props;
								const match = /language-(\w+)/.exec(className || '');
								return match ? (
									<SyntaxHighlighter
										{...rest}
										PreTag="div"
										language={match[1]}
										style={theme}
										customStyle={{
											marginBottom: "1em",
									    fontSize: "0.9rem",
											padding: "1em",
											overflowX: "auto",
											borderRadius: "8px"
										}}
									>
										{String(children).replace(/\n$/, '')}
									</SyntaxHighlighter>
								) : (
									<Code {...rest} ml={1} variant="subtle" pl={1} borderRadius={4} className={className}>
										{children}
									</Code>
								);
							},
							a: ({ href, children, ...props }) => (
								<Link href={href ?? ""} passHref legacyBehavior>
									<ChakraLink textDecoration="underline" _hover={{ color: "blue.400" }} {...props}>
										{children}
									</ChakraLink>
								</Link>
							),
						}}
					>
						{content}
					</ReactMarkdown>
				</Box>
			</Box>
			<Flex
				w="100%"
				p={[4, 4, 8]}
				mx="auto"
				as="footer"
				py={4}
				mt={16}
				justifyContent="space-between"
				alignItems="center">
				<Text fontSize="sm">
					© 2025 Nishil Kapadia.
				</Text>

				<Text fontSize="sm">
					Made with ❤️
				</Text>
			</Flex>
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	return { paths: getAllPostIds(), fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	const { id } = context.params as IParams;
	const post = getPostData(id);

	if (!post) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			post,
		},
		revalidate: 10,
	};
};

export default BlogPage;
