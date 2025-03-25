const cds = require('@sap/cds');

function setValue(value){
    if(value !== undefined && value !== null && value !== ''){
        return value;
    }else{
        return null;
    }
}

async function lPad(str, len) {
    try {
        let s = str.toString();
        while (s.length < len) {
            s = "0" + s;
        }
        return s;
    } catch (error) {
        throw new Error(error.toString());
    }
}


async function generateIncidentNumber() {
    try {
        let incidentNumber = 0;
        const query = `SELECT INCNUM.NEXTVAL FROM DUMMY`;
        const rs = await tx.run(query);

        if (rs.length !== 0) {
            if (incidentNumber === 0) {
                incidentNumber = Object.values(rs[0])[0];
                return 'INC-' + new Date().getFullYear() + '-' + await lPad(incidentNumber, 5);
            } else {
                return 'INC-' + new Date().getFullYear() + '-' + await lPad('1', 5);
            }
        } 
    } catch (error) {
        console.error('Error retrieving incident number:', error);
        throw error;
    }
}

async function getSequenceNumber(tableName, columnName) {
    try {
        // Step 1: Find the sequence name
        const findSeqQuery = `
            SELECT COLUMN_ID
            FROM TABLE_COLUMNS
            WHERE TABLE_NAME = '${tableName}'
            AND COLUMN_NAME = '${columnName}';
        `;
        const findResult = await cds.run(findSeqQuery);
        if (findResult.length === 0) {
            throw new Error(`No sequence found for table: ${tableName} and column: ${columnName}`);
        }
        const outputSequence = Object.values(findResult[0])[0];
        console.log('Find Sequence Number', outputSequence);

        // Step 2: Construct the sequence name
        const sequence = `_SYS_SEQUENCE_${outputSequence}_#0_#`;
        console.log('Sequence', sequence);

        // Step 3: Retrieve the current value of the sequence
        const seqQuery = `SELECT "${sequence}".CURRVAL FROM DUMMY;`;
        const seqResult = await cds.run(seqQuery);
        if (seqResult.length === 0) {
            throw new Error(`No current value found for sequence: ${sequence}`);
        }
        const outvar = Object.values(seqResult[0])[0];
        console.log('Seq Generated', outvar);

        return outvar;
    } catch (error) {
        console.error('Error retrieving sequence number:', error);
        throw new Error(`Error retrieving sequence number: ${error.message}`);
    }
}

module.exports = {
    getSequenceNumber,
    generateIncidentNumber,
    lPad,
    setValue
  };