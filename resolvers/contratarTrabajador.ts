//@ts-ignore //Para evitar que salga rojo lo del express
import {Request, Response} from "npm:express@4.18.2";
import mongoose from "mongoose";

import { EmpresaModel } from "../db/empresa.ts";
import { TrabajadorModel } from "../db/trabajador.ts";

export const contratarTrabajador = async(req:Request<{id:string, trabajadorID:string}>, res:Response<string | {error : unknown}>) => {
    try{
        const id = req.params.id;
        const trabajadorID = req.params.trabajadorID;
        const empresa = await EmpresaModel.findById(id).exec();
        if(!empresa){
            res.status(404).send("No se pudo encontrar la empresa");
            return;
        }
        const trabajador = await TrabajadorModel.findById(trabajadorID).exec();
        if(!trabajador){
            res.status(404).send("No se pudo encontrar el trabajador");
            return;
        }
        if(trabajador.empresa === null){
            res.status(400).send("El trabajador ya esta contratado");
            return;
        }
        await EmpresaModel.findOneAndUpdate({_id:id}, {$push: {trabajadores: trabajadorID}}, {runValidators: true}).exec();
        res.status(200).send("Trabajador contratado "); 
    }    catch(error){
        res.status(500).send(error)
    }
}