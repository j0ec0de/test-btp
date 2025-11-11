using {
    Currency,
    managed,
    sap,
} from '@sap/cds/common';

namespace sap.capire.games;

// header table 
entity Studio : managed,{
    key ID      : String(10);
    name        : String(100);    
    location    : String;
    games       : Association to many Games
                    on games.studio = $self;   
}
entity Games : managed,{
    key ID      : String(10);
    name        : String(100);
    studio      : Association to Studio;
    genre       : Association to Genre;
    price       : Decimal;
    currency    : Currency;
    releaseDate : Date;
}

entity Genre : sap.common.CodeList {
    key ID          : Integer;
        parent      : Association to Genre;
        children    : Association to many Genre
                        on children.parent = $self;
}