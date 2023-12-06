export type Empresa={
id:string,
name:string,
cif:string,
trabajadores:Array<Omit<Trabajador,"empresa"| "tareas">>,
};
export type Trabajador={
id:string,
email:string,
name:string,
telefono:number,
dni:string,
empresa: Omit<Empresa,"trabajadores">
tareas:Array<Omit<Tarea,"Empresa"|"trabajador">>
};
export type Tarea={
id:string,
name:string,
estado: Estado,
trabajador: Omit<Trabajador,"empresa"|"tareas">,
empresa:Omit<Empresa,"trabajadores"|"tareas">,
};
export enum Estado{
ToDo = "ToDo",
InProgress="InProgress", 
InTest= "InTest", 
Closed= "Closed", 
};