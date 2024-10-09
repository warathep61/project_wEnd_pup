<?php

namespace App\Http\Controllers;

use App\Models\Apex;
use Illuminate\Http\Request;
// use App\Models\ApexLegend; // นำ Model ApexLegend เข้ามาใช้งาน

class ApexController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // ดึงข้อมูลทั้งหมดของ Apex Legends จากฐานข้อมูล
        $legends = Apex::all();

        // ส่งข้อมูลกลับเป็น JSON
        return response()->json([
            'status' => 'success',
            'data' => $legends
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // ตรวจสอบข้อมูลที่รับเข้ามา
        $apex = $request->validate([
            'legend_name' => 'required|string|max:255',
            'role' => 'required|string',
            'passive_ability' => 'required|string',
            'tactical_ability' => 'required|string',
            'ultimate_ability' => 'required|string',
            'health' => 'required|integer',
            'shield' => 'required|integer',
            'weapon_favorite' => 'required|string',
            'speed' => 'required|integer',
            'home_world' => 'required|string',
            'lore' => 'required|string',
            'is_meta' => 'required',
            'release_year' => 'required|integer',
            'pick_rate' => 'required',
            'ranked_win_rate' => 'required',
            'img' => 'required'
        ]);

        // สร้างข้อมูลตัวละครใหม่
        $legend = Apex::create($apex);

        // ส่งข้อมูลกลับเป็น JSON
        return response()->json([
            'status' => 'success',
            'data' => $legend
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // ค้นหาข้อมูลตัวละครจาก id
        $legend = Apex::find($id);

        // ตรวจสอบว่าข้อมูลมีหรือไม่
        if (!$legend) {
            return response()->json([
                'status' => 'error',
                'message' => 'Legend not found'
            ], 404);
        }

        // ส่งข้อมูลกลับเป็น JSON
        return response()->json([
            'status' => 'success',
            'data' => $legend
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // ค้นหาข้อมูลตัวละครจาก id
        $legend = Apex::find($id);

        // ตรวจสอบว่าข้อมูลมีหรือไม่
        if (!$legend) {
            return response()->json([
                'status' => 'error',
                'message' => 'Legend not found'
            ], 404);
        }

        // ตรวจสอบข้อมูลที่รับเข้ามา
        $apex = $request->validate([
            'legend_name' => 'required|string|max:255',
            'role' => 'required|string',
            'passive_ability' => 'required|string',
            'tactical_ability' => 'required|string',
            'ultimate_ability' => 'required|string',
            'health' => 'required|integer',
            'shield' => 'required|integer',
            'weapon_favorite' => 'required|string',
            'speed' => 'required|integer',
            'home_world' => 'required|string',
            'lore' => 'required|string',
            'is_meta' => 'required',
            'release_year' => 'required|integer',
            'pick_rate' => 'required',
            'ranked_win_rate' => 'required',
            'img' => 'required'
        ]);

        // อัพเดทข้อมูล
        $legend->update($apex);

        // ส่งข้อมูลกลับเป็น JSON
        return response()->json([
            'status' => 'success',
            'data' => $legend
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // ค้นหาข้อมูลตัวละครจาก id
        $legend = Apex::find($id);

        // ตรวจสอบว่าข้อมูลมีหรือไม่
        if (!$legend) {
            return response()->json([
                'status' => 'error',
                'message' => 'Legend not found'
            ], 404);
        }

        // ลบข้อมูล
        $legend->delete();

        // ส่งข้อมูลกลับเป็น JSON
        return response()->json([
            'status' => 'success',
            'message' => 'Legend deleted successfully'
        ], 200);
    }
}
