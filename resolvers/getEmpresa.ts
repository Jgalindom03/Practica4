import {Request, Response} from "npm:express@4.18.2";
import mongoose from "mongoose";
import { EmpresaModel, EmpresaModelType } from "../db/empresa.ts";

export const getEmpresa = async(req:Request<{id:string}>, res:Response<EmpresaModelType | {error : unknown}>) => {
    try{   
    const id = req.params.id;
        const empresa = await EmpresaModel.findById(id)
        .populate({path: "trabajadores", select: "-empresa -id"}).exec()
        if(!empresa){
            res.status(404).send("Empresa no encontrada");
            return;
        }
        res.status(200).send(empresa); 
}     catch(error){
    res.status(500).send(error)
}
}