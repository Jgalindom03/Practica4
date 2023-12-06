import {Request, Response} from "npm:express@4.18.2";
import mongoose from "mongoose";
import { EmpresaModel } from "../db/empresa.ts";

export const deleteEmpresa = async(req:Request<{id:string}>, res:Response<string | {error:unknown}>) => {
        const id = req.params.id;
        const deleteempresa = await EmpresaModel.findByIdAndDelete(id).exec();
        if(!deleteempresa){
            res.status(404).send("Empresa no encontrada");
            return;            
        }
        res.status(200).send("Se ha borrado la empresa");
}