const { validateField, generateIncidentNumber,getSequenceNumber,lPad,setValue } = require('./Common');
//This is test.
const cds = require('@sap/cds');
let oInput,tx,tx1;

module.exports = cds.service.impl(function (){

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

            result = await tx.run(`CALL "prCreateUpdateIncidentDetails"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
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
		        IncidentNumber = generateIncidentNumber(tx);
		        //Procedure for updating the Incident Number
                result = await tx.run(`CALL "prUpdateIncidentNumber"(?,?)`,[setValue(oIncidentId),setValue(IncidentNumber)]);
            }
            let InvolvedPeople = oIncidentDetails.InvolvedPeople;
            for(let i=0;i < InvolvedPeople.length;i++){
                result = await tx.run(`CALL "prCreateUpdateInvolvedPeopleDetails"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
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
                for(let j=0;j < PersonType.length;j++){
                    result = await tx.run(`CALL "prCreateUpdateInvolvedPeopleType"(?,?,?,?,?)`, [
                        setValue(PersonType[j].IPTID),
                        setValue(oInvPeopleId),
                        setValue(oIncidentId),
                        setValue(PersonType[j].PPLB6),
                        setValue(PersonType[j].ISDEL)
                    ]);

                    // Deleting person type if applicable
                    if(PersonType[j].ISDEL === '1'){
                        result = await tx.run(`CALL "prDeleteInvolvedPersonType"(?,?,?)`, [
                            setValue(oIncidentId),
                            setValue(PersonType[j].PPLB6),
                            setValue(oInvPeopleId)                            
                        ]);
                    }
                }
                // WorkPlace Injury Tab 
                let WorkplaceInjury = InvolvedPeople[i].WorkplaceInjury
                if(validateField(WorkplaceInjury.WPIID)){
                    result = await tx.run(`CALL "prCreateUpdateWorkPlaceInjury"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
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

                    for(let j=0;j<BodyPart.length;j++){
                        result = await tx.run(`CALL "prCreateUpdateBodyParts"(?,?,?,?,?,?,?)`, [
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
                let FirstAider = InvolvedPeople[i].FirstAider;
                result = await tx.run(`CALL "prCreateUpdateFirstAider"(?,?,?,?,?,?,?,?,?)`, [
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

                let VehicleDetails = InvolvedPeople[i].VehicleDetails;

                result = await tx.run(`call "prCreateUpdateMotorVehicleDetails"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                    setvalue(VehicleDetails.MVDID),
                    setvalue(oIncidentId),
                    setvalue(oInvPeopleId),
                    setvalue(VehicleDetails.T1LB1),
                    setvalue(VehicleDetails.T1LB2),
                    setvalue(VehicleDetails.T1LB3),
                    setvalue(VehicleDetails.T1LB4),
                    setvalue(VehicleDetails.T1LB5),
                    setvalue(VehicleDetails.T1LB7),
                    setvalue(VehicleDetails.T1LB8),
                    setvalue(VehicleDetails.T1LB9),
                    setvalue(VehicleDetails.T1LB10),
                    setvalue(VehicleDetails.T1LB11),
                    setvalue(VehicleDetails.T1LB12),
                    setvalue(VehicleDetails.T1LB13),
                    setvalue(VehicleDetails.T1LB14),
                    setvalue(VehicleDetails.T1LB15),
                    setvalue(VehicleDetails.T1LB16),
                    setvalue(VehicleDetails.T1LB18),
                    setvalue(VehicleDetails.T1LB19),
                    setvalue(VehicleDetails.T1LB20),
                    setvalue(VehicleDetails.T1LB21),
                    setvalue(VehicleDetails.T1LB22),
                    setvalue(VehicleDetails.T1LB23),
                    setvalue(VehicleDetails.T1LB24),
                    setvalue(VehicleDetails.T1LB25),
                    setvalue(VehicleDetails.UNQID)
                ]);

                oVehicleId = VehicleDetails.MVDID == 0 ? await getSequenceNumber("INC_T_MTVDT","MVDID") : VehicleDetails.MVDID;

                let Endorsements = VehicleDetails.Endorsements;

                for(let j=0;j<Endorsements.length;j++){
                    result = await tx.run(`call "prCreateUpdateEndorsements"(?,?,?,?,?)`,[
                        setvalue(Endorsements[j].ENDID),
                        setvalue(oIncidentId),
                        setvalue(oVehicleId),
                        setvalue(Endorsements[j].T1LB17),
                        setvalue(Endorsements[j].ISDEL)
                    ]);
                }
                // Restrictions
                let Restrictions = VehicleDetails.Restrictions;

                for(let j=0;j<Restrictions.length;j++){
                    result = await tx.run(`call "prCreateUpdateMotorVehicleRestrictions"(?,?,?,?,?)`,[
                        setvalue(Restrictions[j].RESID),
                        setvalue(oIncidentId),
                        setvalue(oVehicleId),
                        setvalue(Restrictions[j].T1LB6),
                        setvalue(Restrictions[j].ISDEL)
                    ]);
                }

                // PassengerDetails
                let PassengerDetails = VehicleDetails.PassengerDetails;

                for(let j=0;j<PassengerDetails.length;j++){
                    result = await tx.run(`call "prCreateUpdatePassangerDetails"(?,?,?,?,?,?,?)`,[
                        setvalue(PassengerDetails[j].PASID),
                        setvalue(oVehicleId),
                        setvalue(oIncidentId),
                        setvalue(PassengerDetails[j].T3LB1),
                        setvalue(PassengerDetails[j].T3LB2),
                        setvalue(PassengerDetails[j].T3LB3),
                        setvalue(PassengerDetails[j].T3LB4)
                    ]);
                }

                // Complainant
                let Complainant = InvolvedPeople[i].Complainant;

                result = await tx.run(`call "prCreateUpdateComplainantAccused"(?,?,?,?,?)`,[
                    setvalue(Complainant.CAAID),
                    setvalue(oInvPeopleId),
                    setvalue(oIncidentId),
                    setvalue(Complainant.UNQID),
                    setvalue(Complainant.COAAC)
                ]);

                // Accused
                let Accused = InvolvedPeople[i].Accused;
                result = await tx.run(`call "prCreateUpdateComplainantAccused"(?,?,?,?,?)`,[
                    setvalue(Accused.CAAID),
                    setvalue(oInvPeopleId),
                    setvalue(oIncidentId),
                    setvalue(Accused.UNQID),
                    setvalue(Accused.COAAC)
                ]);
            }

            // Vehicle Additional Details
            result = await tx.run(`call "prCreateUpdateMotorVehicleAdditionalDetails"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                setvalue(oVehicleAdditionalDetails.MVAID),
                setvalue(oIncidentId),
                setvalue(oVehicleAdditionalDetails.T4LB1),
                setvalue(oVehicleAdditionalDetails.T4LB2),
                setvalue(oVehicleAdditionalDetails.T4LB3),
                setvalue(oVehicleAdditionalDetails.T4LB4),
                setvalue(oVehicleAdditionalDetails.T4LB5),
                setvalue(oVehicleAdditionalDetails.T4LB6),
                setvalue(oVehicleAdditionalDetails.T4LB7),
                setvalue(oVehicleAdditionalDetails.T4LB8),
                setvalue(oVehicleAdditionalDetails.T4LB9),
                setvalue(oVehicleAdditionalDetails.RDMAP),
                setvalue(oVehicleAdditionalDetails.T4LB10),
                setvalue(oVehicleAdditionalDetails.T4LB11),
                setvalue(oVehicleAdditionalDetails.T5LB1),
                setvalue(oVehicleAdditionalDetails.T5LB2),
                setvalue(oVehicleAdditionalDetails.T5LB3),
                setvalue(oVehicleAdditionalDetails.T5LB4),
                setvalue(oVehicleAdditionalDetails.T5LB5)
            ]);

            // Workplace Harassment
            result = await tx.run(`call "prCreateUpdateWorkplaceHarassment"(?,?,?,?,?,?,?,?,?,?,?,?)`,[
                setvalue(oWorkplaceHarassment.WHVID),
                setvalue(oIncidentId),
                setvalue(oWorkplaceHarassment.T3LB1),
                setvalue(oWorkplaceHarassment.T3LB2),
                setvalue(oWorkplaceHarassment.T3LB3),
                setvalue(oWorkplaceHarassment.T3LB6),
                setvalue(oWorkplaceHarassment.T3LB8),
                setvalue(oWorkplaceHarassment.T3LB10),
                setvalue(oWorkplaceHarassment.T3LB11),
                setvalue(oWorkplaceHarassment.T3LB14),
                setvalue(oWorkplaceHarassment.T3LB15)
            ]);

            oWorkplaceHarassmentId = oWorkplaceHarassment.WHVID == 0 ? await getSequenceNumber("INC_T_WPHAV","WHVID") : oWorkplaceHarassment.WHVID; 

            // Type of Occurance
            let TypeOfOccurrence = oWorkplaceHarassment.TypeOfOccurrence;

            for (let i=0;i < TypeOfOccurrence.length;i++){
                result = await tx.run(`call "prCreateUpdateTypeOfOccurrenceRep"(?,?,?,?,?)`,[
                    setvalue(TypeOfOccurrence[i].OCRID),
                    setvalue(oWorkplaceHarassmentId),
                    setvalue(oIncidentId),
                    setvalue(TypeOfOccurrence[i].T3LB4),
                    setvalue(TypeOfOccurrence[i].ISDEL)
                ]);
            }
            // Physical
            let Physical = oWorkplaceHarassment.Physical;

            for (let i=0;i < Physical.length;i++){
                result = await tx.run(`call "prCreateUpdatePhysicalHarassmentType"(?,?,?,?,?)`,[
                    setvalue(Physical[i].PHYID),
                    setvalue(oWorkplaceHarassmentId),
                    setvalue(oIncidentId),
                    setvalue(Physical[i].T3LB5),
                    setvalue(Physical[i].ISDEL)
                ]);
            }

            // Psychological
            let Psychological = oWorkplaceHarassment.Psychological;

            for (let i=0;i < Psychological.length;i++){
                result = await tx.run(`call "prCreateUpdatePsychologicalHarassmentType"(?,?,?,?,?)`,[
                    setvalue(Psychological[i].PSYID),
                    setvalue(oWorkplaceHarassmentId),
                    setvalue(oIncidentId),
                    setvalue(Psychological[i].T3LB7),
                    setvalue(Psychological[i].ISDEL)
                ]);
            }

            // Verbal
            let Verbal = oWorkplaceHarassment.Verbal;

            for (let i=0;i < Verbal.length;i++){
                result = await tx.run(`call "prCreateUpdateVerbalHarrasementType"(?,?,?,?,?)`,[
                    setvalue(Verbal[i].VBLID),
                    setvalue(oWorkplaceHarassmentId),
                    setvalue(oIncidentId),
                    setvalue(Verbal[i].T3LB9),
                    setvalue(Verbal[i].ISDEL)
                ]);
            }

            // Please select all that apply
            let PleaseSelectAll = oWorkplaceHarassment.PleaseSelectAll;
            if (oWorkplaceHarassment.T3LB11 === 0) {
                for (let i=0;i < PleaseSelectAll.length;i++){
                    result = await tx.run(`call "prCreateUpdatePleaseSelectAllThatApply"(?,?,?,?,?)`,[
                        setvalue(PleaseSelectAll[i].PSAID),
                        setvalue(oWorkplaceHarassmentId),
                        setvalue(oIncidentId),
                        setvalue(PleaseSelectAll[i].T3LB12),
                        setvalue(PleaseSelectAll[i].ISDEL)
                    ]);
                }
            }

            // Immediate Action
            let ImmediateAction = oWorkplaceHarassment.ImmediateAction;

            for (let i=0;i < ImmediateAction.length;i++){
                result = await tx.run(`call "prCreateUpdateImmediateActions"(?,?,?,?,?)`,[
                    setvalue(ImmediateAction[i].IACID),
                    setvalue(oWorkplaceHarassmentId),
                    setvalue(oIncidentId),
                    setvalue(ImmediateAction[i].T3LB13),
                    setvalue(ImmediateAction[i].ISDEL)
                ]);
            }

            // Incident Type
            for (let i=0;i < aIncidentType.length;i++){
                result = await tx.run(`call "prCreateUpdateIncidentType"(?,?,?,?)`,[
                    setvalue(aIncidentType[i].ICTID),
                    setvalue(oIncidentId),
                    setvalue(aIncidentType[i].INCTY),
                    setvalue(aIncidentType[i].ISDEL)
                ]);
                if(aIncidentType[i].ISDEL === '1'){
                    result = await tx.run(`call "PrDeleteIncTypeRecords"(?,?)`,[
                        setvalue(oIncidentId),
                        setvalue(aIncidentType[i].INCTY)
                    ]);
                }
            }

            // Reported By
            result = await tx.run(`call "prCreateUpdateReportedByDetails"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                setvalue(oReportedBy.REPID),
                setvalue(oIncidentId),
                setvalue(oReportedBy.RPLB1),
                setvalue(oReportedBy.RPLB2),
                setvalue(oReportedBy.RPLB3),
                setvalue(oReportedBy.RPLB4),
                setvalue(oReportedBy.RPLB5),
                setvalue(oReportedBy.RPLB6),
                setvalue(oReportedBy.RPLB7),
                setvalue(oReportedBy.RPLB8),
                setvalue(oReportedBy.RPLB9),
                setvalue(oReportedBy.MGRID),
                setvalue(oReportedBy.RPLB10),
                setvalue(oReportedBy.RPLB11),
                setvalue(oReportedBy.RPLB12),
                setvalue(oReportedBy.RPLB13),
                setvalue(oReportedBy.RPLB14)
            ]);

            // Near Miss Tab
            result = await tx.run(`call "prCreateUpdateNearMissDetails"(?,?,?,?,?,?,?,?,?)`,[
                setvalue(oNearMissDetails.NRMID),
                setvalue(oIncidentId),
                setvalue(oNearMissDetails.T1LB3),
                setvalue(oNearMissDetails.T1LB4),
                setvalue(oNearMissDetails.T1LB5),
                setvalue(oNearMissDetails.T1LB6),
                setvalue(oNearMissDetails.T1LB7),
                setvalue(oNearMissDetails.T1LB8)              
            ]);

            oNearMissId = oNearMissDetails.NRMID == 0 ? await getSequenceNumber("INC_T_NRMIS","NRMID") : oNearMissDetails.NRMID;

            // Near miss type
            let NearMissType = oNearMissDetails.NearMissType;
            for (let i=0;i < NearMissType.length;i++){
                result = await tx.run(`call "prCreateUpdateNearMissType"(?,?,?,?,?)`,[
                    setvalue(NearMissType[i].NMTID),
                    setvalue(oIncidentId),
                    setvalue(oNearMissId),
                    setvalue(NearMissType[i].T1LB1),
                    setvalue(NearMissType[i].ISDEL)
                ]);
            }

            // Near miss potential
            let NearMissPotential = oNearMissDetails.NearMissPotential;
            for (let i=0;i < NearMissPotential.length;i++){
                result = await tx.run(`call "prCreateUpdatePotentialNearMiss"(?,?,?,?,?)`,[
                    setvalue(NearMissPotential[i].NMPID),
                    setvalue(oIncidentId),
                    setvalue(oNearMissId),
                    setvalue(NearMissPotential[i].T1LB2),
                    setvalue(NearMissPotential[i].ISDEL)
                ]);
            }

            // Ergonomics Tab
            if (validateField(oErgonomics.ERGID)) {
                result = await tx.run(`call "prCreateUpdateErgonomics"(?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                    setvalue(oErgonomics.ERGID),
                    setvalue(oIncidentId),
                    setvalue(oErgonomics.T1LB3),
                    setvalue(oErgonomics.T1LB4),
                    setvalue(oErgonomics.T2LB1),
                    setvalue(oErgonomics.T2LB2),
                    setvalue(oErgonomics.T2LB3),
                    setvalue(oErgonomics.T2LB4),
                    setvalue(oErgonomics.T2LB5),
                    setvalue(oErgonomics.T2LB6),
                    setvalue(oErgonomics.T3LB1),
                    setvalue(oErgonomics.T3LB2),
                    setvalue(oErgonomics.T3LB3)
                ]);

                oErgonomicId = oErgonomics.ERGID == 0 ? await getSequenceNumber("INC_T_ERGTY","IPLID") : oErgonomics.ERGID; 

                let ErgonomicsType = oErgonomics.ErgonomicsType;

                for (let i=0;i < ErgonomicsType.length;i++){
                    result = await tx.run(`call "prCreateUpdateErgonomicsTypes"(?,?,?,?,?)`,[
                        setvalue(ErgonomicsType[i].EGTID),
                        setvalue(oIncidentId),
                        setvalue(oErgonomicId),
                        setvalue(ErgonomicsType[i].T1LB1),
                        setvalue(ErgonomicsType[i].ISDEL)
                    ]);
                }

                // Ergonomics type which are most applicable
                let ErgonomicsMAType = oErgonomics.ErgonomicsMAType;

                for (let i=0;i < ErgonomicsMAType.length;i++){
                    result = await tx.run(`call "prCreateUpdateErgonomicsMostApplicableTypes"(?,?,?,?,?)`,[
                        setvalue(ErgonomicsMAType[i].EMAID),
                        setvalue(oIncidentId),
                        setvalue(oErgonomicId),
                        setvalue(ErgonomicsMAType[i].T1LB2),
                        setvalue(ErgonomicsMAType[i].ISDEL)
                    ]);
                }

            }

            // Property Damage
            for (let i=0;i < ErgonomicsMAType.length;i++){
                result = await tx.run(`call "prCreateUpdatePropertyEquipmentDamage"(?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                    setvalue(aPropertyEquipment[i].PEDID),
                    setvalue(oIncidentId),
                    setvalue(aPropertyEquipment[i].T1LB2),
                    setvalue(aPropertyEquipment[i].T1LB3),
                    setvalue(aPropertyEquipment[i].T1LB4),
                    setvalue(aPropertyEquipment[i].T1LB5),
                    setvalue(aPropertyEquipment[i].T1LB6),
                    setvalue(aPropertyEquipment[i].T1LB7),
                    setvalue(aPropertyEquipment[i].T1LB8),
                    setvalue(aPropertyEquipment[i].T1LB9),
                    setvalue(aPropertyEquipment[i].T1LB10),
                    setvalue(aPropertyEquipment[i].T1LB11),
                    setvalue(aPropertyEquipment[i].T1LB12)
                ]);

                oPropEqpDmgId = aPropertyEquipment[i].PEDID == 0 ? await getSequenceNumber("INC_T_PEDMG","PEDID") : aPropertyEquipment[i].PEDID; 

                // Property Type
                let PropertyType = aPropertyEquipment[i].PropertyType;
                for (let j=0;j < PropertyType.length;j++){
                    result = await tx.run(`call "prCreateUpdatePropertyType"(?,?,?,?,?)`,[
                        setvalue(PropertyType[j].PTYID),
                        setvalue(oIncidentId),
                        setvalue(oPropEqpDmgId),
                        setvalue(PropertyType[j].T1LB1),
                        setvalue(PropertyType[j].ISDEL)
                    ]);
                }
            }

            // Other
            if (validateField(oOther.OTHID)) {
                result = await tx.run(`call "prCreateUpdateOtherIncidentType"(?,?,?,?,?)`,[
                    setvalue(oOther.OTHID),
                    setvalue(oIncidentId),
                    setvalue(oOther.T1LB1),
                    setvalue(oOther.T1LB2),
                    setvalue(oOther.T1LB3)
                ]);
            }

            // Fire / Explosion
            if (validateField(oFireExplosionDetails.FEPID)) {
                result = await tx.run(`call "prCreateUpdateFireExplosionDetails"(?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                    setvalue(oFireExplosionDetails.FEPID),
                    setvalue(oIncidentId),
                    setvalue(oFireExplosionDetails.T1LB1),
                    setvalue(oFireExplosionDetails.T1LB2),
                    setvalue(oFireExplosionDetails.T1LB3),
                    setvalue(oFireExplosionDetails.T1LB4),
                    setvalue(oFireExplosionDetails.T1LB5),
                    setvalue(oFireExplosionDetails.T1LB6),
                    setvalue(oFireExplosionDetails.T1LB7),
                    setvalue(oFireExplosionDetails.T1LB8),
                    setvalue(oFireExplosionDetails.T1LB9),
                    setvalue(oFireExplosionDetails.T1LB10),
                    setvalue(oFireExplosionDetails.T1LB11)
                ]);
            }

            // Exposure
            if (validateField(oExposureDetails.EXPID)) {
                result = await tx.run(`call "prCreateUpdateExposureTab"(?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                    setvalue(oExposureDetails.EXPID),
                    setvalue(oIncidentId),
                    setvalue(oExposureDetails.T1LB1),
                    setvalue(oExposureDetails.T1LB2),
                    setvalue(oExposureDetails.T1LB3),
                    setvalue(oExposureDetails.T1LB5),
                    setvalue(oExposureDetails.T1LB6),
                    setvalue(oExposureDetails.T1LB8),
                    setvalue(oExposureDetails.T1LB9),
                    setvalue(oExposureDetails.T1LB10),
                    setvalue(oExposureDetails.T1LB11),
                    setvalue(oExposureDetails.T1LB12),
                    setvalue(oExposureDetails.T1LB13)
                ]);

                oExposureId = oExposureDetails.EXPID == 0 ? await getSequenceNumber("INC_T_EXPSR","EXPID") : oExposureDetails.EXPID; 

                let RouteExposure = oExposureDetails.RouteExposure;
                for (let i=0;i < RouteExposure.length;i++){
                    result = await tx.run(`call "prCreateUpdateRouteExposure"(?,?,?,?,?)`,[
                        setvalue(RouteExposure[i].EXRID),
                        setvalue(oExposureId),
                        setvalue(oIncidentId),
                        setvalue(RouteExposure[i].T1LB7),
                        setvalue(RouteExposure[i].ISDEL)
                    ]);
                }

                let PPE = oExposureDetails.PPE;
                for (let i=0;i < PPE.length;i++){
                    result = await tx.run(`call "prCreateUpdatePPE"(?,?,?,?,?)`,[
                        setvalue(PPE[i].PPEID),
                        setvalue(oExposureId),
                        setvalue(oIncidentId),
                        setvalue(PPE[i].T1LB4),
                        setvalue(PPE[i].ISDEL)
                    ]);
                }
            }

            // Environment Tab
            if (validateField(oEnvironmentalDetails.ENVID)) {
                result = await tx.run(`call "prCreateUpdateEnvironmentalDetails"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                    setvalue(oEnvironmentalDetails.ENVID),
                    setvalue(oIncidentId),
                    setvalue(oEnvironmentalDetails.T1LB1),
                    setvalue(oEnvironmentalDetails.T1LB3),
                    setvalue(oEnvironmentalDetails.T1LB4),
                    setvalue(oEnvironmentalDetails.T1LB5),
                    setvalue(oEnvironmentalDetails.T1LB6),
                    setvalue(oEnvironmentalDetails.T1LB7),
                    setvalue(oEnvironmentalDetails.T1LB8),
                    setvalue(oEnvironmentalDetails.T1LB9),
                    setvalue(oEnvironmentalDetails.T1LB10),
                    setvalue(oEnvironmentalDetails.T1LB11),
                    setvalue(oEnvironmentalDetails.T1LB12),
                    setvalue(oEnvironmentalDetails.T1LB13),
                    setvalue(oEnvironmentalDetails.T1LB14),
                    setvalue(oEnvironmentalDetails.T1LB15),
                    setvalue(oEnvironmentalDetails.T1LB17),
                    setvalue(oEnvironmentalDetails.T1LB18),
                    setvalue(oEnvironmentalDetails.T1LB19),
                    setvalue(oEnvironmentalDetails.T1LB20),
                    setvalue(oEnvironmentalDetails.T1LB21)
                ]);

                
                oEnvironmentId = oEnvironmentalDetails.ENVID == 0 ? await getSequenceNumber("INC_T_ENVMT","ENVID") : oEnvironmentalDetails.ENVID; 

                // Release To
                let ReleaseTo = oEnvironmentalDetails.ReleaseTo;
                for (let i=0;i < ReleaseTo.length;i++){
                    result = await tx.run(`call "prCreateUpdateReleaseTo"(?,?,?,?,?)`,[
                        setvalue(ReleaseTo[i].RLSID),
                        setvalue(oEnvironmentId),
                        setvalue(oIncidentId),
                        setvalue(ReleaseTo[i].T1LB2),
                        setvalue(ReleaseTo[i].ISDEL)
                    ]);
                }

                // Enviormental Impact
                let EnviormentalImpact = oEnvironmentalDetails.EnviormentalImpact;
                for (let i=0;i < EnviormentalImpact.length;i++){
                    result = await tx.run(`call "prCreateUpdateEnvImpact"(?,?,?,?,?)`,[
                        setvalue(EnviormentalImpact[i].EIMID),
                        setvalue(oEnvironmentId),
                        setvalue(oIncidentId),
                        setvalue(EnviormentalImpact[i].T1LB16),
                        setvalue(EnviormentalImpact[i].ISDEL)
                    ]);
                }

                // Corrective Actions
                let CorrectiveActions = oEnvironmentalDetails.CorrectiveActions;
                for (let i=0;i < EnviormentalImpact.length;i++){
                    result = await tx.run(`call "prCreateUpdateEnvironmentCorrectiveActions"(?,?,?,?,?,?)`,[
                        setvalue(CorrectiveActions[i].ECAID),
                        setvalue(oEnvironmentId),
                        setvalue(oIncidentId),
                        setvalue(CorrectiveActions[i].T2LB2),
                        setvalue(CorrectiveActions[i].T2LB3),
                        setValue(CorrectiveActions[i].T2LB4)
                    ]);
                }
            }
            // Custom Incident Type 1
            if (common.validateField(oCustomIncType1.CSTID)) {
                result = await tx.run(`call "prCreateUpdateCustomIncidentType_1"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                    setvalue(oCustomIncType1.CSTID),
                    setvalue(oIncidentId),
                    setvalue(oCustomIncType1.T1LB1),
                    setvalue(oCustomIncType1.T1LB2),
                    setvalue(oCustomIncType1.T1LB3),
                    setvalue(oCustomIncType1.T1LB4),
                    setvalue(oCustomIncType1.T1LB5),
                    setvalue(oCustomIncType1.T1LB6),
                    setvalue(oCustomIncType1.T1LB7),
                    setvalue(oCustomIncType1.T1LB8),
                    setvalue(oCustomIncType1.T1LB9),
                    setvalue(oCustomIncType1.T1LB10),
                    setvalue(oCustomIncType1.T1LB11),
                    setvalue(oCustomIncType1.T1LB12),
                    setvalue(oCustomIncType1.T2LB1),
                    setvalue(oCustomIncType1.T2LB2),
                    setvalue(oCustomIncType1.T2LB3),
                    setvalue(oCustomIncType1.T2LB4),
                    setvalue(oCustomIncType1.T2LB5),
                    setvalue(oCustomIncType1.T2LB6),
                    setvalue(oCustomIncType1.T3LB1),
                    setvalue(oCustomIncType1.T3LB2)
                ]);
            }
            // Custom Incident Type 2
            if (common.validateField(oCustomIncType2.CSTID)) {
                result = await tx.run(`call "prCreateUpdateCustomIncidentType_2"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                    setvalue(oCustomIncType2.CSTID),
                    setvalue(oIncidentId),
                    setvalue(oCustomIncType2.T1LB1),
                    setvalue(oCustomIncType2.T1LB2),
                    setvalue(oCustomIncType2.T1LB3),
                    setvalue(oCustomIncType2.T1LB4),
                    setvalue(oCustomIncType2.T1LB5),
                    setvalue(oCustomIncType2.T1LB6),
                    setvalue(oCustomIncType2.T1LB7),
                    setvalue(oCustomIncType2.T1LB8),
                    setvalue(oCustomIncType2.T1LB9),
                    setvalue(oCustomIncType2.T1LB10),
                    setvalue(oCustomIncType2.T1LB11),
                    setvalue(oCustomIncType2.T1LB12),
                    setvalue(oCustomIncType2.T2LB1),
                    setvalue(oCustomIncType2.T2LB2),
                    setvalue(oCustomIncType2.T2LB3),
                    setvalue(oCustomIncType2.T2LB4),
                    setvalue(oCustomIncType2.T2LB5),
                    setvalue(oCustomIncType2.T2LB6),
                    setvalue(oCustomIncType2.T3LB1),
                    setvalue(oCustomIncType2.T3LB2)
                ]);
            }
            // Custom Incident Type 3
            if (common.validateField(oCustomIncType3.CSTID)) {
                result = await tx.run(`call "prCreateUpdateCustomIncidentType_3"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                    setvalue(oCustomIncType3.CSTID),
                    setvalue(oIncidentId),
                    setvalue(oCustomIncType3.T1LB1),
                    setvalue(oCustomIncType3.T1LB2),
                    setvalue(oCustomIncType3.T1LB3),
                    setvalue(oCustomIncType3.T1LB4),
                    setvalue(oCustomIncType3.T1LB5),
                    setvalue(oCustomIncType3.T1LB6),
                    setvalue(oCustomIncType3.T1LB7),
                    setvalue(oCustomIncType3.T1LB8),
                    setvalue(oCustomIncType3.T1LB9),
                    setvalue(oCustomIncType3.T1LB10),
                    setvalue(oCustomIncType3.T1LB11),
                    setvalue(oCustomIncType3.T1LB12),
                    setvalue(oCustomIncType3.T2LB1),
                    setvalue(oCustomIncType3.T2LB2),
                    setvalue(oCustomIncType3.T2LB3),
                    setvalue(oCustomIncType3.T2LB4),
                    setvalue(oCustomIncType3.T2LB5),
                    setvalue(oCustomIncType3.T2LB6),
                    setvalue(oCustomIncType3.T3LB1),
                    setvalue(oCustomIncType3.T3LB2)
                ]);
            }
            // Custom Incident Type 4
            if (common.validateField(oCustomIncType4.CSTID)) {
                result = await tx.run(`call "prCreateUpdateCustomIncidentType_4"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                    setvalue(oCustomIncType4.CSTID),
                    setvalue(oIncidentId),
                    setvalue(oCustomIncType4.T1LB1),
                    setvalue(oCustomIncType4.T1LB2),
                    setvalue(oCustomIncType4.T1LB3),
                    setvalue(oCustomIncType4.T1LB4),
                    setvalue(oCustomIncType4.T1LB5),
                    setvalue(oCustomIncType4.T1LB6),
                    setvalue(oCustomIncType4.T1LB7),
                    setvalue(oCustomIncType4.T1LB8),
                    setvalue(oCustomIncType4.T1LB9),
                    setvalue(oCustomIncType4.T1LB10),
                    setvalue(oCustomIncType4.T1LB11),
                    setvalue(oCustomIncType4.T1LB12),
                    setvalue(oCustomIncType4.T2LB1),
                    setvalue(oCustomIncType4.T2LB2),
                    setvalue(oCustomIncType4.T2LB3),
                    setvalue(oCustomIncType4.T2LB4),
                    setvalue(oCustomIncType4.T2LB5),
                    setvalue(oCustomIncType4.T2LB6),
                    setvalue(oCustomIncType4.T3LB1),
                    setvalue(oCustomIncType4.T3LB2)
                ]);
            }
            // Custom Incident Type 5
            if (common.validateField(oCustomIncType5.CSTID)) {
                result = await tx.run(`call "prCreateUpdateCustomIncidentType_5"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
                    setvalue(oCustomIncType5.CSTID),
                    setvalue(oIncidentId),
                    setvalue(oCustomIncType5.T1LB1),
                    setvalue(oCustomIncType5.T1LB2),
                    setvalue(oCustomIncType5.T1LB3),
                    setvalue(oCustomIncType5.T1LB4),
                    setvalue(oCustomIncType5.T1LB5),
                    setvalue(oCustomIncType5.T1LB6),
                    setvalue(oCustomIncType5.T1LB7),
                    setvalue(oCustomIncType5.T1LB8),
                    setvalue(oCustomIncType5.T1LB9),
                    setvalue(oCustomIncType5.T1LB10),
                    setvalue(oCustomIncType5.T1LB11),
                    setvalue(oCustomIncType5.T1LB12),
                    setvalue(oCustomIncType5.T2LB1),
                    setvalue(oCustomIncType5.T2LB2),
                    setvalue(oCustomIncType5.T2LB3),
                    setvalue(oCustomIncType5.T2LB4),
                    setvalue(oCustomIncType5.T2LB5),
                    setvalue(oCustomIncType5.T2LB6),
                    setvalue(oCustomIncType5.T3LB1),
                    setvalue(oCustomIncType5.T3LB2)
                ]);
            }

            // Creating Event Summary
			if (oIncidentDetails.ISAVE === '0') {
                result = await tx.run(`CALL "prCreateEventSummary"(?,?,?,?,?)`, [oIncidentId, 'Incident', 'Created', '',887]);
			}
            
            // Creating Audit log
            result = await tx.run(`CALL "prCreateAuditLog"(?,?,?,?,?,?)`, [oIncidentId, oIncidentId, 'Incident Id', 'createIncident','Safety View',JSON.stringify(oInput)]);
			
            returnObj = {
				"IncidentId": oIncidentId.toString(),
				"IncidentNumber":IncidentNumber,
				"AttachmentPath" : folderpath + filename
			};

            // await tx.commit();
            return JSON.stringify(returnObj);
        
        }catch(error){
            try{
                tx1 = cds.transaction(req);
                result = await tx1.run(`CALL "prCreateErrorHandling"(?,?,?,?,?)`, ['Report Incident','createIncident',JSON.stringify(oInput),error.toString(),'Backend']);
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