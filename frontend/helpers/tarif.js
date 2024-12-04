export default {
  hitungTarifProgressif(setting, durasi) {
    const MENGINAP_24_JAM = 0
    const MENGINAP_LEWAT_TENGAH_MALAM = 1
    const TARIF_FLAT = 0
    const TARIF_PROGRESIF = 1

    const {
      mode_tarif, // 0 = flat, 1 = progressfif
      menit_pertama,
      tarif_menit_pertama,
      menit_selanjutnya,
      tarif_menit_selanjutnya,
      tarif_maksimum, // tarif maksimal per hari
      mode_menginap, // 0 = 24 jam, 1 = lewat tengah malam
      tarif_menginap,
    } = setting

    let tarif = tarif_menit_pertama
    const sisaDurasi = durasi - menit_pertama
    if (sisaDurasi <= 0) return tarif

    for (let menit = 0; menit < sisaDurasi; menit + menit_selanjutnya) {
      tarif += tarif_menit_selanjutnya
    }

    return tarif
  },
}
