import { RequestHandler } from "express";
import { asyncHandler } from "../Utils/AsyncHandler";
import {
  createCollectionService,
  deleteCollectionById,
  getAllCollectionService,
  updateCollectionService,
} from "../Services/CollectionService";
import {
  userInputCollection,
  userUpdateCollectionInput,
} from "../Types/Collection";

export const getAllCollectionController: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const userId = res.locals.userId;

    const collections = await getAllCollectionService(userId);

    res.status(200).json(collections);
  }
);

export const updateCollectionController: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const userId = res.locals.userId;
    const collectionsId = req.params.collectionId;

    const collectionData = req.body as userUpdateCollectionInput;

    await updateCollectionService(userId, collectionsId, collectionData);

    res.status(200).json("Collection updated successfully");
  }
);

export const createCollection: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const userId = res.locals.userId;
    const collectionData: userInputCollection = req.body;

    const result = await createCollectionService(userId, collectionData);

    res.status(200).json(result);
  }
);

export const deleteCollectionController: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const userId = res.locals.userId;
    const collectionId = req.params.collectionId;

    await deleteCollectionById(collectionId, userId);

    res.status(200).json("Collection deleted successfully");
  }
);
