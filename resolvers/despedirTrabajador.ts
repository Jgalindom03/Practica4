import {Request, Response} from "npm:express@4.18.2";
import mongoose from "mongoose";

import { EmpresaModel, EmpresaModelType } from "../db/empresa.ts";
import { TrabajadorModel } from "../db/trabajador.ts";

export const despedirTrabajador = async(req:Request<{id:string, trabajadorID:string}>, res:Response<EmpresaModelType | {error : unknown}>) => {
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
        if(trabajador.empresa === null|| trabajador.empresa !==id){
            res.status(400).send("El trabajador ya esta despedido o no pertenece a esta empresa");
            return;
        }
        const updatedTrabajador= await TrabajadorModel.findOneAndUpdate({_id:trabajadorID}, {$set: {empresa: null}},{new:true}).exec();
        empresa.trabajadores = empresa.trabajadores.filter((trabajadorId) => trabajadorId !== trabajadorID);
        await empresa.save();
        res.status(200).send("Trabajador despedido ");
    }catch(error){
        res.status(500).send(error)
    }
}