<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BarangController extends Controller
{
    // =========================
    // INDEX (list data)
    // =========================
    public function index()
    {
        $barangs = Barang::latest()->get();

        return Inertia::render('Master/Barang', [
            'barangs' => $barangs
        ]);
    }

    // =========================
    // STORE (create)
    // =========================
    public function store(Request $request)
    {
        $request->validate([
            'kode_barang' => 'required',
            'nama_barang' => 'required',
            'hpp' => 'required|numeric',
            'harga_jual' => 'required|numeric',
        ]);

        Barang::create([
            'kode_barang' => $request->kode_barang,
            'nama_barang' => $request->nama_barang,
            'hpp' => $request->hpp,
            'harga_jual' => $request->harga_jual,
            'margin' => $request->harga_jual - $request->hpp,
        ]);

        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    // =========================
    // UPDATE
    // =========================
    public function update(Request $request, $id)
    {
        $request->validate([
            'kode_barang' => 'required',
            'nama_barang' => 'required',
            'hpp' => 'required|numeric',
            'harga_jual' => 'required|numeric',
        ]);

        $barang = Barang::findOrFail($id);

        $barang->update([
            'kode_barang' => $request->kode_barang,
            'nama_barang' => $request->nama_barang,
            'hpp' => $request->hpp,
            'harga_jual' => $request->harga_jual,
            'margin' => $request->harga_jual - $request->hpp,
        ]);

        return redirect()->back()->with('success', 'Data berhasil diupdate');
    }

    // =========================
    // DELETE
    // =========================
    public function destroy($id)
    {
        Barang::findOrFail($id)->delete();

        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }
}