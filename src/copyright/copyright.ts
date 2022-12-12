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

'use script';

import * as configuration from '../configuration';
import * as comment from './comment';

export class Copyright {
  protected author: string;
  protected year: string;
  protected note: string;

  constructor() {
    this.author = configuration.getAuthor();
    this.year = new Date().getFullYear().toString();
    this.note = configuration.getNote();
  }

  public header(style: comment.CommentStyle): string {
    let beginningPrefix: String;
    let midPrefix: String;
    let endPrefix: String;

    switch (style) {
      case comment.CommentStyle.CStyle:
      default:
        beginningPrefix = '/*';
        midPrefix = ' *'
        endPrefix = ' */'
        break;

      case comment.CommentStyle.Hashtag:
        beginningPrefix = '#';
        midPrefix = '#'
        endPrefix = '#'
        break;
    }

    let template = `${beginningPrefix}
${midPrefix}   Copyright (c) ${this.year} ${this.author}
${midPrefix}   All rights reserved.\n`;

    if (this.note) {
      this.note.split('\n').forEach((line: String) => {
        template += `${midPrefix}   ${line}\n`;
      });
    }

    template += `${endPrefix}\n`;

    return template;
  }
}
