import * as vscode from 'vscode';
import * as configuration from '../configuration';

export function handleCopyrightCheck(editor: vscode.TextEditor | undefined) {
  if (
    editor !== undefined &&
    isSupportedLanguage(editor.document.languageId) &&
    !hasCopyright(editor.document)
  ) {
    insertCopyright(editor);
  }
}

function hasCopyright(document: vscode.TextDocument): Boolean {
  if (isNewDocument(document)) {
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

function isNewDocument(document: vscode.TextDocument): Boolean {
  return document.lineCount <= 1;
}

function isSupportedLanguage(languageId: string): Boolean {
  return configuration.configuredLanguages.has(languageId);
}
