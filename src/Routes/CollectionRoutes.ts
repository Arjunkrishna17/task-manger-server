import { Router } from "express";
import { TokenValidator } from "../Middlewares/TokenValidator";
import {
  createCollectionController,
  deleteCollectionController,
  getAllCollectionController,
  updateCollectionController,
} from "../Controllers/CollectionController";
import { deleteTaskController } from "../Controllers/Tasks";

const collectionRouter = Router();

collectionRouter.get("", TokenValidator, getAllCollectionController);
collectionRouter.post("", TokenValidator, createCollectionController);
collectionRouter.put(
  "/:collectionId",
  TokenValidator,
  updateCollectionController
);
collectionRouter.delete(
  "/:collectionId",
  TokenValidator,
  deleteCollectionController
);

export default collectionRouter;
