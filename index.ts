import { AppDataSource } from "./src/data-source"
import { Wine } from "./src/entities/Wine"
import { Request, Response } from "express"
import 'reflect-metadata'
// import { getConnection } from "typeorm";

// データベース接続を確立する
AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const express = require("express");
const app = express();
// app.use(express.json())
// const mysql = require('mysql');


// wineを返す
app.get('/wine', async (req: Request, res: Response, next: any) => {
  await AppDataSource
  .createQueryBuilder()
  .insert()
  .into(Wine)
  .values([
      // { name: "aka"},
      // { name: "shiro"}
    ])
    .execute()
    // res.send(wines)
    // res.json(wines) //JSON形式で出力
});



app.listen(8080, () => {
  console.log('ポート8080番で起動しましたよ！')
});



