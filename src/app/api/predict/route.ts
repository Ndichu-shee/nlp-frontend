import { NextResponse } from "next/server";

export const POST = async(request:Request) =>{
    const data = await request.formData()

    try {
        const response = await fetch(
          "http://ec2-13-53-150-128.eu-north-1.compute.amazonaws.com:8070/predict",
          {
            method: "POST",
            body: data,
          }
        );
    
        if (!response.ok) {
          throw new Error("Failed to upload the files.");
        }
    
        const result = await response.json();
        return new NextResponse(JSON.stringify(result), {
            status: 200,
        })
      } catch (error) {
        return new NextResponse((error as Error).message, {
            status: 500,
        })
    }

}