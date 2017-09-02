
//html_str=getcurentcontent();

var html_str=["3qckqmcg6kkomp4l3uja","jc9zrbdbxoopsnc9rpn2","sn4p0be3t5zfnu8lczod","8sbzip4gw2alms6wzbg6","wt8zgqrjmllazlrpfmmf","q851ila9lx05wnr9v5se","vc1e67vxybf0pqyr7l1y","thrf81nn1wsjw07yyfon","isvjzz1nicvjq8buq44e","udqkws6luaj1ehk8lsc8","jklamiy0mwn5b1p1mpmv","lt4ik3rrna542pfnz9lz","yvy9xxf78putdyivwqip","5achd2jcpt1db72xu3m2","givshe42oxbi6hg3qhu4","7uyal7og6fz7zjdz3cvk","px73kcl7kjk7p2626jw0","5tdyeny0mpi6rv3jq916","2dnccf11yydxhgk5zkp2","i2qjv9pprls9mkj7izjf"]

function undo_redo(){
	this.undo_stack=[]
	this.redo_stack=[]
	this.htmlstr=""
	this.htmlstr_res=""
	this.stack_push=function(html_str){
		if(this.undo_stack.length>11){
			this.undo_stack.shift()
			//stackの最初を削除
			this.undo_stack.push(html_str)
		}
		else{
			this.undo_stack.push(html_str)
		}
	}
	this.stack_pop=function(){
		this.htmlstr_res=this.undo_stack.pop()
		this.redo_stack.push(this.htmlstr_res)
		if(this.redo_stack.length>11){
			this.redo_stack.shift()
		}
		return this.htmlstr_res
	}
	this.stack_redo=function(){
		this.htmlstr_res=""
		this.htmlstr_res=this.redo_stack.pop()
		this.undo_stack.push(this.htmlstr_res)
	}
}

var example = new undo_redo();
for(var i =0;i<11;i++){
	example.stack_push(html_str[i]);
}
var respoense = example.stack_pop();
console.log(respoense);
var respoense = example.stack_pop();
console.log(respoense);
example.stack_redo();
var respoense = example.stack_pop();
console.log(respoense);



/*function undo(){
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
*/
