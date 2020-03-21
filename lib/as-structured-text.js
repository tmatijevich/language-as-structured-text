const {CompositeDisposable} = require('atom');

module.exports = {
  subscriptions: null,
  
  activate () {
    this.subscriptions = new CompositeDisposable();
    console.log('language-as-structured-text has been activated');
    // Add subscriptions
    this.subscriptions.add(
      atom.workspace.observeTextEditors(editor => {
        // console.log(editor.getRootScopeDescriptor().getScopesArray()[0]);
        if(editor.getRootScopeDescriptor().getScopesArray()[0] == 'source.as-structured-text'){
          editor.onDidChangeCursorPosition(event => {
            if(event.oldBufferPosition.row != event.newBufferPosition.row){
              // console.log(
              //   event.oldBufferPosition.row, event.newBufferPosition.row
              // );
              this.autoCapKeywords(editor, event.oldBufferPosition.row);
            }
          }
          );
        } // end if
      }
      )
    );
  },
  
  deactivate() {
    this.subscriptions.dispose();
  },
  
  autoCapKeywords(myEditor, myLastBufferRow) {
    sLine = myEditor.lineTextForBufferRow(myLastBufferRow);
    sLineAdj = sLine.replace(/\bif\b/i, 'IF');
    console.log(sLineAdj);
    range = [[myLastBufferRow, 0], [myLastBufferRow, sLine.length]];
    myEditor.setTextInBufferRange(range, sLineAdj);
  }
};
