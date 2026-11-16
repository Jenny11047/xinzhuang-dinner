const assert = require('node:assert/strict');
const { readFileSync, existsSync } = require('node:fs');
const path = require('node:path');
const shops = require('../docs/catalog.js');
const { AREAS, SERVICES, HOURS_LABELS, isAvailable, selectMeals, drawMeal, describeHours } = require('../docs/selection.js');

const root = path.join(__dirname, '..', 'docs');
const html = readFileSync(path.join(root, 'index.html'), 'utf8');
for (const [, asset] of html.matchAll(/(?:src|href)="\.\/([^"]+\.(?:js|css))"/g)) {
  assert(existsSync(path.join(root, asset)), '缺少首頁檔案 ' + asset);
}

const safeId = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
const categories = new Set(['飯類', '麵類', '鍋物', '鍋貼水餃', '小吃']);
const ids = new Set();
const https = (value) => typeof value === 'string' && new URL(value).protocol === 'https:';

for (const shop of shops) {
  assert(safeId.test(shop.id) && !ids.has(shop.id), '店家 ID 無效或重複 ' + shop.id);
  ids.add(shop.id);
  assert(shop.name.trim() && Object.hasOwn(AREAS, shop.area));
  assert(shop.address.startsWith('新北市新莊區'));
  assert(['official', 'delivery'].includes(shop.menu.kind) && https(shop.menu.url));
  assert.match(shop.checkedOn, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(new Date(shop.checkedOn).toISOString().slice(0, 10), shop.checkedOn);
  assert(Array.isArray(shop.services) && shop.services.every((mode) => Object.hasOwn(SERVICES, mode)));
  if (shop.hours === null) {
    assert.equal(shop.hoursBasis, null);
    assert.equal(shop.hoursUrl, null);
  } else {
    assert(Object.hasOwn(HOURS_LABELS, shop.hoursBasis) && https(shop.hoursUrl));
    assert(Array.isArray(shop.hours) && shop.hours.length === 7);
    for (const day of shop.hours) {
      if (day === null) continue;
      assert(Array.isArray(day));
      for (const span of day) {
        assert.equal(span.length, 2);
        assert(span.every((time) => timePattern.test(time)));
        assert.notEqual(span[0], span[1]);
      }
    }
  }
  const mealIds = new Set();
  assert(shop.meals.length > 0);
  for (const meal of shop.meals) {
    assert(safeId.test(meal.id) && !mealIds.has(meal.id), '餐點 ID 無效或重複 ' + meal.id);
    mealIds.add(meal.id);
    assert(meal.name.trim() && Number.isInteger(meal.price) && meal.price > 0 && categories.has(meal.category));
    assert(meal.from === true || meal.from === undefined);
  }
}

const defaultFilter = { area: 'all', budget: 'all', category: 'all', service: 'all', day: 2, time: 'all', query: '' };
const filter = (overrides) => selectMeals(shops, {...defaultFilter, ...overrides});
const options = filter({ area: 'xinzhuang', budget: '150' });
assert(options.length >= 2);
assert(options.every(({ shop, meal }) => shop.area === 'xinzhuang' && meal.price <= 150));
assert.equal(filter({ query: '不存在的店 xyz' }).length, 0);
assert.notEqual(drawMeal(options, options[0].key, () => 0).key, options[0].key);
assert.equal(drawMeal([], undefined), undefined);
const unknown = shops.find((shop) => shop.hours === null);
assert(!filter({ time: '19:00' }).some(({shop}) => shop === unknown));
assert(filter({ service: 'dinein' }).every(({shop}) => shop.services.includes('dinein')));
const midnight = [[['17:00', '01:00']], null, [], [], [], [], []];
assert(isAvailable(midnight, 0, '17:00'));
assert(isAvailable(midnight, 1, '00:59'));
assert(!isAvailable(midnight, 1, '01:00'));
assert(!isAvailable(midnight, 0, '00:59'));
assert.match(describeHours(midnight, 1), /00:00–01:00/);

const demoQuery = { area: 'xinzhuang', budget: '150', day: 2, time: '19:00', query: '煙燻雞肉便當' };
const matches = filter(demoQuery);
if (ids.has('doufuzhuang-xinzhuang')) {
  assert.equal(matches.length, 1);
  assert.equal(matches[0].shop.id, 'doufuzhuang-xinzhuang');
  assert.equal(matches[0].meal.price, 150);
  assert.equal(filter({...demoQuery, budget: '100'}).length, 0);
  assert.equal(filter({...demoQuery, area: 'fuda'}).length, 0);
} else {
  assert.equal(matches.length, 0);
}
console.log('資料與篩選檢查通過：' + shops.length + ' 家店、' + filter({}).length + ' 道餐點。');
console.log('延伸示範「新莊站／週二 19:00／NT$150／煙燻雞肉便當」命中 ' + matches.length + ' 筆。');

