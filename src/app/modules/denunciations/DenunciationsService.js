import { mongoClient } from '../shared/index.js';

export default class DenunciationsService {
  async create(data){
    const collection = mongoClient.db.collection('denunciations');
    const result = await collection.insertOne(data)
    .catch(err => {
      console.err(err);
    });
    return {
      id: result.insertedId,
      data: data
    };
  };
  async list(){
    const collection = mongoClient.db.collection('denunciations');
    const data = await collection.find({}).toArray()
      .catch(() => {

      });
    return data;
  }

}
