import { NextRequest, NextResponse } from "next/server"
import { db } from '../../../../../db/db'


export async function POST(request){
    const data = await request.json()

    console.log(data)

    return NextResponse.json('re ...')
}