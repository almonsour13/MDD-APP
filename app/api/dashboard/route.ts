import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

// Mock chart data
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 }
];

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({ 
      chartData
    });

  } catch (error) {
    console.error('Error in dashboard route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}