import { NextResponse } from 'next/server';

export async function POST(req:Request) {
    try {
        // Parse the request body (assuming it's JSON)
        const body = await req.json();
        const { imageUrl, treeCode } = body;

        // Validate the inputs
        if (!imageUrl || !treeCode) {
            return NextResponse.json({ error: 'Missing imageUrl or treeCode.' }, { status: 400 });
        }

        const result = {
            treeCode:treeCode,
            disease: "Anthracnose",
            confidence: 85,
            severity: "Moderate",
            affectedArea: "30%",
            recommendations: [
            "Apply fungicide treatment",
            "Improve air circulation around trees",
            "Remove infected leaves and fruits"
            ],
            additionalInfo: "Anthracnose is caused by fungi of the genus Colletotrichum."             
            };

        // Return the detection result as a JSON response
        return NextResponse.json({
            message: 'Scan completed successfully',
            result,
        });
    } catch (error) {
        console.error('Error in POST request:', error);
        // Handle any errors and send a 500 response
        return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }
}
