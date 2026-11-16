// 新店資料照根目錄 AGENTS.md 新增。
const dinnerCatalog = [
  {
    "id": "bafang-xinzhuang",
    "name": "八方雲集 新莊捷運店",
    "area": "xinzhuang",
    "address": "新北市新莊區中華路一段47號",
    "menu": {"kind":"delivery","url":"https://www.ubereats.com/tw/store/%E5%85%AB%E6%96%B9%E9%9B%B2%E9%9B%86-%E6%96%B0%E8%8E%8A%E6%8D%B7%E9%81%8B%E5%BA%97/rR3XJ8kOW6-P9K5S8llQxQ"},
    "checkedOn": "2026-11-17",
    "hoursBasis": null,
    "hoursUrl": null,
    "hours": null,
    "services": ["pickup"],
    "meals": [
      {"id":"signature-potstickers","name":"招牌鍋貼","price":95,"category":"鍋貼水餃"},
      {"id":"shrimp-dumplings","name":"鮮蝦水餃","price":115,"category":"鍋貼水餃"},
      {"id":"hot-sour-dumplings","name":"酸辣湯餃","price":125,"category":"鍋貼水餃"}
    ]
  },
  {
    "id": "zhonghua-noodles",
    "name": "中華麵館",
    "area": "xinzhuang",
    "address": "新北市新莊區中華路一段50號",
    "menu": {"kind":"delivery","url":"https://apple-maps-app-clip.failover.ubereats.com/tw-en/store/%E4%B8%AD%E8%8F%AF%E9%BA%B5%E9%A4%A8/KGGPBIJoVxudjbqCM2tpjA"},
    "checkedOn": "2026-11-17",
    "hoursBasis": "reported",
    "hoursUrl": "https://www.foodtigertw.com/blog/posts/3050359120",
    "hours": [[],[["10:30","20:00"]],[["10:30","20:00"]],[["10:30","20:00"]],[["10:30","20:00"]],[["10:30","20:00"]],[["10:30","20:00"]]],
    "services": [],
    "meals": [
      {"id":"soup-noodles","name":"湯麵","price":66,"category":"麵類"},
      {"id":"chicken-pork-rice","name":"雞滷飯便當大份","price":114,"category":"飯類"}
    ]
  },
  {
    "id": "laodangjia-fuda",
    "name": "老當家廚房 輔大店",
    "area": "fuda",
    "address": "新北市新莊區中正路514巷99號之二",
    "menu": {"kind":"delivery","url":"https://www.ubereats.com/tw/store/%E8%80%81%E7%95%B6%E5%AE%B6%E5%BB%9A%E6%88%BF-%E8%BC%94%E5%A4%A7%E5%BA%97/Ceo-d_8HVe2JVCndUWjj_g"},
    "checkedOn": "2026-11-17",
    "hoursBasis": "delivery",
    "hoursUrl": "https://www.ubereats.com/tw/store/%E8%80%81%E7%95%B6%E5%AE%B6%E5%BB%9A%E6%88%BF-%E8%BC%94%E5%A4%A7%E5%BA%97/Ceo-d_8HVe2JVCndUWjj_g",
    "hours": [[["17:00","01:00"]],null,null,null,null,null,null],
    "services": ["pickup"],
    "meals": [
      {"id":"pork-cutlet-rice","name":"起司豬排飯","price":135,"category":"飯類"},
      {"id":"chicken-drumstick-rice","name":"滷雞腿飯","price":145,"category":"飯類"}
    ]
  },
  {
    "id": "12mini-fuda",
    "name": "12MINI 新莊輔大店",
    "area": "fuda",
    "address": "新北市新莊區建國一路2號",
    "menu": {"kind":"delivery","url":"https://www.ubereats.com/tw/store/12mini-%E6%96%B0%E8%8E%8A%E8%BC%94%E5%A4%A7%E5%BA%97/AC_HaCEJW8eN3tzlsSnN3w"},
    "checkedOn": "2026-11-17",
    "hoursBasis": "last-order",
    "hoursUrl": "https://www.12mini.com.tw/store.php",
    "hours": [[["11:00","21:30"]],[["11:00","21:30"]],[["11:00","21:30"]],[["11:00","21:30"]],[["11:00","21:30"]],[["11:00","21:30"]],[["11:00","21:30"]]],
    "services": ["dinein","pickup"],
    "meals": [
      {"id":"original-pot","name":"mini原味鍋","price":189,"category":"鍋物"},
      {"id":"mushroom-pot","name":"鮮菇蔬食鍋","price":189,"category":"鍋物"}
    ]
  },
  {
    "id": "mozhuting-fuda",
    "name": "墨竹亭 新莊輔大店",
    "area": "fuda",
    "address": "新北市新莊區中正路516-8號",
    "menu": {"kind":"delivery","url":"https://www.foodpanda.com.tw/restaurant/v8pz/mo-zhu-ting-ran-mian-ben-jia-xin-zhuang-fu-da-dian-v8pz"},
    "checkedOn": "2026-11-17",
    "hoursBasis": "official",
    "hoursUrl": "https://www.mozhuting.com/store/fuda",
    "hours": [[["11:00","14:00"],["16:00","20:30"]],[["11:00","14:00"],["16:00","20:30"]],[["11:00","14:00"],["16:00","20:30"]],[["11:00","14:00"],["16:00","20:30"]],[["11:00","14:00"],["16:00","20:30"]],[["11:00","14:00"],["16:00","20:30"]],[["11:00","14:00"],["16:00","20:30"]]],
    "services": ["dinein","pickup"],
    "meals": [
      {"id":"house-noodles-a","name":"招牌本家燃麵 A 套餐","price":165,"category":"麵類","from":true},
      {"id":"wonton-noodles-a","name":"鮮肉餛飩湯麵 A 套餐","price":190,"category":"麵類","from":true}
    ]
  },
  {
    "id": "hochia-fuda",
    "name": "好呷拉麵 新莊輔大店",
    "area": "fuda",
    "address": "新北市新莊區建國一路38號",
    "menu": {"kind":"delivery","url":"https://www.ubereats.com/tw/store/%E5%A5%BD%E5%91%B7%E6%8B%89%E9%BA%B5-%E6%96%B0%E8%8E%8A%E8%BC%94%E5%A4%A7%E5%BA%97/d7FM1NhUVKe0--LkM_jcBg"},
    "checkedOn": "2026-11-17",
    "hoursBasis": "delivery",
    "hoursUrl": "https://www.ubereats.com/tw/store/%E5%A5%BD%E5%91%B7%E6%8B%89%E9%BA%B5-%E6%96%B0%E8%8E%8A%E8%BC%94%E5%A4%A7%E5%BA%97/d7FM1NhUVKe0--LkM_jcBg",
    "hours": [[["11:30","22:00"]],[["11:30","23:45"]],[["11:30","23:45"]],[["11:30","23:45"]],[["11:30","23:45"]],[["11:30","23:45"]],[["11:30","22:00"]]],
    "services": ["pickup"],
    "meals": [
      {"id":"soy-tonkotsu-ramen","name":"醬油豚骨拉麵（升級舒肥雞）","price":225,"category":"麵類"},
      {"id":"spicy-tonkotsu-ramen","name":"地獄豚骨拉麵","price":230,"category":"麵類"}
    ]
  },
  {
    "id": "bingtang-fuda",
    "name": "輔大冰堂食坊",
    "area": "fuda",
    "address": "新北市新莊區中正路514巷69號",
    "menu": {"kind":"delivery","url":"https://www.ubereats.com/tw/store/%E8%BC%94%E5%A4%A7%E5%86%B0%E5%A0%82%E9%A3%9F%E5%9D%8A/IX82Uw63ReqjoaTTBaKvMA"},
    "checkedOn": "2026-11-17",
    "hoursBasis": null,
    "hoursUrl": null,
    "hours": null,
    "services": [],
    "meals": [
      {"id":"japanese-chicken-curry","name":"日本咖哩醬雞肉飯","price":165,"category":"飯類"},
      {"id":"fried-dumplings","name":"黃金炸水餃（14顆）","price":155,"category":"鍋貼水餃"}
    ]
  },
  {
    "id": "doufuzhuang-xinzhuang",
    "name": "豆輔庄",
    "area": "xinzhuang",
    "address": "新北市新莊區新莊路315號",
    "menu": {"kind":"delivery","url":"https://www.ubereats.com/tw/store/%E8%B1%86%E8%BC%94%E5%BA%84/6Ut9YTn0V7q-ru1VrJQ3Dg"},
    "checkedOn": "2026-11-17",
    "hoursBasis": "delivery",
    "hoursUrl": "https://www.ubereats.com/tw/store/%E8%B1%86%E8%BC%94%E5%BA%84/6Ut9YTn0V7q-ru1VrJQ3Dg",
    "hours": [[["12:00","23:45"]],[["11:45","23:45"]],[["11:30","23:45"]],[["11:45","23:45"]],[["11:30","23:30"]],[["12:00","23:45"]],[["12:15","23:45"]]],
    "services": [],
    "meals": [
      {"id":"smoked-chicken-bento","name":"煙燻雞肉便當","price":150,"category":"飯類"},
      {"id":"signature-stinky-tofu","name":"臭豆腐","price":85,"category":"小吃"},
      {"id":"zhajiang-noodles","name":"眷村炸醬拉麵","price":95,"category":"麵類"}
    ]
  }
];

if (typeof module !== 'undefined') module.exports = dinnerCatalog;
else globalThis.dinnerCatalog = dinnerCatalog;
