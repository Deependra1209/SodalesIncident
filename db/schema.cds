namespace INC;
context M{
    @cds.persistence.exists
    entity MASTERDATA(){
        key UNQID : Integer;
        TYVAL : String(50);
        TXVAL : String(1000);
        COLID : Integer;
        INCTY : Integer;
        TXDES : String(5000);
        ISDBL : Integer;
        ISEDT : Integer;
        ISADD : Integer;
    }
}