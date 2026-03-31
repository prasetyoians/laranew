<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

class Barang extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'kode_barang',
        'nama_barang',
        'hpp',
        'harga_jual',
        'margin',
    ];
}