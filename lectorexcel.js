import mssql from 'tedious';
import fs from 'fs';

const config = {
    server: 'cusezarbi.database.windows.net',
    authentication: {
        type: 'default',
        options: {
            userName: 'sacusezar', //update me
            password: 'CUS590sql06'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'hub_apps_cs'  //update me
    }
}

//let conn = new mssql.Connection(config);
let cuenta = 0;
let errores = 0;

let csv = fs.readFileSync('C:/Users/jroa/Downloads/TablaReferencia_CIE10__1.csv', 'utf-8');

let querusql = '';

function add(codigo, nombre, detalles) {
    if (codigo == '' || codigo == null || nombre == '' || nombre == null || detalles == '' || detalles == null) { errores++; return ''; }
    cuenta++;
    return `INSERT INTO rrhh_masserca_Codigos_Incapacidades_Medicas (Codigo, Nombre, Descripcion) VALUES ('${codigo}','${nombre}','${detalles}');\n`;
}

csv.split('\n').forEach((row) => {
    let value = row.split(';');

    querusql += add(value[0], value[1], value[2]);

    /*
    let conn = new mssql.Connection(config);
    conn.on('connect', (err) => {

        if (err) {
            console.log('Error: ' + err);
        } else {
            console.log("Connected");
            try {
                executeStatement(value[0], value[1], value[2]);
                cuenta++;
            } catch (err) {
                errores.push({
                    codigo: value[0],
                    error: err
                });
            }
        }
    });
    conn.connect();
    
    function executeStatement(codigo, nombre, detalles) {
    
        let query = 'insert into rrhh_masserca_Codigos_Incapacidades_Medicas (Codigo, Nombre, Descripcion) values (@Codigo, @Nombre, @Descripcion)';
        let types = mssql.TYPES;
        let sql = new mssql.Request(query, (err) => {
            if (err) console.log('Error: ' + err + ' - Stack: ' + err.stack);
        });
    
        sql.addParameter('Codigo', types.NVarChar, codigo);
        sql.addParameter('Nombre', types.NVarChar, nombre);
        sql.addParameter('Descripcion', types.NVarChar, detalles);
    
        let result = '';
        sql.on('row', (columns) => {
            //console.log(columns);
            columns.forEach(function (column) {
                if (column.value == null) {
                    //console.log('NULL');
                } else {
                    //console.log(column.value);
                    result += column.value + '';
                }
            });
            //console.log(result);
            result = '';
        });
        sql.on("requestCompleted", function (rowCount, more) {
            //console.log('Afectados: ' + rowCount);
            conn.close();
        });
        conn.execSql(sql);
        
    }
    */
});
fs.writeFileSync('codigos.sql', querusql);
console.log('Cuenta: ' + cuenta);
console.log('Errores: ' + errores);