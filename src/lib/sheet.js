import Papa from 'papaparse';

// GANTI DENGAN ID SPREADSHEET ANDA DARI LANGKAH 1
const SHEET_ID = '1Oos44gUcWW7m9eb5wHumwQgIxTmM-Nq3pF3uNvc3Oj0';

export async function getLinksFromSheet() {
  try {
    // 1. Download data sebagai CSV (Lebih cepat & hemat kuota dibanding JSON API)
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;
    const response = await fetch(url);
    const text = await response.text();

    // 2. Parse CSV menjadi JSON
    const { data } = Papa.parse(text, { header: true });

    // 3. Kelompokkan Data (Grouping) berdasarkan Kategori
    // Kita ubah data mentah baris-per-baris menjadi format Group yang dipakai aplikasi
    const groups = {};

    data.forEach(row => {
      // Lewati baris kosong jika ada
      if (!row.category || !row.title) return;

      const catName = row.category.trim();
      
      // Jika kategori ini belum ada di list groups, buat wadahnya
      if (!groups[catName]) {
        groups[catName] = {
          category: catName,
          icon: row.icon || 'mdi:folder', // Default icon jika kosong
          items: []
        };
      }

      // Masukkan item ke kategori tersebut
      groups[catName].items.push({
        title: row.title,
        url: row.url,
        type: row.type || 'link',
        // Ubah string "surat, masuk" menjadi array ["surat", "masuk"]
        keywords: row.keywords ? row.keywords.split(',').map(k => k.trim()) : [] 
      });
    });

    // Ubah object groups menjadi array agar bisa di-map di Astro
    return Object.values(groups);

  } catch (error) {
    console.error('Gagal mengambil data Sheet:', error);
    return []; // Kembali array kosong jika error agar web tidak crash
  }
}