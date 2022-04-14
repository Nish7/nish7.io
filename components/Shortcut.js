import { Box } from '@chakra-ui/react';
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

export default function Shortcut({ command, callback, node = null, children }) {
	// implement the callback ref pattern
	const [combination, cKey] = command.split('+');

	const callbackRef = useRef(callback);
	useLayoutEffect(() => {
		callbackRef.current = callback;
	});

	// handle what happens on key press
	const handleKeyPress = useCallback(
		(event) => {
			if (event.key === cKey && event[combination]) {
				callbackRef.current();
			}
		},
		[combination, cKey]
	);

	useEffect(() => {
		// target is either the provided node or the document
		const targetNode = node ?? document;
		// attach the event listener
		targetNode && targetNode.addEventListener('keydown', handleKeyPress);

		// remove the event listener
		return () =>
			targetNode && targetNode.removeEventListener('keydown', handleKeyPress);
	}, [handleKeyPress, node]);

	return <Box>{children}</Box>;
}
