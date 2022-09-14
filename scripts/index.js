$(document).ready(_ => {
	const def = []
	for (let i=0; i<100; i++) {
			def.push(parseInt(Math.random()*1000));
	}

	const node = new Node(def);
	console.log(node);
	window.cursor = new Cursor(node, [".button_left", ".button_right"]);
});