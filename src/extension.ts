import * as vscode from 'vscode';
import * as copyrightService from './copyright/copyrightService';

// this method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
  // Perform a copyright check upon extension activation
  copyrightService.handleCopyrightCheck(vscode.window.activeTextEditor);

  // Create command hook for manually adding copyright
  let disposable = vscode.commands.registerCommand(
    'extension.addCopyright',
    () => {
      vscode.window.showInformationMessage('Copyright Added');
      copyrightService.handleCopyrightCheck(vscode.window.activeTextEditor);
    }
  );

  // Create listener for automatically handling copyright checks
  vscode.window.onDidChangeActiveTextEditor(
    (editor: vscode.TextEditor | undefined) => {
      copyrightService.handleCopyrightCheck(editor);
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
