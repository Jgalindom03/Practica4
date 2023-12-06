import {Request, Response} from "npm:express@4.18.2";
import mongoose from "mongoose";
import { TrabajadorModel } from "../db/trabajador.ts";

export const deleteTrabajador = async(req:Request<{id:string}>, res:Response<string | {error:unknown}>) => {
        const id = req.params.id;
        const deletetrabajador = await TrabajadorModel.findByIdAndDelete(id).exec();
        if(!deletetrabajador){
            res.status(404).send("Trabajador no encontrado");
            return;            
        }
        res.status(200).send("Se ha borrado el trabajador");
}