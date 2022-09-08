$(document).ready(_ => {
	const def = []
	for (let i=0; i<100; i++) {
		def.push(parseInt(Math.random()*1000));
	}

	const node = new Node(def);
	const cursor = new Cursor(node);
});