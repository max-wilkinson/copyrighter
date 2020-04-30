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

export class Copyright {
  protected author: string;
  protected year: string;
  protected note: string;

  constructor() {
    this.author = configuration.getAuthor();
    this.year = new Date().getFullYear().toString();
    this.note = configuration.getNote();
  }

  public header(): string {
    let template = `/*
 *   Copyright (c) ${this.year} ${this.author}
 *   All rights reserved.\n`;

    if (this.note) {
      template += ` *   ${this.note}\n`;
    }

    template += ` */\n`;

    return template;
  }
}
