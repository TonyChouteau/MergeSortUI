const Cursor = function(node) {
	this.node = node;

	while(this.node.state === this.node.__class.LEFT) {
		this.node = this.node.left;
	}

	this.button = $(".button").on("click", e => this.handleInput(e));
};

Cursor.prototype = {
	displayChoice: function() {
		if (this.node.state === this.node.__class.END) {
			console.log(this.node.list);
		} else {
			
		}
	},
	handleInput: function(e) {
		console.log(this.node);
	}
};