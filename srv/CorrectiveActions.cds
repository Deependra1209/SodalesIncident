using INC as INC from '../db/schema';

service CorrectiveActionsRole1 {
//_____________________________________________GET SERVICE_________________________________________________________//

    // Master Data

    entity jn7BMoWpy6NGKkoe as select from INC.M.MASTERLIST;
    entity VkhG5eyfOCJtMFdG as select from INC.M.LABELDATA;
    entity eshqzq378nwvuytr as projection on INC.M.BODYPART;
    entity UtRfHkcx0nEJhiCM as projection on INC.M.NATUREOFINJURY;
    entity Phgfvkcx0nEJhiCM as projection on INC.M.BODYPARTSIDE;
    entity eshqzq378nwvnev6 as projection on INC.M.EMPLOYEES;
    entity qfllxbGnRXlizI3G as projection on INC.M.SESSIONUSERINFO; 
    
//__________________________________________________POST SERVICES__________________________________________________//

    // Update Corrective Action
    action VkUtg9WbhpLD7WKX(D4OXYPALUYAIDNSO: String) returns String;

    // Update Corrective Action Status
    action lMjgEa7FtVWpKj4g(D4OXYPALUYAIDNSO: String) returns String;

}