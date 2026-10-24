# English Club – 2. sınıf İngilizce konuşma oyunları

Konuşma kulübünün ilk oturumlarına (tanışma, sayılar, gün/mevsim/hava, duygular, renkler, vücut bölümleri, "I can…") göre hazırlanmış, sınıfta projeksiyonla kullanılan etkileşimli konuşma oyunları.

🌐 **Canlı site:** https://english-club-oyunlar.vercel.app

**Kullanım:** Sınıfta internet varsa yukarıdaki linki aç. Yoksa `English-Club-Oyunlar.html` dosyasını Chrome ya da Edge ile aç; tek dosyadır, internet gerekmez, USB ile taşınabilir.

## İçerik

| Konu | Oyunlar |
|---|---|
| 👋 Hello | "My name is…" – isimleri yaz, sınıf listesi oluşsun |
| 🌦️ Weather | Today (gün/mevsim/hava rutini), Learn, Weather moves, Peek-a-boo, Weather news |
| 😊 Feelings | Learn, How are you? (sınıf duygu panosu), Guess!, Good or bad? |
| 🎨 Colors | Learn, I spy, Touch it!, Color magic |
| 🐾 Animals | Learn, Peek-a-boo, Who says…?, What's missing?, Move like… |
| 🔢 Numbers | Learn (1–20), BOOM! (no-no sayı oyunu), How many? |
| 👾 Monsters | Touch your…, Monster maker, Which monster? |
| 💃 Dance | Freeze dance (müzik dahili), Simon says, I can… |
| 💬 Talk Time | Soru–cevap zinciri (chain drill) |
| 🇹🇷 29 October | Learn (flag, moon, star… Türkçe karşılıklarıyla), Make the flag, Ask & answer, Poem (dinle–tekrar et), Celebrate |

## Yayın (Vercel) ve CI

- `main`'e her push Vercel'de otomatik yayınlanır. Build adımı (`scripts/build.js`) önce kontrolleri çalıştırır; hata varsa yayın yapılmaz, canlıdaki son sağlam sürüm kalır.
- GitHub Actions (`.github/workflows/ci.yml`) her push'ta:
  - `scripts/check.js`: JS sözdizimi ve internetten dosya çekilmediği (offline çalışma) kontrolü
  - `scripts/smoke.js`: bütün ekranları headless Chrome'da açıp tuşlara basar, JS hatası olursa başarısız olur
- Yerelde: `node scripts/check.js` ve `node scripts/smoke.js` (Chrome gerekir)

## Kısayollar

- **Boşluk / Enter / →** sonraki, göster, başlat
- **←** önceki kart · **1–9, 0** konu ya da sekme seç · **Esc** geri
- **N** sıradaki öğrenci (isim çekilişi) · **F** tam ekran · **M** ses · **?** yardım
