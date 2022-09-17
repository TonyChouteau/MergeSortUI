const runMergeSubSorted = () => {
	let def = []
	let l = [];
	let l2 = [];
	for (let j=0; j<50; j++) {
		l.push(parseInt(Math.random()*1000));
		l2.push(parseInt(Math.random()*1000));
	}
	l.sort((a,b) => b-a);
	l2.sort((a,b) => b-a);
	for (let i=0; i<50; i	++) {
		def.push(l[i]);
		def.push(l2[i]);
	}
	console.log(def);

	MergeSort(def, {
		//debug: true,
		//selectors: [".button_left", ".button_right"],
		callback: (result, stats) => console.log(result, stats)
	});
}

$(document).ready(_ => {
	for (let i=0; i<10; i++) {
		runMerge();
	}
});