# KTMT-BTMT OnTap — 14 bài học tương tác

Tài liệu ôn tập **Kiến Trúc Máy Tính & Bảo Trì Máy Tính** với 14 bài học HTML tương tác, mô phỏng trực quan, bài tập tự sinh, quiz, và phần **"Cách trình bày bài thi"** để đạt điểm tối đa.

## 🎯 Mục tiêu

Dành cho sinh viên "mất gốc" vẫn muốn đạt 10 điểm. Mỗi bài được thiết kế:
- **Chi tiết từng bước**: mỗi bước đều có giải thích VÌ SAO áp dụng công thức đó
- **Mô phỏng tương tác**: nhập số liệu của bạn → xem chương trình tính ra sao
- **Quiz kiểm tra**: 6 câu trắc nghiệm mỗi bài để verify hiểu bài
- **Phần trình bày thi**: mẫu `<pre>` chuẩn + 5 bí kíp + lỗi thường gặp

## 📚 Danh sách 14 bài

| # | Bài | File |
|---|-----|------|
| 1 | Hệ cơ số (Dec/Bin/Hex) | `lessons/01-he-co-so.html` |
| 2 | Số bù 2 (Two's Complement) | `lessons/02-bu-2.html` |
| 3 | Big Endian vs Little Endian | `lessons/03-endian.html` |
| 4 | IEEE 754 Single (số dương) | `lessons/04-ieee754-single.html` |
| 5 | IEEE 754 Single (số ÂM) | `lessons/05-ieee754-am.html` |
| 6 | Đảo ngược IEEE 754 + Double | `lessons/06-ieee754-dao.html` |
| 7 | Parity Bit + VRC/LRC | `lessons/07-parity.html` |
| 8 | CRC (Cyclic Redundancy Check) | `lessons/08-crc.html` |
| 9 | Hamming - Sinh mã H(7,4) | `lessons/09-hamming-sinh.html` |
| 10 | Hamming - Phát hiện & Sửa lỗi | `lessons/10-hamming-sua-loi.html` |
| 11 | Địa chỉ vật lý 8088 | `lessons/11-dia-chi-vat-ly.html` |
| 12 | Cờ FR (Flag Register) | `lessons/12-co-fr.html` |
| 13 | Pipeline & Hazards | `lessons/13-pipeline.html` |
| 14 | Cache (mapping + hit rate + PSU) | `lessons/14-cache.html` |

## 🚀 Cách xem

### Cách 1: GitHub Pages (khuyến nghị)
Truy cập: **https://huyhandsome6996.github.io/KTMT-BTMT-OnTap/**

### Cách 2: Tải về mở cục bộ
```bash
git clone https://github.com/huyhandsome6996/KTMT-BTMT-OnTap.git
cd KTMT-BTMT-OnTap
# Mở index.html trong trình duyệt
```

## 📖 Cách học hiệu quả

1. **Đọc lý thuyết** ở đầu mỗi bài (đừng bỏ qua — đây là nền tảng).
2. **Chạy mô phỏng** tương tác, bấm từng nút để xem kết quả thay đổi.
3. **Làm bài tập tự sinh**: nhập số liệu của bạn, xem chương trình tính ra sao.
4. **Làm quiz** ở cuối bài để kiểm tra xem đã hiểu chưa.
5. **Đọc phần "Cách trình bày bài thi"** ở cuối mỗi bài — đây là "bí kíp" được điểm tối đa.

## 🗓️ Lộ trình ôn tập 3 buổi

- **Buổi 1**: Bài 1-6 (số học, IEEE 754) — khó nhất, cần thời gian ngấm
- **Buổi 2**: Bài 7-12 (mã lỗi, CPU, cờ)
- **Buổi 3**: Bài 13-14 (pipeline, cache, PSU) + tổng ôn

## 🛠️ Công nghệ

- HTML5 + CSS3 (thuần, không framework)
- JavaScript thuần (vanilla)
- [KaTeX](https://katex.org/) để render công thức toán học
- Không cần backend, không cần build — mở file HTML là chạy

## 📁 Cấu trúc thư mục

```
KTMT-BTMT-OnTap/
├── index.html              # Trang chủ với 14 card bài học
├── README.md               # File này
├── assets/
│   ├── style.css           # CSS chung (theme sáng học thuật)
│   └── common.js           # JS helpers (Bit, NumSys, Quiz, StepReveal)
└── lessons/
    ├── 01-he-co-so.html
    ├── 02-bu-2.html
    ├── ...
    └── 14-cache.html
```

## ⚠️ Bảo mật

Token GitHub đã được dùng 1 lần để tạo repo này. **Bạn PHẢI revoke (xóa) token ngay**:

1. Vào https://github.com/settings/tokens
2. Tìm token bắt đầu bằng `ghp_u9sK1...`
3. Bấm **Delete**.

---

Chúc bạn làm bài thật tốt! Quyết tâm 10 điểm! 🎓
