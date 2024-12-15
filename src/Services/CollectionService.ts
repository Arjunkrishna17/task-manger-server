import { v4 as uuidv4 } from "uuid";

import {
  createCollectionDAL,
  deleteCollectionByIdDAL,
  getAllCollectionsDAL,
  updateCollectionByIdDAL,
} from "../DataAccessLayer/CollectionDAL";
import {
  collectionType,
  userInputCollection,
  userUpdateCollectionInput,
} from "../Types/Collection";
import { deleteTaskService } from "./TaskService";

export const getAllCollectionService = async (userId: string) => {
  const allCollections = (await getAllCollectionsDAL(userId)) || [];

  return allCollections;
};

export const createCollectionService = async (
  userId: string,
  collectionData: userInputCollection
) => {
  const collection_id = uuidv4();
  const defaultColumns = ["To Do", "In Progress", "Done"];

  const collection = {
    collection_id,
    ...collectionData,
    user_id: userId,
    columns: defaultColumns,
  };

  const result = await createCollectionDAL(collection);

  return result;
};

export const updateCollectionService = async (
  userId: string,
  collectionId: string,
  collectionData: userUpdateCollectionInput
) => {
  await updateCollectionByIdDAL(collectionId, userId, collectionData);
};

export const deleteCollectionById = async (
  collectionId: string,
  userId: string
) => {
  await deleteCollectionByIdDAL(collectionId, userId);
};
