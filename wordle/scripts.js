import { wordleWords } from './word-list';

const EXCLUDE_CHARACTERS_REGEX = /\(([a-z]+)\)/gi;
const DUPLICATE_CHARACTER_REGEX = /(.).*\1/i;
/* cspell: disable-next-line */
const ALPHABETS = 'abcdefghijklmnopqrstuvxwyz';

const available = ALPHABETS;
const unavailable = '';
const pattern = '*****';
const known = '';
const repeat = true;

/** @type {() => string[]} */
export const findWords = () => {



	const availableCharacters = (
		unavailable
			? available.replace(new RegExp(`[${unavailable}]`, 'gi'), '')
			: available
	);

	const regex = new RegExp(
		pattern
			.replace(
				/\*/g,
				`[${availableCharacters}]`
			)
			.replace(
				EXCLUDE_CHARACTERS_REGEX,
				(_, p1) => `[${availableCharacters.replace(new RegExp(`[${p1}]`, 'gi'), '')}]`
			),
		'i'
	);

	const matches = wordleWords.filter(word =>
		(repeat || !DUPLICATE_CHARACTER_REGEX.test(word))
		&& known.split('').every(character => word.includes(character))
		&& regex.test(word)
	);

	return matches;

};

const input = document.getElementById('input');
const display = document.getElementById('display');
const button = document.getElementById('switch');
let intervalId = undefined;

input.addEventListener('keyup', (event) => {
	let number = parseInt(event.target.value);
	if (isNaN(number) || number > 1000) {
		input.value = 1;
		number = 1;
	};
	const tree = printBinaryTree(number);
	display.textContent = tree;
});

button.addEventListener('click', (event) => {
	event.currentTarget.blur();
	if (intervalId) {
		clearInterval(intervalId);
		intervalId = undefined;
		button.textContent = 'Autogenerate';
	}
	else {
		button.textContent = 'Stop Autogenerate';
		intervalId = setInterval(() => {
			const newValue = (
				Number(input.value) === 32
					? 1
					: Number(input.value) + 1
			);
			input.value = newValue;
			const tree = printBinaryTree(newValue);
			display.textContent = tree;
		}, 500);
	}
});
