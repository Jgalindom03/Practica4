import {Request, Response} from "npm:express@4.18.2";
import mongoose from "mongoose";
import { TareaModel } from "../db/tarea.ts";

export const deleteTarea = async(req:Request<{id:string}>, res:Response<string | {error:unknown}>) => {
        const id = req.params.id;
        const deletetarea = await TareaModel.findByIdAndDelete(id).exec();
        if(!deletetarea){
            res.status(404).send("Tarea no encontrada");
            return;            
        }
        res.status(200).send("Se ha borrado la tarea");
}