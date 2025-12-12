import { useEffect, useState } from "react";
import FormHobi from "./components/FormHobi";
import TableHobi from "./components/TableHobi";

export default function App() {
  const [data, setData] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("hobi")) || [];
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
    localStorage.setItem("hobi", JSON.stringify(updated));
    setEditItem(null);
  };

  const deleteData = (id) => {
    const result = data.filter((x) => x.id !== id);
    setData(result);
    localStorage.setItem("hobi", JSON.stringify(result));
  };

  const getSortedData = () => {
  let sorted = [...data];

    if (sortBy === "judul") {
    sorted.sort((a, b) => a.judul.localeCompare(b.judul)); 
    } 
    else if (sortBy === "jenis") {
      sorted.sort((a, b) => a.jenis.localeCompare(b.jenis)); 
    }
    else if (sortBy === "frekuensi") {
      sorted.sort((a, b) => a.frekuensi.localeCompare(b.frekuensi)); 
    }
    else if (sortBy === "waktuFav") {
      sorted.sort((a, b) => a.waktuFav.localeCompare(b.waktuFav)); 
    }
    else if (sortBy === "alasan") {
      sorted.sort((a, b) => a.alasan.localeCompare(b.alasan)); 
    }

    else if (sortBy === "tempat") {
      sorted.sort((a, b) => a.tempat.localeCompare(b.tempat)); 
    }

  return sorted;
  };

  return (
    <section className="container mx-auto py-10 min-w-[400px] px-4">
      <h1 className="text-3xl font-bold underline text-center mb-9 text-blue-500">
        Hobby Tracker
      </h1>

      <FormHobi onSave={saveData} editItem={editItem} />

      <div className="mb-4 flex gap-2 items-center">
      <label className="font-semibold mr-2">Urutkan Berdasarkan:</label>
      <select
        className="border p-2 rounded"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">-- Pilih --</option>
        <option value="judul">Nama Hobi (A → Z)</option>
        <option value="jenis">Kategori (A → Z)</option>
        <option value="frekuensi">Frekuensi (A → Z)</option>
        <option value="waktuFav">Waktu Favorit (A → Z)</option>
        <option value="alasan">Alasan (A → Z)</option>
        <option value="tempat">Tempat (A → Z)</option>
      </select>
      </div>

      <TableHobi
      data={getSortedData()}  // <- sudah sorted
      onDelete={deleteData}
      onEdit={setEditItem}
      />  
    </section>
  );
}
