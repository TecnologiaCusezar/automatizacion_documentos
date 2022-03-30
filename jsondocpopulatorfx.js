export default class JsonDocPopulator {
    constructor() {
    }
    getAttributes(path, object) {
        try {
            let self = this;
            let tempPath = path;
            let keys = Object.keys(object);
            keys.forEach(function (key) {
                if (key != 0) {
                    if (object[key] instanceof Array) {
                        tempPath += `?['${key}']`;
                        object[key].forEach(function (obj, key_) {
                            self.getAttributes(`${tempPath}?[${key_}]`, object[key][key_]);
                        });
                        tempPath = path;
                    } else if (object[key] instanceof Object) {
                        tempPath += `?['${key}']`;
                        self.getAttributes(tempPath, object[key]);
                        tempPath = path;
                    } else {
                        let value = object[key];
                        if (typeof value == "boolean") {
                            let newPath = `${tempPath}?['${key}']`;
                            object[key] = [
                                `@{${newPath}}`,
                                `@{if(equals(string(${newPath}),'true'),'X','')}`
                            ];

                        } else if (Number.isInteger(value)) {
                            let newPath = `${tempPath}?['${key}']`;
                            object[key] = [
                                `@{${newPath}}`,
                                `@{if(equals(${newPath},null),' ',formatNumber(${newPath},'C2'))}`
                            ];
                        } else if (!isNaN(Date.parse(value))) {
                            let newPath = `${tempPath}?['${key}']`;
                            object[key] = [
                                `@{${newPath}}`,
                                `@{if(or(equals(length(${newPath}),10),equals(${newPath},null)),' ',formatDateTime(${newPath},'dd'))}`,
                                `@{if(or(equals(length(${newPath}),10),equals(${newPath},null)),' ',formatDateTime(${newPath},'MM'))}`,
                                `@{if(or(equals(length(${newPath}),10),equals(${newPath},null)),' ',formatDateTime(${newPath},'yyyy'))}`
                            ];
                        } else if (typeof value === 'string') {
                            let newPath = `${tempPath}?['${key}']`;
                            object[key] = [
                                `@{${newPath}}`,
                                `@{if(equals(${newPath},''),'','')}`
                            ];
                        }
                        //console.log(`Propiedad ${key} actualizada correctamente\Detalles: ${newPath}`);
                        tempPath = path;
                    }
                }
            });
            return object;
        } catch (error) {
            console.log(`Error detectado en el rango ${path}\nDetalles: ${error}`);
        }
    }
    getSchema(content, object) {
        try {
            let self = this;
            let tempPath = path;
            let keys = Object.keys(object);
            keys.forEach(function (key) {
                if (key != 0) {
                    if (object[key] instanceof Array) {
                        tempPath += `?['${key}']`;
                        object[key].forEach(function (obj, key_) {
                            self.getAttributes(`${tempPath}?[${key_}]`, object[key][key_]);
                        });
                        tempPath = path;
                    } else if (object[key] instanceof Object) {
                        tempPath += `?['${key}']`;
                        self.getAttributes(tempPath, object[key]);
                        tempPath = path;
                    } else {
                        let value = object[key];
                        if (typeof value == "boolean") {
                            let newPath = `${tempPath}?['${key}']`;
                            object[key] = [
                                `@${newPath}`,
                                `@if(equals(string(${newPath}),'true'),'X','')`
                            ];

                        } else if (Number.isInteger(value)) {
                            let newPath = `${tempPath}?['${key}']`;
                            object[key] = [
                                `@${newPath}`,
                                `@if(equals(${newPath},null),' ',formatNumber(${newPath},'C2'))`
                            ];
                        } else if (!isNaN(Date.parse(value))) {
                            let newPath = `${tempPath}?['${key}']`;
                            object[key] = {
                                default: `@${newPath}}`,
                                dia: `@if(equals(${newPath},null),' ',if(lessOrEquals(length(${newPath}),10),'',formatDateTime(${newPath},'dd'))`,
                                mes: `@if(equals(${newPath},null),' ',if(lessOrEquals(length(${newPath}),10),'',formatDateTime(${newPath},'MM'))`,
                                año: `@if(equals(${newPath},null),' ',if(lessOrEquals(length(${newPath}),10),'',formatDateTime(${newPath},'yyyy'))`
                            };
                        } else if (typeof value === 'string') {
                            let newPath = `${tempPath}?['${key}']`;
                            object[key] = [
                                `@${newPath}`,
                                `@if(equals(${newPath},''),'','')`
                            ];
                        }
                        //console.log(`Propiedad ${key} actualizada correctamente\Detalles: ${newPath}`);
                        tempPath = path;
                    }
                }
            });
            return object;
        } catch (error) {
            console.log(`Error detectado en el rango ${path}\nDetalles: ${error}`);
        }
    }
    getByTrace(object, trace) {
        try {
            let traceArray = process.argv.slice(2);
            if (traceArray.length > 1) {
                if (traceArray[0].toLowerCase() === 'trace') {
                    let objeto = object;
                    let resultado = null;
                    let splittedTrace = traceArray[1].split('>');
                    splittedTrace.forEach((key) => {
                        resultado = objeto[key]
                        objeto = objeto[key]
                    })
                    return resultado;
                } else {
                    throw new Error("Debe especificar la acción de traza");
                }
            } else if (trace != null) {
                let objeto = object;
                let resultado = null;
                let splittedTrace = trace.split('>');
                splittedTrace.forEach((key) => {
                    resultado = objeto[key]
                    objeto = objeto[key]
                })
                return resultado;
            } else {
                throw new Error("No se detectó una traza");
            }
        } catch (error) {
            console.log(`${error}`);
        }
    }
};