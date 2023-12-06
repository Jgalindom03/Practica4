import {Request, Response} from "npm:express@4.18.2";
import mongoose from "mongoose";
import { EmpresaModel, EmpresaModelType } from "../db/empresa.ts";

export const getEmpresas = async(req:Request<{id:string}>, res:Response<EmpresaModelType | {error : unknown}>) => {
        const empresas = await EmpresaModel.find({})
        .populate({path: "trabajadores", select: "-empresa -id"}).exec()
        res.status(200).send(empresas); 
}