import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "@/config/firebase";

export const getSingleDocument = createAsyncThunk(
  "document/getSingleDocument",
  async ({ id }: any, { dispatch, rejectWithValue }) => {
    try {
      const unsubscribe = firebase
        .firestore()
        .collection("documents")
        .doc(id)
        .onSnapshot((doc: any) => {
          if (doc.exists) {
            dispatch(documentsFetched({ id: doc.id, ...doc.data() }));
          } else {
            dispatch(documentsFetched({}));
          }
        });

      return unsubscribe;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const documentsFetched = (documents: {}) => ({
  type: "document/documentsFetched",
  payload: documents,
});

export const udpateDocumentName = createAsyncThunk(
  "document/udpateDocumentName",
  async ({ docId, title, onSuccess }: any, { dispatch, rejectWithValue }) => {
    try {
      firebase.firestore().collection("documents").doc(docId).update({ title });
      onSuccess()
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

interface HomeInitialState {
  singleDocument: any;
  loading: boolean;
  error: any;
}

const initialState: HomeInitialState = {
  singleDocument: {},
  loading: false,
  error: null,
};

const documentSlice = createSlice({
  name: "document",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingleDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleDocument.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getSingleDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase("document/documentsFetched", (state, action: any) => {
        console.log(action, "action.payload");
        state.singleDocument = action.payload;
      });
  },
});

export default documentSlice.reducer;
