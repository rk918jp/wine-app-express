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

    // Winery（産地)の入稿
      await AppDataSource
      .createQueryBuilder()
      .insert()
      .into(Winery)
      .values([
        { name: "ボルドー"},
        { name: "ブルゴーニュ"},
        { name: "クトリア"},
        { name: "カリフォルニア"},
        { name: "コート・デュ・ローヌ"},
        { name: "ピエモンテ"},
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
            { name: "24.jpg" ,src: "/images/24.webp"},
          ])
          .execute();

      // Wineの入稿
      // 関連付けるwinery, wineTypes, imageを取得
      const wineryA = await AppDataSource
          .getRepository(Winery)
          .createQueryBuilder("winery")
          .where("winery.name = :name", { name: "ボルドー" })
          .getOne();

      const wineryB = await AppDataSource
          .getRepository(Winery)
          .createQueryBuilder("winery")
          .where("winery.name = :name", { name: "ブルゴーニュ" })
          .getOne();

      const wineryC = await AppDataSource
          .getRepository(Winery)
          .createQueryBuilder("winery")
          .where("winery.name = :name", { name: "クトリア" })
          .getOne();

      const wineryD = await AppDataSource
          .getRepository(Winery)
          .createQueryBuilder("winery")
          .where("winery.name = :name", { name: "カリフォルニア" })
          .getOne();

      const wineryE = await AppDataSource
          .getRepository(Winery)
          .createQueryBuilder("winery")
          .where("winery.name = :name", { name: "コート・デュ・ローヌ" })
          .getOne();

      const wineryF = await AppDataSource
          .getRepository(Winery)
          .createQueryBuilder("winery")
          .where("winery.name = :name", { name: "ピエモンテ" })
          .getOne();

      const wineTypesA = await AppDataSource
          .getRepository(WineType)
          .createQueryBuilder("wine_type")
          .where("wine_type.name in ('赤ワイン')")
          .getMany();

      const wineTypesB = await AppDataSource
          .getRepository(WineType)
          .createQueryBuilder("wine_type")
          .where("wine_type.name in ('白ワイン')")
          .getMany();

      const wineImage01 = await AppDataSource
          .getRepository(Image)
          .createQueryBuilder("image")
          .where("image.name = :name", { name: "01.webp" })
          .getOne();

      const wineImage02 = await AppDataSource
          .getRepository(Image)
          .createQueryBuilder("image")
          .where("image.name = :name", { name: "02.webp" })
          .getOne();

      const wineImage03 = await AppDataSource
          .getRepository(Image)
          .createQueryBuilder("image")
          .where("image.name = :name", { name: "03.jpg" })
          .getOne();

      const wineImage04 = await AppDataSource
          .getRepository(Image)
          .createQueryBuilder("image")
          .where("image.name = :name", { name: "04.jpg" })
          .getOne();

      const wineImage21 = await AppDataSource
          .getRepository(Image)
          .createQueryBuilder("image")
          .where("image.name = :name", { name: "21.webp" })
          .getOne();

      const wineImage22 = await AppDataSource
          .getRepository(Image)
          .createQueryBuilder("image")
          .where("image.name = :name", { name: "22.jpg" })
          .getOne();

      const wineImage23 = await AppDataSource
          .getRepository(Image)
          .createQueryBuilder("image")
          .where("image.name = :name", { name: "23.jpg" })
          .getOne();

      const wineImage24 = await AppDataSource
          .getRepository(Image)
          .createQueryBuilder("image")
          .where("image.name = :name", { name: "24.webp" })
          .getOne();

      // Wineテーブルにinsert
      const wineA = new Wine();
      wineA.name = "ドメーヌ バロン ド ロートシルト ポーイヤック レゼルブ スペシアル";
      wineA.winery = wineryA!;
      wineA.wineTypes = wineTypesA!;
      wineA.image = wineImage01!;
      wineA.country = "フランス";
      wineA.oneWord = "力強い飲み口ときめ細やかでしっかりとした果実味";
      wineA.breed = "カベルネ・ソーヴィニヨン、メルロー";
      wineA.link = "https://www.amazon.co.jp/dp/B00ISJ9DVC?ots=1&tag=s02a3-22&th=1";
      wineA.description = "最高級ワインの産地として知られる、フランスのメドック地区で造られたフルボディ赤ワインです。世界的に有名な「シャトー ラフィット・ロートシルト」を運営する、ロスチャイルド家が醸造しています。カベルネ・ソーヴィニヨンとメルローがブレンドされ、力強い飲み口と、きめ細やかでしっかりとした果実味が特徴です。使われているブドウの一部は、第1級の格付けのラフィット・ロートシルトで収穫されたモノ。エレガントで高級感のある味わいの赤ワインが5000円以下で楽しめる、コストパフォーマンスの高さもポイントです。";
      await AppDataSource.manager.save(wineA);

      const wineB = new Wine();
      wineB.name = "シャトー・ラネッサン";
      wineB.winery = wineryA!;
      wineB.wineTypes = wineTypesA!;
      wineB.image = wineImage02!;
      wineB.country = "フランス";
      wineB.oneWord = "力強い飲み口ときめ細やかでしっかりとした果実味";
      wineB.breed = "カベルネ・ソーヴィニヨン、メルロー、プティ・ヴェルド";
      wineB.link = "https://www.enoteca.co.jp/item/detail/010050861";
      wineB.description = "名門ブテイエ家が所有し、お値打ちなボルドーワインとして確固たる地位を築くシャトー。ワイン評論家ロバート・パーカー氏も「メドックのワイン格付けをやり直せば、おそらく格付け第五級の地位が真剣に検討されるワインである」と大絶賛しています。凝縮した果実味と滑らかなタンニンが調和した味わいです。";
      await AppDataSource.manager.save(wineB);

      const wineC = new Wine();
      wineC.name = "ルイ・ジャド ブルゴーニュ ピノ・ノワール";
      wineC.winery = wineryB!;
      wineC.wineTypes = wineTypesA!;
      wineC.image = wineImage03!;
      wineC.country = "フランス";
      wineC.oneWord = "ラズベリーのような果実味とシルクのような舌触りが心地よいワイン";
      wineC.breed = "ピノ・ノワール100%";
      wineC.link = "https://www.amazon.co.jp/dp/B002JN2US6?tag=greatwine-22&linkCode=ogi&th=1&psc=1";
      wineC.description = "このワインは、「コート・ドール」と「コート・シャロネーズ」のヴィラージュ級の畑の選ばれたブドウから造られています。ジャド・スタイルを反映して、ふくよかなフルーツらしさと絹のような舌触りと優しいタンニンを持った、穏やかで調和の取れた香味に仕上がっています。若いときには赤い果実のフルーティさを発揮し、時間とともに、森の枯れ葉の香りや、スパイシーさなど、より熟成した香りで楽しませてくれます。ブレンドに用いられるコート・ド・ニュイのワインは深みのあるタンニンをもたらし、コート・ド・ボーヌのワインは果実味を与えます。ピノ・ノワール品種の個性を非常に良くあらわしたワインです。";
      await AppDataSource.manager.save(wineC);

      const wineD = new Wine();
      wineD.name = "ブラウンブラザース タランゴ";
      wineD.winery = wineryC!;
      wineD.wineTypes = wineTypesA!;
      wineD.image = wineImage04!;
      wineD.country = "オーストラリア";
      wineD.oneWord = "ボジョレーヌーボーのような、酸味が柔らかくてフルーティな香りのライトボディ";
      wineD.breed = "タランゴ90%、メルロー10%";
      wineD.link = "https://www.amazon.co.jp/%E3%83%96%E3%83%A9%E3%82%A6%E3%83%B3%E3%83%96%E3%83%A9%E3%82%B6%E3%83%BC%E3%82%BA-%E3%82%BF%E3%83%A9%E3%83%B3%E3%82%B4-%E3%83%A9%E3%82%A4%E3%83%88%E3%83%9C%E3%83%87%E3%82%A3-%E3%82%AA%E3%83%BC%E3%82%B9%E3%83%88%E3%83%A9%E3%83%AA%E3%82%A2-750ml/dp/B005YTGF3I/ref=sr_1_2?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&keywords=%E3%83%96%E3%83%A9%E3%82%A6%E3%83%B3%E3%83%96%E3%83%A9%E3%82%B6%E3%83%BC%E3%82%BA+%E3%82%BF%E3%83%A9%E3%82%B4&linkCode=ll2&qid=1665470721&qu=eyJxc2MiOiIwLjU5IiwicXNhIjoiMC4wMCIsInFzcCI6IjAuMDAifQ%3D%3D&sr=8-2";
      wineD.description = "ブラウン・ブラザーズは、1889年オーストラリアのビクトリア州に創立した国内で最も古い家族経営のワイナリーの1つです。原料となっているタランゴ種は、オーストラリアのCSIRO(科学産業研究機構)の科学者が1965年に開発したブドウ品種です。ブラウン・ブラザーズ社は1980年にタランゴ品種からワインを造り始めましたが、近年フランスのボージョレと同様のマセラシオン・カルボニック製法を導入しています。生き生きとしたフレッシュな果実、ジャムや砂糖付けの赤果実のような香り。まろやかでキメの細かい控えめなタンニン分(渋味)。酸味と甘味のバランスも良く、ジューシーな味わい。少し冷やしていただいても楽しめます。";
      await AppDataSource.manager.save(wineD);
      

      //白ワイン入稿
      const wineE = new Wine();
      wineE.name = "ケンダル・ジャクソン グランド・リザーヴ シャルドネ";
      wineE.winery = wineryD!;
      wineE.wineTypes = wineTypesB!;
      wineE.image = wineImage21!;
      wineE.country = "アメリカ合衆国";
      wineE.oneWord = "アメリカ屈指のワイナリーが造る、まさにコクが感じられるシャルドネです。まるでバターやオイルのようなリッチな口当たり";
      wineE.breed = "シャルドネ";
      wineE.link = "https://www.amazon.co.jp/%E3%82%B1%E3%83%B3%E3%83%80%E3%83%AB%E3%82%B8%E3%83%A3%E3%82%AF%E3%82%BD%E3%83%B3-081584013082-%E3%82%B1%E3%83%B3%E3%83%80%E3%83%AB%E3%83%BB%E3%82%B8%E3%83%A3%E3%82%AF%E3%82%BD%E3%83%B3-%E3%82%B0%E3%83%A9%E3%83%B3%E3%83%89%E3%83%BB%E3%83%AA%E3%82%B6%E3%83%BC%E3%83%B4-%E3%82%B7%E3%83%A3%E3%83%AB%E3%83%89%E3%83%8D/dp/B0016H3A3U";
      wineE.description = "オバマ元大統領もお気に入りのワインとしてその名前を挙げる、カリフォルニア屈指のワイナリー。グランド・リザーヴは、所有する様々な畑を厳格に区分して栽培したブドウを、ブレンドして仕立てる上級シリーズ。トロピカルフルーツの濃厚なアロマ、バターやナッツのコクとほのかなミネラルが感じられるリッチな味わいです。";
      await AppDataSource.manager.save(wineE);
      

      const wineF = new Wine();
      wineF.name = "コート・デュ・ローヌ ギィ・ルイ・ブラン";
      wineF.winery = wineryE!;
      wineF.wineTypes = wineTypesB!;
      wineF.image = wineImage22!;
      wineF.country = "フランス";
      wineF.oneWord = "錚々たる評価を得るローヌの革新者。南北ローヌのブドウをブレンドして造られる、南仏らしい豊かなアロマと果実味が溢れた白ワイン";
      wineF.breed = "ルーサンヌ50％、グルナッシュ ブラン30％、クレレット20％";
      wineF.link = "https://www.amazon.co.jp/Cotes-Rhone-Blanc-%E3%82%A2%E3%83%B3%E3%83%89%E3%83%AC%E3%83%BB%E3%83%96%E3%83%AB%E3%83%8D%E3%83%AB-750ml/dp/B01M5DR5GB/ref=sr_1_1_sspa?adgrpid=68107259489&gclid=CjwKCAjwqJSaBhBUEiwAg5W9p14VeHLxEu8J7kx24_P-vTeP8GqvAcLefz7O-xbK9d6NMHgPxPxfrhoCoyAQAvD_BwE&hvadid=618688899329&hvdev=c&hvlocphy=1009637&hvnetw=g&hvqmt=b&hvrand=9018288264539753818&hvtargid=kwd-300396788321&hydadcr=1941_13539232&jp-ad-ap=0&keywords=%E3%82%B3%E3%83%BC%E3%83%88+%E3%83%87%E3%83%A5+%E3%83%AD%E3%83%BC%E3%83%8C+%E3%83%96%E3%83%A9%E3%83%B3&qid=1665478029&qu=eyJxc2MiOiIwLjAwIiwicXNhIjoiMC4wMCIsInFzcCI6IjAuMDAifQ%3D%3D&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUExSDJDNE5US0FXSzlRJmVuY3J5cHRlZElkPUEwNDg4NDkxV1g5UDFUMFUxSUU3JmVuY3J5cHRlZEFkSWQ9QTEyQ0hQRlRGUkNXTVcmd2lkZ2V0TmFtZT1zcF9hdGYmYWN0aW9uPWNsaWNrUmVkaXJlY3QmZG9Ob3RMb2dDbGljaz10cnVl";
      wineF.description = "南フランスのローヌ全域で圧巻のコレクションを手掛ける「ローヌで最も優れたネゴシアン」タルデュー・ローラン。こちらは、当主のミッシェル・ダルデュー氏の父ギィと叔父ルイへのオマージュワイン。タルデュー氏曰く、「非常に高いレベルのバランスを備えており、熟成が可能」とのこと。クリームシチューのような濃い味付けの料理はもちろん、しっかり冷やしてスパイシーなエスニック料理と一緒に愉しむのもおススメです。";
      await AppDataSource.manager.save(wineF);

      const wineG = new Wine();
      wineG.name = "ブルゴーニュ・アリゴテ";
      wineG.winery = wineryB!;
      wineG.wineTypes = wineTypesB!;
      wineG.image = wineImage23!;
      wineG.country = "フランス";
      wineG.oneWord = "著名な評論家をも魅了するジュヴレ・シャンベルタンの造り手。柑橘系果実を思わせる酸味を伴ったフレッシュかつ爽やかな果実味と、ミネラル感が魅力";
      wineG.breed = "アリゴテ";
      wineG.link = "https://www.amazon.co.jp/%E3%83%96%E3%83%AB%E3%82%B4%E3%83%BC%E3%83%8B%E3%83%A5-%E3%82%A2%E3%83%AA%E3%82%B4%E3%83%86-750ml-%E3%82%AA%E3%83%BC%E3%82%AC%E3%83%8B%E3%83%83%E3%82%AF-%E3%83%AF%E3%82%A4%E3%83%B3/dp/B007X3OGD4";
      wineG.description = "多くの評論家・評価誌から高評価を獲得し、見つけたらすぐに買うべき造り手と評される生産者。赤ワインのイメージが強い彼らですが、白ワインも非常に高品質。こちらはアリゴテならではの酸を表現しつつ、心地よいボリューム感のある仕上がりです";
      await AppDataSource.manager.save(wineG);
      

      const wineH = new Wine();
      wineH.name = "ロエロ・アルネイス";
      wineH.winery = wineryF!;
      wineH.wineTypes = wineTypesB!;
      wineH.image = wineImage24!;
      wineH.country = "イタリア";
      wineH.oneWord = "バローロ、バルバレスコの名門が手掛けるピエモンテ最上級の辛口白ワイン。華やかさとコクを兼備した上質な1本";
      wineH.breed = "アルネイス";
      wineH.link = "https://www.amazon.co.jp/%E3%83%AD%E3%82%A8%E3%83%AD%E3%83%BB%E3%82%A2%E3%83%AB%E3%83%8D%E3%82%A4%E3%82%B9%E3%83%BB%E3%83%B4%E3%82%A3%E3%83%83%E3%83%A9%E3%83%BC%E3%82%BF-%E3%83%B4%E3%82%A3%E3%83%BC%E3%83%86%E3%83%BB%E3%82%B3%E3%83%AB%E3%83%86-2020%E5%B9%B4-%E3%83%94%E3%82%A8%E3%83%A2%E3%83%B3%E3%83%86-750ml/dp/B09QCLFQCF";
      wineH.description = "プルノットは、イタリア屈指のワイン産地、ピエモンテ州で100 年以上続く老舗ワイナリー。こちらは、ピエモンテを代表する白ワインの土着品種アルネイスで造られています。徹底して低温を保つことで引き出す、フレッシュなアロマとコクのある味わいが特徴で、様々なお食事と合わせて頂ける仕上がりです。";
      await AppDataSource.manager.save(wineH);
      

    } else {
      //新規入稿時


    }
  
  console.log(`ポート${port}番で起動しましたよ！`)
});

