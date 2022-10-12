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

  //expressミドルウェア(画像表示用)
  app.use(express.static(__dirname + "/public"));


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

//ワインの詳細情報を返すエンドポイント作成(/wine/:id)
    app.get('/wine/:id', async (req: Request, res: Response, next: any) => {
    const wineRepository = AppDataSource.getRepository(Wine);
    const wines = await wineRepository.findOne({
      relations: {
        winery: true,
        wineTypes: true,
        image: true
      },
      where: {
        id: Number(req.params.id),
      }
    });
      console.log(wines);
    res.json({
      result: "SUCCESS",
      data: wines,
    });
    });


  
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
            { name: "白ワイン" },
            { name: "赤ワイン"},
            { name: "シャンパン"},
          ])
          .execute();

    // Wineryの入稿
      await AppDataSource
      .createQueryBuilder()
      .insert()
      .into(Winery)
      .values([
        { name: "ボルドー"},
        { name: "ブルゴーニュ"},
        { name: "クトリア"},
      ])
      .execute();

      // Imageの入稿
      await AppDataSource
          .createQueryBuilder()
          .insert()
          .into(Image)
          .values([
            { name: "01.webp" ,src: "/images/01.webp"},
            { name: "02.webp" ,src: "/images/02.webp"},
            { name: "03.jpg" ,src: "/images/03.jpg"},
            { name: "04.jpg" ,src: "/images/04.jpg"},
            { name: "21.webp" ,src: "/images/21.webp"},
            { name: "22.jpg" ,src: "/images/22.jpg"},
            { name: "23.jpg" ,src: "/images/23.jpg"},
            { name: "24.jpg" ,src: "/images/24.jpg"},
          ])
          .execute();

      // Wineの入稿
      // 関連付けるwinery, wineTypes, imageを取得
      const wineryA = await AppDataSource
          .getRepository(Winery)
          .createQueryBuilder("winery")
          .where("winery.name = :name", { name: "ボルドー" })
          .getOne();

      const wineTypes = await AppDataSource
          .getRepository(WineType)
          .createQueryBuilder("wine_type")
          .where("wine_type.name in ('白ワイン')")
          .getMany();

      const wineImage = await AppDataSource
          .getRepository(Image)
          .createQueryBuilder("image")
          .where("image.name = :name", { name: "01.webp" })
          .getOne();

      // Wineテーブルにinsert
      const wine = new Wine();
      wine.name = "ドメーヌ バロン ド ロートシルト ポーイヤック レゼルブ スペシアル";
      wine.winery = wineryA!;
      wine.wineTypes = wineTypes!;
      wine.image = wineImage!;
      await AppDataSource.manager.save(wine);

      

    } else {
  


      // const wineryA = await AppDataSource
      // .getRepository(Winery)
      // .createQueryBuilder("winery")
      // .where("winery.name = :name", { name: "ブルゴーニュ" })
      // .getOne();

      // const wineTypes = await AppDataSource
      //     .getRepository(WineType)
      //     .createQueryBuilder("wine_type")
      //     .where("wine_type.name in ('白ワイン')")
      //     .getMany();

      // const wineImage = await AppDataSource
      //     .getRepository(Image)
      //     .createQueryBuilder("image")
      //     .where("image.name = :name", { name: "D.jpeg" })
      //     .getOne();

      // // Wineテーブルにinsert
      // const wine = new Wine();
      // wine.name = "ロエロ・アルネイス";
      // // wine.description = "おいしいワイン";
      // wine.winery = wineryA!;
      // wine.wineTypes = wineTypes!;
      // wine.image = wineImage!;
      // await AppDataSource.manager.save(wine);
      
          
    }
  
  console.log(`ポート${port}番で起動しましたよ！`)
});

