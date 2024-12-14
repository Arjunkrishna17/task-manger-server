import { collectionType, userUpdateCollectionInput } from "../Types/Collection";
import Collection from "../Models/Collection";
import { InternalServerError } from "../Utils/Error";

export const createCollectionDAL = async (data: collectionType) => {
  try {
    const collection = await Collection.create(data);

    return collection;
  } catch (error) {
    console.error("Error in create collection in db:", error);
    throw new InternalServerError("Error creating the collection.");
  }
};

export const getAllCollectionsDAL = async (userId: string) => {
  try {
    return await Collection.find({ user_id: userId });
  } catch (error) {
    console.error("Error in get collections in db:", error);
    throw new InternalServerError("Failed to get collections.");
  }
};

export const updateCollectionByIdDAL = async (
  id: string,
  userId: string,
  data: userUpdateCollectionInput
) => {
  try {
    return await Collection.findOneAndUpdate(
      { collection_id: id, user_id: userId },
      { $set: data },
      {
        new: true,
      }
    );
  } catch (error) {
    console.error("Error in update collection in db:", error);
    throw new InternalServerError("Failed to update collection.");
  }
};

export const deleteCollectionById = async (id: string, userId: string) => {
  try {
    return await Collection.findByIdAndDelete({
      collection_id: id,
      user_id: userId,
    });
  } catch (error) {
    console.error("Error in delete collection in db:", error);
    throw new InternalServerError("Failed to delete collection.");
  }
};
