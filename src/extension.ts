/*
 *   Copyright (c) 2019 Ford Motor Company
 *   All rights reserved.

 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

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
      const copyrightAdded = copyrightService.handleManualCopyrightCheck(vscode.window.activeTextEditor);
      if (copyrightAdded) {
        vscode.window.showInformationMessage('Copyright Added');
      } else {
        vscode.window.showInformationMessage('Copyright could not be added to this file.');
      }
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
