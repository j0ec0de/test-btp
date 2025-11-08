using {
    Currency,
    managed,
    cuid,
    sap,
} from '@sap/cds/common';

namespace sap.capire.games;

entity Games : managed, cuid {
    name        : String(100);
    studio      : Association to Studio;
    genre       : String;
    price       : Decimal;
    currency    : Currency;
    releaseDate : Date;
}

entity Studio : managed, cuid {
    name        : String(100);    
    location    : String;
    games       : Association to many Games
                    on games.studio = $self;
}

entity Genre : sap.common.CodeList {
    key ID          : Integer;
        parent      : Association to Genre;
        children    : Association to many Genre
                        on children.parent = $self;
}