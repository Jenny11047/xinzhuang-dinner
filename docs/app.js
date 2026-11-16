(() => {
  const form = document.querySelector('#filters');
  const query = document.querySelector('#query');
  const cards = document.querySelector('#cards');
  const picked = document.querySelector('#picked');
  const counter = document.querySelector('#result-count');
  const template = document.querySelector('#meal-template');
  const shops = globalThis.dinnerCatalog;
  const selection = globalThis.dinnerSelection;
  if (!Array.isArray(shops) || !selection) {
    counter.textContent = '無法載入餐點。請重新整理頁面。';
    return;
  }

  const categories = new Set(shops.flatMap((shop) => shop.meals.map((meal) => meal.category)));
  for (const category of [...categories].sort((a, b) => a.localeCompare(b, 'zh-TW'))) {
    form.elements.category.append(new Option(category, category));
  }
  const weekdays = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const taiwanDay = weekdays[new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'Asia/Taipei' }).format(new Date())];
  form.elements.day.options[taiwanDay].defaultSelected = true;
  form.elements.day.value = String(taiwanDay);
  let previous;

  function currentFilter() {
    const values = Object.fromEntries(new FormData(form));
    return { ...values, day: Number(values.day), query: query.value };
  }

  function makeCard({ shop, meal }, filter) {
    const card = template.content.cloneNode(true);
    const field = (key) => card.querySelector('[data-field="' + key + '"]');
    const day = filter.time === '00:00' ? (filter.day + 1) % 7 : filter.day;
    const labels = {
      area: selection.AREAS[shop.area], category: meal.category,
      name: meal.name, shop: shop.name, price: 'NT$' + meal.price + (meal.from ? ' 起' : ''),
      priceKind: shop.menu.kind === 'delivery' ? '外送平台參考價' : '店家公告參考價',
      address: shop.address,
      hours: selection.describeHours(shop.hours, day) + (selection.HOURS_LABELS[shop.hoursBasis] || ''),
      service: shop.services.map((mode) => selection.SERVICES[mode]).join(' · '),
      date: '菜單查核 ' + shop.checkedOn
    };
    for (const [key, value] of Object.entries(labels)) field(key).textContent = value;
    field('menu').href = shop.menu.url;
    field('menu').setAttribute('aria-label', shop.name + '菜單，另開視窗');
    field('map').href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(shop.address + ' ' + shop.name);
    field('map').setAttribute('aria-label', shop.name + '地圖，另開視窗');
    if (shop.hoursUrl && shop.hoursUrl !== shop.menu.url) {
      const source = document.createElement('a');
      source.href = shop.hoursUrl;
      source.target = '_blank';
      source.rel = 'noopener noreferrer';
      source.textContent = '時段來源';
      source.setAttribute('aria-label', shop.name + '時段來源，另開視窗');
      field('hours').append(' ', source);
    }
    return card;
  }

  function message(target, text, className) {
    const paragraph = document.createElement('p');
    paragraph.className = className;
    paragraph.textContent = text;
    target.replaceChildren(paragraph);
  }

  function update() {
    const filter = currentFilter();
    const candidates = selection.selectMeals(shops, filter);
    const total = shops.reduce((count, shop) => count + shop.meals.length, 0);
    counter.textContent = candidates.length + ' 道符合條件 · 共收錄 ' + shops.length + ' 家、' + total + ' 道';
    cards.replaceChildren(...candidates.map((candidate) => makeCard(candidate, filter)));
    if (!candidates.length) message(cards, '沒有符合條件的餐點。可以提高預算、改用不限時段，或清除搜尋。', 'empty');
    previous = undefined;
    message(picked, '按「幫我選一份」，從符合條件的餐點抽出今晚的一餐。', 'placeholder');
  }

  form.addEventListener('change', update);
  form.addEventListener('reset', () => {
    query.value = '';
    // The browser restores the controls after dispatching the reset event.
    setTimeout(update, 0);
  });
  query.addEventListener('input', update);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const filter = currentFilter();
    const next = selection.drawMeal(selection.selectMeals(shops, filter), previous);
    if (!next) {
      message(picked, '沒有餐點可以抽。試著調整預算或用餐時間。', 'placeholder');
      return;
    }
    previous = next.key;
    picked.replaceChildren(makeCard(next, filter));
  });
  update();
})();
