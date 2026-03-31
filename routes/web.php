<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\BarangController;
use App\Http\Controllers\CustomerController;

Route::inertia('/dashboard', 'Dashboard')->name('dashboard');


Route::get('/barang', [BarangController::class, 'index'])->name('barang.index');
Route::post('/barang', [BarangController::class, 'store'])->name('barang.store');
Route::put('/barang/{id}', [BarangController::class, 'update'])->name('barang.update');
Route::delete('/barang/{id}', [BarangController::class, 'destroy'])->name('barang.destroy');


Route::get('/customer', [CustomerController::class, 'index'])->name('customer.index');
Route::post('/customer', [CustomerController::class, 'store'])->name('customer.store');
Route::put('/customer/{id}', [CustomerController::class, 'update'])->name('customer.update');
Route::delete('/customer/{id}', [CustomerController::class, 'destroy'])->name('customer.destroy');


Route::middleware(['auth'])->group(function () {
});
// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::inertia('dashboard', 'dashboard')->name('dashboard');
// });

require __DIR__.'/settings.php';
