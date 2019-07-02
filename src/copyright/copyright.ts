'use script';

import * as configuration from '../configuration';

export class Copyright {
  protected author: string;
  protected year: string;

  constructor() {
    this.author = configuration.getAuthor();
    this.year = new Date().getFullYear().toString();
  }

  public header(): string {
    let template = `/*
 *   Copyright (c) ${this.year} ${this.author}
 *   All rights reserved.
 */\n`;
    return template;
  }
}
