import { NextRequest, NextResponse } from "next/server"
import { db } from '@/db/db'
import { users } from '@/db/schema'
import bcrypt from "bcryptjs"
import { eq } from 'drizzle-orm';

export async function POST(request : Request){
    const {username, email, password, confirmPassword} = await request.json()
    // todo
    //console.log(username)
    //const reds = await db.select().from(users).where(eq(users.name, username));
    const reds = db.select().from(users)
          .where(eq(users.name, username))
          .get();

    
    if (reds){
        //console.log(reds)
        return NextResponse.json({
            message: "name"
        });
    }
    const hashedPassword = await bcrypt.hash(password, 12)

    const data = {
        name: username,
        email: email,
        password: hashedPassword
    }

    //console.log(data)
    const red = await db.insert(users).values(data);
    //console.log(red)
    return NextResponse.json('re ...')
}