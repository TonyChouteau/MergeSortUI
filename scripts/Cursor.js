const Cursor = function(node) {
	this.node = node;

	this.button = $(".button").on("click", e => this.handleInput(e));
};

Cursor.prototype = {
	handleInput: function(e) {
		console.log(e);
	}
};