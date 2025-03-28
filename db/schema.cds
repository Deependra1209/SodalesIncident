namespace INC;

context M {
    @cds.persistence.exists
    @cds.persistence.calcview
    entity MASTERLIST {
        key UNQID : Integer;
            TYVAL : String(50);
            TXVAL : String(1000);
            COLID : Integer;
            INCTY : Integer;
            TXDES : String(5000);
            ISEMP : Integer;
            ISEDT : Integer;
            ISADD : Integer;
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity LABELDATA {
        key UNQID : Integer;
            LABTY : String(250);
            LABTX : String(500);
            AFLAG : String(2);
            LABIE : String(1);
            LABIV : String(1);
            LABIM : String(1);
            HTXIV : String(1);
            HLPTX : String(1000);
            MAXLT : Integer;
            PLCHD : String(100);
            ISDEL : String(1);
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity BODYPART {
        key UNQID            : Integer;
            TXVAL            : String(100);
            UtRfHkcx0nEJhiCM : Association to many NATUREOFINJURY
                                   on UtRfHkcx0nEJhiCM.BDNID = UNQID;
            Phgfvkcx0nEJhiCM : Association to many BODYPARTSIDE
                                   on Phgfvkcx0nEJhiCM.SIDID = UNQID;
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity NATUREOFINJURY {
        key BDNID : Integer;
            BDPID : Integer;
            NATID : Integer;
            TXVAL : String(100);
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity BODYPARTSIDE {
        key BDSID : Integer;
            BDPID : Integer;
            SIDID : Integer;
            TXVAL : String(100);
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity EMPLOYEES {
        key EMPID : String(30);
            EMPNM : String(250);
            EMAIL : String(250);
            MGRID : String(30);
            MGRNM : String(250);
            USRID : String(30);
            DEPTC : String(10);
            DEPNM : String(200);
            PHONE : String(50);
            SUPID : String(30);
            SUPNM : String(250);
            EUNIT : String(250);
            SUPML : String(250);
            LICNM : String(250);
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity SESSIONUSERINFO {
        key EMPID : String(30);
            EMPNM : String(250);
            EMAIL : String(250);
            MGRID : String(30);
            MGRNM : String(250);
            USRID : String(30);
            DEPTC : String(10);
            DEPNM : String(200);
            PHONE : String(50);
            SUPID : String(30);
            SUPNM : String(250);
            EUNIT : String(250);
            SUPML : String(250);
            LICNM : String(250);
    }
}

context RL1 {
    @cds.persistence.exists
    @cds.persistence.calcview
    entity SAVEASDRAFT {
        key INCID: Integer; 
        DRFNM: String(150); 
        CHNDT: Date  @sql.alias: 'UPDDT' ; 
        CRTBY: String(100);
        EMPNM: String(250) @sql.alias: 'UPDBY';
    }    

    @cds.persistence.exists 
    @cds.persistence.calcview 
    entity EXPOSURE {
        key EXPID: Integer  @title: 'EXPID: Unique Id' ; 
        INCID: Integer  @title: 'INCID: INCIDENT ID' ; 
        T1LB1: Integer  @title: 'T1LB1: Type Of Hazardous Material' ; 
        T1LB2: Integer  @title: 'T1LB2: Physical Form' ; 
        T1LB3: Integer  @title: 'T1LB3: Was Personal Protective Equipment (PPE) Used?' ; 
        T1LB5: String(1000)  @title: 'T1LB5: Custom Field 1' ; 
        T1LB6: String(1000)  @title: 'T1LB6: Custom Field 2' ; 
        T1LB8: Integer  @title: 'T1LB8: Exposure Severity' ; 
        T1LB9: Integer  @title: 'T1LB9: Did Expose person Received the treatment?' ; 
        T1LB10: String(1000)  @title: 'T1LB10: Custom Field 3' ; 
        T1LB11: String(1000)  @title: 'T1LB11: Custom Field 4' ; 
        T1LB12: String(5000)  @title: 'T1LB12: Details of Treatment' ; 
        T1LB13: String(5000)  @title: 'T1LB13: Custom Field 5' ; 
        T1LB8TXT: String(1000)  @title: 'T1LB8TXT: Master Data Text Value' ; 
        T1LB1TXT: String(1000)  @title: 'T1LB1TXT: Master Data Text Value' ; 
        D49v4trFMeynOy1z : Association to many ROUTEOFEXPOSURE on D49v4trFMeynOy1z.EXPID=EXPID;
        CPOErwGI4Cc3G1Df : Association to many PPE on CPOErwGI4Cc3G1Df.EXPID=EXPID;
    }

    @cds.persistence.exists 
    @cds.persistence.calcview 
    entity ROUTEOFEXPOSURE {
        key EXRID: Integer  @title: 'EXRID: Unique Id' ; 
        EXPID: Integer  @title: 'EXPID: Unique Id' ; 
        INCID: Integer  @title: 'INCID: Incident Id' ; 
        T1LB7: Int16  @title: 'T1LB7: ROUTE OF EXPOSER' ; 
        T1LB7TXT: String(1000)  @title: 'T1LB7TXT: Master Data Text Value' ; 
    }

    @cds.persistence.exists 
    @cds.persistence.calcview 
    entity PPE {
        key PPEID: Integer  @title: 'PPEID: Unique id' ; 
        INCID: Integer  @title: 'INCID: Incident Id' ; 
        EXPID: Integer  @title: 'EXPID: Property Equipment Damage Id' ; 
        T1LB4: Int16  @title: 'T1LB4: Selected Property Damage' ; 
        T1LB4TXT: String(1000)  @title: 'T1LB4TXT: Master Data Text Value' ; 
        ISDEL: String(1)  @title: 'ISDEL: Is Deleted Flag (1=True/0=False)' ; 
    }

    @cds.persistence.exists 
    @cds.persistence.calcview 
    entity VEHICLEADDITIONALDETAILS {
        key MVAID: Integer  @title: 'MVAID: MVAID' ; 
        INCID: Integer  @title: 'INCID: INCID' ; 
        T4LB1: Int16  @title: 'T4LB1: T4LB1' ; 
        T4LB2: String(100)  @title: 'T4LB2: T4LB2' ; 
        T4LB3: String(100)  @title: 'T4LB3: T4LB3' ; 
        T4LB4: Int16  @title: 'T4LB4: T4LB4' ; 
        T4LB5: String(1000)  @title: 'T4LB5: T4LB5' ; 
        T4LB6: String(1000)  @title: 'T4LB6: T4LB6' ; 
        T4LB7: Int16  @title: 'T4LB7: T4LB7' ; 
        T4LB8: Int16  @title: 'T4LB8: T4LB8' ; 
        T4LB9: Int16  @title: 'T4LB9: T4LB9' ; 
        T4LB10: String(1000)  @title: 'T4LB10: T4LB10' ; 
        T4LB11: String(1000)  @title: 'T4LB11: T4LB11' ; 
        T5LB1: String(5000)  @title: 'T5LB1: T5LB1' ; 
        T5LB2: String(5000)  @title: 'T5LB2: T5LB2' ; 
        T5LB3: String(5000)  @title: 'T5LB3: T5LB3' ; 
        T5LB4: String(5000)  @title: 'T5LB4: T5LB4' ; 
        T5LB5: String(5000)  @title: 'T5LB5: T5LB5' ; 
        T4LB1TXT: String(1000)  @title: 'T4LB1TXT: TXVAL' ; 
        T4LB4TXT: String(1000)  @title: 'T4LB4TXT: TXVAL' ; 
        T4LB7TXT: String(1000)  @title: 'T4LB7TXT: Master Data Text Value' ; 
        T4LB8TXT: String(1000)  @title: 'T4LB8TXT: Master Data Text Value' ; 
        T4LB9TXT: String(1000)  @title: 'T4LB9TXT: Master Data Text Value' ; 
    }

    @cds.persistence.exists 
    @cds.persistence.calcview 
    entity WORKPLACEHARASSMENT {
        key WHVID: Integer  @title: 'WHVID: Unique id' ; 
        INCID: Integer  @title: 'INCID: Incident Id' ; 
        T3LB1: String(5000)  @title: 'T3LB1: Relationship to the complainant (i.e. Supervisor, co-worker, subordinate, etc.)' ; 
        T3LB2: Int16  @title: 'T3LB2: Has a Notice Of Occurrence (NOO) been received?' ; 
        T3LB3: Date  @title: 'T3LB3: NOO received date' ; 
        T3LB6: String(5000)  @title: 'T3LB6: Physical harasssments description' ; 
        T3LB8: String(5000)  @title: 'T3LB8: Psychological harassment description' ; 
        T3LB10: String(5000)  @title: 'T3LB10: Verbal harassment description' ; 
        T3LB11: Int16  @title: 'T3LB11: Did the complainant identify a human rights ground?' ; 
        T3LB14: String(5000)  @title: 'T3LB14: If other, please specify' ; 
        T3LB15: String(5000)  @title: 'T3LB15: Custom Filed 1' ; 
        ENhfWSs5VCIKXXeO : Association to many TYPEOFOCCURRENCEREP on ENhfWSs5VCIKXXeO.WHVID=WHVID;
        CZInjmm5nJLKm7ov : Association to many PHYSICALHARASSMENTTYPE on CZInjmm5nJLKm7ov.WHVID=WHVID;
        sNSxmFsAY37R2eVE : Association to many PSYCHOLOGICALHARASSMENTTYPE on sNSxmFsAY37R2eVE.WHVID=WHVID;
        q6qjLWaTK4jT6RTm : Association to many VERBALHARASSMENTTYPE on q6qjLWaTK4jT6RTm.WHVID=WHVID;
        YpMIhikSviEEtD0p : Association to many PLEASESELECTALLTHATAPPLY on YpMIhikSviEEtD0p.WHVID=WHVID;
        Txs7DNJzynKKzLnA : Association to many IMMEDIATEACTIONS on Txs7DNJzynKKzLnA.WHVID=WHVID;

    }

    @cds.persistence.exists 
    @cds.persistence.calcview 
    entity TYPEOFOCCURRENCEREP {
        key OCRID: Integer  @title: 'OCRID: Unique id' ; 
        INCID: Integer  @title: 'INCID: Incident Id' ; 
        WHVID: Integer  @title: 'WHVID: WorkPlace Harassment and Voilence Id' ; 
        T3LB4: Int16  @title: 'T3LB4: Selected Type of Occurence' ; 
        T3LB4TXT: String(1000)  @title: 'T3LB4TXT: Master Data Text Value' ; 
        ISDEL: String(1)  @title: 'ISDEL: Is Deleted Flag (1=True/0=False)' ; 
    }

    @cds.persistence.exists 
    @cds.persistence.calcview 
    entity PHYSICALHARASSMENTTYPE {
        key PHYID: Integer  @title: 'PHYID: Unique id' ; 
        INCID: Integer  @title: 'INCID: Incident Id' ; 
        WHVID: Integer  @title: 'WHVID: WorkPlace Harassment and Voilence Id' ; 
        T3LB5: Int16  @title: 'T3LB5: Selected Physical Harassment Type' ; 
        T3LB5TXT: String(1000)  @title: 'T3LB5TXT: Master Data Text Value' ; 
        ISDEL: String(1)  @title: 'ISDEL: Is Deleted Flag (1=True/0=False)' ; 
    }

    @cds.persistence.exists 
    @cds.persistence.calcview 
    entity PSYCHOLOGICALHARASSMENTTYPE {
        key PSYID: Integer  @title: 'PSYID: Unique id' ; 
        INCID: Integer  @title: 'INCID: Incident Id' ; 
        WHVID: Integer  @title: 'WHVID: WorkPlace Harassment and Voilence Id' ; 
        T3LB7: Int16  @title: 'T3LB7: Selected Psychological Harassment Type' ; 
        T3LB7TXT: String(1000)  @title: 'T3LB7TXT: Master Data Text Value' ; 
        ISDEL: String(1)  @title: 'ISDEL: Is Deleted Flag (1=True/0=False)' ; 
    }

    @cds.persistence.exists 
    @cds.persistence.calcview 
    entity VERBALHARASSMENTTYPE {
        key VBLID: Integer  @title: 'VBLID: Unique id' ; 
        INCID: Integer  @title: 'INCID: Incident Id' ; 
        WHVID: Integer  @title: 'WHVID: WorkPlace Harassment and Voilence Id' ; 
        T3LB9: Int16  @title: 'T3LB9: Selected Verbal Harassment Type' ; 
        T3LB9TXT: String(1000)  @title: 'T3LB9TXT: Master Data Text Value' ; 
        ISDEL: String(1)  @title: 'ISDEL: Is Deleted Flag (1=True/0=False)' ; 
    }

    @cds.persistence.exists 
    @cds.persistence.calcview 
    entity PLEASESELECTALLTHATAPPLY {
        key PSAID: Integer  @title: 'PSAID: Unique id' ; 
        INCID: Integer  @title: 'INCID: Incident Id' ; 
        WHVID: Integer  @title: 'WHVID: WorkPlace Harassment and Voilence Id' ; 
        T3LB12: Int16  @title: 'T3LB12: Selected All that Apply' ; 
        T3LB12TXT: String(1000)  @title: 'T3LB12TXT: Master Data Text Value' ; 
        ISDEL: String(1)  @title: 'ISDEL: Is Deleted Flag (1=True/0=False)' ; 
    }

    @cds.persistence.exists 
    @cds.persistence.calcview 
    entity IMMEDIATEACTIONS {
        key IACID: Integer  @title: 'IACID: Unique id' ; 
        INCID: Integer  @title: 'INCID: Incident Id' ; 
        WHVID: Integer  @title: 'WHVID: WorkPlace Harassment and Voilence Id' ; 
        T3LB13: Int16  @title: 'T3LB13: Selected Immediate Actions' ; 
        T3LB13TXT: String(1000)  @title: 'T3LB13TXT: Master Data Text Value' ; 
        ISDEL: String(1)  @title: 'ISDEL: Is Deleted Flag (1=True/0=False)' ; 
    }

    @cds.persistence.exists 
    @cds.persistence.calcview 
    entity GETATTACHMENTDOC {
        key ATTID: Integer64  @title: 'ATTID: Unique Id' ; 
        INCID: Integer  @title: 'INCID: Incident Id' ; 
        OBJID: String(50)  @title: 'OBJID: Object ID' ; 
        ATTNM: String(250)  @title: 'ATTNM: Attachment Name' ; 
        FILTY: Integer  @title: 'FILTY: File Type' ; 
        PRIST: Integer  @title: 'PRIST: Privacy setting' ; 
        DESCP: String(1000)  @title: 'DESCP: Description' ; 
        DOCTY: String(100)  @title: 'DOCTY: Document Type' ; 
        UNQID: String(50)  @title: 'UNQID: Unique Id' ; 
        FILTYTXT: String(1000)  @title: 'FILTYTXT: Master Data Text Value' ; 
        PRISTTXT: String(1000)  @title: 'PRISTTXT: TXVAL_PRISTTXT' ; 
        UPDBY: String(250)  @title: 'UPDBY: Employee Name' ; 
    }

    @cds.persistence.exists 
    @cds.persistence.calcview 
    entity CUSTOMINCIDENTTYPE_1 {
        key CSTID: Integer  @title: 'CSTID: Unique Id' ; 
        INCID: Integer  @title: 'INCID: Incident Id' ; 
        T1LB1: Int16  @title: 'T1LB1: Custom Radio Button 1' ; 
        T1LB2: Date  @title: 'T1LB2: Custom Date Picker 1' ; 
        T1LB3: Time  @title: 'T1LB3: Custom Time Picker 1' ; 
        T1LB4: String(1000)  @title: 'T1LB4: Custom InputBox 1' ; 
        T1LB5: String(1000)  @title: 'T1LB5: Custom InputBox 2' ; 
        T1LB6: Int16  @title: 'T1LB6: Custom ComboBox 1' ; 
        T1LB7: Int16  @title: 'T1LB7: Custom Radio Button 2' ; 
        T1LB8: Date  @title: 'T1LB8: Custom Date Picker 2' ; 
        T1LB9: Time  @title: 'T1LB9: Custom Time Picker 2' ; 
        T1LB10: String(1000)  @title: 'T1LB10: Custom InputBox 3' ; 
        T1LB11: String(1000)  @title: 'T1LB11: Custom InputBox 4' ; 
        T1LB12: Int16  @title: 'T1LB12: Custom ComboBox 2' ; 
        T2LB1: Int16  @title: 'T2LB1: Custom Radio Button 3' ; 
        T2LB2: Date  @title: 'T2LB2: Custom Date Picker 3' ; 
        T2LB3: Time  @title: 'T2LB3: Custom Time Picker 3' ; 
        T2LB4: String(1000)  @title: 'T2LB4: Custom InputBox 5' ; 
        T2LB5: String(1000)  @title: 'T2LB5: Custom InputBox 6' ; 
        T2LB6: Int16  @title: 'T2LB6: Custom ComboBox 3' ; 
        T3LB1: String(5000)  @title: 'T3LB1: Custom TextArea 1' ; 
        T3LB2: String(5000)  @title: 'T3LB2: Custom TextArea 2' ; 
        T1LB6TXT: String(1000)  @title: 'T1LB6TXT: Master Data Text Value' ; 
        T1LB12TXT: String(1000)  @title: 'T1LB12TXT: Master Data Text Value' ; 
        T2LB6TXT: String(1000)  @title: 'T2LB6TXT: Master Data Text Value' ; 
    }

    @cds.persistence.exists 
    @cds.persistence.calcview 
    entity CUSTOMINCIDENTTYPE_2 {
        key CSTID: Integer  @title: 'CSTID: Unique Id' ; 
        INCID: Integer  @title: 'INCID: Incident Id' ; 
        T1LB1: Int16  @title: 'T1LB1: Custom Radio Button 1' ; 
        T1LB2: Date  @title: 'T1LB2: Custom Date Picker 1' ; 
        T1LB3: Time  @title: 'T1LB3: Custom Time Picker 1' ; 
        T1LB4: String(1000)  @title: 'T1LB4: Custom InputBox 1' ; 
        T1LB5: String(1000)  @title: 'T1LB5: Custom InputBox 2' ; 
        T1LB6: Int16  @title: 'T1LB6: Custom ComboBox 1' ; 
        T1LB7: Int16  @title: 'T1LB7: Custom Radio Button 2' ; 
        T1LB8: Date  @title: 'T1LB8: Custom Date Picker 2' ; 
        T1LB9: Time  @title: 'T1LB9: Custom Time Picker 2' ; 
        T1LB10: String(1000)  @title: 'T1LB10: Custom InputBox 3' ; 
        T1LB11: String(1000)  @title: 'T1LB11: Custom InputBox 4' ; 
        T1LB12: Int16  @title: 'T1LB12: Custom ComboBox 2' ; 
        T2LB1: Int16  @title: 'T2LB1: Custom Radio Button 3' ; 
        T2LB2: Date  @title: 'T2LB2: Custom Date Picker 3' ; 
        T2LB3: Time  @title: 'T2LB3: Custom Time Picker 3' ; 
        T2LB4: String(1000)  @title: 'T2LB4: Custom InputBox 5' ; 
        T2LB5: String(1000)  @title: 'T2LB5: Custom InputBox 6' ; 
        T2LB6: Int16  @title: 'T2LB6: Custom ComboBox 3' ; 
        T3LB1: String(5000)  @title: 'T3LB1: Custom TextArea 1' ; 
        T3LB2: String(5000)  @title: 'T3LB2: Custom TextArea 2' ; 
        T1LB6TXT: String(1000)  @title: 'T1LB6TXT: Master Data Text Value' ; 
        T1LB12TXT: String(1000)  @title: 'T1LB12TXT: Master Data Text Value' ; 
        T2LB6TXT: String(1000)  @title: 'T2LB6TXT: Master Data Text Value' ; 
    }

    @cds.persistence.exists 
    @cds.persistence.calcview 
    entity CUSTOMINCIDENTTYPE_3 {
        key CSTID: Integer  @title: 'CSTID: Unique Id' ; 
        INCID: Integer  @title: 'INCID: Incident Id' ; 
        T1LB1: Int16  @title: 'T1LB1: Custom Radio Button 1' ; 
        T1LB2: Date  @title: 'T1LB2: Custom Date Picker 1' ; 
        T1LB3: Time  @title: 'T1LB3: Custom Time Picker 1' ; 
        T1LB4: String(1000)  @title: 'T1LB4: Custom InputBox 1' ; 
        T1LB5: String(1000)  @title: 'T1LB5: Custom InputBox 2' ; 
        T1LB6: Int16  @title: 'T1LB6: Custom ComboBox 1' ; 
        T1LB7: Int16  @title: 'T1LB7: Custom Radio Button 2' ; 
        T1LB8: Date  @title: 'T1LB8: Custom Date Picker 2' ; 
        T1LB9: Time  @title: 'T1LB9: Custom Time Picker 2' ; 
        T1LB10: String(1000)  @title: 'T1LB10: Custom InputBox 3' ; 
        T1LB11: String(1000)  @title: 'T1LB11: Custom InputBox 4' ; 
        T1LB12: Int16  @title: 'T1LB12: Custom ComboBox 2' ; 
        T2LB1: Int16  @title: 'T2LB1: Custom Radio Button 3' ; 
        T2LB2: Date  @title: 'T2LB2: Custom Date Picker 3' ; 
        T2LB3: Time  @title: 'T2LB3: Custom Time Picker 3' ; 
        T2LB4: String(1000)  @title: 'T2LB4: Custom InputBox 5' ; 
        T2LB5: String(1000)  @title: 'T2LB5: Custom InputBox 6' ; 
        T2LB6: Int16  @title: 'T2LB6: Custom ComboBox 3' ; 
        T3LB1: String(5000)  @title: 'T3LB1: Custom TextArea 1' ; 
        T3LB2: String(5000)  @title: 'T3LB2: Custom TextArea 2' ; 
        T1LB6TXT: String(1000)  @title: 'T1LB6TXT: Master Data Text Value' ; 
        T1LB12TXT: String(1000)  @title: 'T1LB12TXT: Master Data Text Value' ; 
        T2LB6TXT: String(1000)  @title: 'T2LB6TXT: Master Data Text Value' ; 
    }

    @cds.persistence.exists 
    @cds.persistence.calcview 
    entity CUSTOMINCIDENTTYPE_4 {
        key CSTID: Integer  @title: 'CSTID: Unique Id' ; 
        INCID: Integer  @title: 'INCID: Incident Id' ; 
        T1LB1: Int16  @title: 'T1LB1: Custom Radio Button 1' ; 
        T1LB2: Date  @title: 'T1LB2: Custom Date Picker 1' ; 
        T1LB3: Time  @title: 'T1LB3: Custom Time Picker 1' ; 
        T1LB4: String(1000)  @title: 'T1LB4: Custom InputBox 1' ; 
        T1LB5: String(1000)  @title: 'T1LB5: Custom InputBox 2' ; 
        T1LB6: Int16  @title: 'T1LB6: Custom ComboBox 1' ; 
        T1LB7: Int16  @title: 'T1LB7: Custom Radio Button 2' ; 
        T1LB8: Date  @title: 'T1LB8: Custom Date Picker 2' ; 
        T1LB9: Time  @title: 'T1LB9: Custom Time Picker 2' ; 
        T1LB10: String(1000)  @title: 'T1LB10: Custom InputBox 3' ; 
        T1LB11: String(1000)  @title: 'T1LB11: Custom InputBox 4' ; 
        T1LB12: Int16  @title: 'T1LB12: Custom ComboBox 2' ; 
        T2LB1: Int16  @title: 'T2LB1: Custom Radio Button 3' ; 
        T2LB2: Date  @title: 'T2LB2: Custom Date Picker 3' ; 
        T2LB3: Time  @title: 'T2LB3: Custom Time Picker 3' ; 
        T2LB4: String(1000)  @title: 'T2LB4: Custom InputBox 5' ; 
        T2LB5: String(1000)  @title: 'T2LB5: Custom InputBox 6' ; 
        T2LB6: Int16  @title: 'T2LB6: Custom ComboBox 3' ; 
        T3LB1: String(5000)  @title: 'T3LB1: Custom TextArea 1' ; 
        T3LB2: String(5000)  @title: 'T3LB2: Custom TextArea 2' ; 
        T1LB6TXT: String(1000)  @title: 'T1LB6TXT: Master Data Text Value' ; 
        T1LB12TXT: String(1000)  @title: 'T1LB12TXT: Master Data Text Value' ; 
        T2LB6TXT: String(1000)  @title: 'T2LB6TXT: Master Data Text Value' ; 
    }

    @cds.persistence.exists 
    @cds.persistence.calcview 
    entity CUSTOMINCIDENTTYPE_5 {
        key CSTID: Integer  @title: 'CSTID: Unique Id' ; 
        INCID: Integer  @title: 'INCID: Incident Id' ; 
        T1LB1: Int16  @title: 'T1LB1: Custom Radio Button 1' ; 
        T1LB2: Date  @title: 'T1LB2: Custom Date Picker 1' ; 
        T1LB3: Time  @title: 'T1LB3: Custom Time Picker 1' ; 
        T1LB4: String(1000)  @title: 'T1LB4: Custom InputBox 1' ; 
        T1LB5: String(1000)  @title: 'T1LB5: Custom InputBox 2' ; 
        T1LB6: Int16  @title: 'T1LB6: Custom ComboBox 1' ; 
        T1LB7: Int16  @title: 'T1LB7: Custom Radio Button 2' ; 
        T1LB8: Date  @title: 'T1LB8: Custom Date Picker 2' ; 
        T1LB9: Time  @title: 'T1LB9: Custom Time Picker 2' ; 
        T1LB10: String(1000)  @title: 'T1LB10: Custom InputBox 3' ; 
        T1LB11: String(1000)  @title: 'T1LB11: Custom InputBox 4' ; 
        T1LB12: Int16  @title: 'T1LB12: Custom ComboBox 2' ; 
        T2LB1: Int16  @title: 'T2LB1: Custom Radio Button 3' ; 
        T2LB2: Date  @title: 'T2LB2: Custom Date Picker 3' ; 
        T2LB3: Time  @title: 'T2LB3: Custom Time Picker 3' ; 
        T2LB4: String(1000)  @title: 'T2LB4: Custom InputBox 5' ; 
        T2LB5: String(1000)  @title: 'T2LB5: Custom InputBox 6' ; 
        T2LB6: Int16  @title: 'T2LB6: Custom ComboBox 3' ; 
        T3LB1: String(5000)  @title: 'T3LB1: Custom TextArea 1' ; 
        T3LB2: String(5000)  @title: 'T3LB2: Custom TextArea 2' ; 
        T1LB6TXT: String(1000)  @title: 'T1LB6TXT: Master Data Text Value' ; 
        T1LB12TXT: String(1000)  @title: 'T1LB12TXT: Master Data Text Value' ; 
        T2LB6TXT: String(1000)  @title: 'T2LB6TXT: Master Data Text Value' ; 
    }

}
    @cds.persistence.exists
    @cds.persistence.calcview
    entity BASICINCIDENTDETAILS {
        INCID         : Integer      @title: 'INCID: Unique id';
        REBEH         : Int16        @title: 'REBEH: Are you Reporting on behalf of someone else?';
        INCNM         : String(50)   @title: 'INCNM: Incident id in inc-year-001 format';
        T1LB1         : Date         @title: 'T1LB1: Date and Time Of Incident-Time';
        T1LB2         : Time         @title: 'T1LB2: Date and Time Of Incident-Time';
        T1LB3         : Date         @title: 'T1LB3: Incident Reported Date';
        T1LB4         : Time         @title: 'T1LB4: Incident Reported Time';
        T1LB5         : Int16        @title: 'T1LB5: Select Incident Location';
        T1LB6         : String(1000) @title: 'T1LB6: Custom';
        T1LB7         : String(1000) @title: 'T1LB7: Custom';
        T1LB8         : Int16        @title: 'T1LB8: Country Of Incident';
        T1LB9         : String(1000) @title: 'T1LB9: Incident Location (Address)';
        T1LB10        : String(500)  @title: 'T1LB10: Describe Location';
        T1LB11        : String(1000) @title: 'T1LB11: Custom';
        T1LB12        : String(1000) @title: 'T1LB12: Custom';
        T1LB13        : String(5000) @title: 'T1LB13: Incident Description';
        T1LB14        : String(5000) @title: 'T1LB14: Custom';
        T2LB1         : Int16        @title: 'T2LB1: Incident Severity';
        T2LB2         : Int16        @title: 'T2LB2: Regular Agency Notified';
        T2LB3         : Int16        @title: 'T2LB3: Worker compensation submit';
        T2LB4         : String(1000) @title: 'T2LB4: Custom';
        T2LB5         : String(1000) @title: 'T2LB5: Custom';
        T2LB6         : Int16        @title: 'T2LB6: Incident Probability';
        T2LB7         : Int16        @title: 'T2LB7: Emergency Services Notified?';
        T2LB8         : String(1000) @title: 'T2LB8: Which emergency services were notified?';
        T2LB9         : String(1000) @title: 'T2LB9: Custom';
        T2LB10        : String(1000) @title: 'T2LB10: Custom';
        INCST         : Int16        @title: 'INCST: Incident Status';
        ISAVE         : String(1)    @title: 'ISAVE: Submit/Save as draft';
        SIGN1         : String(100)  @title: 'SIGN1: Employee Signature';
        SN1ST         : String(100)  @title: 'SN1ST: Employee Signature Style';
        SN1DT         : Date         @title: 'SN1DT: Employee Signature Date';
        SIGN2         : String(100)  @title: 'SIGN2: Supervisor Signature';
        SN2ST         : String(100)  @title: 'SN2ST: Supervisor Signature Style';
        SN2DT         : Date         @title: 'SN2DT: Supervisor Signature Date';
        LATIT         : String(50)   @title: 'LATIT: Latitude';
        LONGI         : String(50)   @title: 'LONGI: Longitude';
        DRFNM         : String(150)  @title: 'DRFNM: Draft Name';
        ATTFP         : String(50)   @title: 'ATTFP: Attachment folder path';
        CLOBY         : String(30)   @title: 'CLOBY: Incident Closed By';
        CLODT         : Date         @title: 'CLODT: Incident Closed Date';
        CLOTM         : Time         @title: 'CLOTM: Incident Closed Time';
        INCAT         : String(30)   @title: 'INCAT: Incident Assign To';
        INCAB         : String(30)   @title: 'INCAB: Incident Assign By';
        INCAD         : Date         @title: 'INCAD: Incident Assign Date';
        INVCB         : String(30)   @title: 'INVCB: Investigation Complete By';
        INVCD         : Date         @title: 'INVCD: Investigation Complete Date';
        PRFLG         : Int16        @title: 'PRFLG: Process Flag';
        INVST         : Int16        @title: 'INVST: Investigation Status';
        SEQUN         : Integer      @title: 'SEQUN: Sequence Number';
        INCTY         : String(50)   @title: 'INCTY: Incident Types pipe seperated used for filter';
        TXVAL         : String(1000) @title: 'TXVAL: Master Data Text Value';
        TXVAL_CNT_LCN : String(1000) @title: 'TXVAL_CNT_LCN: TXVAL_CNT_LCN';
        TXVAL_INC_SEV : String(1000) @title: 'TXVAL_INC_SEV: TXVAL_INC_SEV';
        TXVAL_INC_PRO : String(1000) @title: 'TXVAL_INC_PRO: TXVAL_INC_PRO';
        TXVAL_INCST   : String(1000) @title: 'TXVAL_INCST: TXVAL_INCST';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity INCIDENTTYPE {
        ICTID    : Integer      @title: 'ICTID: Unique Id';
        INCID    : Integer      @title: 'INCID: Incident Id';
        INCTY    : Int16        @title: 'INCTY: Incident Type';
        ISDEL    : String(1)    @title: 'ISDEL: Is Deleted Flag (1=True/0=False)';
        INCTYTXT : String(1000) @title: 'INCTYTXT: Master Data Text Value';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity PROPERTYEQUIPMENTDAMAGE {
        PEDID    : Integer      @title: 'PEDID: Unique id';
        INCID    : Integer      @title: 'INCID: Incident Id';
        T1LB2    : Int16        @title: 'T1LB2: Were There Any Previous Incidents?';
        T1LB3    : Int16        @title: 'T1LB3: Are there any Safety concerns related to the damage?';
        T1LB4    : String(1000) @title: 'T1LB4: Custom Field 1';
        T1LB5    : String(1000) @title: 'T1LB5: Custom Field 2';
        T1LB6    : Int16        @title: 'T1LB6: Owner Type';
        T1LB7    : String(250)  @title: 'T1LB7: Owner Name';
        T1LB8    : String(1000) @title: 'T1LB8: Custom Field 3';
        T1LB9    : String(1000) @title: 'T1LB9: Custom Field 4';
        T1LB10   : String(5000) @title: 'T1LB10: Describe previous incidents if known';
        T1LB11   : String(5000) @title: 'T1LB11: Describe Safety Concern';
        T1LB12   : String(5000) @title: 'T1LB12: Custom Field 5';
        T1LB6TXT : String(1000) @title: 'T1LB6TXT: Master Data Text Value';
    }

   
    @cds.persistence.exists
    @cds.persistence.calcview
    entity EXPOSURE {
        EXPID    : Integer      @title: 'EXPID: Unique Id';
        INCID    : Integer      @title: 'INCID: INCIDENT ID';
        T1LB1    : Integer      @title: 'T1LB1: Type Of Hazardous Material';
        T1LB2    : Integer      @title: 'T1LB2: Physical Form';
        T1LB3    : Integer      @title: 'T1LB3: Was Personal Protective Equipment (PPE) Used?';
        T1LB5    : String(1000) @title: 'T1LB5: Custom Field 1';
        T1LB6    : String(1000) @title: 'T1LB6: Custom Field 2';
        T1LB8    : Integer      @title: 'T1LB8: Exposure Severity';
        T1LB9    : Integer      @title: 'T1LB9: Did Expose person Received the treatment?';
        T1LB10   : String(1000) @title: 'T1LB10: Custom Field 3';
        T1LB11   : String(1000) @title: 'T1LB11: Custom Field 4';
        T1LB12   : String(5000) @title: 'T1LB12: Details of Treatment';
        T1LB13   : String(5000) @title: 'T1LB13: Custom Field 5';
        T1LB8TXT : String(1000) @title: 'T1LB8TXT: Master Data Text Value';
        T1LB1TXT : String(1000) @title: 'T1LB1TXT: Master Data Text Value';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity INCIDENTREPORTEDBYDETAILS {
        REPID  : Integer      @title: 'REPID: Unique id';
        INCID  : Integer      @title: 'INCID: Incident id ';
        RPLB1  : String(250)  @title: 'RPLB1: Reported By Name';
        RPLB2  : String(30)   @title: 'RPLB2: Reported By Employee Id';
        RPLB3  : String(250)  @title: 'RPLB3: Email Address';
        RPLB4  : String(1000) @title: 'RPLB4: Custom';
        RPLB5  : String(1000) @title: 'RPLB5: Custom';
        RPLB6  : String(1000) @title: 'RPLB6: Custom';
        RPLB7  : String(1000) @title: 'RPLB7: Custom';
        RPLB8  : String(100)  @title: 'RPLB8: Position';
        RPLB9  : String(100)  @title: 'RPLB9: Department';
        RPLB10 : String(250)  @title: 'RPLB10: Manager Name';
        RPLB11 : String(1000) @title: 'RPLB11: Custom';
        RPLB12 : String(1000) @title: 'RPLB12: Custom';
        RPLB13 : String(1000) @title: 'RPLB13: Custom';
        RPLB14 : String(1000) @title: 'RPLB14: Custom';
        MGRID  : String(100)  @title: 'MGRID: Manager Id';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity INVOLVEDPEOPLEDETAILS {
        IPLID  : Integer      @title: 'IPLID: Unique Id';
        INCID  : Integer      @title: 'INCID: Incident Id';
        UNQID  : String(20)   @title: 'UNQID: Unique Id';
        PPLB1  : Int16        @title: 'PPLB1: Role';
        PPLB2  : String(250)  @title: 'PPLB2: Person/Employee Name';
        PPLB3  : String(30)   @title: 'PPLB3: Employee Id';
        PPLB4  : String(1000) @title: 'PPLB4: Custom Field 1';
        PPLB5  : String(1000) @title: 'PPLB5: Custom Field 2';
        PPLB7  : String(50)   @title: 'PPLB7: Phone Number';
        PPLB8  : String(250)  @title: 'PPLB8: Person Email Id';
        PPLB9  : String(250)  @title: 'PPLB9: Supervisor Name';
        PPLB10 : String(1000) @title: 'PPLB10: Custom Field 3';
        PPLB11 : String(1000) @title: 'PPLB11: Custom Field 4';
        PPLB12 : String(5000) @title: 'PPLB12: Additional Information';
        PPLB13 : String(200)  @title: 'PPLB13: Department Name';
        PPLB14 : String(200)  @title: 'PPLB14: Position';
        PPLB15 : String(250)  @title: 'PPLB15: Manager Name';
        PPLB16 : String(5000) @title: 'PPLB16: Employee/Person Address';
        PPLB17 : String(250)  @title: 'PPLB17: Unit No';
        PPLB18 : String(250)  @title: 'PPLB18: Country';
        PPLB19 : String(250)  @title: 'PPLB19: Licence Number';
        PPLB20 : String(250)  @title: 'PPLB20: Supervisor Mail';
        PPLB21 : String(30)   @title: 'PPLB21: Manager Id';
        PPLB22 : String(30)   @title: 'PPLB22: Immediate Supervisor ID';
        TXVAL  : String(1000) @title: 'TXVAL: Master Data Text Value';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity INVOLVEDPEOPLETYPE {
        IPTID : Integer      @title: 'IPTID: Unique Id';
        IPLID : Integer      @title: 'IPLID: Involved People Details ID';
        INCID : Integer      @title: 'INCID: Incident Id';
        PPLB6 : Int16        @title: 'PPLB6: Involved Person Type';
        TXVAL : String(1000) @title: 'TXVAL: Master Data Text Value';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity GETRECORDEDSTATEMENTS {
        ATTID    : Integer64    @title: 'ATTID: Unique Id';
        INCID    : Integer      @title: 'INCID: Incident Id';
        OBJID    : String(50)   @title: 'OBJID: Object ID';
        ATTNM    : String(250)  @title: 'ATTNM: Attachment Name';
        FILTY    : Integer      @title: 'FILTY: File Type';
        PRIST    : Integer      @title: 'PRIST: Privacy setting';
        DESCP    : String(1000) @title: 'DESCP: Description';
        DOCTY    : String(100)  @title: 'DOCTY: Document Type';
        UNQID    : String(50)   @title: 'UNQID: Unique Id';
        FILTYTXT : String(1000) @title: 'FILTYTXT: Master Data Text Value';
        PRISTTXT : String(1000) @title: 'PRISTTXT: TXVAL_PRISTTXT';
        UPDBY    : String(250)  @title: 'UPDBY: Employee Name';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity MOTORVEHICLEDETAILS {
        MVDID     : Integer      @title: 'MVDID: Unique id';
        INCID     : Integer      @title: 'INCID: Incident Id';
        IPLID     : Integer      @title: 'IPLID: Involved people Id';
        UNQID     : String(20)   @title: 'UNQID: Unique Id';
        T1LB1     : Int16        @title: 'T1LB1: Vehicle Owned By';
        T1LB2     : String(50)   @title: 'T1LB2: Year';
        T1LB3     : String(100)  @title: 'T1LB3: Model';
        T1LB4     : String(250)  @title: 'T1LB4: Owner';
        T1LB5     : Int16        @title: 'T1LB5: Class';
        T1LB7     : Int16        @title: 'T1LB7: Was The Operator Permitted / Certified';
        T1LB8     : Int16        @title: 'T1LB8: Was The Vehicle Damaged?';
        T1LB9     : Int16        @title: 'T1LB9: Type Of Damage';
        T1LB10    : Int16        @title: 'T1LB10: Operator';
        T1LB11    : Int16        @title: 'T1LB11: Were Seat Belt Worn?';
        T1LB12    : String(1000) @title: 'T1LB12: Custom Field 1';
        T1LB13    : String(1000) @title: 'T1LB13: Custom Field 2';
        T1LB14    : String(1000) @title: 'T1LB14: Make';
        T1LB15    : String(100)  @title: 'T1LB15: Plate No';
        T1LB16    : String(1000) @title: 'T1LB16: License PIC#';
        T1LB18    : Date         @title: 'T1LB18: Expiry';
        T1LB19    : String(50)   @title: 'T1LB19: Day Time Phone#';
        T1LB20    : Int16        @title: 'T1LB20: Valid';
        T1LB21    : Int16        @title: 'T1LB21: Direction Of Travel';
        T1LB22    : Int16        @title: 'T1LB22: Mechanical Failure';
        T1LB23    : String(1000) @title: 'T1LB23: Custom Field 3';
        T1LB24    : String(1000) @title: 'T1LB24: Custom Field 4';
        T1LB25    : String(5000) @title: 'T1LB25: Describe Damage';
        LMVID     : String(30)   @title: 'LMVID: Legacy Motor Vehical Id';
        T1LB5TXT  : String(1000) @title: 'T1LB5TXT: Master Data Text Value';
        T1LB10TXT : String(1000) @title: 'T1LB10TXT: TXVAL_CLASS';
        T1LB9TXT  : String(1000) @title: 'T1LB9TXT: TXVAL_OPRTR';
        T1LB21TXT : String(1000) @title: 'T1LB21TXT: Master Data Text Value';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity ENDORSEMENTS {
        ENDID     : Integer      @title: 'ENDID: Unique id';
        INCID     : Integer      @title: 'INCID: Incident Id';
        MVDID     : Integer      @title: 'MVDID: Motor Vehicle Incident Id';
        T1LB17    : Int16        @title: 'T1LB17: Selected Endorsements';
        T1LB17TXT : String(1000) @title: 'T1LB17TXT: Master Data Text Value';
        ISDEL     : String(1)    @title: 'ISDEL: Is Deleted Flag (1=True/0=False)';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity MOTORVEHICLERESTRICTIONS {
        RESID    : Integer      @title: 'RESID: Unique id';
        INCID    : Integer      @title: 'INCID: Incident Id';
        MVDID    : Integer      @title: 'MVDID: Motor Vehicle Incident Id';
        T1LB6    : Int16        @title: 'T1LB6: Selected Restriction';
        T1LB6TXT : String(1000) @title: 'T1LB6TXT: Master Data Text Value';
        ISDEL    : String(1)    @title: 'ISDEL: Is Deleted Flag (1=True/0=False)';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity PASSANGERDETAILS {
        PASID : Integer     @title: 'PASID: PASID';
        MVDID : Integer     @title: 'MVDID: MVDID';
        INCID : Integer     @title: 'INCID: INCID';
        T3LB1 : Int16       @title: 'T3LB1: T3LB1';
        T3LB2 : String(250) @title: 'T3LB2: T3LB2';
        T3LB3 : String(30)  @title: 'T3LB3: T3LB3';
        T3LB4 : String(20)  @title: 'T3LB4: T3LB4';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity WORKPLACEINJURY {
        WPIID  : Integer      @title: 'WPIID: Unique Id';
        INCID  : Integer      @title: 'INCID: Incident Id';
        IPLID  : Integer      @title: 'IPLID: People Involved Id';
        UNQID  : String(20)   @title: 'UNQID: Unique Id';
        T1LB1  : Int16        @title: 'T1LB1: Is Recordable';
        T1LB2  : Int16        @title: 'T1LB2: Type of Injury / Illness';
        T1LB3  : String(1000) @title: 'T1LB3: Custom Field 1';
        T1LB4  : String(1000) @title: 'T1LB4: Custom Field 2';
        T1LB5  : Int16        @title: 'T1LB5: Is Reportable';
        T1LB6  : Int16        @title: 'T1LB6: Was the injured taken to a medical facility?';
        T1LB7  : String(250)  @title: 'T1LB7: Facility Name';
        T1LB8  : String(250)  @title: 'T1LB8: Doctor Name';
        T1LB9  : String(1000) @title: 'T1LB9: Custom Field 7';
        T1LB10 : String(1000) @title: 'T1LB10: Custom Field 8';
        T1LB11 : String(5000) @title: 'T1LB11: Injury / Illness Description';
        T1LB12 : String(5000) @title: 'T1LB12: Custom Field 3';
        T1LB13 : String(5000) @title: 'T1LB13: Injured person statement';
        T2LB1  : String(1000) @title: 'T2LB1: Custom Field 4';
        T2LB2  : String(1000) @title: 'T2LB2: Custom Field 5';
        T2LB3  : Int16        @title: 'T2LB3: Any alternative duties available?';
        T2LB4  : Int16        @title: 'T2LB4: Any impact on work ability?';
        T2LB5  : Int16        @title: 'T2LB5: Alternative Duties Options';
        T2LB6  : String(5000) @title: 'T2LB6: Describe impact on work ability';
        T2LB7  : String(5000) @title: 'T2LB7: Custom Field 6';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity BODYPARTSNATUREINJURY {
        BDPID    : Integer      @title: 'BDPID: Unique id';
        INCID    : Integer      @title: 'INCID: Incident id';
        WPIID    : Integer      @title: 'WPIID: wORKPLACE INJURY ID';
        BDCL1    : Int16        @title: 'BDCL1: Body Parts';
        BDCL2    : Int16        @title: 'BDCL2: Nature Of injury';
        BDCL3    : Int16        @title: 'BDCL3: Body Part Side';
        BDCL4    : String(1000) @title: 'BDCL4: Body Part Description';
        BDCL1TXT : String(100)  @title: 'BDCL1TXT: Text Value';
        BDCL2TXT : String(100)  @title: 'BDCL2TXT: TXVAL_BDCL2TXT';
        BDCL3TXT : String(100)  @title: 'BDCL3TXT: TXVAL_BDCL3TXT';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity FIRSTAIDER {
        FISID : Integer      @title: 'FISID: Unique Id';
        INCID : Integer      @title: 'INCID: Incident Id';
        IPLID : Integer      @title: 'IPLID: Involved people Id';
        T1LB1 : String(1000) @title: 'T1LB1: Custom Field 1';
        T1LB2 : String(1000) @title: 'T1LB2: Custom Field 2';
        T1LB3 : String(5000) @title: 'T1LB3: What was the treatment rendered?';
        T1LB4 : String(5000) @title: 'T1LB4: Please describe what happened and what is the arrangement made for the ill / injured person?';
        T1LB5 : String(5000) @title: 'T1LB5: Custom Field 3';
        UNQID : String(20)   @title: 'UNQID: Unique Id';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity COMPLAINANTACCUSED {
        CAAID : Integer    @title: 'CAAID: Unique id';
        INCID : Integer    @title: 'INCID: Incident Id';
        IPLID : Integer    @title: 'IPLID: Involved people Id';
        UNQID : String(20) @title: 'UNQID: Unique Id';
        COAAC : Int16      @title: 'COAAC: Complainant or Accused';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity NEARMISSDETAILS {
        NRMID : Integer      @title: 'NRMID: Unique Id';
        INCID : Integer      @title: 'INCID: Incident Id';
        T1LB3 : String(1000) @title: 'T1LB3: Custom Field 1';
        T1LB4 : String(1000) @title: 'T1LB4: Custom Field 2';
        T1LB5 : String(5000) @title: 'T1LB5: Description of Near Miss';
        T1LB6 : String(5000) @title: 'T1LB6: How could the near-miss have been avoided?';
        T1LB7 : String(5000) @title: 'T1LB7: What immediate actions have been put in place to prevent recurrence?';
        T1LB8 : String(5000) @title: 'T1LB8: Custom Field 3';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity NEARMISSTYPE {
        NMTID    : Integer      @title: 'NMTID: Unique id';
        INCID    : Integer      @title: 'INCID: Incident Id';
        NRMID    : Integer      @title: 'NRMID: Near Miss Id';
        T1LB1    : Int16        @title: 'T1LB1: Selected Near Miss Type';
        T1LB1TXT : String(1000) @title: 'T1LB1TXT: Master Data Text Value';
        ISDEL    : String(1)    @title: 'ISDEL: Is Deleted Flag (1=True/0=False)';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity POTENTIALNEARMISS {
        NMPID    : Integer      @title: 'NMPID: Unique id';
        INCID    : Integer      @title: 'INCID: Incident Id';
        NRMID    : Integer      @title: 'NRMID: Near Miss Id';
        T1LB2    : Int16        @title: 'T1LB2: Selected Potential Near Miss';
        T1LB2TXT : String(1000) @title: 'T1LB2TXT: Master Data Text Value';
        ISDEL    : String(1)    @title: 'ISDEL: Is Deleted Flag (1=True/0=False)';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity ERGONOMICS {
        ERGID    : Integer      @title: 'ERGID: Unique id';
        INCID    : Integer      @title: 'INCID: Incident Id';
        T1LB3    : String(1000) @title: 'T1LB3: Custom Field 1';
        T1LB4    : String(1000) @title: 'T1LB4: Custom Field 2';
        T2LB1    : Int16        @title: 'T2LB1: Have you previously had an ergo assessment completed?';
        T2LB2    : Int16        @title: 'T2LB2: Have you completed self-assessment of your work station?';
        T2LB3    : Int16        @title: 'T2LB3: How long have you been in your current workstation?';
        T2LB4    : Int16        @title: 'T2LB4: Are you requesting an ergo assessment because you are having an issue with one of the items below: (please click one)';
        T2LB5    : Int16        @title: 'T2LB5: What type of mouse do you currently use?';
        T2LB6    : Int16        @title: 'T2LB6: What type of keyboard do you currently have?';
        T3LB1    : String(5000) @title: 'T3LB1: Please provide brief description on Acute-related incidents';
        T3LB2    : String(5000) @title: 'T3LB2: Please provide brief description on Chronic-related incidents';
        T3LB3    : String(5000) @title: 'T3LB3: Custom Field 3';
        T2LB4TXT : String(1000) @title: 'T2LB4TXT: Master Data Text Value';
        T2LB5TXT : String(1000) @title: 'T2LB5TXT: Master Data Text Value';
        T2LB6TXT : String(1000) @title: 'T2LB6TXT: Master Data Text Value';
        T2LB3TXT : String(1000) @title: 'T2LB3TXT: Master Data Text Value';
        T2LB2TXT : String(1000) @title: 'T2LB2TXT: Master Data Text Value';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity ERGONOMICSTYPES {
        EGTID    : Integer      @title: 'EGTID: Unique id';
        INCID    : Integer      @title: 'INCID: Incident Id';
        ERGID    : Integer      @title: 'ERGID: Ergonomics Id';
        T1LB1    : Int16        @title: 'T1LB1: Selected Ergonomics Type';
        T1LB1TXT : String(1000) @title: 'T1LB1TXT: Master Data Text Value';
        ISDEL    : String(1)    @title: 'ISDEL: Is Deleted Flag (1=True/0=False)';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity ERGONOMICSMOSTAPPLICABLETYPES {
        EMAID    : Integer      @title: 'EMAID: Unique id';
        INCID    : Integer      @title: 'INCID: Incident Id';
        ERGID    : Integer      @title: 'ERGID: Ergonomics Id';
        T1LB2    : Int16        @title: 'T1LB2: Selected Ergonomics Most Applicable Type';
        T1LB2TXT : String(1000) @title: 'T1LB2TXT: Master Data Text Value';
        ISDEL    : String(1)    @title: 'ISDEL: Is Deleted Flag (1=True/0=False)';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity FIREEXPLOSIONDETAILS {
        FEPID    : Integer      @title: 'FEPID: Unique id';
        INCID    : Integer      @title: 'INCID: Incident Id';
        T1LB1    : Int16        @title: 'T1LB1: Fire/ Explossion Level';
        T1LB2    : Int16        @title: 'T1LB2: Is the Fire Contained';
        T1LB3    : String(100)  @title: 'T1LB3: Equipment Used To Contained The Fire';
        T1LB4    : String(1000) @title: 'T1LB4: Custom Field 1';
        T1LB5    : String(1000) @title: 'T1LB5: Custom Field 2';
        T1LB6    : Int16        @title: 'T1LB6: Was the area evacuated?';
        T1LB7    : String(1000) @title: 'T1LB7: Custom Field 3';
        T1LB8    : String(1000) @title: 'T1LB8: Custom Field 4';
        T1LB9    : String(5000) @title: 'T1LB9: Evacuation Details';
        T1LB10   : String(5000) @title: 'T1LB10: Measures Taken';
        T1LB11   : String(5000) @title: 'T1LB11: Custom Field 5';
        T1LB1TXT : String(1000) @title: 'T1LB1TXT: Master Data Text Value';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity OTHERINCIDENTTYPE {
        OTHID : Integer      @title: 'OTHID: Unique id';
        INCID : Integer      @title: 'INCID: Incident Id';
        T1LB1 : String(1000) @title: 'T1LB1: Custom Field 1';
        T1LB2 : String(1000) @title: 'T1LB2: Custom Field 2';
        T1LB3 : String(5000) @title: 'T1LB3: Provide Description on Incident Type not identified in Other Sections';
    }


    @cds.persistence.exists
    @cds.persistence.calcview
    entity PROPERTYTYPE {
        PTYID    : Integer      @title: 'PTYID: Unique id';
        INCID    : Integer      @title: 'INCID: Incident Id';
        PEDID    : Integer      @title: 'PEDID: Property Equipment Damage Id';
        T1LB1    : Int16        @title: 'T1LB1: Selected Property Damage';
        T1LB1TXT : String(1000) @title: 'T1LB1TXT: Master Data Text Value';
        ISDEL    : String(1)    @title: 'ISDEL: Is Deleted Flag (1=True/0=False)';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity ENVIRONMENTALDETAILS {
        ENVID    : Integer      @title: 'ENVID: Unique Id';
        INCID    : Integer      @title: 'INCID: Incident Id';
        T1LB1    : Int16        @title: 'T1LB1: Pollution/Release location';
        T1LB3    : Int16        @title: 'T1LB3: Type of substance released or spilled';
        T1LB4    : String(5000) @title: 'T1LB4: Commercial name of substance';
        T1LB5    : String(20)   @title: 'T1LB5: Estimated quantity of substance released';
        T1LB6    : Int16        @title: 'T1LB6: Unit of measurement';
        T1LB7    : String(1000) @title: 'T1LB7: Custom Field 1';
        T1LB8    : String(1000) @title: 'T1LB8: Custom Field 2';
        T1LB9    : Date         @title: 'T1LB9: Start date of the Release/Spill ';
        T1LB10   : Time         @title: 'T1LB10: Start time of the Release/Spill ';
        T1LB11   : Date         @title: 'T1LB11: End dateof Release/Spill ';
        T1LB12   : Time         @title: 'T1LB12: End time of Release/Spill ';
        T1LB13   : Int16        @title: 'T1LB13: Is the concentration known';
        T1LB14   : String(50)   @title: 'T1LB14: Concentration';
        T1LB15   : Int16        @title: 'T1LB15: Was the Release/Spill contained?';
        T1LB17   : String(1000) @title: 'T1LB17: Custom Field 3';
        T1LB18   : String(1000) @title: 'T1LB18: Custom Field 4';
        T1LB19   : String(5000) @title: 'T1LB19: Other Substance Details';
        T1LB20   : String(5000) @title: 'T1LB20: Custom Field 5';
        T1LB21   : String(5000) @title: 'T1LB21: Environmrental Impact Description';
        T1LB3TXT : String(1000) @title: 'T1LB3TXT: Master Data Text Value';
        T1LB6TXT : String(1000) @title: 'T1LB6TXT: Master Data Text Value';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity ENVIMPACT {
        EIMID  : Integer      @title: 'EIMID: Unique id';
        INCID  : Integer      @title: 'INCID: Incident Id';
        ENVID  : Integer      @title: 'ENVID: Environmental Incident Id';
        T1LB16 : Int16        @title: 'T1LB16: Selected Environmental Impact';
        TXVAL  : String(1000) @title: 'TXVAL: Master Data Text Value';
        ISDEL  : String(1)    @title: 'ISDEL: Is Deleted Flag (1=True/0=False)';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity RELEASEDTO {
        RLSID    : Integer      @title: 'RLSID: Unique Id';
        ENVID    : Integer      @title: 'ENVID: Environmrent Injury Details Table Primary Key';
        INCID    : Integer      @title: 'INCID: Incident Id';
        T1LB2    : Int16        @title: 'T1LB2: Realese to Master ID';
        T1LB2TXT : String(1000) @title: 'T1LB2TXT: Master Data Text Value';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity ENVIRONMENTCORRACTIVEACTION {
        ECAID    : Integer      @title: 'ECAID: Unique Id';
        INCID    : Integer      @title: 'INCID: Incident Id';
        ENVID    : Integer      @title: 'ENVID: Environment Id';
        T2LB2    : String(1000) @title: 'T2LB2: CA Description';
        T2LB3    : Int16        @title: 'T2LB3: CA Type';
        T2LB4    : Int16        @title: 'T2LB4: CA Category';
        T2LB3TXT : String(1000) @title: 'T2LB3TXT: Master Data Text Value';
        T2LB4TXT : String(1000) @title: 'T2LB4TXT: TXVAL_T2LB4TXT';
        T2LB5    : String(250)  @title: 'T2LB5: Employee Name';
    }
}