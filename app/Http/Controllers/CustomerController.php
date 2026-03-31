<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;


class CustomerController extends Controller
{
    //
    public function index()
    {
        $customers = Customer::latest()->get();

        return Inertia::render('Master/Customer', [
            'customers' => $customers
        ]);
    }

    // =========================
    // STORE (create)
    // =========================
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'alamat' => 'required',
        ]);

        Customer::create([
            'name' => $request->name,
            'alamat' => $request->alamat,
        ]);

        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    // =========================
    // UPDATE
    // =========================
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'alamat' => 'required',
        ]);

        $barang = Customer::findOrFail($id);

        $barang->update([
            'name' => $request->name,
            'alamat' => $request->alamat,
        ]);

        return redirect()->back()->with('success', 'Data berhasil diupdate');
    }

    // =========================
    // DELETE
    // =========================
    public function destroy($id)
    {
        Customer::findOrFail($id)->delete();

        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }
}
