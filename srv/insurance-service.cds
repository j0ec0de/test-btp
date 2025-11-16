using {sap.capire.insurance as my} from '../db/insuranceSchema';

service InsuranceService {
    entity Policy as projection on my.Policy;
    entity Users as projection on my.Users;
}