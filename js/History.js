function History() {
    this.undo_stack = [];
    this.redo_stack = [];
    this.stack_push = function () {
        var current_ws = getCurrentContentHTML();
        if (this.undo_stack.length > 10) { // 古い履歴の削除
            this.undo_stack.shift();
        }
        this.undo_stack.push(current_ws);
        this.redo_stack = [];
    }

    this.undo = function () {
        if(this.undo_stack.length > 0){
            this.htmlstr_res = this.undo_stack.pop();
            this.redo_stack.push(this.htmlstr_res);
        }
        if (this.redo_stack.length > 11) {
            this.redo_stack.shift();
        }
        return this.htmlstr_res;
    }
    this.redo = function () {
        if(this.redo_stack.length > 0){            
            this.htmlstr_res = this.redo_stack.pop();
            this.undo_stack.push(this.htmlstr_res);
        }
    }
}