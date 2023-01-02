import { Box } from '@chakra-ui/react';
import {
	ReactNode,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
} from 'react';

interface ShortcutProp {
	command: string;
	callback: () => void;
	node?: HTMLElement | null;
	children: ReactNode;
}

export default function Shortcut({
	command,
	callback,
	node = null,
	children,
}: ShortcutProp) {
	// implement the callback ref pattern
	const [combination, cKey] = command.split('+');

	const callbackRef = useRef<() => void>(callback);

	useLayoutEffect(() => {
		callbackRef.current = callback;
	});

	// handle what happens on key press
	const handleKeyPress = useCallback(
		(event: any) => {
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
