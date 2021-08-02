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

import { Component } from '@angular/core';
import { SharedService } from '@mdm/services/shared/shared.service';
import { ClipboardService } from 'ngx-clipboard';
import { ErrorComponent } from '../error.component';

@Component({
  selector: 'mdm-not-implemented',
  templateUrl: '../error.component.html'
})
export class NotImplementedComponent extends ErrorComponent {

  constructor(
    protected clipboard: ClipboardService,
    protected shared: SharedService
  ) {
    super(clipboard, shared);

    this.heading = 'Not Implemented';
    this.message = 'We\'re sorry, but the server responded to say that the feature you have requested has not yet been implemented';
    this.resolution = 'If you are running a development or test instance of the server, this may be something we\'re currently working on.';

    this.data.push({ name: 'Message', value: this.lastHttpError?.message, code: false });
    this.data.push({ name: 'Status', value: this.lastHttpError?.status, code: false });
    this.data.push({ name: 'Path', value: this.lastHttpError?.url, code: false });
  }
}
