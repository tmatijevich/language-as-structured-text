const {CompositeDisposable} = require('atom');

module.exports = {
  subscriptions: null,
  
  activate () {
    this.subscriptions = new CompositeDisposable();
    console.log('language-as-structured-text has been activated');
    // Add subscriptions
    this.subscriptions.add(
      // Subscribe to a current and future text editors activations
      atom.workspace.observeTextEditors(editor => {
        // If the scope matches, add a new listening event (cursor row change)
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
    // 27, 32
    const ctrlKeywords = [ // 20 + 2
      'IF', 'THEN', 'ELSE', 'ELSIF', 'END_IF', 'RETURN', 'FOR', 'TO', 'BY', 'DO',
      'END_FOR', 'CASE', 'OF', 'END_CASE', 'WHILE', 'END_WHILE', 'REPEAT', 'UNTIL',
      'END_REPEAT', 'EXIT', 'TRUE', 'FALSE'
    ];  
    const logicalKeywords = ['AND', 'OR', 'XOR', 'NOT']; // 4
    const genOpKeywords = [ // 9
      'ACCESS', 'ADR', 'ADRINST', 'SIZEOF',
      'LIMIT', 'MOVE', 'MUX', 'SEL', 'TRUNC'
    ];
    const mathOpKeywords = [ // 15
      'ABS', 'MIN', 'MAX', 'MOD', 'EXP', 'LN', 'LOG', 'EXPT', 'SQRT',
      'SIN', 'COS', 'TAN', 'ASIN', 'ACOS', 'ATAN'
    ];
    const bitOpKeywords = [ // 11
      'EDGE', 'EDGEPOS', 'EDGENEG', 'BIT_CLR', 'BIT_SET', 'BIT_TST',
      'ASR', 'ROL', 'ROR', 'SHL', 'SHR'
    ];
    const allKeywords = ctrlKeywords.concat(logicalKeywords, genOpKeywords, mathOpKeywords, bitOpKeywords);
    var matchExp;
    // console.log(sLine[sLine.length - 1] + " " + myEditor.scopeDescriptorForBufferPosition([myLastBufferRow, sLine.length - 1]));
    // console.log(this.validColumnRange(myEditor, myLastBufferRow)[0] + ' ' + this.validColumnRange(myEditor, myLastBufferRow)[1]);
    var validRange = this.validColumnRange(myEditor, myLastBufferRow);
    for (let i = 0; i < allKeywords.length; i++) {
      matchExp = new RegExp('\\b' + allKeywords[i] + '\\b', 'gi');
      sLine = sLine.slice(0,validRange[0]) 
            + sLine.slice(validRange[0], validRange[1]).replace(matchExp, allKeywords[i]) 
            + sLine.slice(validRange[1],sLine.length);
    }
    const range = [[myLastBufferRow, 0], [myLastBufferRow, sLine.length]];
    myEditor.setTextInBufferRange(range, sLine);
  },
  
  // Determine the valid range of non-commented source code 
  validColumnRange(myEditor, bufferRow) {
    var sLine = myEditor.lineTextForBufferRow(bufferRow);
    var sScopesEnd = myEditor.scopeDescriptorForBufferPosition([bufferRow, sLine.length - 1]).scopes;
    var flagEndComment = 0;
    // Check if the buffer line ends with a comment
    for (let i = 0; i < sScopesEnd.length; i++) {
      if (sScopesEnd[i].slice(0,7).toLowerCase() == 'comment') {
        flagEndComment = 1; 
        break;
      }
    }
    if (flagEndComment) {
      let reNonWhitespace = new RegExp('[^\\s]');
      let leadCol = sLine.search(reNonWhitespace);
      let sScopesBegin = myEditor.scopeDescriptorForBufferPosition([bufferRow, leadCol]).scopes;
      let flagBeginComment = 0;
      // Check if the buffer line begins with a comment
      for (let i = 0; i < sScopesBegin.length; i++) {
        if (sScopesBegin[i].slice(0,7).toLowerCase() == 'comment') {
          flagBeginComment = 1;
          break;
        }
      }
      if (flagBeginComment) {
        return [0, 0];
      } else {
        // Find the start of the double-slash comment
        let reLeadComment = new RegExp('//');
        let leadCommentCol = sLine.search(reLeadComment);
        return [leadCol, leadCommentCol];
      }
    } else {
      return [0, sLine.length];
    }
  }
};
