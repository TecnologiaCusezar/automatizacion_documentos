export default class JsonDocPopulator {
    constructor() {
    }
    getAttributes(path, object) {
        try {
            let self = this;
            let tempPath = path;
            let keys = Object.keys(object);
            keys.forEach(function (key, key_) {
                if (key != 0) {
                    if (object[key] instanceof Array) {
                        tempPath += `?['${key}']`;
                        object[key].forEach(function (obj, key_) {
                            self.getAttributes(`${tempPath}?[${key_}]`, object[key][key_]);
                        });
                    } else if (object[key] instanceof Object) {
                        tempPath += `?['${key}']`;
                        self.getAttributes(tempPath, object[key]);
                    } else {
                        let value = object[key];
                        if (typeof value == "boolean") {
                            let newPath = `${tempPath}?['${key}']`;
                            object[key] = [
                                `${newPath}`,
                                `if(equals(string(${newPath}),'true'),'X','')`
                            ];

                        } else if (Number.isInteger(value)) {
                            let newPath = `${tempPath}?['${key}']`;
                            object[key] = `int(${newPath})`;
                        } else if (typeof value === 'string') {
                            let newPath = `${tempPath}?['${key}']`;
                            object[key] = [
                                `${newPath}`,
                                `if(equals(${newPath},''),'','')`
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
            console.log(`Error detectado en el rango ${path}\nDetalles: ${error}`);
        }
    }
};