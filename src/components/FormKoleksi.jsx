import { useState, useEffect } from "react";
import Button from "./common/Button";

// props: onSave, editItem
export default function FormKoleksi({ onSave, editItem }) {
  const [judul, setJudul] = useState("");
  const [jenis, setJenis] = useState("Game");
  const [genre, setGenre] = useState("");
  const [tahun, setTahun] = useState(new Date().getFullYear());
  const [rating, setRating] = useState(5);
  const [platform, setPlatform] = useState("");
  const [modeEdit, setModeEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  
  // Platform otomatis berdasarkan jenis
  const platformOptions = {
    Game: ["PC", "PS5", "Android", "Xbox"],
    Film: ["Netflix", "Disney+", "HBO", "Bioskop"],
    Anime: ["Netflix", "Crunchyroll", "Bstation", "iQIYI"],
  };

  // Genre otomatis hanya untuk Film & Anime
  const genreOptions = {
    Film: ["Action", "Drama", "Komedi", "Horror", "Romance"],
    Anime: ["Shounen", "Isekai", "Slice of Life", "Fantasy", "Romance"],
  };

  // Saat klik Edit → data masuk ke form
  useEffect(() => {
    if (editItem) {
      setModeEdit(true);
      setIdEdit(editItem.id);
      setJudul(editItem.judul);
      setJenis(editItem.jenis);
      setGenre(editItem.genre);
      setTahun(editItem.tahun);
      setRating(editItem.rating);
      setPlatform(editItem.platform);
    }
  }, [editItem]);

  const submit = (e) => {
    e.preventDefault();

    const ratingNum = parseFloat(rating);
    if (rating && (ratingNum < 1 || ratingNum > 10)) {
    alert("Rating harus antara 1-10!");
    return;
    }

    if (!judul.trim()) {
    alert("Judul wajib diisi!");
    return;
    }

    const data = {
      id: modeEdit ? idEdit : Date.now(),
      judul,
      jenis,
      genre,
      tahun,
      rating,
      platform,
    };

    onSave(data, modeEdit);

    // reset
    setJudul("");
    setJenis("Game");
    setGenre("");
    setTahun("");
    setRating("");
    setPlatform("");
    setModeEdit(false);
    setIdEdit(null);

    alert(modeEdit ? "Data berhasil diupdate!" : "Data berhasil ditambahkan!");
    };

  return (
    <form onSubmit={submit} className="mb-10 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-bold mb-4">
        {modeEdit ? "Edit Koleksi" : "Tambah Koleksi"}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        
        {/* Judul */}
        <input
          className="border p-2"
          placeholder="Judul"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          required
        />

        {/* Jenis */}
        <select
          className="border p-2"
          value={jenis}
          onChange={(e) => {
            setJenis(e.target.value);
            setGenre("");       // reset genre
            setPlatform("");    // reset platform
          }}
        >
          <option>Game</option>
          <option>Film</option>
          <option>Anime</option>
        </select>

        {/* Genre otomatis kecuali Game */}
        {jenis !== "Game" ? (
          <select
            className="border p-2"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Pilih Genre</option>
            {genreOptions[jenis].map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        ) : (
          <div></div> // menjaga grid tetap rapi
        )}

        {/* Tahun */}
        <input
          className="border p-2"
          placeholder="Tahun"
          type="number"
          value={tahun}
          onChange={(e) => setTahun(Number(e.target.value))}
        />

        {/* Rating */}
        <input
        className="border p-2"
        placeholder="Rating"
        type="number"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        min={1}
        max={10}
        />

        {/* Platform OTOMATIS */}
        <select
          className="border p-2"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option value="">Pilih Platform</option>
          {platformOptions[jenis].map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

      </div>

      <Button className="mt-4 w-full">
        {modeEdit ? "Update Data" : "Tambah Data"}
      </Button>
    </form>
  );
}
