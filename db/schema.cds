namespace INC;
context M{
    @cds.persistence.exists
    @cds.persistence.calcview
    entity MASTERLIST{
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
    entity LABELDATA{
        key UNQID : Integer;
            LABTY:  String(250);
            LABTX: String(500);
            AFLAG: String(2);
            LABIE: String(1);
            LABIV: String(1);
            LABIM: String(1);
            HTXIV: String(1);
            HLPTX: String(1000);
            MAXLT: Integer;
            PLCHD: String(100);
            ISDEL: String(1);
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity BODYPART{
        key UNQID : Integer;
            TXVAL : String(100);
            UtRfHkcx0nEJhiCM : Association to many NATUREOFINJURY on UtRfHkcx0nEJhiCM.BDNID=UNQID;
            Phgfvkcx0nEJhiCM : Association to many BODYPARTSIDE on Phgfvkcx0nEJhiCM.SIDID=UNQID;
    }  
    @cds.persistence.exists
    @cds.persistence.calcview
    entity NATUREOFINJURY{
        key BDNID : Integer;
            BDPID : Integer;
            NATID : Integer;
            TXVAL : String(100);
    } 
    @cds.persistence.exists
    @cds.persistence.calcview
    entity BODYPARTSIDE{
        key BDSID : Integer;
            BDPID : Integer;
            SIDID : Integer;
            TXVAL : String(100);
    }  

    @cds.persistence.exists
    @cds.persistence.calcview
    entity EMPLOYEES{
        key EMPID:String(30);
        EMPNM:String(250);
        EMAIL:String(250);
        MGRID:String(30);
        MGRNM:String(250);
        USRID:String(30);
        DEPTC:String(10);
        DEPNM:String(200);
        PHONE:String(50);
        SUPID:String(30);
        SUPNM:String(250);
        EUNIT:String(250);
        SUPML:String(250);
        LICNM:String(250);
    }   

    @cds.persistence.exists
    @cds.persistence.calcview
    entity SESSIONUSERINFO{
        key EMPID:String(30);
        EMPNM:String(250);
        EMAIL:String(250);
        MGRID:String(30);
        MGRNM:String(250);
        USRID:String(30);
        DEPTC:String(10);
        DEPNM:String(200);
        PHONE:String(50);
        SUPID:String(30);
        SUPNM:String(250);
        EUNIT:String(250);
        SUPML:String(250);
        LICNM:String(250);
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