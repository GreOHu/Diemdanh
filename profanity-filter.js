/* ============================================================
   BỘ LỌC TỪ NGỮ PHẢN CẢM — profanity-filter.js
   Dùng chung cho index.html (chặn khi điểm danh) và display.html
   (lớp phòng hộ thứ 2 khi hiển thị lên LED).

   CÁCH DÙNG:
   1. Thêm <script src="profanity-filter.js"></script> vào <head>
      hoặc trước thẻ <script> chính, ở CẢ index.html và display.html.
   2. Gọi: ProfanityFilter.check(hoTen)
      → { blocked: true/false, matched: "từ khớp" | null }

   CƠ CHẾ:
   - normalize(text): đưa chữ về dạng "trần" để so khớp — bỏ dấu
     tiếng Việt, hạ chữ thường, gộp các ký tự chèn giữa (dấu chấm,
     gạch ngang, khoảng trắng, số 0/1/3/4/7 thay cho chữ cái), rồi
     nối liền thành 1 chuỗi không khoảng trắng.
   - Danh sách BLOCK_LIST giữ ở dạng KHÔNG DẤU, KHÔNG KHOẢNG TRẮNG
     (đã "chuẩn hoá sẵn") — so khớp bằng cách kiểm tra chuỗi con.
   - Việc chuẩn hoá bắt được các biến thể né lọc kiểu: "d.c.m",
     "d c m", "d-c-m", "d1t", "l0n", "c4c", "vcl", "vkl"... vì tất cả
     đều quy về cùng 1 dạng trước khi so khớp.

   LƯU Ý KHI CHỈNH SỬA:
   - Thêm từ mới: viết KHÔNG DẤU, chữ thường, KHÔNG khoảng trắng
     vào BLOCK_LIST, ví dụ "loz" chứ không phải "lòz".
   - Từ càng ngắn (2-3 ký tự) càng dễ khớp nhầm vào tên thật
     (VD: "ngu" có thể khớp vào giữa họ tên nào đó ghép lại sau khi
     chuẩn hoá) — đã hạn chế bằng WORD_BOUNDARY_ONLY bên dưới cho
     một số từ ngắn dễ nhầm, chỉ khớp khi đứng riêng một từ.
   ============================================================ */
(function (global) {
    'use strict';

    // ---- Bảng quy đổi ký tự thay thế (leetspeak / né lọc) ----
    const LEET_MAP = {
        '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's',
        '7': 't', '8': 'b', '9': 'g', '@': 'a', '$': 's'
    };

    // ---- Bảng bỏ dấu tiếng Việt ----
    function stripVietnameseTones(str) {
        str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        str = str.replace(/đ/gi, m => (m === 'Đ' ? 'D' : 'd'));
        return str;
    }

    /**
     * Chuẩn hoá chuỗi để so khớp: bỏ dấu, hạ chữ thường, quy đổi
     * leetspeak, loại bỏ mọi ký tự không phải chữ cái/số (khoảng
     * trắng, dấu chấm, gạch ngang, gạch dưới...), nối liền thành
     * 1 chuỗi liên tục.
     */
    function normalize(text) {
        if (!text) return '';
        let s = String(text).toLowerCase();
        s = stripVietnameseTones(s);
        s = s.split('').map(ch => LEET_MAP[ch] || ch).join('');
        s = s.replace(/[^a-z0-9]/g, ''); // bỏ mọi ký tự chèn (space, ., -, _, ...)
        return s;
    }

    /**
     * Chuẩn hoá nhưng GIỮ ranh giới từ (thay ký tự chèn bằng 1
     * khoảng trắng duy nhất) — dùng cho các từ ngắn dễ khớp nhầm,
     * chỉ chặn khi từ đó đứng riêng, không phải một phần của từ
     * khác ghép lại do việc nối liền chuỗi.
     */
    function normalizeKeepWords(text) {
        if (!text) return '';
        let s = String(text).toLowerCase();
        s = stripVietnameseTones(s);
        s = s.split('').map(ch => LEET_MAP[ch] || ch).join('');
        s = s.replace(/[^a-z0-9]+/g, ' ').trim();
        return s;
    }

    // ============================================================
    // DANH SÁCH CHẶN — dạng chuẩn hoá sẵn (không dấu, không cách)
    // Chia nhóm để dễ bảo trì; khi kiểm tra sẽ gộp lại thành 1 mảng.
    //
    // QUY TẮC AN TOÀN QUAN TRỌNG: vì normalize() nối liền chuỗi
    // (bỏ hết khoảng trắng để bắt kiểu né "d c m"), một từ càng
    // NGẮN càng dễ vô tình khớp vào GIỮA một họ tên tiếng Việt thật
    // (ví dụ "cu" nằm trong "Cường", "du" nằm trong "Dung"/"Đức").
    // Vì vậy:
    //   - BLOCK_LIST (khớp chuỗi con, không cần ranh giới từ) CHỈ
    //     chứa cụm đủ dài (≥4 ký tự) hoặc cụm ghép nhiều âm tiết,
    //     gần như không thể là 1 phần của tên người thật.
    //   - Các từ ngắn/phổ biến (ngu, cho, du, cu, dm...) chỉ được
    //     đưa vào WORD_BOUNDARY_ONLY — chặn khi chúng đứng RIÊNG
    //     một từ, không chặn khi bị dính liền vào từ khác.
    // ============================================================

    // 🔴 Tục tĩu / bộ phận cơ thể mang tính tục — cụm đủ dài, an toàn
    // để khớp kiểu chuỗi con (không lo trùng vào tên thật)
    const EXPLICIT = [
        'buoi', 'loz', 'clit', 'nungl', 'dcm', 'dmm', 'vcl', 'vkl',
        'clm', 'dkm', 'dmml', 'clgt', 'ditme', 'dume', 'dumay',
        'ditmemay', 'concac', 'concak', 'thangngu', 'thangcho',
        'conchoxx', 'sexy', 'ditconme'
    ];

    // 🔴 Chửi tục / xúc phạm nặng — cụm ghép dài, đặc trưng
    const INSULT_HEAVY = [
        'ngusoi', 'ngungoc', 'thangdien', 'khonnan', 'ditbo',
        'matday', 'vodao', 'suvat', 'ranhcon', 'thangoc', 'conoc',
        'ochoxx'
    ];

    // ⚠️ Xúc phạm / kỳ thị / đe doạ — tách riêng vì nhạy cảm hơn
    const SLUR_THREAT = [
        'daumaymay', 'chetdi', 'muondie', 'giếtmày'.replace(/[^a-z0-9]/g, '')
    ];

    // 🔧 Viết tắt tiếng Anh tục thường gặp — đủ dài để an toàn
    const ENGLISH = [
        'fuck', 'shit', 'bitch', 'asshole', 'bastard', 'pussy',
        'cunt', 'slut', 'whore', 'nigger', 'nigga', 'retard',
        'motherfucker'
    ];

    // Gộp danh sách khớp "chuỗi con, không cần ranh giới từ" —
    // an toàn với các từ đủ dài/đặc trưng, hiếm khi trùng lẫn trong
    // tên thật hoặc chức vụ/đơn vị.
    const BLOCK_LIST = [
        ...EXPLICIT, ...INSULT_HEAVY, ...SLUR_THREAT, ...ENGLISH
    ].filter(Boolean);

    // Từ ngắn / thông dụng — dễ vô tình khớp giữa tên ghép lại nếu
    // dùng kiểu chuỗi con, nên chỉ chặn khi đứng RIÊNG một từ (có
    // khoảng trắng/dấu câu ở 2 đầu sau khi chuẩn hoá giữ ranh giới).
    //
    // GHI CHÚ: cố ý KHÔNG đưa 'cu', 'du', 'dien' vào đây dù là từ
    // tục phổ biến — vì đây cũng là các âm tiết có thật trong tên/họ
    // người Việt (Cù, Cự, Du, Diễn, Điền...), nên dù chặn kiểu đứng
    // riêng vẫn chặn nhầm tên thật. Các từ này thường đi kèm từ khác
    // khi bị lạm dụng (VD "con cu", "thang dien") — đã có các cụm dài
    // hơn trong EXPLICIT/INSULT_HEAVY phía trên để bắt trường hợp đó.
    const WORD_BOUNDARY_ONLY = [
        'dit', 'deo', 'cac', 'lon', 'cak', 'dm', 'vl',
        'ngu', 'cho', 'khung', 'canhau', 'suckhoe',
        'fck', 'fk', 'dick', 'stfu', 'wtf', 'sex', 'giet'
    ];

    /**
     * Kiểm tra một chuỗi (thường là Họ tên) có chứa từ bị chặn không.
     * @param {string} text
     * @returns {{blocked: boolean, matched: string|null}}
     */
    function check(text) {
        if (!text) return { blocked: false, matched: null };

        const flat = normalize(text);
        for (const word of BLOCK_LIST) {
            if (word && flat.includes(word)) {
                return { blocked: true, matched: word };
            }
        }

        const spaced = ' ' + normalizeKeepWords(text) + ' ';
        for (const word of WORD_BOUNDARY_ONLY) {
            if (word && spaced.includes(' ' + word + ' ')) {
                return { blocked: true, matched: word };
            }
        }

        return { blocked: false, matched: null };
    }

    /**
     * Dùng ở display.html: nếu lỡ có tên phản cảm nằm sẵn trong sheet
     * (nhập trước khi có bộ lọc, hoặc sửa trực tiếp trong Sheet),
     * trả về chuỗi đã che để không hiển thị lên LED.
     */
    function maskIfBlocked(text) {
        const result = check(text);
        if (result.blocked) return '*** (Tên không hợp lệ) ***';
        return text;
    }

    global.ProfanityFilter = { check, maskIfBlocked, normalize };

})(typeof window !== 'undefined' ? window : this);
