import Head from 'next/head';
import React from 'react';

function HeadMeta({ title }) {
	return (
		<Head>
			<title>{title}</title>
			{/*  Facebook Open Graph */}
			<meta property="og:locale" content="en_US" />
			<meta property="og:site_name" content="nish7.io" />
			<meta property="og:title" content={title} />
			<meta property="og:type" content="article" />
			<meta property="og:image" content={`/card_social.png`} />
			<meta property="og:image:url" content={`/card_social.png`} />
			<meta property="og:image:secure_url" content={`/card_social.png`} />

			{/* Twitter Cards */}
			<meta name="twitter:title" content={title} />
			<meta name="twitter:url" content="nish7.io" />
			<meta name="twitter:image" content={'/card_social.png'} />
			<meta name="twitter:card" content="summary_large_image" />
		</Head>
	);
}

export default HeadMeta;
