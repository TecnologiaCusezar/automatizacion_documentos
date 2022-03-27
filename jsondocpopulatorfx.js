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
    get(object, trace) {
        try {
            let traceArray = trace.split('>');
        } catch (error) {
            console.log(`Error detectado en el rango ${path}\nDetalles: ${error}`);
        }
    }
};