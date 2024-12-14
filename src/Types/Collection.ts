export interface userInputCollection {
  name: string;
  description?: string;
}

export interface userUpdateCollectionInput extends userInputCollection {
  columns: string[];
}

export interface collectionType extends userInputCollection {
  collection_id: string;
  user_id: string;
  name: string;
  description?: string;
  columns: string[];
}

export interface collectionDoc extends Document {
  created_at: Date;
  updated_at: Date;
}
