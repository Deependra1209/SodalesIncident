const { validateField, validateArray, generateIncidentNumber,getSequenceNumber,setValue } = require('./Common');
//This is test.
const cds = require('@sap/cds');
let oInput,tx,tx1;

module.exports = cds.service.impl(function (){

    // Pre-Investigation
    this.on("DBDHIPPZlqSDVFCE", async(req) => {
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
    this.on("b9q2fsan18bqIUHT", async(req) => {
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
    this.on("FxzlEmezqgGBuqfq", async(req) => {
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
    this.on("xGx7YodvNNbU5uKU", async(req) => {
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            oLessonsLearnPrevent = oInput.LessonsLearnPrevent;   //  Lessons Learn Prevent

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
    this.on("AzsKzyfS5Kmcs86d", async(req) => {
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            oSignOff = oInput.SignOff;             //  Sign Off

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
    this.on("QGByRBtgVZREybOU", async(req) => {
        try{
            let result, oNoteId;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            oNotes = oInput.Notes;             //  Sign Off

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
    this.on("vwxGTHJKICWOGdds", async(req) => {
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            aAttachment = oInput.Attachment;

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
    this.on("wuScnYBi9xs01U3U", async(req) => {
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            oCloseIncident = oInput.CloseIncident;             //  Close Incident

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
    this.on("Dh23XLBkWJ0Ard", async(req) => {
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            oTrackIncident = oInput.TrackIncident;             //  Close Incident

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
    this.on("obcS75AWUW8IBMIH", async(req) => {
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            oCompleteInvestigation = oInput.CompleteInvestigation;             //  Close Incident

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

    

})