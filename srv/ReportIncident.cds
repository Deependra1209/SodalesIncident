using INC as INC from '../db/schema';

service ReportIncidentRole1 {
//_____________________________________________GET SERVICE_________________________________________________________//

    entity jn7BMoWpy6NGKkoe as select from INC.M.MASTERLIST;
    entity VkhG5eyfOCJtMFdG as select from INC.M.LABELDATA;
    entity eshqzq378nwvuytr as projection on INC.M.BODYPART;
    entity UtRfHkcx0nEJhiCM as projection on INC.M.NATUREOFINJURY;
    entity Phgfvkcx0nEJhiCM as projection on INC.M.BODYPARTSIDE;
    entity eshqzq378nwvnev6 as projection on INC.M.EMPLOYEES;
    entity qfllxbGnRXlizI3G as projection on INC.M.SESSIONUSERINFO;
    
//__________________________________________________POST SERVICES__________________________________________________//
    // Create Incident
    action b9q2fsan18bqxar0(D4OXYPALUYAIDNSO: LargeString) returns String;

    
} 
