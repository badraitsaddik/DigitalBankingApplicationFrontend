export interface AccountDetails {
    accountId:            string;
    balance:              number;
    currentPage:          number;
    totalPages:           number;
    size:                 number;
    accountOperationsDTO: AccountOperations[];
}

export interface AccountOperations{
    id:            number;
    amount:        number;
    operationDate: Date;
    operationType: string;
    description:   string;
}
