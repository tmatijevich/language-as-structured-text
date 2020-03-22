const {CompositeDisposable} = require('atom');

module.exports = {
  subscriptions: null,
  
  activate () {
    this.subscriptions = new CompositeDisposable();
    console.log('language-as-structured-text has been activated');
    // Add subscriptions
    this.subscriptions.add(
      atom.workspace.observeTextEditors(editor => {
        if(editor.getRootScopeDescriptor().getScopesArray()[0] == 'source.as-structured-text'){
          editor.onDidChangeCursorPosition(event => {
            if(event.oldBufferPosition.row != event.newBufferPosition.row){
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
    var sLine = myEditor.lineTextForBufferRow(myLastBufferRow);
    const ctrlKeywords = [
      'IF', 'THEN', 'ELSE', 'ELSIF', 'END_IF', 'RETURN', 'FOR', 'TO', 'BY', 'DO',
      'END_FOR', 'CASE', 'OF', 'END_CASE', 'WHILE', 'END_WHILE', 'REPEAT', 'UNTIL',
      'END_REPEAT', 'EXIT'
    ];
    var i;
    var matchExp;
    for (i = 0; i < ctrlKeywords.length; i++) {
      matchExp = new RegExp('\\b' + ctrlKeywords[i] + '\\b', 'gi');
      sLine = sLine.replace(matchExp, ctrlKeywords[i]);
    }
    const range = [[myLastBufferRow, 0], [myLastBufferRow, sLine.length]];
    myEditor.setTextInBufferRange(range, sLine);
  }
};
