const { db } = require('../../services/index');
const { v4: uuid } = require('uuid');
const { sendResponse, sendError } = require('../../responses/index');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const BUCKET_NAME = 'herringimgbucket';

async function uploadImageToS3(fileBuffer, fileName) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType: 'image/jpeg',
  };

  try {
    const result = await s3.upload(params).promise();
    return result.Location;
  } catch (error) {
    console.error('Fel vid uppladdning av bild till S3:', error);
    throw new Error('Kunde inte ladda upp bilden till S3');
  }
}

exports.handler = async (event) => {
  try {
    const items = JSON.parse(event.body);
    const confirmations = [];

    for (const item of items) {
      const dish = {
        id: uuid().slice(0, 4),
        name: item.name,
        description: item.description,
        ingredients: item.ingredients,
        available: item.available,
        createdAt: new Date().toISOString(),
      };

      if (item.image && item.image.buffer) {
        const fileName = `dish-images/${uuid()}-${item.image.name}`;
        const imageUrl = await uploadImageToS3(item.image.buffer, fileName);
        dish.imageUrl = imageUrl;
      }

      try {
        await db.put({
          TableName: 'HerringDB',
          Item: dish,
        });

        confirmations.push({
          id: dish.id,
          name: dish.name,
          description: dish.description,
          ingredients: dish.ingredients,
          available: dish.available,
          createdAt: dish.createdAt,
          imageUrl: dish.imageUrl || null,
        });
      } catch (innerError) {
        console.error(`Fel vid behandling av maträtt ${item.dish}:`, innerError);
      }
    }

    return sendResponse(201, { message: 'Meny tillagd!', data: confirmations });
  } catch (error) {
    console.error('Fel vid sparande av meny till DynamoDB:', error);
    return sendError(500, { message: 'Kunde inte spara menyn', error: error.message });
  }
};

// Författare: Niklas, Rindert, Jonas