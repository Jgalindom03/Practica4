import {Request, Response} from "npm:express@4.18.2";
import mongoose from "mongoose";
import { TrabajadorModel, TrabajadorModelType } from "../db/trabajador.ts";

export const getTrabajadores = async(req:Request<{id:string}>, res:Response<TrabajadorModelType | {error : unknown}>) => {
        
    const trabajadores = await TrabajadorModel.find({})
        .populate({path: "empresa", select: " -trabajadores -id"})// Seleccionamos todo menos trabajadores e id
        .populate({path: "tareas", select: "name estado"}).exec(); //seleccionamos solo name y estado.

        res.status(200).send(trabajadores); 
}