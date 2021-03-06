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
import { Ng2StateDeclaration } from '@uirouter/angular';
import { AppComponent } from '@mdm/app.component';
import { HomeComponent } from '@mdm/home/home.component';
import { AppContainerComponent } from '@mdm/app-container/app-container.component';
import { NotImplementedComponent } from '@mdm/error/not-implemented/not-implemented.component';
import { NotAuthorizedComponent } from '@mdm/error/not-authorized/not-authorized.component';
import { ServerErrorComponent } from '@mdm/error/server-error/server-error.component';
import { NotFoundComponent } from '@mdm/error/not-found/not-found.component';
import { SearchComponent } from '@mdm/search/search.component';
import { DataModelPageComponent } from '@mdm/data-model-page/data-model-page.component';
import { WishlistComponent } from '@mdm/wishlist/wishlist.component';

export const states: Ng2StateDeclaration[] = [
  {
    name: 'app',
    component: AppComponent
  },   
  {
    name: 'app.container',
    component: AppContainerComponent
  },
  {
    name: 'app.container.default',        
    url: '',
    component: HomeComponent
  },
  {
    name: 'app.container.home',
    url: '/home',
    component: HomeComponent
  },
  {
    name: 'app.container.search',
    url: '/search',
    component: SearchComponent
  },
  {
    name: 'app.container.wishlist',
    url: '/wishlist',
    component: WishlistComponent
  },
  {
    name: 'app.container.dataModel',
    url: '/dataModel/:id',
    component: DataModelPageComponent
  },
  {
    name: 'app.container.notImplemented',
    url: '/not-implemented',
    component: NotImplementedComponent
  },
  {
    name: 'app.container.notAuthorized',
    url: '/not-authorized',
    component: NotAuthorizedComponent
  },
  {
    name: 'app.container.serverError',
    url: '/server-error',
    component: ServerErrorComponent
  },
  {
    name: 'app.container.notFound',
    url: '/not-found',
    component: NotFoundComponent
  }
];
