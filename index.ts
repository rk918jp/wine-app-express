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
        image: true
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
      // WineTypeの入稿
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

    // Wineryの入稿
      await AppDataSource
      .createQueryBuilder()
      .insert()
      .into(Winery)
      .values([
        { name: "ワイナリーA"},
        { name: "ワイナリーB"},
      ])
      .execute();

      // Imageの入稿
      await AppDataSource
          .createQueryBuilder()
          .insert()
          .into(Image)
          .values([
            { name: "A.jpeg" ,src: "/src/images/A.jpeg"},
            { name: "B.jpeg" ,src: "/src/images/B.jpeg"},
            { name: "C.webp" ,src: "/src/images/C.webp"},
            { name: "D.jpeg" ,src: "/src/images/D.jpeg"},
            { name: "E.jpeg" ,src: "/src/images/E.jpeg"},
          ])
          .execute();

      // Wineの入稿
      // 関連付けるwinery, wineTypes, imageを取得
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
          .where("image.name = :name", { name: "B.jpeg" })
          // .where("image.src = :src", { name: "B.jpeg" })
          .getOne();

      // Wineテーブルにinsert
      const wine = new Wine();
      wine.name = "ワインA";
      wine.description = "おいしいワイン";
      wine.winery = wineryA!;
      wine.wineTypes = wineTypes!;
      wine.image = wineImage!;
      await AppDataSource.manager.save(wine);



    } else {
  


        // 関連付けるwinery, wineTypes, imageを取得
        const wineryB = await AppDataSource
        .getRepository(Winery)
        .createQueryBuilder("winery")
        .where("winery.name = :name", { name: "ワイナリーB" })
        .getOne();

    const wineTypes = await AppDataSource
        .getRepository(WineType)
        .createQueryBuilder("wine_type")
        .where("wine_type.name in ('赤ワイン','赤いワイン')")
        .getMany();

    const wineImage = await AppDataSource
        .getRepository(Image)
        .createQueryBuilder("image")
        .where("image.name = :name", { name: "E.jpeg" })
        // .where("image.src = :src", { src: "/images/B.jpeg" })
        .getOne();

        // Wineテーブルにinsert
        const wine = new Wine();
        wine.name = "ワインE";
        wine.description = "おいしいワイン";
        wine.winery = wineryB!;
        wine.wineTypes = wineTypes!;
        wine.image = wineImage!;
        await AppDataSource.manager.save(wine);
          
    }
  
  console.log(`ポート${port}番で起動しましたよ！`)
});

