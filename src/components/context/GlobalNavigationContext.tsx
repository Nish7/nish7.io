import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export interface GlobalNavigationContextInterface {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const GlobalNavigationContext =
	createContext<GlobalNavigationContextInterface>(
		{} as GlobalNavigationContextInterface
	);

export const useGlobalNavigationContext = () => {
	return useContext(GlobalNavigationContext);
};
