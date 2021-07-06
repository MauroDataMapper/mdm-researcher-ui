/**
 * Copyright 2021 NHS Digital
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Ng2StateDeclaration } from '@uirouter/angular';
import { AppComponent } from '@mdm/app.component';
import { HomeComponent } from '@mdm/home/home.component';
import { AppContainerComponent } from '@mdm/app-container/app-container.component';
import { AboutComponent } from '@mdm/about/about.component';
import { NotImplementedComponent } from '@mdm/error/not-implemented/not-implemented.component';
import { NotAuthorizedComponent } from '@mdm/error/not-authorized/not-authorized.component';
import { ServerErrorComponent } from '@mdm/error/server-error/server-error.component';
import { NotFoundComponent } from '@mdm/error/not-found/not-found.component';
import { SearchComponent } from '@mdm/search/search.component';
import { DataModelComponent } from '@mdm/data-model/data-model.component';
import { DataClassPageComponent } from '@mdm/data-class-page/data-class-page.component';
import { ChildDataClassPageComponent } from '@mdm/child-data-class-page/child-data-class-page.component';
import { DataElementComponent } from '@mdm/data-element/data-element.component';
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
    name: 'app.container.about',
    url: '/about',
    component: AboutComponent
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
    component: DataModelComponent
  },
  {
    name: 'app.container.dataClass',
    url: '/dataModel/:dataModelId/dataClass/:id',
    component: DataClassPageComponent
  },  
  {
    name: 'app.container.childDataClass',
    url: '/dataModel/:dataModelId/dataClass/:parentDataClassId/dataClass/:id',
    component: ChildDataClassPageComponent
  },    
  {
    name: 'app.container.dataElement',
    //url: '/dataElement/:dataModelId/:dataClassId/:id',
    url: '/dataModel/:dataModelId/dataClass/:dataClassId/dataElement/:id',
    component: DataElementComponent
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
