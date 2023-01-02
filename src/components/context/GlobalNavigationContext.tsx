import { createContext, useContext } from 'react';

export interface GlobalNavigationContextInterface {
	isOpen: boolean;
	setIsOpen: (b: boolean) => void;
}

export const GlobalNavigationContext = createContext<GlobalNavigationContextInterface>(
	{
		isOpen: false,
		setIsOpen: () => {},
	}
);

export const useGlobalNavigationContext = () => {
	return useContext(GlobalNavigationContext);
};
