using {
    Currency,
    managed
} from '@sap/cds/common';

namespace sap.capire.shop;

// Header Table

entity Orders : managed {
    key ID          : String(10);
    orderDate       : Date;
    customerName    : String(100);
    totalPrice      : Decimal;
    currency        : Currency;

    status          : String(1);
    // link to level 2
    items           : Association to many OrderItems
                        on items.parentOrder = $self;
}

// Child Table
entity OrderItems : managed {
    key ID          : String(10);
    productName     : String(100);
    quantity        : Integer;
    pricePerUnit    : Decimal;

    // link to level 1
    parentOrder     : Association to Orders;
    
    // link to level 3
    details         : Association to many ItemDetails
                        on details.parentItem = $self;
}

// level 3 

entity ItemDetails : managed {
    key ID      : String(10);
    detailType  : String(50);
    detailValue : String(100);

    parentItem  : Association to OrderItems;
}