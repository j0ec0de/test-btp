using {sap.capire.games as my} from '../db/gameSchema';

service MyService {
    entity Games as projection on my.Games{
        *,
        studio.name as studioName : String
    };
    entity Studio as projection on my.Studio;
}