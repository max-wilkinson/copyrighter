import * as vscode from 'vscode';
import { Copyright } from './copyright/copyright';
import { Apache2 } from './copyright/licenses/apache2';
import { Mit } from './copyright/licenses/mit';

function getConfiguration(): vscode.WorkspaceConfiguration {
  return vscode.workspace.getConfiguration('copyrighter');
}

export const configuredLanguages = new Set([
  'typescript',
  'javascript',
  'java',
  'csharp'
]);

export function getAuthor(): string {
  return getConfiguration().get('author') || '';
}

export function getCopyright(): Copyright {
  const selectedLicense = getConfiguration().get('license');

  if (selectedLicense === 'Apache2') {
    return new Apache2();
  } else if (selectedLicense === 'MIT') {
    return new Mit();
  } else {
    return new Copyright();
  }
}
