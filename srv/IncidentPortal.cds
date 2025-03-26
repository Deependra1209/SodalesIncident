using INC as INC from '../db/schema';

service IncidentPortalRole1 {
//_____________________________________________GET SERVICE_________________________________________________________//

    entity jn7BMoWpy6NGKkoe as select from INC.M.MASTERDATA;
    
//__________________________________________________POST SERVICES__________________________________________________//
    // Pre Investigation
    action DBDHIPPZlqSDVFCE(D4OXYPALUYAIDNSO: String) returns String;

    // Investigation
    action b9q2fsan18bqIUHT(D4OXYPALUYAIDNSO: String) returns String;

    // Corrective Action
    action FxzlEmezqgGBuqfq(D4OXYPALUYAIDNSO: String) returns String;

    // Lesson Learned
    action xGx7YodvNNbU5uKU(D4OXYPALUYAIDNSO: String) returns String;
    
    // Report Sign-Off
    action AzsKzyfS5Kmcs86d(D4OXYPALUYAIDNSO: String) returns String;

    // Notes
    action QGByRBtgVZREybOU(D4OXYPALUYAIDNSO: String) returns String;

    // Attachments
    action vwxGTHJKICWOGdds(D4OXYPALUYAIDNSO: String) returns String;

    // Close Incident
    action wuScnYBi9xs01U3U(D4OXYPALUYAIDNSO: String) returns String;


    
} 
