
//html_str=getcurentcontent();
html_str="jfa;lksdjf;lamsd;nasv;lkajsf;lsadkf"
/*
var undo = new Object();
undo.stack = [];
*/
function undo(html_str){
	this.stack=[]
	this.htmlstr=""
	this.stack_push=function(html_str){
		if(stack.length==11){
			stack.shift()
			stack.push(html_str)
		}
		else{
			stack.push(html_str)
		}
	}
	this.stack_pop=function(){
		return this.stack.pop()
	}
}

var example = undo(html_str)
var respoense = undo.stack_pop()
console.log(respoense);

/*
var stack=[];

function stack_push(html_str){

}

function undo(){
		return stack.pop()
}
*/


/*
var undoManager = {
	undoStack : [],
	register : function ( fn, html_str ) {
		this.undoStack.push ( { 'fn' : fn, 'html_str' :html_str  } );
	},
	undo : function () {
		if ( this.undoStack.length > 0 ) {
			var undoItem = this.undoStack [ this.undoStack.length -1 ];
			this.undoStack.pop ();
			undoItem.fn ( undoItem.html_str );
			this.undoStack.pop ();
		};
	}
};


function show ( arg ) { //【12】
	var element = document.getElementById ( arg.id ); //【13】
	element.style.visibility = arg.showing ? 'visible' : 'hidden'; //【14】
	undoManager.register ( show, { id: arg.id, showing: !arg.showing },); //【15】
};
*/
