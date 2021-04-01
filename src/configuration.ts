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
import { Copyright } from './copyright/copyright';
import { Apache2 } from './copyright/licenses/apache2';
import { Mit } from './copyright/licenses/mit';
import { Gpl } from './copyright/licenses/gpl3';

function getConfiguration(): vscode.WorkspaceConfiguration {
  return vscode.workspace.getConfiguration('copyrighter');
}

export const configuredLanguages = new Set([
  'c',
  'cpp',
  'csharp',
  'go',
  'java',
  'javascript',
  'rust',
  'typescript',
  'css',
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
  } else if (selectedLicense === 'GPL3') {
    return new Gpl();
  } else {
    return new Copyright();
  }
}

export function getNote(): string {
  return getConfiguration().get('note') || '';
}

export function getNewFilesOnly(): Boolean {
  return getConfiguration().get('newFilesOnly') || false;
}
