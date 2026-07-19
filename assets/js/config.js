/* =====================================================================
   WEDDING SITE — CONTENT CONFIG  (Ngọc Anh ❤ Phương Lan · 01.08.2026)
   ---------------------------------------------------------------------
   Đây là nơi DUY NHẤT bạn cần sửa nội dung. / This is the ONLY file you
   need to edit to change wording, photos, dates, bank info, music...
   Mỗi câu chữ có 2 ngôn ngữ: { vi: "Tiếng Việt", en: "English" }
   ===================================================================== */

const CONFIG = {

  /* ---- Cặp đôi / The couple ---------------------------------------- */
  couple: {
    doubleHappiness: "囍",
    // Giờ cưới chính thức (tiệc): 17:00, 01/08/2026 (GMT+7)
    weddingDateTime: "2026-08-01T17:00:00+07:00",
    displayDate: "01 . 08 . 2026",

    groom: {
      name:     { vi: "Ngọc Anh", en: "Ngoc Anh" },
      fullName: { vi: "Lê Ngọc Anh", en: "Le Ngoc Anh" },
      role:     { vi: "Trưởng Nam", en: "The Groom" },
      father:   "Lê Quang Bút",
      mother:   "Phạm Thị Hằng",
      hometown: { vi: "X. Phong Doanh – T. Ninh Bình", en: "Phong Doanh, Ninh Binh" },
    },
    bride: {
      name:     { vi: "Phương Lan", en: "Phuong Lan" },
      fullName: { vi: "Đỗ Thị Phương Lan", en: "Do Thi Phuong Lan" },
      role:     { vi: "Trưởng Nữ", en: "The Bride" },
      father:   "Đỗ Ngọc Hữu",
      mother:   "Nguyễn Thị Tươi",
      hometown: { vi: "P. Long Hưng – TP. Đồng Nai", en: "Long Hung, Dong Nai" },
    },
  },

  /* ---- Ảnh nền trang bìa (chạy slideshow) / Hero background slides -- */
  heroImages: [
    "assets/images/prewedding/pre-01.jpg",
    "assets/images/prewedding/pre-13.jpg",
    "assets/images/prewedding/pre-02.jpg",
    "assets/images/prewedding/pre-03.jpg",
  ],

  /* ---- Câu chuyện tình yêu (dòng thời gian) / Love story timeline ---
     👉 Sửa 'date', 'title', 'text' cho đúng câu chuyện của bạn.
        Ảnh nằm trong assets/images/love/ và prewedding/            */
  story: [
    {
      date:  { vi: "Tháng 10, 2023", en: "October 2023" },
      title: { vi: "Định mệnh bắt đầu", en: "Where it all began" },
      text:  { vi: "Tháng 10 năm ấy thật khó quên! Khi nhìn thấy hình em lần đầu tiên, anh đã thấy nơi mình thuộc về — không thể chần chừ dù khoảng cách địa lý có là ngàn cây số. Thương em mấy núi cũng chèo, mấy sông cũng lội, mấy đèo cũng qua. Xuất phát thôi!",
               en: "October that year was unforgettable! The first time I saw your photo, I knew where I belonged — no hesitation, even a thousand kilometres apart. For you I'd climb any mountain, cross any river, brave any pass. Let's set off!" },
      img:   "assets/images/start.jpg",
    },
    {
      date:  { vi: "15.10.2023", en: "Oct 15, 2023" },
      title: { vi: "Buổi hẹn đầu tiên", en: "Our first date" },
      img:   "assets/images/poem.jpg",
      poem:  true,   // Chèn bài thơ vào thẻ này / render the poem inside this card
    },
    {
      date:  { vi: "2024", en: "2024" },
      title: { vi: "Từng ngày bên nhau", en: "Day by day, together" },
      text:  { vi: "Những buổi sáng, những chiều muộn, mọi khoảnh khắc đều trở nên đáng nhớ khi có em kề bên.",
               en: "Mornings, late afternoons — every moment became unforgettable with you by my side." },
      imgs:  ["assets/images/love/love-02.jpg", "assets/images/love/love-03.jpg", "assets/images/love/love-06.jpg", "assets/images/love/love-07.jpg", "assets/images/love/love-08.jpg", "assets/images/love/love-09.jpg", "assets/images/love/love-10.jpg", "assets/images/love/love-11.jpg", "assets/images/love/love-12.jpg", "assets/images/love/love-01.jpg"],
    },
    {
      date:  { vi: "2025", en: "2025" },
      title: { vi: "Mùa đông ấm áp", en: "A warm winter" },
      text:  { vi: "Trời trở lạnh, nhưng tay trong tay thì mùa đông nào cũng hoá dịu dàng.",
               en: "The weather turned cold, yet hand in hand, every winter felt gentle and warm." },
      imgs:  ["assets/images/winter/winter-01.jpg", "assets/images/winter/winter-02.jpg", "assets/images/winter/winter-03.jpg", "assets/images/winter/winter-04.jpg"],
    },
    {
      // Thẻ chỉ có chữ (không ảnh) / text-only interlude card
      text:  { vi: "Đi nhiều nơi khắp dải đất chữ S, để lại nhiều kỉ niệm - và cuối cùng chúng mình quyết định dừng lại.... ở Biên Hoà để xây dựng tổ ấm của riêng mình!",
               en: "We wandered across every corner of our S-shaped homeland, gathering countless memories — and in the end, we chose to settle... in Biên Hòa, to build a home of our own!" },
    },
    {
      date:  { vi: "Tháng 7, 2026", en: "July 2026" },
      title: { vi: "Lời cầu hôn", en: "The proposal" },
      text:  { vi: "“Em đồng ý về chung một nhà với anh nhé?” — và em đã gật đầu, mở ra chương mới của cuộc đời chúng ta.",
               en: "“Will you share a home — and a life — with me?” You said yes, opening a whole new chapter for us." },
      imgs:  ["assets/images/propose/propose-01.jpg", "assets/images/propose/propose-02.jpg", "assets/images/propose/propose-03.jpg", "assets/images/propose/propose-04.jpg"],
    },
    {
      date:  { vi: "29.07.2026", en: "Jul 29, 2026" },
      title: { vi: "Lễ Vu Quy", en: "The Vu Quy ceremony" },
      text:  { vi: "Theo phong tục, lễ Vu Quy được cử hành tại nhà gái.",
               en: "Following tradition, the Vu Quy ceremony is held at the bride's home." },
      imgs:  ["assets/images/prewedding/pre-01.jpg", "assets/images/prewedding/pre-04.jpg", "assets/images/prewedding/pre-09.jpg", "assets/images/prewedding/pre-12.jpg"],
    },
    {
      date:  { vi: "01.08.2026", en: "Aug 1, 2026" },
      title: { vi: "Chung một nhà", en: "Forever begins" },
      text:  { vi: "Và rồi, ngày trọng đại nhất cũng đến. Hạnh phúc này, {self} muốn được sẻ chia cùng bạn.",
               en: "And so, the most important day arrives. This happiness — we long to share it with you." },
      imgs:  ["assets/images/prewedding/pre-02.jpg", "assets/images/prewedding/pre-08.jpg", "assets/images/prewedding/pre-10.jpg", "assets/images/prewedding/pre-13.jpg"],
    },
  ],

  /* ---- Bài thơ anh tặng em / The poem -------------------------------- */
  poem: {
    heading: { vi: "Bài thơ định mệnh sau hành trình 1700 Km chạy xe Nam tiến gặp Lan",
               en: "The fateful poem — after a 1,700 km ride south to meet Lan" },
    image: "assets/images/poem.jpg",
    lines_vi: [
      "Em cười chúm chím tựa nhành hoa",
      "Gặp em hạnh phúc anh vỡ òa",
      "Núi sông trùng điệp tuy có lớn",
      "Chỉ nhỏ chừng độ nửa bước chân anh",
      "",
      "Xa em đêm về thêm nhung nhớ",
      "Thắp tim lên ngọn lửa ở trong anh",
      "Tình yêu này dâng trào như sóng lớn",
      "Chỉ có em bừng sáng ánh bình minh",
    ],
    lines_en: [
      "Your gentle smile blooms like a flower in spring,",
      "Meeting you, my heart overflows with joy.",
      "Though mountains and rivers stretch mighty and wide,",
      "They're but half a step beside my love for you.",
      "",
      "When you're away, the nights deepen my longing,",
      "Kindling a flame that burns bright within me.",
      "This love of mine surges like a rising tide —",
      "Only you light up every dawn I know.",
    ],
    note: { vi: "Và con tim đã thổn thức từ đây",
            en: "And my heart has fluttered ever since." },
  },

  /* ---- Album ảnh cưới / Pre-wedding gallery ------------------------- */
  gallery: {
    heading: { vi: "Khoảnh khắc của chúng mình", en: "Our moments" },
    images: [
      "assets/images/love/love-02.jpg",
      "assets/images/love/love-06.jpg",
      "assets/images/love/love-08.jpg",
      "assets/images/love/love-10.jpg",
      "assets/images/love/love-12.jpg",
      "assets/images/love/love-07.jpg",
      "assets/images/love/love-09.jpg",
      "assets/images/love/love-11.jpg",
      "assets/images/love/love-04.jpg",
      "assets/images/love/love-01.jpg",
    ],
  },

  /* ---- Chi tiết lễ cưới / Ceremony details -------------------------- */
  ceremony: {
    invite: { vi: "Trân trọng kính mời", en: "Cordially invites" },
    vuQuy: {
      label:    { vi: "Lễ Vu Quy", en: "Vu Quy Ceremony" },
      time:     { vi: "09:00 · Thứ Tư, 29.07.2026", en: "09:00 · Wed, Jul 29, 2026" },
      lunar:    { vi: "(Nhằm ngày 16 tháng 06 năm Bính Ngọ)", en: "(16th day, 6th lunar month, Year of the Horse)" },
      place:    { vi: "Tư gia nhà gái", en: "At the bride's family home" },
    },
    reception: {
      label:    { vi: "Tiệc Cưới", en: "Wedding Reception" },
      time:     { vi: "17:00 · Thứ Bảy, 01.08.2026", en: "17:00 · Sat, Aug 1, 2026" },
      lunar:    { vi: "(Nhằm ngày 19 tháng 06 năm Bính Ngọ)", en: "(19th day, 6th lunar month, Year of the Horse)" },
      venue:    { vi: "Trung tâm Hội nghị & Tiệc cưới Golden Lotus", en: "Golden Lotus Wedding & Convention Center" },
      hall:     { vi: "Sen Vàng – Sảnh Tulip", en: "Golden Lotus – Tulip Hall" },
      address:  { vi: "105B Hà Huy Giáp, P. Trấn Biên, TP. Đồng Nai", en: "105B Ha Huy Giap, Tran Bien Ward, Dong Nai" },
    },
    schedule: [
      { icon: "🚪", label: { vi: "Đón khách", en: "Welcome" },   time: "17:00" },
      { icon: "💍", label: { vi: "Làm lễ",   en: "Ceremony" },  time: "18:00" },
      { icon: "🍽️", label: { vi: "Khai tiệc", en: "Dinner" },    time: "18:30" },
    ],
    closing: { vi: "Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi.",
               en: "Your presence is the greatest honour to our families." },
  },

  /* ---- Bản đồ & QR / Map & QR --------------------------------------- */
  location: {
    heading: { vi: "Chỉ đường đến buổi tiệc", en: "How to get there" },
    // Nhúng bản đồ (không cần API key)
    mapEmbed: "https://www.google.com/maps?q=Golden%20Lotus%20105B%20H%C3%A0%20Huy%20Gi%C3%A1p%20Tr%E1%BA%A5n%20Bi%C3%AAn%20%C4%90%E1%BB%93ng%20Nai&output=embed",
    mapLink:  "https://www.google.com/maps/search/?api=1&query=Golden+Lotus+105B+H%C3%A0+Huy+Gi%C3%A1p+Tr%E1%BA%A5n+Bi%C3%AAn+%C4%90%E1%BB%93ng+Nai",
    qrImage:  "assets/images/qr-map.png",
    qrCaption:{ vi: "Quét mã để mở Google Maps", en: "Scan to open Google Maps" },
  },

  /* ---- Mừng cưới / Gift (VietQR tự sinh) ----------------------------
     👉 QR được tạo tự động từ bankBin + account (không cần ảnh).
        Nội dung CK: <Danh xưng>-<Tên khách>-<addInfoSuffix theo bên>   */
  gift: {
    heading: { vi: "Gửi trao lời chúc", en: "Send your blessing" },
    note: { vi: "Sự hiện diện của bạn đã là món quà quý giá. Nhưng nếu không thể góp mặt bạn có thể chung vui online vỡi mã QR.",
            en: "Your presence is a precious gift. But if you can't be there, you can celebrate online using the QR code." },
    // Nội dung chuyển khoản: <Danh xưng>-<Tên khách>-<suffix theo bên>
    groom: {
      label:    { vi: "Nhà Trai", en: "Groom's Side" },
      holder:   "LE NGOC ANH",
      account:  "0838059792",
      bankName: "OCB",
      bankBin:  "970448",
      addInfoSuffix: "MungCuoiNgocAnhPhuongLan",
    },
    bride: {
      label:    { vi: "Nhà Gái", en: "Bride's Side" },
      holder:   "DO THI PHUONG LAN",
      account:  "1037263934",
      bankName: "Vietcombank",
      bankBin:  "970436",
      addInfoSuffix: "MungCuoiPhuongLanNgocAnh",
    },
  },

  /* ---- Nhạc nền / Background music ----------------------------------
     Đặt file nhạc của bạn tại assets/music/background.mp3
     Nếu chưa có, site sẽ tự dùng nhạc mẫu online bên dưới.        */
  music: {
    src: "assets/music/background.mp3",
    fallback: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    title: { vi: "Nhạc nền", en: "Music" },
  },
};
