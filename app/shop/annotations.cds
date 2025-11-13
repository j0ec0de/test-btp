using ShopService as service from '../../srv/shop-service';
annotate service.Orders with @(
    UI.SelectionFields : [
        customerName,
        status,
    ],
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'ID',
                Value : ID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'orderDate',
                Value : orderDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'customerName',
                Value : customerName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'totalPrice',
                Value : totalPrice,
            },
            {
                $Type : 'UI.DataField',
                Label : 'currency_code',
                Value : currency_code,
            },
        ],
    },
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'ID',
            Value : ID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'orderDate',
            Value : orderDate,
        },
        {
            $Type : 'UI.DataField',
            Label : 'customerName',
            Value : customerName,
        },
        {
            $Type : 'UI.DataField',
            Label : 'totalPrice',
            Value : totalPrice,
        },
        {
            $Type : 'UI.DataField',
            Label : 'currency_code',
            Value : currency_code,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Status',
            Value : status,
            Criticality: criticality,
        },
    ],
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Items',
            Target : 'items/@UI.LineItem'
        },
    ],
);

// level 2

annotate service.OrderItems with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'ID',
            Value : ID
        },
        {
            $Type : 'UI.DataField',
            Label : 'Product Name',
            Value : productName
        },
        {
            $Type : 'UI.DataField',
            Label : 'Quantity',
            Value : quantity
        },
        {
            $Type : 'UI.DataField',
            Label : 'Price per Unit',
            Value : pricePerUnit
        },
        // new button with action
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'ShopService.EntityContainer/checkNewAction',
            Label : 'View'
        }
    ],
    UI.HeaderInfo : {
        TypeName : 'Order Item',
        TypeNamePlural : 'Order Items',
        Title : { Value : productName },
        Description : { Value : ID }
    },

    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Details',
            Target : 'details/@UI.LineItem'
        }
    ]

);

// level 3
annotate service.ItemDetails with @(
    // This defines the table for the 'Details' tab
    UI.LineItem : [
        { $Type : 'UI.DataField', Label : 'ID', Value : ID },
        { $Type : 'UI.DataField', Label : 'warranty', Value : warranty },
        { $Type : 'UI.DataField', Label : 'detailValue', Value : detailValue }, // Fixed your typo here
    ],
    // This defines the header for the ItemDetails Object Page
    UI.HeaderInfo : {
        TypeName : 'Item Detail',
        TypeNamePlural : 'Item Details',
        Title : { Value : detailValue },
        Description : { Value : ID }
    }
);