import Button from "./common/Button";

export default function TableKoleksi({ data, onDelete, onEdit }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Daftar Koleksi</h2>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-blue-200">
            <th className="border p-2">Judul</th>
            <th className="border p-2">Jenis</th>
            <th className="border p-2">Genre</th>
            <th className="border p-2">Tahun</th>
            <th className="border p-2">Rating</th>
            <th className="border p-2">Platform</th>
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
            <tr key={item.id} className="bg-cyan-100 text-center">
              <td className="border p-2">{item.judul}</td>
              <td className="border p-2">{item.jenis}</td>
              <td className="border p-2">{item.genre}</td>
              <td className="border p-2">{item.tahun}</td>
              <td className="border p-2">{item.rating}</td>
              <td className="border p-2">{item.platform}</td>

              <td className="border p-2 flex gap-2 justify-center">
                <Button
                  className="bg-yellow-500 hover:bg-yellow-600"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </Button>

                <Button
                className="bg-red-600 hover:bg-red-700"
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
