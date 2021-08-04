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
import { DataElement } from '@maurodatamapper/mdm-resources';

export class DataElementFields {
    dataElement: DataElement;
    dataElementLabel: string;
    profilesFields: Field[] = [];
}

export class Field {
    allowedValues: any[];
    currentValue: string;
    dataType: string;
    description: string;
    fieldName: string;
    maxMultiplicity: number;
    minMultiplicity: number;
    metadataPropertyName: string;
    regularExpression: string;
    validationErrors: any[];
}