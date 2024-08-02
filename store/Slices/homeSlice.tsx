import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "@/config/firebase";

interface createNewDoc {
  payload: any;
  onSuccess: any;
}
interface getDocumentProps {
  email: string;
}
interface DocumentData {
  id: string;
  [key: string]: any;
}
interface deleteDocument {
  docId: string;
  onSuccess: any;
}

export const createNewDocument = createAsyncThunk(
  "home/createNewDocument",
  async ({ payload, onSuccess }: createNewDoc, { rejectWithValue }) => {
    try {
      payload.createdAt = firebase.firestore.FieldValue.serverTimestamp();
      await firebase
        .firestore()
        .collection("documents")
        .add(payload)
        .then((doc) => {
          onSuccess(doc.id);
        });
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const getDocuments = createAsyncThunk(
  "home/getDocuments",
  async ({ email }: getDocumentProps, { rejectWithValue }) => {
    try {
      return new Promise<DocumentData[]>((resolve, reject) => {
        firebase
          .firestore()
          .collection("documents")
          .where("adminEmail", "==", email)
          .onSnapshot(
            (snapshot) => {
              const updatedDocuments: DocumentData[] = [];
              snapshot.forEach((doc) => {
                updatedDocuments.push({ id: doc.id, ...doc.data() });
              });
              resolve(updatedDocuments);
            },
            (error) => {
              reject(error.message);
            }
          );
      });
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteDocument = createAsyncThunk(
  "home/deleteDocument",
  async ({ docId, onSuccess }: deleteDocument, { rejectWithValue }) => {
    try {
      await firebase.firestore().collection("documents").doc(docId).delete();
      onSuccess();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

interface HomeInitialState {
  documents: any;
  loading: boolean;
  error: any;
}

const initialState: HomeInitialState = {
  documents: [],
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewDocument.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewDocument.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createNewDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getDocuments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload;
      })
      .addCase(getDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export default homeSlice.reducer;