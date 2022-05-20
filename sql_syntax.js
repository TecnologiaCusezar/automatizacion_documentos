import fs from 'fs';

let defaults = {
    id: 'int IDENTITY(1,1) PRIMARY KEY',
    fechaDeCreacion: 'datetime default getdate() not null',
    ultimaFechaDeEdicion: 'datetime default getdate() not null',
}

function generate(Table_Name = '', Properties = { ColumnName: "Column Properties" }, Example_Data = { ColumnName: "Column Properties" }) {
    let sql = `CREATE TABLE ${Table_Name} (\n`;
    let proparray = Object.keys(Properties);
    let count = 0;
    proparray.forEach((ColumnName) => {
        sql += `\t${ColumnName} ${Properties[ColumnName]}${(count >= proparray.length - 1) ? '' : ','}\n`;
        count++;
    });
    sql += `);`;
    if (Example_Data !== undefined) {
        sql += `\nINSERT INTO ${Table_Name} (`;
        let sql_columns = ``;
        let sql_values = ``;
        let count = 0;
        let arrayExample = Object.keys(Example_Data);
        arrayExample.forEach((ColumnName) => {
            let coma = `${(count >= arrayExample.length - 1) ? '' : ','}`;
            sql_values += ` ${((isNaN(Example_Data[ColumnName])) ? '\'' + Example_Data[ColumnName] + '\'' : Example_Data[ColumnName]) + coma}`;
            sql_columns += ` ${ColumnName + coma}`;
            count++;
        });
        sql += `${sql_columns}) VALUES (${sql_values});`;
    }
    sql += `\nSELECT * FROM ${Table_Name};`;
    sql += `\nDROP TABLE ${Table_Name};`;
    return `${sql}\n`;
}

console.log(generate('Tabla_1', {
    id: 'int not null primary key',
    name: 'varchar(255) not null'
}, { id: 13, name: 'camilo' }))
let sqlText = '';
sqlText += generate()
fs.writeFileSync('./App_CSharp_Control_MD_SQL.sql', sqlText);
