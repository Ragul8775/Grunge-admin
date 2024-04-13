import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const bucketName = "grunge-ecommerce";
const region = 'eu-north-1';
const accessKeyId = process.env.S3_ACCESS_KEY;
const secretAccessKey = process.env.S3_SECRET_KEY;

const client = new S3Client({
  region,
  credentials: { accessKeyId, secretAccessKey },
});

export const POST = async (req) => {
  const formData = await req.formData();
  const files = formData.getAll('image'); // Assuming 'image' is your field name

  const links = [];

  for (const file of files) {
    const fileKey = `${Date.now()}_${file.name}`;
    
    const uploader = new Upload({
      client,
      params: {
        Bucket: bucketName,
        Key: fileKey,
        Body: file.stream(), // Directly use the stream from the file
        ACL: 'public-read',
        ContentType: file.type, // The MIME type from the file object
      },
    });

    try {
      const result = await uploader.done();
      const link = `https://${bucketName}.s3.amazonaws.com/${fileKey}`;
      links.push(link);
   
    } catch (error) {
      console.error("Upload failed:", error);
      throw error; // Rethrow or handle error as needed
    }
  }

  return new Response(JSON.stringify({ links }), {
    headers: { 'Content-Type': 'application/json' }
  });
};
