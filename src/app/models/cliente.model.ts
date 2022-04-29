export class cliente {
    public idcliente: number;
    public activo: boolean;
    public numero: number;
    public nombre: string;
    public alias: string;
    public razon_social: string;
    public direccion: string;
    public poblacion: string;
    public provincia: string;
    public telefono: number;
    public comercial: string;
    public documento: string;
    public email: string;
    public notas: string;
    public codigo_postal: number;
    public localidad: string;

    constructor(json: any) {
        this.idcliente = json.idcliente ?? '';
        this.activo = (json.activo == 1) ? true : false;
        this.numero = json.numero ?? '';
        this.nombre = json.nombre ?? '';
        this.alias = json.alias ?? '';
        this.razon_social = json.razon_social ?? '';
        this.direccion = json.direccion ?? '';
        this.poblacion = json.poblacion ?? '';
        this.provincia = json.provincia ?? '';
        this.telefono = json.telefono ?? 0;
        this.comercial = json.comercial ?? '';
        this.documento = json.documento ?? '';
        this.email = json.email ?? null;
        this.notas = json.notas ?? '';
        this.codigo_postal = json.codigo_postal ?? '';
        this.localidad = json.localidad ?? '';
    }
}