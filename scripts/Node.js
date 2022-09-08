const Node = function(input, parent, depth) {
	this.__class = Node;
	this.__depth = depth || 0;

	this.parent = parent;
	this.list = input;

	let leftList, rightList;
	if (this.list.length > 2) {
		this.state = Node.LEFT;

		[leftList, rightList] = this.cut(this.list);
		
		this.left = new Node(leftList, this, this.__depth + 1);
		this.right = new Node(rightList, this, this.__depth + 1);
	} else {
		this.state = Node.END;
	}
};

Node.ROOT = undefined;
Node.LEFT = 0;
Node.RIGHT = 1;
Node.END = 2;

Node.prototype = {
	cut: function(list) {
		let mid = list.length / 2;
		[left, right] = [[], []];
		for (let i=0; i<list.length; i++) {
			if (i<mid) {
				left.push(list[i]);
			} else {
				right.push(list[i]);
			}
		}
		return [left, right];
	}
};