import * as vscode from 'vscode';

function getConfiguration(): vscode.WorkspaceConfiguration {
  return vscode.workspace.getConfiguration('copyrighter');
}

export function getAuthor(): string {
  return getConfiguration().get('author') || '';
}
