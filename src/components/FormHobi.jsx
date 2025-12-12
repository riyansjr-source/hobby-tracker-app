import { useState, useEffect } from "react";
import Button from "./common/Button";

// props: onSave, editItem
export default function FormHobi({ onSave, editItem }) {
  const [judul, setJudul] = useState("");        // Nama Hobi
  const [jenis, setJenis] = useState("Olahraga"); // Kategori
  const [frekuensi, setFrekuensi] = useState("");  // Frekuensi
  const [waktuFav, setWaktuFav] = useState("");   // Waktu Fav
  const [alasan, setAlasan] = useState("");       // Mood
  const [tempat, setTempat] = useState("");  // Tempat
  const [modeEdit, setModeEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(null);

  // Kategori Hobi
  const kategoriOptions = ["Olahraga", "Musik", "Kreatif", "Gaming", "Lifestyle", "Sosial"];

  // Frekuensi Hobi
  const frekuensiOptions = ["Jarang", "Kadang", "Sering", "Setiap Hari"];

  // Waktu Favorit
  const waktuFavoritOptions = ["Pagi", "Siang", "Sore", "Malam"];

  // Alasan
  const alasanOptions = ["Healing", "Lagi bosen", "Diajak temen", "Lagi Stress", "Pengen aja", "Coba hal baru"];

  // Saat klik Edit → isi form
  useEffect(() => {
    if (editItem) {
      setModeEdit(true);
      setIdEdit(editItem.id);
      setJudul(editItem.judul);
      setJenis(editItem.jenis);
      setFrekuensi(editItem.frekuensi);
      setWaktuFav(editItem.waktuFav);
      setAlasan(editItem.alasan);
      setTempat(editItem.tempat);
    }
  }, [editItem]);

  const submit = (e) => {
    e.preventDefault();

    if (!judul.trim()) {
      alert("Nama hobi wajib diisi!");
      return;
    }

    const data = {
      id: modeEdit ? idEdit : Date.now(),
      judul,
      jenis,
      frekuensi,
      waktuFav,
      alasan,
      tempat,
    };

    onSave(data, modeEdit);

    // Reset form
    setJudul("");
    setJenis("Olahraga");
    setFrekuensi("");
    setWaktuFav("");
    setAlasan("");
    setTempat("");
    setModeEdit(false);
    setIdEdit(null);

    alert(modeEdit ? "Hobi berhasil diupdate!" : "Hobi berhasil ditambahkan!");
  };

  return (
    <form onSubmit={submit} className="mb-10 p-5 border border-gray-200 rounded-lg bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {modeEdit ? "Edit Hobi" : "Tambah Hobi"}
      </h2>

      <div className="grid grid-cols-2 gap-4">

        {/* Nama Hobi */}
        <input
          className="border p-2"
          placeholder="Nama Hobi"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          required
        />

        {/* Kategori */}
        <select
          className="border p-2"
          value={jenis}
          onChange={(e) => setJenis(e.target.value)}
        >
          {kategoriOptions.map((kat) => (
            <option key={kat} value={kat}>
              {kat}
            </option>
          ))}
        </select>

        {/* Frekuensi */}
        <select
          className="border p-2"
          value={frekuensi}
          onChange={(e) => setFrekuensi(e.target.value)}
        >
          <option value="">Frekuensi Hobi</option>
          {frekuensiOptions.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>

        {/* Waktu Favorit */}
        <select
          className="border p-2"
          value={waktuFav}
          onChange={(e) => setWaktuFav(e.target.value)}
        >
          <option value="">Waktu Favorit</option>
          {waktuFavoritOptions.map((w) => (
            <option key={w}>{w}</option>
          ))}
        </select>

        {/* Alasan */}
        <select
          className="border p-2"
          value={alasan}
          onChange={(e) => setAlasan(e.target.value)}
        >
          <option value="">Alasan</option>
          {alasanOptions.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

        {/* Tempat */}
        <input
          className="border p-2"
          placeholder="Tempat / Lokasi (Opsional)"
          value={tempat}
          onChange={(e) => setTempat(e.target.value)}
        />
      </div>

      <Button className="mt-4 w-full">
        {modeEdit ? "Update Hobi" : "Tambah Hobi"}
      </Button>
    </form>
  );
}
