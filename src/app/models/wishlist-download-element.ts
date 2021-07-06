import { DataModelDetail, CatalogueItem } from '@maurodatamapper/mdm-resources'; 

export class WishlistDownloadElement {
    label: string;
    dataModel: DataModelDetail;
    catalogueItem: CatalogueItem;
    dataModelId: string;
    semanticLinks: SemanticLink[] = [];
    profileProviders: Provider[] = [];
    profileSections: Section[] = [];
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

export class Provider {
    namespace: string;
    name: string;
}

export class Section {
    fields: Field[];
    sectionDescription: string;
    sectionName: string;
}

export class SemanticLink {
    id: string;
    linkType: string;
    domainType: string;
    unconfirmed: boolean;
    sourceMultiFacetAwareItem: MultiFacetAwareItem;
    targetMultiFacetAwareItem: MultiFacetAwareItem;
}

export class MultiFacetAwareItem {
    id: string;
    domainType: string;
    label: string;
}