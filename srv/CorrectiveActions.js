const { validateField, validateArray, generateIncidentNumber,getSequenceNumber,setValue } = require('./Common');
//This is test.
const cds = require('@sap/cds');
let oInput,tx,tx1;

module.exports = cds.service.impl(function (){

    // Update Corrective Actions
    this.on("VkUtg9WbhpLD7WKX", async (req) => {
        try{
            let result, oCorrectiveActionId;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            let oCorrectiveActions = oInput.CorrectiveActions;         //  Corrective Actions

            tx = cds.transaction(req);

            result = await tx.run(`CALL prCreateUpdateInvCorrectiveActions(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
                setValue(oCorrectiveActions.CRAID),
                setValue(oCorrectiveActions.INCID),
                setValue(oCorrectiveActions.EMPID),
                setValue(oCorrectiveActions.CACL7),
                setValue(oCorrectiveActions.CACL8),
                setValue(oCorrectiveActions.CACL11),
                setValue(oCorrectiveActions.CACL12),
                setValue(oCorrectiveActions.CACL13),
                setValue(oCorrectiveActions.CASTS),
                setValue(oCorrectiveActions.CLODT),
                setValue(oCorrectiveActions.RCA1ID),
                setValue(oCorrectiveActions.RCA1PH),
                setValue(oCorrectiveActions.RCA2ID),
                setValue(oCorrectiveActions.RCA2PH),
                setValue(oCorrectiveActions.RCA3ID),
                setValue(oCorrectiveActions.RCA3PH),
                setValue(oCorrectiveActions.RCA4ID),
                setValue(oCorrectiveActions.RCA4PH)
            ])

            oCorrectiveActionId = oCorrectiveActions.CRAID;

            // Creating Event Summary
            if (oCorrectiveActions.CRAID !== 0 && oCorrectiveActions.CASTS === 876) { // CA Completed
                result = await tx.run(`CALL prCreateEventSummary(?,?,?,?,?)`, [oCorrectiveActions.INCID, 'Corrective Actions -'+CORRECTIVEACTIONID, 'Complete', oCorrectiveActions.NOTES, 0]);    
            }else{                                                                    // CA Updated
                result = await tx.run(`prCreateEventSummary(?,?,?,?,?)`, [oCorrectiveActions.INCID, 'Corrective Actions -'+CORRECTIVEACTIONID, 'Updated', oCorrectiveActions.NOTES, 0]);    
            }
            
            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oCorrectiveActions.INCID, oCorrectiveActionId, 'Corrective Action Id', 'UpdateCorrectiveActions','Safety View',JSON.stringify(oInput)]);
			
            returnObj = {
				"Success" : "Corrective Action Updated Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);

        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Corrective Action Portal','UpdateCorrectiveActions',JSON.stringify(oInput),error.toString(),'DB']);
                console.log(result);
                await tx1.commit();
            }catch (logError) {
                console.error('Error logging failed:', logError);
            }
            if (tx) {
                await tx.rollback();
            }
            return req.error({
                code: 500, 
                message: error.toString() 
            });

        }
    })

    // Update Corrective Action Status
    this.on("lMjgEa7FtVWpKj4g", async (req) => {
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            let oCorrectiveActions = oInput.CorrectiveActions; 

            tx = cds.transaction(req);

            result = await tx.run(`CALL prUpdateCorrectiveActionStatus(?,?,?)`, [
                setValue(oCorrectiveActions.CRAID),
                setValue(oCorrectiveActions.INCID),
                setValue(oCorrectiveActions.CASTS)
            ]);

            // Creating Event Summary
		    result = await tx.run(`CALL prCreateEventSummary(?,?,?,?,?)`, [oCorrectiveActions.INCID,'Corrective Action','Status Updated', '',0]);
            
            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oCorrectiveActions.INCID,oCorrectiveActions.CRAID,'Corrective Action Id', 'UpdateCorrectiveActionStatus','Safety View',JSON.stringify(oInput)]);

            returnObj = {
				"Success" : "Corrective Action - " + oCorrectiveActions.CRAID +  " Status Updated Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);

        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Corrective Action Portal','UpdateCorrectiveActionStatus',JSON.stringify(oInput),error.toString(),'DB']);
                console.log(result);
                await tx1.commit();
            }catch (logError) {
                console.error('Error logging failed:', logError);
            }
            if (tx) {
                await tx.rollback();
            }
            return req.error({
                code: 500, 
                message: error.toString() 
            });

        }
    })

})