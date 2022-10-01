import { AppDataSource } from "./src/data-source"
import { Wine } from "./src/entities/Wine"
import { Request, Response } from "express"
import 'reflect-metadata'
import WineType from "./src/entities/WineType";
import Winery from "./src/entities/Winery";
// import { getConnection } from "typeorm";

const express = require("express");
const app = express();
// app.use(express.json())
// const mysql = require('mysql');


// ユーザー一覧を返す
app.get('/wine', async (req: Request, res: Response, next: any) => {
  await AppDataSource
  .createQueryBuilder()
  .insert()
  .into(Wine)
  .values([
      { name: "aka"},
      { name: "shiro"}
    ])
    .execute()
    // res.send(wines)
    // res.json(wines) //JSON形式で出力
});

// ユーザー一覧を返す
// app.get('/wine', async (req: Request, res: Response, next: any) => {
//   const wines = await AppDataSource
//   .createQueryBuilder()
//   .insert()
//   .into(Wine)
//   .values([
//       { name: "Timber" },
//       { name: "Phantom" }
//   ])
//     res.send(wines)
//     // res.json(wines) //JSON形式で出力
// });

app.listen(3306, async () => {
  // データベース接続を確立する
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
    throw err;
  }

  const count = await AppDataSource
      .getRepository(Wine)
      .count();

  // レコードがない場合のみサンプルデータを入稿
  if (count === 0) {
    await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(WineType)
        .values([
          { name: "白ワイン", description: "白いワイン" },
          { name: "赤ワイン", description: "赤いワイン" },
          { name: "スパークリング", description: "シュワシュワするワイン" },
        ])
        .execute();

    await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(Winery)
        .values([
          { name: "ワイナリーA", description: "めっちゃ有名なやつ" },
          { name: "ワイナリーB", description: "そこそこ有名なやつ" },
        ])
        .execute();

    const wineryA = await AppDataSource
        .getRepository(Winery)
        .createQueryBuilder("winery")
        .where("winery.name = :name", { name: "ワイナリーA" })
        .getOne();

    const wineTypes = await AppDataSource
        .getRepository(WineType)
        .createQueryBuilder("wine_type")
        .where("wine_type.name in ('白ワイン', 'スパークリング')")
        .getMany();

    const wine = new Wine();
    wine.name = "ワインA";
    wine.description = "おいしいワイン";
    wine.winery = wineryA!;
    wine.wineTypes = wineTypes!;
    await AppDataSource.manager.save(wine);
  }

  console.log('ポート3306番で起動しましたよ！')
});



