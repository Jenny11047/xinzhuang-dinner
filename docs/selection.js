(() => {
  const DAYS = ['日', '一', '二', '三', '四', '五', '六'];
  const AREAS = { xinzhuang: '新莊站', fuda: '輔大站' };
  const SERVICES = { pickup: '可外帶／自取', dinein: '可內用' };
  const HOURS_LABELS = { delivery: '｜平台時段', official: '｜店家時段', 'last-order': '｜至最後點餐', reported: '｜食記時段' };
  const toMinutes = (time) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3));

  function isAvailable(hours, day, time) {
    if (!hours) return false;
    const target = toMinutes(time);
    const carry = (hours[(day + 6) % 7] || []).some(([start, end]) => {
      return toMinutes(end) < toMinutes(start) && target < toMinutes(end);
    });
    return carry || (hours[day] || []).some(([start, end]) => {
      const from = toMinutes(start);
      const until = toMinutes(end);
      return target >= from && (until < from || target < until);
    });
  }

  function selectMeals(shops, filter) {
    const query = filter.query.trim().toLocaleLowerCase('zh-TW');
    const nextDay = filter.time === '00:00' ? (filter.day + 1) % 7 : filter.day;
    return shops.flatMap((shop) => {
      if (filter.area !== 'all' && shop.area !== filter.area) return [];
      if (filter.service !== 'all' && !shop.services.includes(filter.service)) return [];
      if (filter.time !== 'all' && !isAvailable(shop.hours, nextDay, filter.time)) return [];
      return shop.meals.filter((meal) => (
        (filter.budget === 'all' || meal.price <= Number(filter.budget)) &&
        (filter.category === 'all' || meal.category === filter.category) &&
        (!query || [shop.name, meal.name, meal.category, AREAS[shop.area]].some(
          (value) => value.toLocaleLowerCase('zh-TW').includes(query)
        ))
      )).map((meal) => ({ shop, meal, key: shop.id + '/' + meal.id }));
    }).sort((a, b) => a.meal.price - b.meal.price || a.key.localeCompare(b.key));
  }

  function drawMeal(candidates, previous, random = Math.random) {
    if (!candidates.length) return undefined;
    const pool = candidates.length > 1 ? candidates.filter(({ key }) => key !== previous) : candidates;
    return pool[Math.floor(random() * pool.length)];
  }

  function describeHours(hours, day) {
    if (!hours) return '時段待確認';
    const today = hours[day] || [];
    const previous = (hours[(day + 6) % 7] || []).filter(([a, b]) => toMinutes(b) < toMinutes(a));
    const periods = previous.filter(([, b]) => b !== '00:00').map(([, b]) => '00:00–' + b);
    for (const [a, b] of today) periods.push(a + '–' + (toMinutes(b) < toMinutes(a) ? '隔日 ' : '') + b);
    return '週' + DAYS[day] + ' ' + (periods.join('、') || (hours[day] === null ? '待確認' : '休息'));
  }

  const api = { AREAS, SERVICES, HOURS_LABELS, toMinutes, isAvailable, selectMeals, drawMeal, describeHours };
  if (typeof module !== 'undefined') module.exports = api;
  else globalThis.dinnerSelection = api;
})();
