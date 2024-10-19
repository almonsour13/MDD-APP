import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {

    const imageData = [
      { imageId: 1, treeId: 101, userId: 501, status: 'Healthy', disease: 'None', confidence: '95%', uploadedAt: '2023-07-12 10:42 AM' },
      { imageId: 2, treeId: 102, userId: 502, status: 'Infected', disease: 'Bacterial Blight', confidence: '89%', uploadedAt: '2023-10-18 03:21 PM' },
      { imageId: 3, treeId: 103, userId: 503, status: 'Infected', disease: 'Powdery Mildew', confidence: '92%', uploadedAt: '2023-11-29 08:15 AM' },
      { imageId: 4, treeId: 104, userId: 504, status: 'Healthy', disease: 'None', confidence: '98%', uploadedAt: '2023-12-25 11:59 PM' },
      { imageId: 5, treeId: 105, userId: 505, status: 'Infected', disease: 'Leaf Spot', confidence: '90%', uploadedAt: '2024-01-01 12:00 AM' },
      { imageId: 6, treeId: 106, userId: 506, status: 'Infected', disease: 'Anthracnose', confidence: '88%', uploadedAt: '2024-02-14 02:14 PM' }
    ];

    return NextResponse.json({ 
      imageData,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}