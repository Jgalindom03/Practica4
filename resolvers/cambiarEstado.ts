import {Request, Response} from "npm:express@4.18.2";
import mongoose from "mongoose";
import { TareaModel } from "../db/tarea.ts";

export const cambiarEstado = async(req:Request<{id:string}>, res:Response<string | {error : unknown}>) => {
        const id = req.params.id;
        const estado = req.query.estado;
        const tarea = await TareaModel.findById(id).exec();
        if(!tarea){
            res.estado(404).send("No se encontró la tarea");
            return;
        }
        await TareaModel.findByIdAndUpdate(id, {estado: estado}, {runValidators: true}).exec();
        res.estado(200).send("El estado se ha cambiado."); 
    }