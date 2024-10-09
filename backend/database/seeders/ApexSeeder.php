<?php

namespace Database\Seeders;

use App\Models\Apex;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ApexSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // เพิ่มข้อมูลตัวละคร 3 ข้อมูล
        Apex::insert(
            [
                [
                    'legend_name' => 'Wraith',
                    'role' => 'Offensive',
                    'passive_ability' => 'Voices from the Void',
                    'tactical_ability' => 'Into the Void',
                    'ultimate_ability' => 'Dimensional Rift',
                    'health' => 100,
                    'shield' => 50,
                    'weapon_favorite' => 'R-99',
                    'speed' => 295,
                    'home_world' => 'Solace',
                    'lore' => 'Wraith is a mysterious character who lost her memory and is on a quest to uncover her past.',
                    'is_meta' => true,
                    'release_year' => 2019,
                    'pick_rate' => 10.5,
                    'ranked_win_rate' => 6.2,
                    'img' => 'https://media.contentapi.ea.com/content/dam/eacom/anthem/common/anthem-square-spacer-768.png'
                ],
                [
                    'legend_name' => 'Bloodhound',
                    'role' => 'Recon',
                    'passive_ability' => 'Tracker',
                    'tactical_ability' => 'Eye of the Allfather',
                    'ultimate_ability' => 'Beast of the Hunt',
                    'health' => 100,
                    'shield' => 50,
                    'weapon_favorite' => 'G7 Scout',
                    'speed' => 285,
                    'home_world' => 'Talos',
                    'lore' => 'Bloodhound is a renowned hunter and tracker with a mysterious identity.',
                    'is_meta' => true,
                    'release_year' => 2019,
                    'pick_rate' => 8.7,
                    'ranked_win_rate' => 5.4,
                    'img' => 'https://media.contentapi.ea.com/content/dam/eacom/anthem/common/anthem-square-spacer-768.png'
                ],
                [
                    'legend_name' => 'Gibraltar',
                    'role' => 'Defensive',
                    'passive_ability' => 'Gun Shield',
                    'tactical_ability' => 'Dome of Protection',
                    'ultimate_ability' => 'Defensive Bombardment',
                    'health' => 100,
                    'shield' => 75,
                    'weapon_favorite' => 'Mastiff Shotgun',
                    'speed' => 270,
                    'home_world' => 'Solace',
                    'lore' => 'Gibraltar is a gentle giant with a strong sense of duty and sacrifice for others.',
                    'is_meta' => false,
                    'release_year' => 2019,
                    'pick_rate' => 4.3,
                    'ranked_win_rate' => 3.8,
                    'img' => 'https://media.contentapi.ea.com/content/dam/eacom/anthem/common/anthem-square-spacer-768.png'
                ]
            ]
        );
    }
}
