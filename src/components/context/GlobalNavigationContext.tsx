import { createContext, useContext } from 'react';

export interface GlobalNavigationContextInterface {
	isOpen: boolean;
	setIsOpen: (b: boolean) => void;
}

export const GlobalNavigationContext = createContext<
	GlobalNavigationContextInterface | undefined
>(undefined);

export const useGlobalNavigationContext = () =>
	useContext(GlobalNavigationContext);
