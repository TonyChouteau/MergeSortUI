const Node = function(input, parent, depth) {
		this.__depth = depth || 0;
    this.parent = parent;
    this.list = input;

		this.state = "right";
    
    let leftList, rightList;
    if (this.list.length > 2) {
        [leftList, rightList] = this.cut(this.list);
        
        this.left = new Node(leftList, this, this.__depth + 1);
        this.right = new Node(rightList, this, this.__depth + 1);
    }
};

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