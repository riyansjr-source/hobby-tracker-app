import Button from "./common/Button";

export default function TableHobi({ data, onDelete, onEdit }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Daftar Hobi</h2>

      <table className="w-full border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr className="bg-slate-100 text-slate-700 font-semibold">
            <th className="border p-2">Nama Hobi</th>
            <th className="border p-2">Kategori</th>
            <th className="border p-2">Frekuensi</th>
            <th className="border p-2">Waktu Favorit</th>
            <th className="border p-2">Alasan</th>
            <th className="border p-2">Tempat</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center p-3">Belum ada data.</td>
            </tr>
          )}

          {data.map((item) => (
            <tr key={item.id} className="odd:bg-white even:bg-slate-50 transition text-center">
              <td className="border p-2">{item.judul}</td>
              <td className="border p-2">{item.jenis}</td>
              <td className="border p-2">{item.frekuensi}</td>
              <td className="border p-2">{item.waktuFav}</td>
              <td className="border p-2">{item.alasan}</td>
              <td className="border p-2">{item.tempat}</td>

              <td className="border p-2 flex gap-2 justify-center">
                <Button
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </Button>

                <Button
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => {
                    if (window.confirm(`Yakin mau hapus "${item.judul}"?`)) {
                      onDelete(item.id);
                    }
                  }}
                >
                  Hapus
                </Button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
