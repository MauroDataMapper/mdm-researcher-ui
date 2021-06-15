import { Component, OnInit } from '@angular/core';
import { ContainerDomainType } from '@maurodatamapper/mdm-resources';
import { MdmResourcesService } from "@mdm/services/mdm-resources/mdm-resources.service";

@Component({
  selector: 'mdm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm: string = "";
  searchResults: any[];

  private allTypes: Type[] = [
    {
      id: 'Folder',
      link: 'folder',
      title: 'Folder',
      markdown: 'fd',
      baseTitle: 'Folder',
      isBase: true
    },
    {
      id: 'DataModel',
      link: 'dataModel',
      title: 'DataModel',
      markdown: 'dm',
      baseTitle: 'DataModel',
      isBase: true,
      classifiable: true
    },
    {
      id: 'ReferenceDataModel',
      link: 'ReferenceDataModel',
      title: 'ReferenceDataModel',
      resourceName: 'ReferenceDataModel',
      baseTitle: 'ReferenceDataModel',
      markdown: 'rdm',
      classifiable: true
    },
    {
      id: 'DataClass',
      link: 'dataClass',
      title: 'DataClass',
      markdown: 'dc',
      baseTitle: 'DataClass',
      isBase: true,
      classifiable: true
    },
    {
      id: 'DataElement',
      link: 'dataElement',
      title: 'DataElement',
      markdown: 'de',
      baseTitle: 'DataElement',
      isBase: true,
      classifiable: true
    },
    {
      id: 'ReferenceDataElement',
      link: 'dataElement',
      title: 'DataElement (ReferenceDataElement)',
      baseTitle: 'DataElement',
      markdown: 'rde',
      classifiable: true
    },
    { id: 'DataType', link: 'dataType', title: 'DataType', markdown: 'dt', isBase: true, classifiable: true, baseTitle: 'DataType' },
    {
      id: 'EnumerationType',
      link: 'dataType',
      title: 'DataType (Enum)',
      baseTitle: 'DataType',
      markdown: 'dt',
      displayLabel: 'Enumeration',
      classifiable: true
    },
    {
      id: 'PrimitiveType',
      link: 'dataType',
      title: 'DataType (Primitive)',
      baseTitle: 'DataType',
      markdown: 'dt',
      displayLabel: 'Primitive',
      classifiable: true
    },
    {
      id: 'ReferencePrimitiveType',
      link: 'referenceDataType',
      title: 'DataType (Reference Data Type)',
      baseTitle: 'Reference Data Type',
      markdown: 'rdt',
      displayLabel: 'Reference Data Type',
      classifiable: true
    },
    {
      id: 'ReferenceType',
      link: 'dataType',
      title: 'DataType (Reference)',
      baseTitle: 'DataType',
      markdown: 'dt',
      displayLabel: 'Reference',
      classifiable: true
    },
    {
      id: 'ModelDataType',
      link: 'dataType',
      title: 'DataType (ModelDataType)',
      baseTitle: 'DataType',
      markdown: 'mdt',
      displayLabel: 'ModelDataType',
      classifiable: true
    },
    {
      id: 'TerminologyType',
      link: 'dataType',
      title: 'DataType (Terminology)',
      baseTitle: 'DataType',
      markdown: 'dt',
      displayLabel: 'Terminology',
      classifiable: true
    },
    {
      id: 'CodeSetType',
      link: 'codeSet',
      title: 'CodeSet',
      baseTitle: 'DataType',
      markdown: 'cst',
      displayLabel: 'Code Set',
      classifiable: true
    },
    {
      id: 'ReferenceDataModelType',
      link: 'referenceDataModel',
      title: 'ReferenceDataModel',
      baseTitle: 'DataType',
      markdown: 'rdmt',
      displayLabel: 'Reference Data Model',
      classifiable: true
    },
    {
      id: 'EnumerationValue',
      link: 'dataType',
      title: 'EnumerationValue',
      baseTitle: 'CatalogueItem',
      markdown: 'ev',
      isBase: true
    },
    {
      id: 'Terminology',
      link: 'terminology',
      title: 'Terminology',
      baseTitle: 'Terminology',
      markdown: 'te',
      isBase: true
    },
    { id: 'Term', link: 'term', title: 'Term', baseTitle: 'Term', markdown: 'tm', isBase: true },
    { id: 'CodeSet', link: 'codeSet', title: 'CodeSet', baseTitle: 'CodeSet', markdown: 'cs', isBase: true },
    {
      id: 'Classifier',
      link: 'classification',
      title: 'Classifier',
      resourceName: 'classifier',
      baseTitle: 'Classifier',
      markdown: 'cs',
      isBase: true
    },
  ];

  domainTypes: any[] = [];

  constructor(public resources: MdmResourcesService) { }

  ngOnInit(): void {
  }

  getAllDataTypesArray() {
    const dataTypes = this.allTypes.filter(f => f.baseTitle === 'DataType');
    return dataTypes;
  }

  onSearchClick(): void {
    console.log('You are searching ' + this.searchTerm);

    if (this.searchTerm !== "") {
      this.doSearch().subscribe(res => {
        this.searchResults = res.body.items;
        console.log(this.searchResults);
      });
    }
  }

  doSearch(): any {

    // const dataTypes = this.getAllDataTypesArray();
    //         dataTypes.forEach((dt) => {
    //             this.domainTypes.push(dt.id);
    //         });

    let result = this.resources.catalogueItem.search(
            {
              classifierFilter: null,
              classifiers: [],
              createdAfter: null,
              createdBefore: null,
              dataModelTypes: null,
              domainTypes: [],
              labelOnly: false,
              lastUpdatedAfter: null,
              lastUpdatedBefore: null,
              limit: 10,
              offset: 0,
              pageIndex: 0,
              pageSize: 10,
              searchTerm: this.searchTerm
            });

    return result;
  }
}

export class Type {
  id: string;
  link: string;
  title: string;
  markdown: string;
  isBase?: boolean;
  baseTitle?: string;
  classifiable?: boolean;
  displayLabel?: string;
  resourceName?: string;
  constructor() { }
}