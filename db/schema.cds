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