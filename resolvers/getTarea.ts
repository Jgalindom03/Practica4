import {Request, Response} from "npm:express@4.18.2";
import mongoose from "mongoose";
import { TareaModel, TareaModelType } from "../db/tarea.ts";

export const getTarea = async(req:Request<{id:string}>, res:Response<TareaModelType | {error : unknown}>) => {
        const id = req.params.id;
        const tarea = await TareaModel.findById(id)
        .populate({path: "trabajador", select: "-tarea -empresa -id"})
        .populate({path:"empresa", select:"name cif"}).exec()
        if(!tarea){
            res.status(404).send("Tarea no encontrada");
            return;
        }
        res.status(200).send(tarea); 
}