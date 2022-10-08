import { AppDataSource } from "./src/data-source"
import { Wine } from "./src/entities/Wine"
import { Request, Response } from "express"
import 'reflect-metadata'
import WineType from "./src/entities/WineType";
import Winery from "./src/entities/Winery";
import Image from "./src/entities/Image";

const port = 8080;
const express = require("express");
const app = express();
app.get('/wine', async (req: Request, res: Response, next: any) => {
  });


  app.listen(port, async () => {
    // データベース接続を確立する
    try {
      await AppDataSource.initialize();
      console.log("Data Source has been initialized!");
    } catch (err) {
      console.error("Error during Data Source initialization:", err);
      throw err;
    }

    // CORSエラー回避のための設定(何故か動かない)
  const allowCrossDomain = function(req: Request, res: Response, next: any) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, access_token'
    );

  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    next();
  }
  }
  app.use(allowCrossDomain);


    // ワインの一覧を返す
  app.get('/wines', async (req: Request, res: Response, next: any) => {
    const wineRepository = AppDataSource.getRepository(Wine);
    const wines = await wineRepository.find({
      relations: {
        winery: true,
        wineTypes: true,
      },
    });
    res.json({
      result: "SUCCESS",
      data: wines,
    });
  });

// TODO: ワインの詳細情報を返すエンドポイント作成(/wine/:id)

  
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

    } else {
  
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

      const wineImage = await AppDataSource
          .getRepository(Image)
          .createQueryBuilder("image")
          .where("image.type in ('.')")
          .getMany();

      //wineデータ
      const wine = new Wine();
      wine.name = "ワインA";
      wine.description = "おいしいワイン";
      wine.winery = wineryA!;
      wine.wineTypes = wineTypes!;
      wine.image = wineImage!;
      await AppDataSource.manager.save(wine);

      
      await AppDataSource
          .createQueryBuilder()
          .insert()
          .into(Wine)
          .values([
            {
              name: "ワインC",
              description: "おいしそうなワイン",
              // winery: {id: 2},
              winery: wineryA!,  // オブジェクトを渡すことも出来る
              // wineTypes: [
              //   {id: 1},
              //   {id: 2},
              // ],
              wineTypes: wineTypes!,  // オブジェクトを渡すことも出来る
              image: wineImage!,
            }
          ])
          .execute();
          AppDataSource.manager.save(wine);    
      
    }
  
  console.log(`ポート${port}番で起動しましたよ！`)
});