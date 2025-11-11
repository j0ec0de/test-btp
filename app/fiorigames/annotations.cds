using MyService as service from '../../srv/game-service';
annotate service.Games with @(
    UI.SelectionFields: [
        studioName,
        genreName,
    ],
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'name',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'genre',
                Value : genreName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'price',
                Value : price,
            },
            {
                $Type : 'UI.DataField',
                Label : 'currency_code',
                Value : currency_code,
            },
            {
                $Type : 'UI.DataField',
                Label : 'releaseDate',
                Value : releaseDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'studio',
                Value : studioName,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet', // template
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            // Target : '@UI.LineItem',
            Target : '@UI.FieldGroup#GeneratedGroup'
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet2',
            Label : 'Games by this Studio',
            Target : 'studio/@UI.LineItem#GeneratedStudio'
        },
    ],



    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'name',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'genre_ID',
            Value : genre_ID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'price',
            Value : price,
        },
        {
            $Type : 'UI.DataField',
            Label : 'currency_code',
            Value : currency_code,
        },
        {
            $Type : 'UI.DataField',
            Label : 'releaseDate',
            Value : releaseDate,
        },
        {
            $Type : 'UI.DataField',
            Label : 'studio',
            Value : studioName,
        },
        {
            $Type : 'UI.DataField',
            Label : 'genre',
            Value : genreName,
        },
    ],
)

{
    studio @Common.Text : studio.name;
    genre  @Common.Text : genre.name;

    studio @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Studio',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : studio_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'location',
            },
        ],
    };
        
};

annotate service.Studio with @(
    UI.HeaderInfo : {
        TypeName       : 'Studio',
        TypeNamePlural : 'Studios',
        Title          : {
            $Type : 'UI.DataField',
            Value : name
        },
        Description : {
            $Type: 'UI.DataField',
            Value: location
        }
    },

        UI.LineItem #GeneratedStudio : [
        {
            $Type : 'UI.DataField',
            Label : 'Name',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'studio',
            Value : studioName,
        },
    ],

    UI.Facets : [
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : 'Games',
            Target : 'games/@UI.LineItem' 
        }
    ]
)