const Cursor = function (node, selectors) {
	this.node = node;
	this.$left = $(selectors[0]);
	this.$right = $(selectors[1]);

	this.debug = true;

	this.state = Cursor.COMPARE;

	this.toCompare;
	this.toMerge;
	this.merge;

	this.$left.on("click", _ => this.choice(0));
	this.$right.on("click", _ => this.choice(1));

	this.isEnd = false;

	this.move();
	// this.button = $(".button").on("click", e => this.handleInput(e));
};

/*
					new Cursor()

								│
								▼

							move() ◄─────────────────────────────────┐
																											 │
								│
								▼                            ┌───► node.done()? ◄──┐
																						 │                     │
			 ┌── handleNode() ──┐
			 │                  │              compare()               merge()
			 ▼                  ▼
																						 ▲                     ▲
 displayChoice()    displayMerge()           └────── choice() ─────┘
			 ▼                  ▼                             ▲
 ────────────────────────────────        ────────────────────────────────
								▼                  async                ▲
								└───────────────────────────────────────┘
																 user input
*/

Cursor.prototype = {

	// Handling merge sort logic (1/2)

	move: function () {
		this.log("MOVE", this.node);
		let i = 0;
		while (!this.node.stopMoving()) {
			i++;
			if (i > 20) {
				this.log("Error");
				return;
			}
			if (this.node.state === this.node.__class.LEFT) {
				this.log("LEFT")
				this.node = this.node.left;
			} else if (this.node.state === this.node.__class.RIGHT) {
				this.log("RIGHT");
				this.node = this.node.right;
			} else if (this.node.state === this.node.__class.ODD) {
				this.log("ODD");
				this.node.done();
				this.node.sortedList = this.node.list;
				this.node = this.node.parent;
			} else {
				this.log("PARENT");
				if (this.node.parent) {
					this.node = this.node.parent;
				}
			}
		}
		this.log("AFTER MOVE", this.node);
		this.handleNode();
	},

	handleNode: function () {
		this.log("HANDLE", this.node);
		if (this.node.state === this.node.__class.END) {
			this.displayCompare();
		} else if (this.node.state === this.node.__class.MERGE) {
			this.displayMerge();
		} else {
			this.log("Error");
		}
	},

	// Handling display

	displayCompare: function () {
		this.toCompare = this.node.list;

		this.log("DISPLAY COMPARE", this.toCompare);
		this.displayButtons();
	},

	displayMerge: function () {
		if (isNill(this.merge)) {
			this.toMerge = {
				left: this.node.left.sortedList,
				right: this.node.right.sortedList
			};
			this.merge = [];
			this.toCompare = [this.toMerge.left.shift(), this.toMerge.right.shift()];
		}

		this.log("DISPLAY MERGE", this.toMerge, this.toCompare, this.merge);
		this.displayButtons();
	},

	displayButtons: function () {
		this.$left.text(this.toCompare[0]);
		this.$right.text(this.toCompare[1]);
	},

	// ========================================
	// ==        User can choose here        ==
	// ========================================

	// Handling user input

	choice: function (input) { // 0 or 1
		this.log("CHOICE", input);
		if (this.node.state === this.node.__class.END) {
			this.log("CHOICE COMPARE");
			this.handleCompare(input);
		} else if (this.node.state === this.node.__class.MERGE) {
			this.log("CHOICE MERGE");
			this.handleMerge(input);
		} else {
			this.log("Error");
		}
	},

	// Handling merge sort logic (2/2)

	handleCompare: function (input) {
		this.log("COMPARE", this.toCompare);
		const list = this.toCompare;
		this.node.sortedList = [list[input], list[(input + 1) % 2]];

		this.toCompare = null;
		this.isEnd = this.node.done();

		this.log("AFTER COMPARE", this.node.sortedList);
		this.loop();
	},

	handleMerge: function (input) {
		this.log("MERGE", this.toMerge, this.toCompare, this.merge);

		this.merge.push(this.toCompare[input]);
		const lists = [this.toMerge.left, this.toMerge.right];
		if (lists[input].length > 0) {
			this.toCompare[input] = lists[input].shift();
		} else {
			this.merge.push(this.toCompare[(input + 1) % 2], ...this.toMerge.right, ...this.toMerge.left);
			this.toMerge = null;
			this.toCompare = null;

			this.node.sortedList = this.merge;
			this.merge = null;
			
			this.isEnd = this.node.done();
		}
		this.log("AFTER MERGE", this.toMerge, this.toCompare, this.merge, this.sortedList);
		this.loop();
	},

	loop: function() {
		if (!this.isEnd) {
			this.move();
		} else {
			this.end();
		}
	},

	end: function() {
		this.log("END", this.node);
		this.log(this.node.sortedList);
	},

	// ========================================
	// ==      Looping back to "move()"      ==
	// ========================================

	// Utils

	log: function (...messages) {
		if (this.debug) {
			console.log(...messages);
		}
	},
};