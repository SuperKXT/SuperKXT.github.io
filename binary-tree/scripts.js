const printBinaryTree = (nodes) => {
	if (
		typeof nodes !== 'number'
		|| nodes < 1
		|| nodes === Infinity
		|| nodes === NaN
	) return '';
	const steps = Math.max(
		1,
		Math.ceil(Math.log2(nodes))
	);
	let tree = '';
	for (let step = 1; step <= steps; step++) {
		const availableNodes = Math.min(2 ** (step - 1), nodes) * 2;
		const stepNodes = Math.min(
			availableNodes,
			Math.ceil(nodes / (2 ** (steps - step)))
		);
		const subSteps = Math.max(2 ** (steps - step - 1), 1);
		const spaces = (2 ** (steps - step));
		for (let subStep = 1; subStep <= subSteps; subStep++) {
			let node = 0;
			while (node < stepNodes) {
				tree += new Array(spaces - subStep + 1).join(' ');
				tree += '/';
				node++;
				if (node === stepNodes) continue;
				tree += new Array((subStep - 1) * 2 + 1).join(' ');
				tree += '\\';
				node++;
				if (node !== stepNodes) {
					tree += new Array(spaces - subStep + 1).join(' ');
				}
			}
			tree += '\n';
		}
	}
	return tree;
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
			let newValue = (
				Number(input.value) > 32
					? 1
					: Number(input.value) + 1
			);
			if (newValue === 32) newValue = 1;
			input.value = newValue;
			const tree = printBinaryTree(newValue);
			display.textContent = tree;
		}, 500);
	}
});
