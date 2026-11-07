# English Club – 2. sınıf İngilizce konuşma oyunları

Konuşma kulübünün ilk oturumlarına (tanışma, okul eşyaları, sayılar, gün/mevsim/hava, duygular, renkler, vücut bölümleri, "I can…") göre hazırlanmış, sınıfta projeksiyonla kullanılan etkileşimli konuşma oyunları.

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
| 💬 Talk Time | Soru–cevap zinciri (chain drill; "Have you got a pet?" dahil) |
| 🎒 School things | Learn (book, pencil, eraser, ruler, sharpener, board… hepsi tek renk; renk değiştirilebilir: "This is a red book."), Sentences ("What's this? – It's a blue pen.", "What color…?", "Is it…?", "How many…?"; cümle kalıbı + cevabı okuma 🔊) |
| 👪 Family | Learn (family, grandma, grandpa, mum, dad, sister, brother, me), Who is it? ("me"nin yanındaki kişi kim? "He's my brother!"), Sam's family (parkta aile: "What's dad doing? – He's taking a photo.", "Where's grandma? – She's sitting on a box.", "in the tree") |
| 🎁 Have you got…? | Learn (plane, skateboard, ball, boat, bike, teddy bear, ice cream, pet…), Gift box (hediye kutusunu aç: "What have you got? – I've got a bike!", "Have you got a ball? – No, I haven't."), In the park ("What has the girl got? – She's got an ice cream!", "Has the man got a dog?", "Who has got a bike?") |
| 🇹🇷 29 October | Learn (flag, moon, star, celebration, parade… Türkçe karşılıklarıyla), Ask & answer (bayrak, kutlama, geçit töreni, balonlar, takvim, Ankara; cevabı okuma 🔊) |

## Yayın (Vercel) ve CI

- `main`'e her push Vercel'de otomatik yayınlanır. Build adımı (`scripts/build.js`) önce kontrolleri çalıştırır; hata varsa yayın yapılmaz, canlıdaki son sağlam sürüm kalır.
- GitHub Actions (`.github/workflows/ci.yml`) her push'ta:
  - `scripts/check.js`: JS sözdizimi ve internetten dosya çekilmediği (offline çalışma) kontrolü
  - `scripts/smoke.js`: bütün ekranları headless Chrome'da açıp tuşlara basar, JS hatası olursa başarısız olur
- Yerelde: `node scripts/check.js` ve `node scripts/smoke.js` (Chrome gerekir)

## Kısayollar

- **Boşluk / Enter / →** sonraki, göster, başlat
- **←** önceki kart · **1–9, 0** konu (ilk 10 konu) ya da sekme seç · **Esc** geri
- **N** sıradaki öğrenci (isim çekilişi) · **F** tam ekran · **M** ses · **?** yardım
