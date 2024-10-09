<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('apexes', function (Blueprint $table) {
            $table->id();
            $table->string('legend_name'); // ชื่อตัวละคร
            $table->string('role'); // บทบาทในทีม (เช่น Offensive, Defensive)
            $table->string('passive_ability'); // ความสามารถ Passive
            $table->string('tactical_ability'); // ความสามารถ Tactical
            $table->string('ultimate_ability'); // ความสามารถ Ultimate
            $table->integer('health'); // ค่าพลังชีวิต
            $table->integer('shield'); // ค่าพลังเกราะ
            $table->string('weapon_favorite')->nullable(); // อาวุธที่ชอบ
            $table->integer('speed'); // ความเร็วในการเคลื่อนที่
            $table->string('home_world')->nullable(); // โลกต้นกำเนิด
            $table->text('lore')->nullable(); // ประวัติตัวละคร
            $table->boolean('is_meta')->default(false); // ตัวละครเป็นที่นิยมใน Meta หรือไม่
            $table->integer('release_year'); // ปีที่ตัวละครถูกปล่อย
            $table->float('pick_rate')->default(0); // อัตราการถูกเลือกในเกม
            $table->float('ranked_win_rate')->default(0); // อัตราการชนะในโหมด Ranked
            $table->string('img');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('apexes');
    }
};
