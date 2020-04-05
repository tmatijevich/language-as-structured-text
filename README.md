# StructuredText Language Package for [ATOM](https://atom.io)

[![Version](https://img.shields.io/apm/v/language-as-structured-text?color=blue)](https://github.com/tmatijevich/language-as-structured-text/blob/master/CHANGELOG.md)
[![Downloads](https://img.shields.io/apm/dm/language-as-structured-text?color=brightgreen)](https://atom.io/packages/language-as-structured-text) 
[![License](https://img.shields.io/apm/l/language-as-structured-text?color=blue)](https://github.com/tmatijevich/language-as-structured-text/blob/master/LICENSE.md)

ATOM support for IEC 61131-3 Structured Text and Automation Studio (AS) projects including syntax highlighting, snippets, and auto-completion.

## Features
#### Syntax Highlighting
* Comments (inline `//`, block `(* *)`)
* Keywords
	* Statement-flow (`IF`, `ELSE`, `CASE`, `FOR`, ...)
	* Operators (`AND`, `OR`, `<`, `>`, `+`, `-`, ...)
	* Storage (`PROGRAM`, `FUNCTION`, `VAR`, `TYPE`, ...)
* Strings ` 'Hello Word!' `
* Numbers `16#ff`, `75.0`, `T#250ms`
* Function & Function Block calls `strcpy()`
* Structure members `System.Parameters`
* User constants `IN_TO_MM` (all uppercase)

### Highlighting Example 
![Highlighting example screenshot](./media/highlighting%20example%202020-02-15_23-59-31.png)


### Code Snippet Example
![Grammer Example](./media/grammer%20example%202020-01-19_14-44-16.gif)


## Key Features
* Syntax highlighting
	* Control keywords
	* Function, program, and action keywords
	* Variable and type declaration
	* Data types
	* String constants
	* Floating point and integer constants
	* Time, date, time of day, and date & time constants
	* Function and function block calls
	* User defined constants (all caps)
	* Global variables ("g" prefix lower camel case, bold)
* Snippets
	* `cm` - Block comment
	* `if` - If statement
	* `else` - If else statement
	* `elsif` - If, else, elsif statement
	* `for` - For loop
	* `case` - Case statement
	* `fn` - Function definition
	* `fb` - Function block definition
	* `prog` - Program definition
	* `while` - While loop
	* `repeat` - Repeat loop
* Auto-completion
	* Automatically set ALL CAPS for keywords
	

## Plugins
I recommend the following add-on packages for programming in ATOM
* [highlight-selected](https://atom.io/packages/highlight-selected)
* [minimap](https://atom.io/packages/minimap)
	* [minimap-find-and-replace](https://atom.io/packages/minimap-find-and-replace)
	* [minimap-hightlight-selected](https://atom.io/packages/minimap-highlight-selected)
* [multi-cursor](https://atom.io/packages/multi-cursor)
* [sort-lines](https://atom.io/packages/sort-lines)
* [split-diff](https://atom.io/packages/split-diff)
* [tabs-to-spaces](https://atom.io/packages/tabs-to-spaces)


## Upcoming
* Autocomplete provider of variables, types, and functions
