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
	const tree = printBinaryTree(parseInt(event.target.value));
	display.textContent = tree;
});

button.addEventListener('click', () => {
	if (intervalId) {
		clearInterval(intervalId);
		intervalId = undefined;
		button.textContent = 'Autogenerate';
		input.value = 1;
	}
	else {
		button.textContent = 'Stop Autogenerate';
		setInterval(() => {
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
