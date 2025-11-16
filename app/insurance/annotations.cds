using InsuranceService as service from '../../srv/insurance-service';
annotate service.Policy with @(
    UI.SelectionFields : [
        policyType,
        status
    ],
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'policyNumber',
                Value : policyNumber,
            },
            {
                $Type : 'UI.DataField',
                Label : 'policyType',
                Value : policyType,
            },
            {
                $Type : 'UI.DataField',
                Label : 'startDate',
                Value : startDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'endDate',
                Value : endDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'premiumAmount',
                Value : premiumAmount,
            },
            {
                $Type : 'UI.DataField',
                Label : 'status',
                Value : status,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'User Details',
            Target : '@UI.FieldGroup#UserDetails'
        }
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'policyNumber',
            Value : policyNumber,
        },
        {
            $Type : 'UI.DataField',
            Label : 'policyType',
            Value : policyType,
        },
        {
            $Type : 'UI.DataField',
            Label : 'startDate',
            Value : startDate,
        },
        {
            $Type : 'UI.DataField',
            Label : 'endDate',
            Value : endDate,
        },
        {
            $Type : 'UI.DataField',
            Label : 'premiumAmount',
            Value : premiumAmount,
        },
    ],
);

// annotate service.Policy with {
//     holder @Common.ValueList : {
//         $Type : 'Common.ValueListType',
//         CollectionPath : 'Users',
//         Parameters : [
//             {
//                 $Type : 'Common.ValueListParameterInOut',
//                 LocalDataProperty : holder_userID,
//                 ValueListProperty : 'userID',
//             },
//             {
//                 $Type : 'Common.ValueListParameterDisplayOnly',
//                 ValueListProperty : 'firstName',
//             },
//             {
//                 $Type : 'Common.ValueListParameterDisplayOnly',
//                 ValueListProperty : 'lastName',
//             },
//             {
//                 $Type : 'Common.ValueListParameterDisplayOnly',
//                 ValueListProperty : 'email',
//             },
//             {
//                 $Type : 'Common.ValueListParameterDisplayOnly',
//                 ValueListProperty : 'phone',
//             },
//         ],
//     }
// };

annotate service.Policy with @(
    UI.FieldGroup #UserDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            { $Type: 'UI.DataField', Label: 'First Name', Value: holder.firstName },
            { $Type: 'UI.DataField', Label: 'Last Name',  Value: holder.lastName },
            { $Type: 'UI.DataField', Label: 'Email',      Value: holder.email },
            { $Type: 'UI.DataField', Label: 'Phone',      Value: holder.phone }
        ]
    }
)


