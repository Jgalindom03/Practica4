import {Request, Response} from "npm:express@4.18.2";
import mongoose from "mongoose";
import { TrabajadorModel, TrabajadorModelType } from "../db/trabajador.ts";

export const getTrabajador = async(req:Request<{id:string}>, res:Response<TrabajadorModelType | {error : unknown}>) => {
        const id = req.params.id;
        const trabajador = await TrabajadorModel.findById(id)
        .populate({path: "empresa", select: " -trabajadores -id"})// Seleccionamos todo menos trabajadores e id
        .populate({path: "tareas", select: "name estado"}).exec(); //seleccionamos solo name y estado.

        if(!trabajador){
            res.status(404).send("Trabajador no encontrado");
            return;
        }
        res.status(200).send(trabajador); 
}