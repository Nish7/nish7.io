import { createContext, useContext } from 'react';

export interface GlobalNavigationContextInterface {
	isOpen: boolean;
	setIsOpen: (b: boolean) => void;
}

export const GlobalNavigationContext =
	createContext<GlobalNavigationContextInterface | null>(null);

export const useGlobalNavigationContext = () => {
	const c = useContext(GlobalNavigationContext);
	if (c == undefined) throw new Error();
	return c;
};
