import * as vscode from 'vscode';
import { Apache2 } from './copyright/licenses/apache2';
import { Mit } from './copyright/licenses/mit';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "copyrighter" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'extension.addCopyright',
    () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage('Copyright Added');

      var editor = vscode.window.activeTextEditor;
      if (editor !== undefined) {
        insertCopyright(editor);
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

function insertCopyright(editor: vscode.TextEditor) {
  var documentStartPosition = new vscode.Position(0, 0);

  const copyright = new Apache2().header();

  editor.edit(document => {
    document.insert(documentStartPosition, copyright);
  });
}
