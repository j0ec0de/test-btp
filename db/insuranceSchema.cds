using {
    managed
} from '@sap/cds/common';

namespace sap.capire.insurance;


// header Level 1

entity Policy : managed {
    key policyID : UUID;
    policyNumber : String(20);
    // This can be Health, home, motor, Life
    policyType   : String(50);
    startDate    : Date;
    endDate      : Date;
    premiumAmount: Decimal(15,2);
    status       : String(20);

    // One user -> Many policies
    // One Policy -> One user
    holder       : Association to Users;

}


entity Users : managed {
    key userID : UUID;
    firstName  : String(50);
    lastName   : String(50);
    email      : String(100);
    phone      : String(20);
    address    : String(200);

    policies   : Association to many Policy
                    on policies.holder = $self;
}
