namespace INC;
context M{
    @cds.persistence.exists
    @cds.persistence.calcview
    entity MASTERLIST(){
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
}