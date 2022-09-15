const Node = function (input, parent, depth) {
	this.__class = Node;
	this.__depth = depth || 0;

	this.parent = parent;
	this.list = input;
	this.size = input.length;

	let leftList, rightList;
	if (this.size > 2) {
		this.state = Node.LEFT;

		[leftList, rightList] = this.cut(input);

		this.left = new Node(leftList, this, this.__depth + 1);
		this.right = new Node(rightList, this, this.__depth + 1);
	} else if (this.size === 1) {
		this.state = Node.ODD;
	} else {
		this.state = Node.END;
	}
};

Node.LEFT = 0;
Node.RIGHT = 1;
Node.END = 2;
Node.ODD = 3;
Node.MERGE = 4;
Node.UP = 5;

Node.prototype = {
	cut: function (list) {
		let mid = list.length / 2;
		[left, right] = [[], []];
		for (let i = 0; i < list.length; i++) {
			if (i < mid) {
				left.push(list[i]);
			} else {
				right.push(list[i]);
			}
		}
		return [left, right];
	},
	done: function () {
		// error if end ?
		this.state = Node.UP;
		if (!isNill(this.parent)) {
			let parentState = this.parent.state;
			if (parentState === Node.LEFT) {
				this.parent.state = Node.RIGHT;
			} else if (parentState === Node.RIGHT) {
				this.parent.state = Node.MERGE;
			}
			return false;
		} else {
			return true;
		}
	},
	stopMoving: function () {
		return this.state === Node.END
			|| this.state === Node.MERGE
			|| this.state === Node.UP && this.parent === undefined;
	}
};