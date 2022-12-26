import React, { useState } from 'react';
import { GlobalNavigationContext } from '../context/GlobalNavigationContext';

const GlobalNavigationProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<GlobalNavigationContext.Provider value={{ isOpen, setIsOpen }}>
			{children}
		</GlobalNavigationContext.Provider>
	);
};

export default GlobalNavigationProvider;
