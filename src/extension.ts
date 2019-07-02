import * as vscode from 'vscode';
import * as configuration from './configuration';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "copyrighter" is now active!');

  const editor = vscode.window.activeTextEditor;
  if (editor !== undefined) {
    handleCopyrightCheck(editor);
  }

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'extension.addCopyright',
    () => {
      // The code you place here will be executed every time your command is executed
      vscode.window.showInformationMessage('Copyright Added');

      const editor = vscode.window.activeTextEditor;
      if (editor !== undefined) {
        handleCopyrightCheck(editor);
      }
    }
  );

  vscode.window.onDidChangeActiveTextEditor(
    (editor: vscode.TextEditor | undefined) => {
      if (editor !== undefined) {
        handleCopyrightCheck(editor);
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

function handleCopyrightCheck(editor: vscode.TextEditor) {
  // Check if it is a supported language and does not already have copyright
  if (
    configuration.configuredLanguages.has(editor.document.languageId) &&
    !hasCopyright(editor.document)
  ) {
    insertCopyright(editor);
  }
}

function hasCopyright(document: vscode.TextDocument): Boolean {
  // Check if it is a new document
  if (document.lineCount <= 1) {
    return false;
  }

  const copyrightLine = document.lineAt(1);
  return (
    !copyrightLine.isEmptyOrWhitespace &&
    copyrightLine.text.includes('Copyright')
  );
}

function insertCopyright(editor: vscode.TextEditor) {
  const documentStartPosition = new vscode.Position(0, 0);
  const copyright = configuration.getCopyright().header();

  editor.edit(document => {
    document.insert(documentStartPosition, copyright);
  });
}
