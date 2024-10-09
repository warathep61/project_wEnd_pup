<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Apex extends Model
{
    use HasFactory;

        // ฟิลด์ที่สามารถกรอกข้อมูลได้
        protected $fillable = [
            'legend_name',
            'role',
            'passive_ability',
            'tactical_ability',
            'ultimate_ability',
            'health',
            'shield',
            'weapon_favorite',
            'speed',
            'home_world',
            'lore',
            'is_meta',
            'release_year',
            'pick_rate',
            'ranked_win_rate',
            'img'
        ];
}
