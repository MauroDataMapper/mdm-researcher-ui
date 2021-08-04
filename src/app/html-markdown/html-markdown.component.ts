/**
 * Copyright 2020-2021 University of Oxford
 * and Health and Social Care Information Centre, also known as NHS Digital,
 * and University of Edinburgh.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, OnInit, Input } from '@angular/core';
import marked, {Renderer} from 'marked';

@Component({
  selector: 'mdm-html-markdown',
  templateUrl: './html-markdown.component.html',
  styleUrls: ['./html-markdown.component.scss']
})
export class HtmlMarkdownComponent implements OnInit {
  @Input() content: string;

  //html, converted from markdown if necessary
  preparedContent: string;

  constructor() { }

  ngOnInit(): void {
    if (this.content === undefined) {
      this.preparedContent = "";
    } else if (this.isHtmlContent()){
      this.preparedContent = this.content;
    } else {
      const renderer = new Renderer();
      const md = marked.setOptions({renderer});
      this.preparedContent = md(this.content);
    }
  }

  isHtmlContent() {

    if (!this.content) {
      return false;
    }

    const expression = /<([A-Z][A-Z0-9]*)\b[^>]*>(.*?)<\/\1>/gmi;
    return expression.test(this.content);
  }

}