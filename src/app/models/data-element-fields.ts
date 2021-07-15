export class DataElementFields {
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