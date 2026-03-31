<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    //
    protected $fillable = [
        'kode_item',
        'nama_item',
        'hpp',
        'harga_jual',
        'margin',
        'satuan',
    ];
}
