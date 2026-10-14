/*
 * KFS — данные автопарка.
 * Чтобы поменять цену, машину или фото, правьте только этот файл.
 *   week   — цена за неделю, €. Это главная цена.
 *   day    — считается автоматически: ceil(week / 7)
 *   month  — считается автоматически: round(week * 52 / 12)
 *   type   — 'Électrique' | 'Hybride' (фильтры строятся из этого поля)
 */
window.KFS_CONTACT = {
  phoneDisplay: '+33 7 59 60 25 60',
  phone: '+33759602560',
  whatsapp: '33759602560',
  email: 'k.filipservices@gmail.com'
};

window.KFS_FLEET = [
  { model: 'BYD Seal',               type: 'Électrique', week: 470, conso: '≈ 16,6 kWh/100 km', range: 'jusqu’à 570 km',         energy: '100 % électrique', photo: 'img/cars/byd-seal.webp' },
  { model: 'Tesla Model 3',          type: 'Électrique', week: 460, conso: '≈ 13,2 kWh/100 km', range: 'jusqu’à 554 km',         energy: '100 % électrique', photo: 'img/cars/tesla-model-3.webp' },
  { model: 'Tesla Model Y',          type: 'Électrique', week: 490, conso: '≈ 15,0 kWh/100 km', range: 'jusqu’à 500 km',         energy: '100 % électrique', photo: 'img/cars/tesla-model-y.webp' },
  { model: 'Kia EV6',                type: 'Électrique', week: 420, conso: '≈ 16,5 kWh/100 km', range: 'jusqu’à 528 km',         energy: '100 % électrique', photo: 'img/cars/kia-ev6.webp' },
  { model: 'Hyundai Kona Electric',  type: 'Électrique', week: 390, conso: '≈ 14,7 kWh/100 km', range: 'jusqu’à 514 km',         energy: '100 % électrique', photo: 'img/cars/hyundai-kona-electric.webp' },
  { model: 'Toyota C-HR HEV',        type: 'Hybride',    week: 360, conso: '≈ 4,8 L/100 km',    range: '≈ 890 km avec un plein', energy: 'Hybride essence',  photo: 'img/cars/toyota-chr-hev.webp' },
  { model: 'Toyota Corolla Touring', type: 'Hybride',    week: 350, conso: '≈ 4,7 L/100 km',    range: '≈ 910 km avec un plein', energy: 'Hybride essence',  photo: 'img/cars/toyota-corolla-touring.webp' },
  { model: 'Toyota RAV4',            type: 'Hybride',    week: 395, conso: '≈ 5,6 L/100 km',    range: '≈ 980 km avec un plein', energy: 'Hybride essence',  photo: 'img/cars/toyota-rav4.webp' },
  { model: 'Lexus UX 250h',          type: 'Hybride',    week: 410, conso: '≈ 5,2 L/100 km',    range: '≈ 830 km avec un plein', energy: 'Hybride essence',  photo: 'img/cars/lexus-ux-250h.webp' }
];
