window.MergeSort = function(list, options) {
	const __node = new Node(list);
	const __cursor = new Cursor(__node, options);
	__cursor.run();
};