# AS StructuredText Language Package for [Atom](https://atom.io)

[![Version](https://img.shields.io/apm/v/language-as-structured-text.svg?style=flat-square)](https://atom.io/packages/language-as-structured-text) [![Downloads](https://img.shields.io/apm/dm/language-as-structured-text.svg?style=flat-square)](https://atom.io/packages/language-as-structured-text) [![License](https://img.shields.io/apm/l/language-as-structured-text.svg?style=flat-square)](https://atom.io/packages/language-as-structured-text)

Atom support for IEC 61131-3 Structured Text and Automation Studio projects including syntax highlighting, snippets, and auto-completion.


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

<table width="100%">
	<tr>
		<th>Type</th>
		<th>Output</th>
	</tr>
	<tr>
		<td><code>cm</code></td>
		<td><pre>(&#42;<br><br>&#42;)</pre></td>
	</tr>
	<tr>
		<td><code>if</code></td>
		<td><pre>IF $condition THEN<br>	$statement;<br>END_IF</pre></td>
	</tr>
	<tr>
		<td><code>else</code></td>
		<td><pre>IF $condition THEN<br>	$statement;<br>ELSE<br>	$statment;<br>END_IF</pre></td>
		<td><pre>IF $condition THEN<br>$statement;<br>END_IF</pre></td>
	</tr>
</table>
