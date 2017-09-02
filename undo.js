
//html_str=getcurentcontent();

var html_str="jfa;lksdjf;lamsd;nasv;lkajsf;lsadkf";

function undo(){
	this.stack=[]
	this.htmlstr=""
	this.stack_push=function(html_str){
		if(this.stack.length>11){
			this.stack.shift()
			//stackの最初を削除
			this.stack.push(html_str)
		}
		else{
			this.stack.push(html_str)
		}
	}
	this.stack_pop=function(){
		return this.stack.pop()
	}
}

var example = new undo();
example.stack_push(html_str);
var respoense = example.stack_pop();

console.log(respoense);
