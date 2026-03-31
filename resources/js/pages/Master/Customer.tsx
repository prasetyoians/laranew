import AppLayout from '@/layouts/AppLayout'
import { useState } from 'react'
import { useForm, router } from '@inertiajs/react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPen, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function Customer({ customers }: any) {
  // =========================
  // TABLE STATE
  // =========================
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<any[]>([])

  // =========================
  // MODAL STATE
  // =========================
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState<any>(null)

  // =========================
  // FORM STATE (useForm Inertia)
  // =========================
  const { data, setData, post, put, processing, errors, reset } = useForm({
    name: '',
    alamat: '',
  })

  // =========================
  // MODAL HANDLER
  // =========================
  const openCreate = () => {
    setEditData(null)
    reset()
    setOpen(true)
  }

  const openEdit = (item: any) => {
    setEditData(item)
    setData({
      name: item.name,
      alamat: item.alamat,
    })
    setOpen(true)
  }

  // =========================
  // DELETE
  // =========================
  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Yakin hapus?',
      text: 'Data tidak bisa dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/customer/${id}`, {
          onSuccess: () => {
            Swal.fire('Berhasil!', 'Data dihapus', 'success')
          }
        })
      }
    })
  }

  // =========================
  // TABLE COLUMN
  // =========================
  const formatRupiah = (number: number | string) => {
      if (!number) return 'Rp 0'
      return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0
      }).format(Number(number))
  }
  const columns = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'alamat', header: 'Alamat' },
    
    {
        header: 'Aksi',
        cell: ({ row }: any) => {
        const item = row.original
        return (
            <div className="flex gap-1">
            <button
                onClick={() => openEdit(item)}
                className="p-1.5 rounded bg-yellow-400 text-white hover:bg-yellow-500 transition"
            >
                <FontAwesomeIcon icon={faPen} />
            </button>
            <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 rounded bg-red-500 text-white hover:bg-red-600 transition"
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>
            </div>
        )
        },
    },
    ]

  const table = useReactTable({
    data: customers,
    columns,
    state: { globalFilter, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <AppLayout>
      <div className="space-y-4">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-800">Master Customer news1</h1>
          <div className="flex gap-2">
            <input
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search..."
              className="px-3 py-1.5 text-xs border rounded-md focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={openCreate}
              className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded text-xs hover:bg-blue-700"
            >
              <FontAwesomeIcon icon={faPlus} />
              Tambah
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="w-full text-[11px]">
            <thead className="bg-black text-white">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="px-3 py-2 text-left cursor-pointer font-medium select-none"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t hover:bg-gray-50 transition">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3 py-2 text-gray-700">
                      {flexRender(
                        cell.column.columnDef.cell ?? (() => row.original[cell.column.id]),
                        cell.getContext()
                        )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex justify-between px-3 py-2 text-xs border-t">
            <span>Page {table.getState().pagination.pageIndex + 1}</span>
            <div className="flex gap-1">
              <button
                onClick={() => table.previousPage()}
                className="px-2 py-1 border rounded hover:bg-gray-50"
              >
                Prev
              </button>
              <button
                onClick={() => table.nextPage()}
                className="px-2 py-1 border rounded hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* MODAL */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* BACKDROP */}
            <div
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/40"
            />

            {/* CONTENT */}
            <div className="relative bg-white w-full max-w-md rounded-xl shadow-xl p-5 space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-sm font-semibold text-gray-700">
                  {editData ? 'Edit Customer' : 'Tambah Customer'}
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              {/* FORM */}
              <div className="space-y-3 text-xs">
                {['name', 'alamat'].map((field) => (
                    <div key={field}>
                    <label className="text-gray-500">
                        {field.replace('_', ' ').toUpperCase()}
                    </label>

                    <input
                        type='text'
                        value={(data as any)[field]}
                        onChange={(e) => setData(field as any, e.target.value)}
                        className="w-full border px-2 py-1.5 rounded-md focus:ring-1 focus:ring-blue-500"
                    />

                    {(errors as any)[field] && (
                        <div className="text-red-500 text-[10px] mt-1">
                        {(errors as any)[field]}
                        </div>
                    )}
                    </div>
                ))}
                </div>
                <br />
                

              {/* ACTION */}
              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  onClick={() => setOpen(false)}
                  className="px-3 py-1.5 text-xs border rounded-md hover:bg-gray-50"
                >
                  Batal
                </button>

                <button
                  disabled={processing}
                  onClick={() => {
                    if (editData) {
                      put(`/customer/${editData.id}`, {
                        onSuccess: () => {
                          setOpen(false)
                          reset()
                        },
                      })
                    } else {
                      post('/customer', {
                        onSuccess: () => {
                          setOpen(false)
                          reset()
                        },
                      })
                    }
                  }}
                  className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {processing ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AppLayout>
  )
}