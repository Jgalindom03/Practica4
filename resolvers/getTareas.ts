import {Request, Response} from "npm:express@4.18.2";
import mongoose from "mongoose";
import { TareaModel, TareaModelType } from "../db/tarea.ts";

export const getTareas = async(req:Request<{id:string}>, res:Response<TareaModelType | {error : unknown}>) => {
        const tareas = await TareaModel.find({})
        .populate({path: "trabajador", select: "-tarea -empresa -id"})
        .populate({path:"empresa", select:"name cif"}).exec()
        res.status(200).send(tareas); 
}