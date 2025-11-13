using {sap.capire.shop as my} from '../db/shopSchema';

service ShopService {
    entity Orders as projection on my.Orders {
        *,    
        // virtual fields
        // @Core.DependsOn: 'status'
        // cast(null as String) as statusText,

        @Core.DependsOn: 'status' 
        cast(null as Integer) as criticality
    };

    // expose level 2
    entity OrderItems as projection on my.OrderItems {
        *, // expose all other direct fields
        parentOrder.customerName as customerName : String
    };

    // expose level 3
    entity ItemDetails as projection on my.ItemDetails {
        *,
        parentItem.productName as productName : String
    };
    

    action checkOrderStatus(orderID : String) returns String;
    action checkPayloadStatus(orderID : String) returns String;
    action checkNewAction(orderID : String) returns String;
}
