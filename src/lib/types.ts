import { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export type _NextPage<P = {}> = NextPage<P> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

export type _AppProps = AppProps & {
	Component: _NextPage;
};
