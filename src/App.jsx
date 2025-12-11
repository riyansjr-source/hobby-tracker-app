import { useEffect, useState } from "react";
import FormKoleksi from "./components/FormKoleksi";
import TableKoleksi from "./components/TableKoleksi";

export default function App() {
  const [data, setData] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("koleksi")) || [];
    setData(saved);
  }, []);

  const saveData = (item, isEdit) => {
    let updated;

    if (isEdit) {
      updated = data.map((x) => (x.id === item.id ? item : x));
    } else {
      updated = [...data, item];
    }

    setData(updated);
    localStorage.setItem("koleksi", JSON.stringify(updated));
    setEditItem(null);
  };

  const deleteData = (id) => {
    const result = data.filter((x) => x.id !== id);
    setData(result);
    localStorage.setItem("koleksi", JSON.stringify(result));
  };

  const getSortedData = () => {
  let sorted = [...data];

  if (sortBy === "tahun") {
    sorted.sort((a, b) => b.tahun - a.tahun); // terbaru → terlama
  } else if (sortBy === "rating") {
    sorted.sort((a, b) => b.rating - a.rating); // tinggi → rendah
  } else if (sortBy === "judul") {
    sorted.sort((a, b) => a.judul.localeCompare(b.judul)); // A → Z
  }

  return sorted;
  };

  return (
    <section className="container mx-auto py-10 min-w-[400px] px-4">
      <h1 className="text-3xl font-bold underline text-center mb-9 text-blue-500">
        StudyBreak Collection
      </h1>

      <FormKoleksi onSave={saveData} editItem={editItem} />

      <div className="mb-4 flex gap-2 items-center">
      <label className="font-semibold">Berdasarkan:</label>
      <select
        className="border p-2 rounded"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">-- Pilih --</option>
        <option value="tahun">Tahun (Terbaru → Terlama)</option>
        <option value="rating">Rating (Tinggi → Rendah)</option>
        <option value="judul">Judul (A → Z)</option>
      </select>
      </div>

      <TableKoleksi
      data={getSortedData()}  // <- sudah sorted
      onDelete={deleteData}
      onEdit={setEditItem}
      />  
    </section>
  );
}
