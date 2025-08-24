import { NextRequest } from 'next/server';
import { R2, r2Bucket, storageURL } from '~/libs/R2';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return Response.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return Response.json({ error: 'File size too large' }, { status: 400 });
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Generate unique filename
    const extension = file.name.split('.').pop() || 'png';
    const filename = `${uuidv4()}.${extension}`;
    
    // Upload to R2
    await R2.upload({
      Bucket: r2Bucket,
      Key: filename,
      Body: buffer,
      ContentType: file.type,
    }).promise();
    
    const imageUrl = `${storageURL}/${filename}`;
    
    return Response.json({ 
      success: true, 
      url: imageUrl,
      filename: filename
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ error: 'Upload failed' }, { status: 500 });
  }
}