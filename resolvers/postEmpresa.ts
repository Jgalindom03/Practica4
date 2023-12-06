import {Request, Response} from "npm:express@4.18.2";
import mongoose from "mongoose";
import { EmpresaModel, EmpresaModelType } from "../db/empresa.ts";

export const postEmpresa = async(req:Request<EmpresaModelType>, res:Response<string | {error:unknown}>) => {
    try{  const {name, cif} = req.body;
        const newempresa = new EmpresaModel({name, cif});
        await newempresa.save();

        res.status(201).send("Empresa creada");
    }    catch(error){
        res.status(500).send(error)
    }
}