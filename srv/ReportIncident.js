const { validateField,validateArray,generateIncidentNumber,getSequenceNumber,lPad,setValue } = require('./Common');
//This is test.
const cds = require('@sap/cds');
let oInput,tx,tx1;

module.exports = cds.service.impl(function (){
    // Craete Incident
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

            oIncidentId = oIncidentDetails.INCID == 0 ? await getSequenceNumber("INC_T_INCDT","INCID") : oIncidentDetails.INCID;
            
            //Logic for Updating the Incident Number
		    if(oIncidentDetails.ISAVE === '0'){
		        IncidentNumber = await generateIncidentNumber(tx);
		        //Procedure for updating the Incident Number
                result = await tx.run(`CALL prUpdateIncidentNumber(?,?)`,[setValue(oIncidentId),setValue(IncidentNumber)]);
                // console.log(result);
            }
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

            // Creating Event Summary
			if (oIncidentDetails.ISAVE === '0') {
                result = await tx.run(`CALL prCreateEventSummary(?,?,?,?,?)`, [oIncidentId, 'Incident', 'Created', '',887]);
			}
            
            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oIncidentId, oIncidentId, 'Incident Id', 'createIncident','Safety View',JSON.stringify(oInput)]);
			
            returnObj = {
				"IncidentId": oIncidentId.toString(),
				"IncidentNumber":IncidentNumber,
				"AttachmentPath" : "folderpath" + "filename"
			};

            // await tx.commit();
            return JSON.stringify(returnObj);
        
        // }
    }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Report Incident','createIncident',JSON.stringify(oInput),error.toString(),'DB']);
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

    // Delete Involved people
    this.on("HTFCBsan18bqxhgt", async (req) => {
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            let oInvolvedPeople = oInput.InvolvedPeople; 

            tx = cds.transaction(req);

            result = await tx.run(`CALL prUpdateDeleteInvolvedPeopleDetail(?,?)`, [
                setValue(oInvolvedPeople.IPLID),
                setValue(oInvolvedPeople.INCID)
            ]);

            result = await tx.run(`CALL PrUpdateDeleteInvolvedPeopleRelatedData(?,?)`, [
                setValue(oInvolvedPeople.INCID),
                setValue(oInvolvedPeople.IPLID)
            ]);
            
            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oInvolvedPeople.INCID, oInvolvedPeople.IPLID, 'Involved People Id', 'DeleteInvolvedPeople','Safety View',JSON.stringify(oInput)]);

            returnObj = {
				"Success" : "Involved People Deleted Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);

        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Report Incident','DeleteInvolvedPeople',JSON.stringify(oInput),error.toString(),'DB']);
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

    // Delete Injured Body Part
    this.on("T7QviTG4DnXQDbWo", async (req) => {
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            let aBodyPart = oInput.BodyPart; 

            tx = cds.transaction(req);

            if(validateArray(aBodyPart)) {
                for(let i = 0;i < aBodyPart.length;i++) {
                    result = await tx.run(`CALL prUpdateDeleteInjuredBodyParts(?,?,?)`, [
                        setValue(aBodyPart[i].BDPID),
                        setValue(aBodyPart[i].WPIID),
                        setValue(aBodyPart[i].INCID)
                    ]);
                }
            }
            
            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [aBodyPart[0].INCID, aBodyPart[0].BDPID, 'Body Part Id', 'DeleteInjuredBodyParts','Safety View',JSON.stringify(oInput)]);

            returnObj = {
				"Success" : "Body Part Deleted Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);

        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Report Incident','DeleteInjuredBodyParts',JSON.stringify(oInput),error.toString(),'DB']);
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

    // Delete Property Equipment
    this.on("NHeYVYv3d2RvARJK", async (req) => {
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            let oPropertyEquipmentDamage = oInput.PropertyEquipmentDamage; 

            tx = cds.transaction(req);

            result = await tx.run(`CALL prUpdateDeletePropertyEquipmentDamage(?,?)`, [
                setValue(oPropertyEquipmentDamage.PEDID),
                setValue(oPropertyEquipmentDamage.INCID)
            ]);

            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oPropertyEquipmentDamage.INCID, oPropertyEquipmentDamage.PEDID, 'Property-Equipment damage Id', 'DeletePropertyEquipmentDamage','Safety View',JSON.stringify(oInput)]);

            returnObj = {
				"Success" : "Property-Equipment Deleted Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);

        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Report Incident','DeletePropertyEquipmentDamage',JSON.stringify(oInput),error.toString(),'DB']);
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

    // Delete Passenger
    this.on("nDIBCLhbYOJixpTn", async (req) => {
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            let oPassenger = oInput.Passenger; 

            tx = cds.transaction(req);

            result = await tx.run(`CALL prUpdateDeletePassenger(?,?,?)`, [
                setValue(oPassenger.PASID),
                setValue(oPassenger.MVDID),
                setValue(oPassenger.INCID)
            ]);

            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oPassenger.INCID, oPassenger.PASID, 'Passenger Id', 'DeletePassenger','Safety View',JSON.stringify(oInput)]);

            returnObj = {
				"Success" : "Passenger Deleted Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);

        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Report Incident','DeletePassenger',JSON.stringify(oInput),error.toString(),'DB']);
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

    // Delete Environment Corrective Action
    this.on("vwx9J4D07CWOGdds", async (req) => {
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            let oCorrectiveAction = oInput.CorrectiveAction; 

            tx = cds.transaction(req);

            result = await tx.run(`CALL prUpdateDeleteEnvironmentCorrectiveActions(?,?)`, [
                setValue(oCorrectiveAction.ECAID),
                setValue(oCorrectiveAction.INCID)
            ]);

            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oCorrectiveAction.INCID, oCorrectiveAction.ECAID, 'Corrective Action Id', 'DeleteEnvironmentCorrectiveAction','Safety View',JSON.stringify(oInput)]);

            returnObj = {
				"Success" : "Corrective Action Deleted Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);

        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Report Incident','DeleteEnvironmentCorrectiveAction',JSON.stringify(oInput),error.toString(),'DB']);
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
                for(let i = 0; i < aAttachment.length; i++) {
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
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Report Incident','CreateAttachment',JSON.stringify(oInput),error.toString(),'DB']);
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

    // Delete Attachment
    this.on("d0beQXTd6nyEvm1v", async (req) => {
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.D4OXYPALUYAIDNSO);
            // Extracting Payload
            let oAttachment = oInput.Attachment; 

            tx = cds.transaction(req);

            result = await tx.run(`CALL prUpdateDeleteAttachments(?,?)`, [
                setValue(oAttachment.ATTID),
                setValue(oAttachment.INCID)
            ]);

            // Creating Audit log
            result = await tx.run(`CALL prCreateAuditLog(?,?,?,?,?,?)`, [oAttachment.INCID, oAttachment.ATTID, 'Attachment Id', 'DeleteAttachment','Safety View',JSON.stringify(oInput)]);

            returnObj = {
				"Success" : "Attachment Deleted Successfully."
			};

            // await tx.commit();
            return JSON.stringify(returnObj);

        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL prCreateErrorHandling(?,?,?,?,?)`, ['Report Incident','DeleteAttachment',JSON.stringify(oInput),error.toString(),'DB']);
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