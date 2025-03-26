const { validateField, validateArray, generateIncidentNumber,getSequenceNumber,setValue } = require('./Common');
//This is test.
const cds = require('@sap/cds');
let oInput,tx,tx1;

module.exports = cds.service.impl(function (){

    // Pre-Investigation
    this.on("DBDHIPPZlqSDVFCE", async (req) => {
        try{
            let result,oPreInvestigationId;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
			let oPreInvestigation = oInput.PreInvestigation;

            tx = cds.transaction(req);

            result = await tx.run(`CALL prCreateUpdatePreInvestigation(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
                setValue(oPreInvestigation.PRIID),
                setValue(oPreInvestigation.INCID),
                setValue(oPreInvestigation.T1LB1),
                setValue(oPreInvestigation.T1LB3),
                setValue(oPreInvestigation.T1LB4),
                setValue(oPreInvestigation.T1LB5),
                setValue(oPreInvestigation.T1LB6),
                setValue(oPreInvestigation.T1LB7),
                setValue(oPreInvestigation.T1LB8),
                setValue(oPreInvestigation.T3LB1),
                setValue(oPreInvestigation.T3LB2),
                setValue(oPreInvestigation.T3LB3),
                setValue(oPreInvestigation.T3LB4),
                setValue(oPreInvestigation.PRFLG)
            ]);

            oPreInvestigationId = oPreInvestigation.PRIID == 0 ? await getSequenceNumber("INC_T_PRINV","PRIID") : oPreInvestigation.PRIID;

            let LinkedIncidents = oPreInvestigation.LinkedIncidents;
            if(validateArray(LinkedIncidents)) {
                for(i = 0 ; i < LinkedIncidents.length ; i++){
                    result = await tx.run(`CALL prCreateUpdateLinkedIncidents(?,?,?,?,?)`, [
                        setValue(LinkedIncidents[i].LINID),
                        setValue(oPreInvestigation.INCID),
                        setValue(oPreInvestigationId),
                        setValue(LinkedIncidents[i].T1LB2),
                        setValue(LinkedIncidents[i].ISDEL)
                    ]);
                }
            }

            let ChainOfEvents = oPreInvestigation.ChainOfEvents;
            if(validateArray(ChainOfEvents)) {
                for(i = 0 ; i < ChainOfEvents.length ; i++){
                    result = await tx.run(`CALL prCreateUpdateChainOfEvents(?,?,?,?)`, [
                        setValue(ChainOfEvents[i].EIJID),
                        setValue(oPreInvestigation.INCID),
                        setValue(oPreInvestigationId),
                        setValue(ChainOfEvents[i].T2LB1)
                    ]);
                }
            }

            result = await tx.run(`CALL prUpdateProcessFlag(?,?)`, [
                setValue(oPreInvestigation.INCID),
                setValue(oPreInvestigation.PRFLG)
            ]);

            // Creating Event Summary
		    if(oPreInvestigation.PRIID === 0){                                                              // Pre Investigation Created
                result = await tx.run(`CALL prCreateEventSummary(?,?,?,?,?)`, [oPreInvestigation.INCID, 'Pre Investigation', 'Created', '',889]);
            }
            else if(oPreInvestigation.PRFLG !== 2 && oPreInvestigation.PRIID !== 0){                        // pre Investigation Updated
                result = await tx.run(`CALL prCreateEventSummary(?,?,?,?,?)`, [oPreInvestigation.INCID, 'Pre Investigation', 'Updated', '',0]);    
            }
            else if(oPreInvestigation.PRFLG === 2  && oPreInvestigation.PRIID !== 0){                        // Pre Investigation Review Completed
                result = await tx.run(`CALL prCreateEventSummary(?,?,?,?,?)`, [oPreInvestigation.INCID, 'Pre Investigation', 'Review Completed', '',890]);
            }
            
            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oPreInvestigation.INCID, oPreInvestigationId, 'Pre Investigation Id', 'CreateUpdatePreInvestigation','Safety View',JSON.stringify(oInput)]);
			
            returnObj = {
				"Success" : "Pre-investigation Submitted Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);

        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Incident Portal','CreateUpdatePreInvestigation',JSON.stringify(oInput),error.toString(),'Backend']);
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

    // Investigation
    this.on("b9q2fsan18bqIUHT", async (req) => {
        try{
            let result, oInvestigationId, oRootCauseAnalysisId;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
			let oInvestigation          = oInput.Investigation;             // Case Investigation
	        let aInvestigationTeam      = oInput.InvestigationTeam;         // Investigation Team
	        let aRootCause              = oInput.RootCause;                 // Root Cause Input 
	        let aRootCauseAnalysis      = oInput.RootCauseAnalysis;         // Root cause analysis
	        let aGraphicalAnalysis      = oInput.GraphicalAnalysis;         // Graphical analysis

            tx = cds.transaction(req);

            const query = `SELECT RCFAC FROM "INC_T_INVST" WHERE INCID = '${oInvestigation.INCID}' AND ISDEL = \'0\'`;
            const rs = await tx.run(query);
            if (rs.length !== 0) {
                const RCFAC = Object.values(rs[0])[0];

                if(validateField(RCFAC) && oInvestigation.RCFAC !== RCFAC) {
                    result = await tx.run(`CALL prUpdateDeleteRootCauseAndContributingFactors(?)`, [
                        setValue(oInvestigation.INCID)
                    ]);        
                }
            }

            result = await tx.run(`CALL prCreateUpdateInvestigationDetails(?,?,?,?,?,?)`, [
                setValue(oInvestigation.INVID),
                setValue(oInvestigation.INCID),
                setValue(oInvestigation.T1LB1),
                setValue(oInvestigation.T2LB1),
                setValue(oInvestigation.T2LB2),
                setValue(oInvestigation.RCFAC)
            ]);

            oInvestigationId = oInvestigation.INVID == 0 ? await getSequenceNumber("INC_T_INVST","INVID") : oInvestigation.INVID;

            if(validateArray(aInvestigationTeam)) {
                for(i = 0 ; i < aInvestigationTeam.length ; i++){
                    result = await tx.run(`CALL prCreateUpdateInvestigationTeam(?,?,?,?)`, [
                        setValue(aInvestigationTeam[i].ITMID),
                        setValue(oInvestigation.INCID),
                        setValue(oInvestigationId),
                        setValue(aInvestigationTeam[i].EMPID)
                    ]);
                }
            }

            if(validateArray(aRootCause)) {
                for(i = 0 ; i < aRootCause.length ; i++){
                    result = await tx.run(`CALL prCreateUpdateRootCause(?,?,?,?)`, [
                        setValue(aRootCause[i].RCSID),
                        setValue(oInvestigation.INCID),
                        setValue(oInvestigationId),
                        setValue(aRootCause[i].FIWHY)
                    ]);
                }
            }

            if(validateArray(aRootCauseAnalysis)) {
                for(i = 0 ; i < aRootCauseAnalysis.length; i++){
                    result = await tx.run(`CALL prCreateUpdateRootCauseAnalysis(?,?,?,?,?,?,?,?,?,?,?)`, [
                        setValue(aRootCauseAnalysis[i].RCSID),
                        setValue(oInvestigationId),
                        setValue(oInvestigation.INCID),
                        setValue(aRootCauseAnalysis[i].RCA1ID),
                        setValue(aRootCauseAnalysis[i].RCA1PH),
                        setValue(aRootCauseAnalysis[i].RCA2ID),
                        setValue(aRootCauseAnalysis[i].RCA2PH),
                        setValue(aRootCauseAnalysis[i].RCA3ID),
                        setValue(aRootCauseAnalysis[i].RCA3PH),
                        setValue(aRootCauseAnalysis[i].RCA4ID),
                        setValue(aRootCauseAnalysis[i].RCA4PH)
                    ]);

                    oRootCauseAnalysisId = aRootCauseAnalysis[i].RCSID == 0 ? await getSequenceNumber("INC_T_RTCAU","RCSID") : aRootCauseAnalysis[i].RCSID;

                    result = await tx.run(`CALL prCreateUpdateAutoCAGeneration(?,?,?,?,?,?,?,?,?,?)`, [
                        setValue(oRootCauseAnalysisId),
                        setValue(oInvestigation.INCID),
                        setValue(aRootCauseAnalysis[i].RCA1ID),
                        setValue(aRootCauseAnalysis[i].RCA1PH),
                        setValue(aRootCauseAnalysis[i].RCA2ID),
                        setValue(aRootCauseAnalysis[i].RCA2PH),
                        setValue(aRootCauseAnalysis[i].RCA3ID),
                        setValue(aRootCauseAnalysis[i].RCA3PH),
                        setValue(aRootCauseAnalysis[i].RCA4ID),
                        setValue(aRootCauseAnalysis[i].RCA4PH)
                    ]);
                }
            }
            
            if(validateArray(aGraphicalAnalysis)) {
                for(i = 0 ; i < aGraphicalAnalysis.length ; i++){
                    result = await tx.run(`CALL prCreateUpdateGraphicalAnalysis(?,?,?,?,?)`, [
                        setValue(aGraphicalAnalysis[i].GRPID),
                        setValue(oInvestigationId),
                        setValue(oInvestigation.INCID),
                        setValue(aGraphicalAnalysis[i].UNQID),
                        setValue(aGraphicalAnalysis[i].ISDEL)
                    ]);
                }
            }

            result = await tx.run(`CALL prUpdateProcessFlag(?,?)`, [
                setValue(oInvestigation.INCID),
                setValue(oInvestigation.PRFLG)
            ]);

            // Creating Event Summary
		    result = await tx.run(`CALL prCreateEventSummary(?,?,?,?,?)`, [oInvestigation.INCID, 'Investigation', oInvestigation.INVID === 0 ? 'Submitted' : 'Updated', '',oInvestigation.INVID === 0 ? 891 : 0]);    
            
            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oInvestigation.INCID, oInvestigationId, 'Investigation Id', 'CreateUpdateInvestigation','Safety View',JSON.stringify(oInput)]);
			
            returnObj = {
				"Success" : "Investigation Submitted Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);

        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Incident Portal','CreateUpdateInvestigation',JSON.stringify(oInput),error.toString(),'Backend']);
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

    // Corrective Actions
    this.on("FxzlEmezqgGBuqfq", async (req) => {
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

            oCorrectiveActionId = oCorrectiveActions.CRAID == 0 ? await getSequenceNumber("INC_T_CRACT","CRAID") : oCorrectiveActions.CRAID;

            // Creating Event Summary
            if (oCorrectiveActions.CRAID === 0) {
                result = await tx.run(`CALL prCreateEventSummary(?,?,?,?,?)`, [oCorrectiveActions.INCID, 'Corrective Actions - '+CORRECTIVEACTIONID, 'Created (Assigned To - '+oCorrectiveActions.EMPNM +')', oCorrectiveActions.NOTES,0]);    
            }else if(oCorrectiveActions.CRAID !== 0 && oCorrectiveActions.CASTS === 657){                   // Corrective Action Closed
                result = await tx.run(`CALL prCreateEventSummary(?,?,?,?,?)`, [oCorrectiveActions.INCID, 'Corrective Actions - '+CORRECTIVEACTIONID, 'Closed', oCorrectiveActions.NOTES,0]);    
            }else{                                                                                          // CA Updated
                result = await tx.run(`prCreateEventSummary(?,?,?,?,?)`, [oCorrectiveActions.INCID, 'Corrective Actions - '+CORRECTIVEACTIONID, 'Updated (Assigned To - '+oCorrectiveActions.EMPNM +')', oCorrectiveActions.NOTES,0]);    
            }
            
            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oCorrectiveActions.INCID, oCorrectiveActionId, 'Corrective Action Id', 'CreateCorrectiveActions','Safety View',JSON.stringify(oInput)]);
			
            returnObj = {
				"Success" : "Corrective Action Submitted Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);

        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Incident Portal','CreateCorrectiveActions',JSON.stringify(oInput),error.toString(),'Backend']);
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

    // Lessons Learned
    this.on("xGx7YodvNNbU5uKU", async (req) => {
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            let oLessonsLearnPrevent = oInput.LessonsLearnPrevent;   //  Lessons Learn Prevent

            tx = cds.transaction(req);

            result = await tx.run(`CALL prCreateUpdateLessLearnToPrevent(?,?,?)`, [
                setValue(oLessonsLearnPrevent.LLRID),
                setValue(oLessonsLearnPrevent.INCID),
                setValue(oLessonsLearnPrevent.LSLB1)
            ]);
            
            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oLessonsLearnPrevent.INCID, oLessonsLearnPrevent.LLRID, 'Lesson Learned Id', 'CreateLessonLearned','Safety View',JSON.stringify(oInput)]);
			
            returnObj = {
				"Success" : "Added Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);
        
        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Incident Portal','CreateLessonLearned',JSON.stringify(oInput),error.toString(),'Backend']);
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

    // Report Sign Off
    this.on("AzsKzyfS5Kmcs86d", async (req) => {
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            let oSignOff = oInput.SignOff;             //  Sign Off

            tx = cds.transaction(req);

            result = await tx.run(`CALL prCreateUpdateReportSignOff(?,?,?,?,?,?,?,?)`, [
                setValue(oSignOff.SIGID),
                setValue(oSignOff.INCID),
                setValue(oSignOff.INVID),
                setValue(oSignOff.T1LB1),
                setValue(oSignOff.T1LB3),
                setValue(oSignOff.T1LB4),
                setValue(oSignOff.T1LB5),
                setValue(oSignOff.SFONT)
            ]);

            result = await tx.run(`CALL prUpdateProcessFlag(?,?)`, [
                setValue(oSignOff.INCID),
                setValue(oSignOff.PRFLG)
            ]);

            // Creating Event Summary
			result = await tx.run(`CALL prCreateEventSummary(?,?,?,?,?)`, [oSignOff.INCID, 'Report', 'Signed Off', '',0]);
            
            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oSignOff.INCID, oSignOff.INVID, 'Investigation Id', 'CreateUpdateSignOff','Safety View',JSON.stringify(oInput)]);
			
            returnObj = {
				"Success" : "Sign-Off Completed Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);
        
        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Incident Portal','CreateUpdateSignOff',JSON.stringify(oInput),error.toString(),'Backend']);
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

    // Notes
    this.on("QGByRBtgVZREybOU", async (req) => {
        try{
            let result, oNoteId;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            let oNotes = oInput.Notes;             //  Sign Off

            tx = cds.transaction(req);

            result = await tx.run(`CALL prCreateUpdateNoteTab(?,?,?,?)`, [
                setValue(oNotes.NOTID),
                setValue(oNotes.INCID),
                setValue(oNotes.T1LB3),
                setValue(oNotes.T1LB5)
            ]);

            oNoteId = oNotes.NOTID == 0 ? await getSequenceNumber("INC_T_NOTES","NOTID") : oNotes.NOTID;

            let SendTo = oNotes.SendTo;
            if(validateArray(SendTo)) {
                for(i = 0; i < SendTo.length; i++) {
                    result = await tx.run(`CALL prCreateNotesSendTo(?,?,?,?)`, [
                        setValue(SendTo.SENID),
                        setValue(oNoteId),
                        setValue(oNotes.INCID),
                        setValue(SendTo.T1LB4)
                    ]);
                }
            }

            // Creating Event Summary
			result = await tx.run(`CALL prCreateEventSummary(?,?,?,?,?)`, [oNotes.INCID, 'Notes', 'Added', oNotes.NTDES,0]);
            
            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oNotes.INCID, oNoteId, 'Note Id', 'CreateUpdateNotes','Safety View',JSON.stringify(oInput)]);
			
            returnObj = {
				"Success" : "Notes Submitted Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);
        
        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Incident Portal','CreateUpdateNotes',JSON.stringify(oInput),error.toString(),'Backend']);
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

    // Attachments
    this.on("vwxGTHJKICWOGdds", async (req) => {
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            let aAttachment = oInput.Attachment;

            tx = cds.transaction(req);
            
            if(validateArray(aAttachment)) {
                for(i = 0; i < aAttachment.length; i++) {
                    result = await tx.run(`CALL prCreateUpdateAttachment(?,?,?,?,?,?,?,?,?,?,?)`, [
                        setValue(aAttachment[i].ATTID),
                        setValue(aAttachment[i].INCID),
                        setValue(aAttachment[i].OBJID),
                        setValue(aAttachment[i].ATTNM),
                        setValue(aAttachment[i].FILTY),
                        setValue(aAttachment[i].PRIST),
                        setValue(aAttachment[i].DOCTY),
                        setValue(aAttachment[i].UNQID),
                        setValue(aAttachment[i].PERNM),
                        setValue(aAttachment[i].DESCP),
                        setValue(aAttachment[i].RTWID)
                    ]);
                }
            }
            
            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [aAttachment[0].INCID, aAttachment[0].INCID, 'Incident Id', 'CreateAttachment','Safety View',JSON.stringify(oInput)]);
			
            returnObj = {
				"Success" : "Attachment Submitted Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);
        
        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Incident Portal','CreateAttachment',JSON.stringify(oInput),error.toString(),'Backend']);
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

    // Close Incident
    this.on("wuScnYBi9xs01U3U", async (req) => {
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            let oCloseIncident = oInput.CloseIncident;             //  Close Incident

            tx = cds.transaction(req);

            result = await tx.run(`CALL prUpdateCloseIncident(?)`, [
                setValue(oCloseIncident.INCID),
            ]);

            result = await tx.run(`CALL prUpdateProcessFlag(?,?)`, [
                setValue(oCloseIncident.INCID),
                setValue(oCloseIncident.PRFLG)
            ]);

            // Creating Event Summary
		    result = await tx.run(`CALL prCreateEventSummary(?,?,?,?,?)`, [oCloseIncident.INCID, 'Investigation', 'Incident Closed', '',889]);
            
            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oCloseIncident.INCID, oCloseIncident.INCID, 'Incident Id', 'UpdateCloseIncident','Safety View',JSON.stringify(oInput)]);
			
            returnObj = {
				"Success" : "Incident Closed Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);

        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Incident Portal','UpdateCloseIncident',JSON.stringify(oInput),error.toString(),'Backend']);
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

    // Update Tracking Flag
    this.on("Dh23XLBkWJ0Ard", async (req) => {
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            let oTrackIncident = oInput.TrackIncident;             //  Close Incident

            tx = cds.transaction(req);

            result = await tx.run(`CALL prUpdateTrackingFlag(?,?)`, [
                setValue(oTrackIncident.INCID),
                setValue(oTrackIncident.TRACK)
            ]);

            // Creating Event Summary
		    result = await tx.run(`CALL prCreateEventSummary(?,?,?,?,?)`, [oTrackIncident.INCID, 'Tracking', oTrackIncident.TRACK === 1 ? 'Tracked' : 'Untracked', '',0]);
            
            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oTrackIncident.INCID, oTrackIncident.INCID, 'Incident Id', 'UpdateTrackingFlag','Safety View',JSON.stringify(oInput)]);
			
            returnObj = {
				"Success" : "Updated Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);

        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Incident Portal','UpdateTrackingFlag',JSON.stringify(oInput),error.toString(),'Backend']);
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

    // Complete Investigation
    this.on("obcS75AWUW8IBMIH", async (req) => {
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            let oCompleteInvestigation = oInput.CompleteInvestigation;             //  Close Incident

            tx = cds.transaction(req);

            result = await tx.run(`CALL prUpdateCompleteInvestigation(?)`, [
                setValue(oCompleteInvestigation.INCID)
            ]);

            result = await tx.run(`CALL prUpdateProcessFlag(?,?)`, [
                setValue(oCompleteInvestigation.INCID),
                setValue(oCompleteInvestigation.PRFLG)
            ]);

            // Creating Event Summary
		    result = await tx.run(`CALL prCreateEventSummary(?,?,?,?,?)`, [oCompleteInvestigation.INCID, 'Investigation', 'Completed', oCompleteInvestigation.CNOTE,892]);
            
            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oCompleteInvestigation.INCID, oCompleteInvestigation.INCID, 'Incident Id', 'UpdateCompleteInvestigation','Safety View',JSON.stringify(oInput)]);
			
            returnObj = {
				"Success" : "Updated Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);

        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Incident Portal','UpdateCompleteInvestigation',JSON.stringify(oInput),error.toString(),'Backend']);
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

    // Update Incident
    this.on("b9q2fsan18bqxar0", async (req) => {
        try {
            let result,oIncidentId,IncidentNumber = '',oInvPeopleId,oWorkInjuryID,oVehicleId,oWorkplaceHarassmentId,oNearMissId,oErgonomicId,oPropEqpDmgId,oEnvironmentId;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
			let oIncidentDetails            = oInput.IncidentDetails;
			let aIncidentType               = oInput.IncidentType;
			let oReportedBy                 = oInput.ReportedBy;
			let oNearMissDetails            = oInput.NearMissDetails;
			let oErgonomics                 = oInput.Ergonomics;
			let aPropertyEquipment          = oInput.PropertyEquipment;
			let oOther                      = oInput.Other;
			let oWorkplaceHarassment        = oInput.WorkplaceHarassment;
			let oExposureDetails            = oInput.ExposureDetails;
			let oEnvironmentalDetails       = oInput.EnvironmentalDetails;
			let oFireExplosionDetails       = oInput.FireExplosion;
			let oVehicleAdditionalDetails   = oInput.VehicleAdditionalDetails;
			let oCustomIncType1             = oInput.CustomIncType1;
			let oCustomIncType2             = oInput.CustomIncType2;
			let oCustomIncType3             = oInput.CustomIncType3;
			let oCustomIncType4             = oInput.CustomIncType4;
			let oCustomIncType5             = oInput.CustomIncType5;

            tx = cds.transaction(req);

            // if(validateField(oIncidentDetails.INCID)){
            result = await tx.run(`CALL prCreateUpdateIncidentDetails(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
                setValue(oIncidentDetails.INCID),
                setValue(oIncidentDetails.REBEH),
                setValue(oIncidentDetails.T1LB1),
                setValue(oIncidentDetails.T1LB2),
                setValue(oIncidentDetails.T1LB3),
                setValue(oIncidentDetails.T1LB4),
                setValue(oIncidentDetails.T1LB5),
                setValue(oIncidentDetails.T1LB8),
                setValue(oIncidentDetails.T1LB9),
                setValue(oIncidentDetails.T1LB13),
                setValue(oIncidentDetails.T2LB1),
                setValue(oIncidentDetails.T2LB2),
                setValue(oIncidentDetails.T2LB6),
                setValue(oIncidentDetails.T2LB3),
                setValue(oIncidentDetails.T2LB7),
                setValue(oIncidentDetails.T2LB8),
                setValue(oIncidentDetails.ISAVE),
                setValue(oIncidentDetails.SIGN1),
                setValue(oIncidentDetails.SN1ST),
                setValue(oIncidentDetails.SN1DT),
                setValue(oIncidentDetails.SIGN2),
                setValue(oIncidentDetails.SN2ST),
                setValue(oIncidentDetails.SN2DT),
                setValue(oIncidentDetails.LATIT),
                setValue(oIncidentDetails.LONGI),
                setValue(oIncidentDetails.DRFNM),
                setValue(oIncidentDetails.T1LB10),
                setValue(oIncidentDetails.T1LB6),
                setValue(oIncidentDetails.T1LB7),
                setValue(oIncidentDetails.T1LB11),
                setValue(oIncidentDetails.T1LB12),
                setValue(oIncidentDetails.T1LB14),
                setValue(oIncidentDetails.T2LB4),
                setValue(oIncidentDetails.T2LB5),
                setValue(oIncidentDetails.T2LB9),
                setValue(oIncidentDetails.T2LB10),
                setValue(oIncidentDetails.INCTY)
            ]);

            oIncidentId = oIncidentDetails.INCID;
            
            let InvolvedPeople = oIncidentDetails.InvolvedPeople;
            if(validateArray(InvolvedPeople)){
            for(let i=0;i < InvolvedPeople.length;i++){
                result = await tx.run(`CALL prCreateUpdateInvolvedPeopleDetails(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
                    setValue(InvolvedPeople[i].IPLID),
                    setValue(oIncidentId),
                    setValue(InvolvedPeople[i].UNQID),
                    setValue(InvolvedPeople[i].PPLB1),
                    setValue(InvolvedPeople[i].PPLB2),
                    setValue(InvolvedPeople[i].PPLB3),
                    setValue(InvolvedPeople[i].PPLB4),
                    setValue(InvolvedPeople[i].PPLB5),
                    setValue(InvolvedPeople[i].PPLB7),
                    setValue(InvolvedPeople[i].PPLB8),
                    setValue(InvolvedPeople[i].PPLB9),
                    setValue(InvolvedPeople[i].PPLB10),
                    setValue(InvolvedPeople[i].PPLB11),
                    setValue(InvolvedPeople[i].PPLB12),
                    setValue(InvolvedPeople[i].PPLB13),
                    setValue(InvolvedPeople[i].PPLB14),
                    setValue(InvolvedPeople[i].PPLB15),
                    setValue(InvolvedPeople[i].PPLB16),
                    setValue(InvolvedPeople[i].PPLB17),
                    setValue(InvolvedPeople[i].PPLB18),
                    setValue(InvolvedPeople[i].PPLB19),
                    setValue(InvolvedPeople[i].PPLB20),
                    setValue(InvolvedPeople[i].PPLB21),
                    setValue(InvolvedPeople[i].PPLB22)
                ]);
                
                oInvPeopleId = InvolvedPeople[i].IPLID == 0 ? await getSequenceNumber("INC_T_INVPL","IPLID") : InvolvedPeople[i].IPLID;
                let PersonType = InvolvedPeople[i].PersonType;
                if(validateArray(PersonType)){
                for(let j=0;j < PersonType.length;j++){
                    result = await tx.run(`CALL prCreateUpdateInvolvedPeopleType(?,?,?,?,?)`, [
                        setValue(PersonType[j].IPTID),
                        setValue(oInvPeopleId),
                        setValue(oIncidentId),
                        setValue(PersonType[j].PPLB6),
                        setValue(PersonType[j].ISDEL)
                    ]);

                    // Deleting person type if applicable
                    if(PersonType[j].ISDEL === '1'){
                        result = await tx.run(`CALL prDeleteInvolvedPersonType(?,?,?)`, [
                            setValue(oIncidentId),
                            setValue(PersonType[j].PPLB6),
                            setValue(oInvPeopleId)                            
                        ]);
                    }
                }
            }
                // WorkPlace Injury Tab 
                let WorkplaceInjury = InvolvedPeople[i].WorkplaceInjury
                if(validateField(WorkplaceInjury.WPIID)){
                    result = await tx.run(`CALL prCreateUpdateWorkPlaceInjury(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
                        setValue(WorkplaceInjury.WPIID),
                        setValue(oIncidentId),
                        setValue(oInvPeopleId),
                        setValue(WorkplaceInjury.UNQID),
                        setValue(WorkplaceInjury.T1LB1),
                        setValue(WorkplaceInjury.T1LB2),
                        setValue(WorkplaceInjury.T1LB3),
                        setValue(WorkplaceInjury.T1LB4),
                        setValue(WorkplaceInjury.T1LB5),
                        setValue(WorkplaceInjury.T1LB6),
                        setValue(WorkplaceInjury.T1LB7),
                        setValue(WorkplaceInjury.T1LB8),
                        setValue(WorkplaceInjury.T1LB9),
                        setValue(WorkplaceInjury.T1LB10),
                        setValue(WorkplaceInjury.T1LB11),
                        setValue(WorkplaceInjury.T1LB12),
                        setValue(WorkplaceInjury.T1LB13),
                        setValue(WorkplaceInjury.T2LB1),
                        setValue(WorkplaceInjury.T2LB2),
                        setValue(WorkplaceInjury.T2LB3),
                        setValue(WorkplaceInjury.T2LB4),
                        setValue(WorkplaceInjury.T2LB5),
                        setValue(WorkplaceInjury.T2LB6),
                        setValue(WorkplaceInjury.T2LB7)                        
                    ]);

                    oWorkInjuryID = WorkplaceInjury.WPIID == 0 ? await getSequenceNumber("INC_T_WPIDT","WPIID") : WorkplaceInjury.WPIID;

                    let BodyPart = WorkplaceInjury.BodyPart;
                    if(validateArray(BodyPart)){
                    for(let j=0;j<BodyPart.length;j++){
                        result = await tx.run(`CALL prCreateUpdateBodyParts(?,?,?,?,?,?,?)`, [
                            setValue(BodyPart[j].BDPID),
                            setValue(oWorkInjuryID),
                            setValue(oIncidentId),
                            setValue(BodyPart[j].BDCL1),
                            setValue(BodyPart[j].BDCL2),
                            setValue(BodyPart[j].BDCL3),
                            setValue(BodyPart[j].BDCL4) 
                        ]); 
                    }
                }
                }
                let FirstAider = InvolvedPeople[i].FirstAider;
                if(validateField(FirstAider.FISID)){
                result = await tx.run(`CALL prCreateUpdateFirstAider(?,?,?,?,?,?,?,?,?)`, [
                    setValue(FirstAider.FISID),
                    setValue(oIncidentId),
                    setValue(oInvPeopleId),
                    setValue(FirstAider.UNQID),
                    setValue(FirstAider.T1LB1),
                    setValue(FirstAider.T1LB2),
                    setValue(FirstAider.T1LB3),
                    setValue(FirstAider.T1LB4),
                    setValue(FirstAider.T1LB5)
                ]); 
            }

                let VehicleDetails = InvolvedPeople[i].VehicleDetails;
                if(validateField(VehicleDetails.MVDID)){
                result = await tx.run(`call prCreateUpdateMotorVehicleDetails(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                    setValue(VehicleDetails.MVDID),
                    setValue(oIncidentId),
                    setValue(oInvPeopleId),
                    setValue(VehicleDetails.T1LB1),
                    setValue(VehicleDetails.T1LB2),
                    setValue(VehicleDetails.T1LB3),
                    setValue(VehicleDetails.T1LB4),
                    setValue(VehicleDetails.T1LB5),
                    setValue(VehicleDetails.T1LB7),
                    setValue(VehicleDetails.T1LB8),
                    setValue(VehicleDetails.T1LB9),
                    setValue(VehicleDetails.T1LB10),
                    setValue(VehicleDetails.T1LB11),
                    setValue(VehicleDetails.T1LB12),
                    setValue(VehicleDetails.T1LB13),
                    setValue(VehicleDetails.T1LB14),
                    setValue(VehicleDetails.T1LB15),
                    setValue(VehicleDetails.T1LB16),
                    setValue(VehicleDetails.T1LB18),
                    setValue(VehicleDetails.T1LB19),
                    setValue(VehicleDetails.T1LB20),
                    setValue(VehicleDetails.T1LB21),
                    setValue(VehicleDetails.T1LB22),
                    setValue(VehicleDetails.T1LB23),
                    setValue(VehicleDetails.T1LB24),
                    setValue(VehicleDetails.T1LB25),
                    setValue(VehicleDetails.UNQID)
                ]);

                oVehicleId = VehicleDetails.MVDID == 0 ? await getSequenceNumber("INC_T_MTVDT","MVDID") : VehicleDetails.MVDID;

                let Endorsements = VehicleDetails.Endorsements;
                if(validateArray(Endorsements)){
                for(let j=0;j<Endorsements.length;j++){
                    result = await tx.run(`call prCreateUpdateEndorsements(?,?,?,?,?)`,[
                        setValue(Endorsements[j].ENDID),
                        setValue(oIncidentId),
                        setValue(oVehicleId),
                        setValue(Endorsements[j].T1LB17),
                        setValue(Endorsements[j].ISDEL)
                    ]);
                }
            }
                // Restrictions
                let Restrictions = VehicleDetails.Restrictions;
                if(validateArray(Restrictions)){
                for(let j=0;j<Restrictions.length;j++){
                    result = await tx.run(`call prCreateUpdateMotorVehicleRestrictions(?,?,?,?,?)`,[
                        setValue(Restrictions[j].RESID),
                        setValue(oIncidentId),
                        setValue(oVehicleId),
                        setValue(Restrictions[j].T1LB6),
                        setValue(Restrictions[j].ISDEL)
                    ]);
                }
            }

                // PassengerDetails
                let PassengerDetails = VehicleDetails.PassengerDetails;
                if(validateArray(PassengerDetails)){
                for(let j=0;j<PassengerDetails.length;j++){
                    result = await tx.run(`call prCreateUpdatePassangerDetails(?,?,?,?,?,?,?)`,[
                        setValue(PassengerDetails[j].PASID),
                        setValue(oVehicleId),
                        setValue(oIncidentId),
                        setValue(PassengerDetails[j].T3LB1),
                        setValue(PassengerDetails[j].T3LB2),
                        setValue(PassengerDetails[j].T3LB3),
                        setValue(PassengerDetails[j].T3LB4)
                    ]);
                }
            }
            }
                // Complainant
                let Complainant = InvolvedPeople[i].Complainant;
                if(validateField(Complainant.CAAID)){
                result = await tx.run(`call prCreateUpdateComplainantAccused(?,?,?,?,?)`,[
                    setValue(Complainant.CAAID),
                    setValue(oInvPeopleId),
                    setValue(oIncidentId),
                    setValue(Complainant.UNQID),
                    setValue(Complainant.COAAC)
                ]);
            }

                // Accused
                let Accused = InvolvedPeople[i].Accused;
                if(validateField(Accused.CAAID)){
                result = await tx.run(`call prCreateUpdateComplainantAccused(?,?,?,?,?)`,[
                    setValue(Accused.CAAID),
                    setValue(oInvPeopleId),
                    setValue(oIncidentId),
                    setValue(Accused.UNQID),
                    setValue(Accused.COAAC)
                ]);
            }
            }
        }
            
            // Vehicle Additional Details
            if(validateField(oVehicleAdditionalDetails.MVAID)){
            result = await tx.run(`call prCreateUpdateMotorVehicleAdditionalDetails(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                setValue(oVehicleAdditionalDetails.MVAID),
                setValue(oIncidentId),
                setValue(oVehicleAdditionalDetails.T4LB1),
                setValue(oVehicleAdditionalDetails.T4LB2),
                setValue(oVehicleAdditionalDetails.T4LB3),
                setValue(oVehicleAdditionalDetails.T4LB4),
                setValue(oVehicleAdditionalDetails.T4LB5),
                setValue(oVehicleAdditionalDetails.T4LB6),
                setValue(oVehicleAdditionalDetails.T4LB7),
                setValue(oVehicleAdditionalDetails.T4LB8),
                setValue(oVehicleAdditionalDetails.T4LB9),
                setValue(oVehicleAdditionalDetails.RDMAP),
                setValue(oVehicleAdditionalDetails.T4LB10),
                setValue(oVehicleAdditionalDetails.T4LB11),
                setValue(oVehicleAdditionalDetails.T5LB1),
                setValue(oVehicleAdditionalDetails.T5LB2),
                setValue(oVehicleAdditionalDetails.T5LB3),
                setValue(oVehicleAdditionalDetails.T5LB4),
                setValue(oVehicleAdditionalDetails.T5LB5)
            ]);
        }
            
            // Workplace Harassment
            if(validateField(oWorkplaceHarassment.WHVID)){
            result = await tx.run(`call prCreateUpdateWorkplaceHarassment(?,?,?,?,?,?,?,?,?,?,?,?)`,[
                setValue(oWorkplaceHarassment.WHVID),
                setValue(oIncidentId),
                setValue(oWorkplaceHarassment.T3LB1),
                setValue(oWorkplaceHarassment.T3LB2),
                setValue(oWorkplaceHarassment.T3LB3),
                setValue(oWorkplaceHarassment.T3LB6),
                setValue(oWorkplaceHarassment.T3LB8),
                setValue(oWorkplaceHarassment.T3LB10),
                setValue(oWorkplaceHarassment.T3LB11),
                setValue(oWorkplaceHarassment.T3LB14),
                setValue(oWorkplaceHarassment.T3LB15)
            ]);

            oWorkplaceHarassmentId = oWorkplaceHarassment.WHVID == 0 ? await getSequenceNumber("INC_T_WPHAV","WHVID") : oWorkplaceHarassment.WHVID; 

            // Type of Occurance
            let TypeOfOccurrence = oWorkplaceHarassment.TypeOfOccurrence;
            if(validateArray(TypeOfOccurrence)){
            for (let i=0;i < TypeOfOccurrence.length;i++){
                result = await tx.run(`call prCreateUpdateTypeOfOccurrenceRep(?,?,?,?,?)`,[
                    setValue(TypeOfOccurrence[i].OCRID),
                    setValue(oWorkplaceHarassmentId),
                    setValue(oIncidentId),
                    setValue(TypeOfOccurrence[i].T3LB4),
                    setValue(TypeOfOccurrence[i].ISDEL)
                ]);
            }
        }
            // Physical
            let Physical = oWorkplaceHarassment.Physical;
            if(validateArray(Physical)){
            for (let i=0;i < Physical.length;i++){
                result = await tx.run(`call prCreateUpdatePhysicalHarassmentType(?,?,?,?,?)`,[
                    setValue(Physical[i].PHYID),
                    setValue(oWorkplaceHarassmentId),
                    setValue(oIncidentId),
                    setValue(Physical[i].T3LB5),
                    setValue(Physical[i].ISDEL)
                ]);
            }
        }

            // Psychological
            let Psychological = oWorkplaceHarassment.Psychological;
            if(validateArray(Psychological)){
            for (let i=0;i < Psychological.length;i++){
                result = await tx.run(`call prCreateUpdatePsychologicalHarassmentType(?,?,?,?,?)`,[
                    setValue(Psychological[i].PSYID),
                    setValue(oWorkplaceHarassmentId),
                    setValue(oIncidentId),
                    setValue(Psychological[i].T3LB7),
                    setValue(Psychological[i].ISDEL)
                ]);
            }
        }

            // Verbal
            let Verbal = oWorkplaceHarassment.Verbal;
            if(validateArray(Verbal)){
            for (let i=0;i < Verbal.length;i++){
                result = await tx.run(`call prCreateUpdateVerbalHarrasementType(?,?,?,?,?)`,[
                    setValue(Verbal[i].VBLID),
                    setValue(oWorkplaceHarassmentId),
                    setValue(oIncidentId),
                    setValue(Verbal[i].T3LB9),
                    setValue(Verbal[i].ISDEL)
                ]);
            }
        }

            // Please select all that apply
            let PleaseSelectAll = oWorkplaceHarassment.PleaseSelectAll;
            if (oWorkplaceHarassment.T3LB11 === 0) {
                if(validateArray(PleaseSelectAll)){
                for (let i=0;i < PleaseSelectAll.length;i++){
                    result = await tx.run(`call prCreateUpdatePleaseSelectAllThatApply(?,?,?,?,?)`,[
                        setValue(PleaseSelectAll[i].PSAID),
                        setValue(oWorkplaceHarassmentId),
                        setValue(oIncidentId),
                        setValue(PleaseSelectAll[i].T3LB12),
                        setValue(PleaseSelectAll[i].ISDEL)
                    ]);
                }
            }
            }

            // Immediate Action
            let ImmediateAction = oWorkplaceHarassment.ImmediateAction;
            if(validateArray(ImmediateAction)){
            for (let i=0;i < ImmediateAction.length;i++){
                result = await tx.run(`call prCreateUpdateImmediateActions(?,?,?,?,?)`,[
                    setValue(ImmediateAction[i].IACID),
                    setValue(oWorkplaceHarassmentId),
                    setValue(oIncidentId),
                    setValue(ImmediateAction[i].T3LB13),
                    setValue(ImmediateAction[i].ISDEL)
                ]);
            }
        }
        }
            // Incident Type
            if(validateArray(aIncidentType)){
            for (let i=0;i < aIncidentType.length;i++){
                result = await tx.run(`call prCreateUpdateIncidentType(?,?,?,?)`,[
                    setValue(aIncidentType[i].ICTID),
                    setValue(oIncidentId),
                    setValue(aIncidentType[i].INCTY),
                    setValue(aIncidentType[i].ISDEL)
                ]);
                if(aIncidentType[i].ISDEL === '1'){
                    result = await tx.run(`call prDeleteIncTypeRecords(?,?)`,[
                        setValue(oIncidentId),
                        setValue(aIncidentType[i].INCTY)
                    ]);
                }
            }
        }

            // Reported By
            if(validateField(oReportedBy.REPID)){
            result = await tx.run(`call prCreateUpdateReportedByDetails(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                setValue(oReportedBy.REPID),
                setValue(oIncidentId),
                setValue(oReportedBy.RPLB1),
                setValue(oReportedBy.RPLB2),
                setValue(oReportedBy.RPLB3),
                setValue(oReportedBy.RPLB4),
                setValue(oReportedBy.RPLB5),
                setValue(oReportedBy.RPLB6),
                setValue(oReportedBy.RPLB7),
                setValue(oReportedBy.RPLB8),
                setValue(oReportedBy.RPLB9),
                setValue(oReportedBy.MGRID),
                setValue(oReportedBy.RPLB10),
                setValue(oReportedBy.RPLB11),
                setValue(oReportedBy.RPLB12),
                setValue(oReportedBy.RPLB13),
                setValue(oReportedBy.RPLB14)
            ]);
        }

            // Near Miss Tab
            if(validateField(oNearMissDetails.NRMID)){
            result = await tx.run(`call prCreateUpdateNearMissDetails(?,?,?,?,?,?,?,?,?)`,[
                setValue(oNearMissDetails.NRMID),
                setValue(oIncidentId),
                setValue(oNearMissDetails.T1LB3),
                setValue(oNearMissDetails.T1LB4),
                setValue(oNearMissDetails.T1LB5),
                setValue(oNearMissDetails.T1LB6),
                setValue(oNearMissDetails.T1LB7),
                setValue(oNearMissDetails.T1LB8)              
            ]);

            oNearMissId = oNearMissDetails.NRMID == 0 ? await getSequenceNumber("INC_T_NRMIS","NRMID") : oNearMissDetails.NRMID;

            // Near miss type
            let NearMissType = oNearMissDetails.NearMissType;
            if(validateArray(NearMissType)){
            for (let i=0;i < NearMissType.length;i++){
                result = await tx.run(`call prCreateUpdateNearMissType(?,?,?,?,?)`,[
                    setValue(NearMissType[i].NMTID),
                    setValue(oIncidentId),
                    setValue(oNearMissId),
                    setValue(NearMissType[i].T1LB1),
                    setValue(NearMissType[i].ISDEL)
                ]);
            }
        }

            // Near miss potential
            let NearMissPotential = oNearMissDetails.NearMissPotential;
            if(validateArray(NearMissPotential)){
            for (let i=0;i < NearMissPotential.length;i++){
                result = await tx.run(`call prCreateUpdatePotentialNearMiss(?,?,?,?,?)`,[
                    setValue(NearMissPotential[i].NMPID),
                    setValue(oIncidentId),
                    setValue(oNearMissId),
                    setValue(NearMissPotential[i].T1LB2),
                    setValue(NearMissPotential[i].ISDEL)
                ]);
            }
        }
    }

            // Ergonomics Tab
            if (validateField(oErgonomics.ERGID)) {
                result = await tx.run(`call prCreateUpdateErgonomics(?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                    setValue(oErgonomics.ERGID),
                    setValue(oIncidentId),
                    setValue(oErgonomics.T1LB3),
                    setValue(oErgonomics.T1LB4),
                    setValue(oErgonomics.T2LB1),
                    setValue(oErgonomics.T2LB2),
                    setValue(oErgonomics.T2LB3),
                    setValue(oErgonomics.T2LB4),
                    setValue(oErgonomics.T2LB5),
                    setValue(oErgonomics.T2LB6),
                    setValue(oErgonomics.T3LB1),
                    setValue(oErgonomics.T3LB2),
                    setValue(oErgonomics.T3LB3)
                ]);

                oErgonomicId = oErgonomics.ERGID == 0 ? await getSequenceNumber("INC_T_ERGTY","IPLID") : oErgonomics.ERGID; 

                let ErgonomicsType = oErgonomics.ErgonomicsType;
                if(validateArray(ErgonomicsType)){
                for (let i=0;i < ErgonomicsType.length;i++){
                    result = await tx.run(`call prCreateUpdateErgonomicsTypes(?,?,?,?,?)`,[
                        setValue(ErgonomicsType[i].EGTID),
                        setValue(oIncidentId),
                        setValue(oErgonomicId),
                        setValue(ErgonomicsType[i].T1LB1),
                        setValue(ErgonomicsType[i].ISDEL)
                    ]);
                }
            }

                // Ergonomics type which are most applicable
                let ErgonomicsMAType = oErgonomics.ErgonomicsMAType;
                if(validateArray(ErgonomicsMAType)){
                for (let i=0;i < ErgonomicsMAType.length;i++){
                    result = await tx.run(`call prCreateUpdateErgonomicsMostApplicableTypes(?,?,?,?,?)`,[
                        setValue(ErgonomicsMAType[i].EMAID),
                        setValue(oIncidentId),
                        setValue(oErgonomicId),
                        setValue(ErgonomicsMAType[i].T1LB2),
                        setValue(ErgonomicsMAType[i].ISDEL)
                    ]);
                }
            }
            }

            // Property Damage
            if(validateArray(aPropertyEquipment)){
            for (let i=0;i < aPropertyEquipment.length;i++){
                result = await tx.run(`call prCreateUpdatePropertyEquipmentDamage(?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                    setValue(aPropertyEquipment[i].PEDID),
                    setValue(oIncidentId),
                    setValue(aPropertyEquipment[i].T1LB2),
                    setValue(aPropertyEquipment[i].T1LB3),
                    setValue(aPropertyEquipment[i].T1LB4),
                    setValue(aPropertyEquipment[i].T1LB5),
                    setValue(aPropertyEquipment[i].T1LB6),
                    setValue(aPropertyEquipment[i].T1LB7),
                    setValue(aPropertyEquipment[i].T1LB8),
                    setValue(aPropertyEquipment[i].T1LB9),
                    setValue(aPropertyEquipment[i].T1LB10),
                    setValue(aPropertyEquipment[i].T1LB11),
                    setValue(aPropertyEquipment[i].T1LB12)
                ]);

                oPropEqpDmgId = aPropertyEquipment[i].PEDID == 0 ? await getSequenceNumber("INC_T_PEDMG","PEDID") : aPropertyEquipment[i].PEDID; 

                // Property Type
                let PropertyType = aPropertyEquipment[i].PropertyType;
                if(validateArray(PropertyType)){
                for (let j=0;j < PropertyType.length;j++){
                    result = await tx.run(`call prCreateUpdatePropertyType(?,?,?,?,?)`,[
                        setValue(PropertyType[j].PTYID),
                        setValue(oIncidentId),
                        setValue(oPropEqpDmgId),
                        setValue(PropertyType[j].T1LB1),
                        setValue(PropertyType[j].ISDEL)
                    ]);
                }
            }
            }
         }
            // Other
            if (validateField(oOther.OTHID)) {
                result = await tx.run(`call prCreateUpdateOtherIncidentType(?,?,?,?,?)`,[
                    setValue(oOther.OTHID),
                    setValue(oIncidentId),
                    setValue(oOther.T1LB1),
                    setValue(oOther.T1LB2),
                    setValue(oOther.T1LB3)
                ]);
            }

            // Fire / Explosion
            if (validateField(oFireExplosionDetails.FEPID)) {
                result = await tx.run(`call prCreateUpdateFireExplosionDetails(?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                    setValue(oFireExplosionDetails.FEPID),
                    setValue(oIncidentId),
                    setValue(oFireExplosionDetails.T1LB1),
                    setValue(oFireExplosionDetails.T1LB2),
                    setValue(oFireExplosionDetails.T1LB3),
                    setValue(oFireExplosionDetails.T1LB4),
                    setValue(oFireExplosionDetails.T1LB5),
                    setValue(oFireExplosionDetails.T1LB6),
                    setValue(oFireExplosionDetails.T1LB7),
                    setValue(oFireExplosionDetails.T1LB8),
                    setValue(oFireExplosionDetails.T1LB9),
                    setValue(oFireExplosionDetails.T1LB10),
                    setValue(oFireExplosionDetails.T1LB11)
                ]);
            }

            // Exposure
            if (validateField(oExposureDetails.EXPID)) {
                result = await tx.run(`call prCreateUpdateExposureTab(?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                    setValue(oExposureDetails.EXPID),
                    setValue(oIncidentId),
                    setValue(oExposureDetails.T1LB1),
                    setValue(oExposureDetails.T1LB2),
                    setValue(oExposureDetails.T1LB3),
                    setValue(oExposureDetails.T1LB5),
                    setValue(oExposureDetails.T1LB6),
                    setValue(oExposureDetails.T1LB8),
                    setValue(oExposureDetails.T1LB9),
                    setValue(oExposureDetails.T1LB10),
                    setValue(oExposureDetails.T1LB11),
                    setValue(oExposureDetails.T1LB12),
                    setValue(oExposureDetails.T1LB13)
                ]);

                oExposureId = oExposureDetails.EXPID == 0 ? await getSequenceNumber("INC_T_EXPSR","EXPID") : oExposureDetails.EXPID; 

                let RouteExposure = oExposureDetails.RouteExposure;
                if(validateArray(RouteExposure)){
                for (let i=0;i < RouteExposure.length;i++){
                    result = await tx.run(`call prCreateUpdateRouteExposure(?,?,?,?,?)`,[
                        setValue(RouteExposure[i].EXRID),
                        setValue(oExposureId),
                        setValue(oIncidentId),
                        setValue(RouteExposure[i].T1LB7),
                        setValue(RouteExposure[i].ISDEL)
                    ]);
                }
            }

                let PPE = oExposureDetails.PPE;
                if(validateArray(PPE)){
                for (let i=0;i < PPE.length;i++){
                    result = await tx.run(`call prCreateUpdatePPE(?,?,?,?,?)`,[
                        setValue(PPE[i].PPEID),
                        setValue(oExposureId),
                        setValue(oIncidentId),
                        setValue(PPE[i].T1LB4),
                        setValue(PPE[i].ISDEL)
                    ]);
                }
            }
            }

            // Environment Tab
            if (validateField(oEnvironmentalDetails.ENVID)) {
                result = await tx.run(`call prCreateUpdateEnvironmentalDetails(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                    setValue(oEnvironmentalDetails.ENVID),
                    setValue(oIncidentId),
                    setValue(oEnvironmentalDetails.T1LB1),
                    setValue(oEnvironmentalDetails.T1LB3),
                    setValue(oEnvironmentalDetails.T1LB4),
                    setValue(oEnvironmentalDetails.T1LB5),
                    setValue(oEnvironmentalDetails.T1LB6),
                    setValue(oEnvironmentalDetails.T1LB7),
                    setValue(oEnvironmentalDetails.T1LB8),
                    setValue(oEnvironmentalDetails.T1LB9),
                    setValue(oEnvironmentalDetails.T1LB10),
                    setValue(oEnvironmentalDetails.T1LB11),
                    setValue(oEnvironmentalDetails.T1LB12),
                    setValue(oEnvironmentalDetails.T1LB13),
                    setValue(oEnvironmentalDetails.T1LB14),
                    setValue(oEnvironmentalDetails.T1LB15),
                    setValue(oEnvironmentalDetails.T1LB17),
                    setValue(oEnvironmentalDetails.T1LB18),
                    setValue(oEnvironmentalDetails.T1LB19),
                    setValue(oEnvironmentalDetails.T1LB20),
                    setValue(oEnvironmentalDetails.T1LB21)
                ]);

                
                oEnvironmentId = oEnvironmentalDetails.ENVID == 0 ? await getSequenceNumber("INC_T_ENVMT","ENVID") : oEnvironmentalDetails.ENVID; 

                // Release To
                let ReleaseTo = oEnvironmentalDetails.ReleaseTo;
                if(validateArray(ReleaseTo)){
                for (let i=0;i < ReleaseTo.length;i++){
                    result = await tx.run(`call prCreateUpdateReleaseTo(?,?,?,?,?)`,[
                        setValue(ReleaseTo[i].RLSID),
                        setValue(oEnvironmentId),
                        setValue(oIncidentId),
                        setValue(ReleaseTo[i].T1LB2),
                        setValue(ReleaseTo[i].ISDEL)
                    ]);
                }
            }

                // Enviormental Impact
                let EnviormentalImpact = oEnvironmentalDetails.EnviormentalImpact;
                if(validateArray(EnviormentalImpact)){
                for (let i=0;i < EnviormentalImpact.length;i++){
                    result = await tx.run(`call prCreateUpdateEnvImpact(?,?,?,?,?)`,[
                        setValue(EnviormentalImpact[i].EIMID),
                        setValue(oEnvironmentId),
                        setValue(oIncidentId),
                        setValue(EnviormentalImpact[i].T1LB16),
                        setValue(EnviormentalImpact[i].ISDEL)
                    ]);
                }
            }

                // Corrective Actions
                let CorrectiveActions = oEnvironmentalDetails.CorrectiveActions;
                if(validateArray(CorrectiveActions)){
                for (let i=0;i < CorrectiveActions.length;i++){
                    result = await tx.run(`call prCreateUpdateEnvironmentCorrectiveActions(?,?,?,?,?,?)`,[
                        setValue(CorrectiveActions[i].ECAID),
                        setValue(oEnvironmentId),
                        setValue(oIncidentId),
                        setValue(CorrectiveActions[i].T2LB2),
                        setValue(CorrectiveActions[i].T2LB3),
                        setValue(CorrectiveActions[i].T2LB4)
                    ]);
                }
            }
            }
            // Custom Incident Type 1
            if (validateField(oCustomIncType1.CSTID)) {
                result = await tx.run(`call prCreateUpdateCustomIncidentType_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                    setValue(oCustomIncType1.CSTID),
                    setValue(oIncidentId),
                    setValue(oCustomIncType1.T1LB1),
                    setValue(oCustomIncType1.T1LB2),
                    setValue(oCustomIncType1.T1LB3),
                    setValue(oCustomIncType1.T1LB4),
                    setValue(oCustomIncType1.T1LB5),
                    setValue(oCustomIncType1.T1LB6),
                    setValue(oCustomIncType1.T1LB7),
                    setValue(oCustomIncType1.T1LB8),
                    setValue(oCustomIncType1.T1LB9),
                    setValue(oCustomIncType1.T1LB10),
                    setValue(oCustomIncType1.T1LB11),
                    setValue(oCustomIncType1.T1LB12),
                    setValue(oCustomIncType1.T2LB1),
                    setValue(oCustomIncType1.T2LB2),
                    setValue(oCustomIncType1.T2LB3),
                    setValue(oCustomIncType1.T2LB4),
                    setValue(oCustomIncType1.T2LB5),
                    setValue(oCustomIncType1.T2LB6),
                    setValue(oCustomIncType1.T3LB1),
                    setValue(oCustomIncType1.T3LB2)
                ]);
            }
            // Custom Incident Type 2
            if (validateField(oCustomIncType2.CSTID)) {
                result = await tx.run(`call prCreateUpdateCustomIncidentType_2(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                    setValue(oCustomIncType2.CSTID),
                    setValue(oIncidentId),
                    setValue(oCustomIncType2.T1LB1),
                    setValue(oCustomIncType2.T1LB2),
                    setValue(oCustomIncType2.T1LB3),
                    setValue(oCustomIncType2.T1LB4),
                    setValue(oCustomIncType2.T1LB5),
                    setValue(oCustomIncType2.T1LB6),
                    setValue(oCustomIncType2.T1LB7),
                    setValue(oCustomIncType2.T1LB8),
                    setValue(oCustomIncType2.T1LB9),
                    setValue(oCustomIncType2.T1LB10),
                    setValue(oCustomIncType2.T1LB11),
                    setValue(oCustomIncType2.T1LB12),
                    setValue(oCustomIncType2.T2LB1),
                    setValue(oCustomIncType2.T2LB2),
                    setValue(oCustomIncType2.T2LB3),
                    setValue(oCustomIncType2.T2LB4),
                    setValue(oCustomIncType2.T2LB5),
                    setValue(oCustomIncType2.T2LB6),
                    setValue(oCustomIncType2.T3LB1),
                    setValue(oCustomIncType2.T3LB2)
                ]);
            }
            // Custom Incident Type 3
            if (validateField(oCustomIncType3.CSTID)) {
                result = await tx.run(`call prCreateUpdateCustomIncidentType_3(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                    setValue(oCustomIncType3.CSTID),
                    setValue(oIncidentId),
                    setValue(oCustomIncType3.T1LB1),
                    setValue(oCustomIncType3.T1LB2),
                    setValue(oCustomIncType3.T1LB3),
                    setValue(oCustomIncType3.T1LB4),
                    setValue(oCustomIncType3.T1LB5),
                    setValue(oCustomIncType3.T1LB6),
                    setValue(oCustomIncType3.T1LB7),
                    setValue(oCustomIncType3.T1LB8),
                    setValue(oCustomIncType3.T1LB9),
                    setValue(oCustomIncType3.T1LB10),
                    setValue(oCustomIncType3.T1LB11),
                    setValue(oCustomIncType3.T1LB12),
                    setValue(oCustomIncType3.T2LB1),
                    setValue(oCustomIncType3.T2LB2),
                    setValue(oCustomIncType3.T2LB3),
                    setValue(oCustomIncType3.T2LB4),
                    setValue(oCustomIncType3.T2LB5),
                    setValue(oCustomIncType3.T2LB6),
                    setValue(oCustomIncType3.T3LB1),
                    setValue(oCustomIncType3.T3LB2)
                ]);
            }
            // Custom Incident Type 4
            if (validateField(oCustomIncType4.CSTID)) {
                result = await tx.run(`call prCreateUpdateCustomIncidentType_4(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                    setValue(oCustomIncType4.CSTID),
                    setValue(oIncidentId),
                    setValue(oCustomIncType4.T1LB1),
                    setValue(oCustomIncType4.T1LB2),
                    setValue(oCustomIncType4.T1LB3),
                    setValue(oCustomIncType4.T1LB4),
                    setValue(oCustomIncType4.T1LB5),
                    setValue(oCustomIncType4.T1LB6),
                    setValue(oCustomIncType4.T1LB7),
                    setValue(oCustomIncType4.T1LB8),
                    setValue(oCustomIncType4.T1LB9),
                    setValue(oCustomIncType4.T1LB10),
                    setValue(oCustomIncType4.T1LB11),
                    setValue(oCustomIncType4.T1LB12),
                    setValue(oCustomIncType4.T2LB1),
                    setValue(oCustomIncType4.T2LB2),
                    setValue(oCustomIncType4.T2LB3),
                    setValue(oCustomIncType4.T2LB4),
                    setValue(oCustomIncType4.T2LB5),
                    setValue(oCustomIncType4.T2LB6),
                    setValue(oCustomIncType4.T3LB1),
                    setValue(oCustomIncType4.T3LB2)
                ]);
            }
            // Custom Incident Type 5
            if (validateField(oCustomIncType5.CSTID)) {
                result = await tx.run(`call prCreateUpdateCustomIncidentType_5(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                    setValue(oCustomIncType5.CSTID),
                    setValue(oIncidentId),
                    setValue(oCustomIncType5.T1LB1),
                    setValue(oCustomIncType5.T1LB2),
                    setValue(oCustomIncType5.T1LB3),
                    setValue(oCustomIncType5.T1LB4),
                    setValue(oCustomIncType5.T1LB5),
                    setValue(oCustomIncType5.T1LB6),
                    setValue(oCustomIncType5.T1LB7),
                    setValue(oCustomIncType5.T1LB8),
                    setValue(oCustomIncType5.T1LB9),
                    setValue(oCustomIncType5.T1LB10),
                    setValue(oCustomIncType5.T1LB11),
                    setValue(oCustomIncType5.T1LB12),
                    setValue(oCustomIncType5.T2LB1),
                    setValue(oCustomIncType5.T2LB2),
                    setValue(oCustomIncType5.T2LB3),
                    setValue(oCustomIncType5.T2LB4),
                    setValue(oCustomIncType5.T2LB5),
                    setValue(oCustomIncType5.T2LB6),
                    setValue(oCustomIncType5.T3LB1),
                    setValue(oCustomIncType5.T3LB2)
                ]);
            }

            result = await tx.run(`CALL prUpdateProcessFlag(?,?)`, [
                setValue(oIncidentDetails.INCID),
                setValue(oIncidentDetails.PRFLG)
            ]);

            // Creating Event Summary
			result = await tx.run(`CALL prCreateEventSummary(?,?,?,?,?)`, [oIncidentId, 'Basic Incident Details', (oIncidentDetails.PRFLG === 1 || oIncidentDetails.PRFLG === 2) ? 'Review Completed' : 'Updated', '',(oIncidentDetails.PRFLG === 1 || oIncidentDetails.PRFLG === 2) ? 888 : 0]);
            
            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oIncidentId, oIncidentId, 'Incident Id', 'UpdateIncident','Safety View',JSON.stringify(oInput)]);
			
            returnObj = {
				"IncidentId": oIncidentId.toString()
			};

            // await tx.commit();
            return JSON.stringify(returnObj);
        
        // }
    }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Incident Portal','UpdateIncident',JSON.stringify(oInput),error.toString(),'DB']);
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

    // Reassign Corrective Actions
    this.on("SGQtBRRcRCGqIj0f", async (req) => {
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            let oCorrectiveActions = oInput.CorrectiveActions;            

            tx = cds.transaction(req);

            result = await tx.run(`CALL prUpdateReassignCorrectiveActions(?,?,?,?)`, [
                setValue(oCorrectiveActions.CRAID),
                setValue(oCorrectiveActions.INCID),
                setValue(oCorrectiveActions.ASSID),
                setValue(oCorrectiveActions.DUEDT)
            ]);

            // Creating Event Summary
		    result = await tx.run(`CALL prCreateEventSummary(?,?,?,?,?)`, [oCorrectiveActions.INCID, 'Corrective Actions - '+oCorrectiveActions.CRAID, 'Reassigned To - '+oCorrectiveActions.ASSTO, oCorrectiveActions.RASNT,0]);
            
            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oCorrectiveActions.INCID, oCorrectiveActions.CRAID, 'Corrective Actions Id', 'UpdateReassignCorrectiveActions','Safety View',JSON.stringify(oInput)]);
			
            returnObj = {
				"Success" : "Updated Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);

        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Incident Portal','UpdateReassignCorrectiveActions',JSON.stringify(oInput),error.toString(),'Backend']);
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

    // Update Notification Flag
    this.on("BLqy0dzTSxOAfOzu", async (req) => {
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            let oNotification = oInput.Notification;            

            tx = cds.transaction(req);

            result = await tx.run(`CALL prUpdateNotificationIsReadFlag(?,?)`, [
                setValue(oNotification.EVNID),
                setValue(oNotification.ISRED)
            ]);

            returnObj = {
				"Success" : "Updated Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);

        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Incident Portal','UpdateNotificationFlag',JSON.stringify(oInput),error.toString(),'Backend']);
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

    // Assign Incident
    this.on("Hx4qjNkqmV4n356u", async (req) => {
        try{
            let result;
            let currentUserID =$.session.getUsername();
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            let oIncidentAssign = oInput.IncidentAssign; 

            tx = cds.transaction(req);

            result = await tx.run(`CALL prUpdateAssignTo(?,?,?)`, [
                setValue(oIncidentAssign.INCID),
                setValue(oIncidentAssign.INCAT),
                setValue(currentUserID)
            ]);

            // Creating Event Summary
		    result = await tx.run(`CALL prCreateEventSummary(?,?,?,?,?)`, [oIncidentAssign.INCID, 'Incident Assign','Assigned To - ' + oIncidentAssign.INCAN, '',0]);
            
            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oIncidentAssign.INCID, oIncidentAssign.INCID, 'Incident Id', 'UpdateIncidentAssign','Safety View',JSON.stringify(oInput)]);

            returnObj = {
				"Success" : "Assigned Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);

        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Incident Portal','UpdateIncidentAssign',JSON.stringify(oInput),error.toString(),'Backend']);
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

    // Custom Tab 1
    this.on("ZDsPAuKh77w3d6G5", async (req) => {
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            let oCustomTab1 = oInput.CustomTab1; 

            tx = cds.transaction(req);

            result = await tx.run(`CALL prCreateUpdateCustomTab_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
                setValue(oCustomTab1.CTBID),
                setValue(oCustomTab1.INCID),
                setValue(oCustomTab1.T1LB1),
                setValue(oCustomTab1.T1LB2),
                setValue(oCustomTab1.T1LB3),
                setValue(oCustomTab1.T1LB4),
                setValue(oCustomTab1.T1LB5),
                setValue(oCustomTab1.T1LB6),
                setValue(oCustomTab1.T1LB7),
                setValue(oCustomTab1.T1LB8),
                setValue(oCustomTab1.T1LB9),
                setValue(oCustomTab1.T1LB10),
                setValue(oCustomTab1.T1LB11),
                setValue(oCustomTab1.T1LB12),
                setValue(oCustomTab1.T2LB1),
                setValue(oCustomTab1.T2LB2),
                setValue(oCustomTab1.T2LB3),
                setValue(oCustomTab1.T2LB4),
                setValue(oCustomTab1.T2LB5),
                setValue(oCustomTab1.T2LB6),
                setValue(oCustomTab1.T3LB1),
                setValue(oCustomTab1.T3LB2),
                setValue(oCustomTab1.ISAVE)
            ]);

            // Creating Event Summary
		    result = await tx.run(`CALL prCreateEventSummary(?,?,?,?,?)`, [oCustomTab1.INCID, 'Custom tab 1',oCustomTab1.CTBID === 0? 'Submitted' : 'Updated', '',0]);
            
            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oCustomTab1.INCID, oCustomTab1.CTBID, 'Custom Tab 1 Id', 'CreateUpdateCustomTab1','Safety View',JSON.stringify(oInput)]);

            returnObj = {
				"Success" : "Custom Tab 1 Submitted Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);

        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Incident Portal','CreateUpdateCustomTab1',JSON.stringify(oInput),error.toString(),'Backend']);
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

    // Custom Tab 2
    this.on("TF70gMmrN0sfaumZ", async (req) => {
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            let oCustomTab2 = oInput.CustomTab2; 

            tx = cds.transaction(req);

            result = await tx.run(`CALL prCreateUpdateCustomTab_2(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
                setValue(oCustomTab2.CTBID),
                setValue(oCustomTab2.INCID),
                setValue(oCustomTab2.T1LB1),
                setValue(oCustomTab2.T1LB2),
                setValue(oCustomTab2.T1LB3),
                setValue(oCustomTab2.T1LB4),
                setValue(oCustomTab2.T1LB5),
                setValue(oCustomTab2.T1LB6),
                setValue(oCustomTab2.T1LB7),
                setValue(oCustomTab2.T1LB8),
                setValue(oCustomTab2.T1LB9),
                setValue(oCustomTab2.T1LB10),
                setValue(oCustomTab2.T1LB11),
                setValue(oCustomTab2.T1LB12),
                setValue(oCustomTab2.T2LB1),
                setValue(oCustomTab2.T2LB2),
                setValue(oCustomTab2.T2LB3),
                setValue(oCustomTab2.T2LB4),
                setValue(oCustomTab2.T2LB5),
                setValue(oCustomTab2.T2LB6),
                setValue(oCustomTab2.T3LB1),
                setValue(oCustomTab2.T3LB2),
                setValue(oCustomTab2.ISAVE)
            ]);

            // Creating Event Summary
		    result = await tx.run(`CALL prCreateEventSummary(?,?,?,?,?)`, [oCustomTab2.INCID, 'Custom tab 2',oCustomTab2.CTBID === 0? 'Submitted' : 'Updated', '',0]);
            
            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oCustomTab2.INCID, oCustomTab2.CTBID, 'Custom Tab 2 Id', 'CreateUpdateCustomTab2','Safety View',JSON.stringify(oInput)]);

            returnObj = {
				"Success" : "Custom Tab 2 Submitted Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);

        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Incident Portal','CreateUpdateCustomTab2',JSON.stringify(oInput),error.toString(),'Backend']);
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

    // Custom Tab 3
    this.on("DOM3jmE2pjtlatjf", async (req) => {
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            let oCustomTab3 = oInput.CustomTab3; 

            tx = cds.transaction(req);

            result = await tx.run(`CALL prCreateUpdateCustomTab_3(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
                setValue(oCustomTab3.CTBID),
                setValue(oCustomTab3.INCID),
                setValue(oCustomTab3.T1LB1),
                setValue(oCustomTab3.T1LB2),
                setValue(oCustomTab3.T1LB3),
                setValue(oCustomTab3.T1LB4),
                setValue(oCustomTab3.T1LB5),
                setValue(oCustomTab3.T1LB6),
                setValue(oCustomTab3.T1LB7),
                setValue(oCustomTab3.T1LB8),
                setValue(oCustomTab3.T1LB9),
                setValue(oCustomTab3.T1LB10),
                setValue(oCustomTab3.T1LB11),
                setValue(oCustomTab3.T1LB12),
                setValue(oCustomTab3.T2LB1),
                setValue(oCustomTab3.T2LB2),
                setValue(oCustomTab3.T2LB3),
                setValue(oCustomTab3.T2LB4),
                setValue(oCustomTab3.T2LB5),
                setValue(oCustomTab3.T2LB6),
                setValue(oCustomTab3.T3LB1),
                setValue(oCustomTab3.T3LB2),
                setValue(oCustomTab3.ISAVE)
            ]);

            // Creating Event Summary
		    result = await tx.run(`CALL prCreateEventSummary(?,?,?,?,?)`, [oCustomTab3.INCID, 'Custom tab 3',oCustomTab3.CTBID === 0? 'Submitted' : 'Updated', '',0]);
            
            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oCustomTab3.INCID, oCustomTab3.CTBID, 'Custom Tab 3 Id', 'CreateUpdateCustomTab3','Safety View',JSON.stringify(oInput)]);

            returnObj = {
				"Success" : "Custom Tab 3 Submitted Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);

        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Incident Portal','CreateUpdateCustomTab3',JSON.stringify(oInput),error.toString(),'Backend']);
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

    // Absence Audit
    this.on("p6dmi7iqbx36prd9", async (req) => {
        try{
            let result, oAbsenceAuditId;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            let oAbsenceAudit = oInput.AbsenceAudit; 

            tx = cds.transaction(req);

            result = await tx.run(`CALL prCreateUpdateAbsenceAudit(?,?,?,?,?,?,?)`, [
                setValue(oAbsenceAudit.ABAID),
                setValue(oAbsenceAudit.INCID),
                setValue(oAbsenceAudit.ABCL1),
                setValue(oAbsenceAudit.ABCL3),
                setValue(oAbsenceAudit.ABCL4),
                setValue(oAbsenceAudit.ABCL5),
                setValue(oAbsenceAudit.ABCL6)
            ]);

            oAbsenceAuditId = oAbsenceAudit.ABAID == 0 ? await getSequenceNumber("INC_T_ABSAU","ABAID") : oAbsenceAudit.ABAID;

            // Creating Event Summary
		    result = await tx.run(`CALL prCreateEventSummary(?,?,?,?,?)`, [oAbsenceAudit.INCID,'Absence Audit',oAbsenceAudit.ABAID === 0? 'Submitted' : 'Updated','',0]);
            
            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oAbsenceAudit.INCID,oAbsenceAudit.INCID,'Absence Audit','CreateUpdateAbsenceAudit','Safety View',JSON.stringify(oInput)]);

            returnObj = {
				"Success" : "Absence Audit Submitted Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);

        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Incident Portal','CreateUpdateAbsenceAudit',JSON.stringify(oInput),error.toString(),'Backend']);
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

    // Restriction Limitation
    this.on("cx42wckg3ea6w53v", async (req) => {
        try{
            let result, oRestrictionId;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            let oAbstractionRes = oInput.AbstractionRes; 

            tx = cds.transaction(req);

            result = await tx.run(`CALL prCreateUpdateRestrictionAndLimitation(?,?,?,?,?,?,?,?,?)`, [
                setValue(oAbstractionRes.ABRID),
                setValue(oAbstractionRes.INCID),
                setValue(oAbstractionRes.RSCL1),
                setValue(oAbstractionRes.RSCL2),
                setValue(oAbstractionRes.RSCL3),
                setValue(oAbstractionRes.RSCL4),
                setValue(oAbstractionRes.RSCL5),
                setValue(oAbstractionRes.RSCL6),
                setValue(oAbstractionRes.RSCL8)
            ]);

            oRestrictionId = oAbstractionRes.ABAID == 0 ? await getSequenceNumber("INC_T_ABSRS","ABRID") : oAbstractionRes.ABAID;

            let BodyPart = oAbstractionRes.BodyPart;
            if(validateArray(BodyPart)) {
                for(i = 0; i < BodyPart.length; i++) {
                    result = await tx.run(`CALL prCreateUpdateRestrictionBodyParts(?,?,?,?,?)`, [
                        setValue(BodyPart[i].ABRID),
                        setValue(BodyPart[i].INCID),
                        setValue(oRestrictionId),
                        setValue(BodyPart[i].RSCL7),
                        setValue(BodyPart[i].ISDEL)
                    ]);
        
                }
            }

            // Creating Event Summary
		    result = await tx.run(`CALL prCreateEventSummary(?,?,?,?,?)`, [oAbstractionRes.INCID,'Restriction And Limitation',oAbstractionRes.ABRID === 0? 'Submitted' : 'Updated','',0]);
            
            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oAbstractionRes.INCID,oRestrictionId,'Restriction Limitation','CreateUpdateRestrictionLimitation','Safety View',JSON.stringify(oInput)]);

            returnObj = {
				"Success" : "Restriction and Limitation Submitted Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);

        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Incident Portal','CreateUpdateRestrictionLimitation',JSON.stringify(oInput),error.toString(),'Backend']);
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

    // RTW Details
    this.on("NNyi8BHH5WTRSazc", async (req) => {
        try{
            let result, oRestrictionId;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            let oGRTWDetails = oInput.GRTWDetails; 

            tx = cds.transaction(req);

            result = await tx.run(`CALL prCreateUpdateRTWDetails(?,?,?,?,?,?,?,?,?,?)`, [
                setValue(oGRTWDetails.RTWID),
                setValue(oGRTWDetails.INCID),
                setValue(oGRTWDetails.RTWL1),
                setValue(oGRTWDetails.RTWL2),
                setValue(oGRTWDetails.RTWL3),
                setValue(oGRTWDetails.RTWL4),
                setValue(oGRTWDetails.TEMID),
                setValue(oGRTWDetails.TEMBD),
                setValue(oGRTWDetails.COMNT),
                setValue(oGRTWDetails.CDAYS)
            ]);

            oRTWId = oGRTWDetails.RTWID == 0 ? await getSequenceNumber("INC_T_GRTWD","RTWID") : oGRTWDetails.RTWID;

            let GRTWSendToCc = oGRTWDetails.GRTWSendToCc;
            if(validateArray(GRTWSendToCc)) {
                for(i = 0; i < GRTWSendToCc.length; i++) {
                    result = await tx.run(`CALL prCreateUpdateRTWTemplateSendToCc(?,?,?,?,?)`, [
                        setValue(GRTWSendToCc[i].RTCID),
                        setValue(oRTWId),
                        setValue(GRTWSendToCc[i].INCID),
                        setValue(GRTWSendToCc[i].EMPID),
                        setValue(GRTWSendToCc[i].TCFLG)
                    ]);
        
                }
            }

            // Creating Event Summary
		    result = await tx.run(`CALL prCreateEventSummary(?,?,?,?,?)`, [oGRTWDetails.INCID,'RTW',oGRTWDetails.RTWID === 0 ? 'Submitted' : 'Updated','',0]);
            
            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oGRTWDetails.INCID,oRTWId,' RTW Id','CreateUpdateRTWDetails','Safety View',JSON.stringify(oInput)]);

            returnObj = {
				"Success" : "RTW Submitted Successfully.",
                "RTW_ID" : oRTWId
			};

            // await tx.commit();
            return JSON.stringify(returnObj);

        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Incident Portal','CreateUpdateRTWDetails',JSON.stringify(oInput),error.toString(),'Backend']);
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

    // Reopen Incident
    this.on("bVWeC9j8s27C5hn7", async (req) => {
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            let oReopenIncident = oInput.ReopenIncident; 

            tx = cds.transaction(req);

            result = await tx.run(`CALL prUpdateIncidentStatusToReopen(?)`, [
                setValue(oReopenIncident.INCID)
            ]);

            // Creating Event Summary
		    result = await tx.run(`CALL prCreateEventSummary(?,?,?,?,?)`, [oReopenIncident.INCID,'Incident','Reopened', '',887]);
            
            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oReopenIncident.INCID,oReopenIncident.INCID,'Incident Id', 'ReopenIncident','Safety View',JSON.stringify(oInput)]);

            returnObj = {
				"Success" : "Incident Reopend Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);

        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Incident Portal','ReopenIncident',JSON.stringify(oInput),error.toString(),'Backend']);
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
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Incident Portal','UpdateCorrectiveActionStatus',JSON.stringify(oInput),error.toString(),'Backend']);
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