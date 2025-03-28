using INC as INC from '../db/schema';

service IncidentPortalRole1 {
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

    // Track Incident
    action Dh23XLBkWJ0Ard(D4OXYPALUYAIDNSO: String) returns String;

    // Complete Investigation
    action obcS75AWUW8IBMIH(D4OXYPALUYAIDNSO: String) returns String;

    // Update Incident
    action b9q2fsan18bqxar0(D4OXYPALUYAIDNSO: LargeString) returns String;

    // Reassign Corrective Actions
    action SGQtBRRcRCGqIj0f(D4OXYPALUYAIDNSO: String) returns String;

    // Update Notification Flag
    action BLqy0dzTSxOAfOzu(D4OXYPALUYAIDNSO: String) returns String;

    // Assign Incident
    action Hx4qjNkqmV4n356u(D4OXYPALUYAIDNSO: String) returns String;

    // Custom Tab 1
    action ZDsPAuKh77w3d6G5(D4OXYPALUYAIDNSO: String) returns String;

    // Custom Tab 2
    action TF70gMmrN0sfaumZ(D4OXYPALUYAIDNSO: String) returns String;

    // Custom Tab 3
    action DOM3jmE2pjtlatjf(D4OXYPALUYAIDNSO: String) returns String;

    // Absence Audit
    action p6dmi7iqbx36prd9(D4OXYPALUYAIDNSO: String) returns String;

    // Restriction Limitation
    action cx42wckg3ea6w53v(D4OXYPALUYAIDNSO: String) returns String;

    // RTW Details
    action NNyi8BHH5WTRSazc(D4OXYPALUYAIDNSO: String) returns String;

    // Reopen Incident
    action bVWeC9j8s27C5hn7(D4OXYPALUYAIDNSO: String) returns String;

    // Update Corrective Action Status
    action lMjgEa7FtVWpKj4g(D4OXYPALUYAIDNSO: String) returns String;

    // Delete Absence Audit
    action w7zw25hhn9i7mss7(D4OXYPALUYAIDNSO: String) returns String;

    // Delete Restriction Limitation
    action rq2zxcvr36jsb8zq(D4OXYPALUYAIDNSO: String) returns String;

    // Delete Involved people
    action HTFCBsan18bqxhgt(D4OXYPALUYAIDNSO: String) returns String;

    // Delete Injured Body Part
    action T7QviTG4DnXQDbWo(D4OXYPALUYAIDNSO: String) returns String;

    // Delete Property Equipment
    action NHeYVYv3d2RvARJK(D4OXYPALUYAIDNSO: String) returns String;

    // Delete Passenger
    action nDIBCLhbYOJixpTn(D4OXYPALUYAIDNSO: String) returns String;

    // Delete Chain of Event
    action AGYEL6P9S7S36RI7(D4OXYPALUYAIDNSO: String) returns String;

    // Delete Corrective Action
    action f1pUMehrwgjb69Lo(D4OXYPALUYAIDNSO: String) returns String;

    // Delete Environment Corrective Action
    action vwx9J4D07CWOGdds(D4OXYPALUYAIDNSO: String) returns String;

    // Delete Lesson Learned
    action yUmvi9VpKnnReNFn(D4OXYPALUYAIDNSO: String) returns String;

    // Delete Notes
    action DjF1dF3R03tsEWmF(D4OXYPALUYAIDNSO: String) returns String;

    // Delete Attachment
    action d0beQXTd6nyEvm1v(D4OXYPALUYAIDNSO: String) returns String;

    // Delete Investigation Team
    action jt5krfLWC6Z5K9D1(D4OXYPALUYAIDNSO: String) returns String;

    // Delete Root Cause
    action z9q1b0huwplxyw5q(D4OXYPALUYAIDNSO: String) returns String;

    // Delete Root Cause Analysis
    action yIWriPzYOfXsHGba(D4OXYPALUYAIDNSO: String) returns String;

    // Delete RTW
    action j0hbiystv2nse4e3(D4OXYPALUYAIDNSO: String) returns String;

} 
