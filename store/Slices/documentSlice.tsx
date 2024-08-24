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
      onSuccess();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const AddMessage = createAsyncThunk(
  "document/AddMessage",
  async ({ payload, onSuccess }: any, { dispatch, rejectWithValue }) => {
    try {
      const newPaylaod = {
        email: payload.email,
        clerkId: payload?.clerkId,
        profileImage: payload.profileImage,
        name: payload.name,
        message: payload.message,
        parentDocId: payload?.id,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      firebase
        .firestore()
        .collection("documents")
        .doc(payload.id)
        .collection("messages")
        .add(newPaylaod);
      onSuccess();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const AddThread = createAsyncThunk(
  "document/AddThread",
  async ({ payload, onSuccess }: any, { dispatch, rejectWithValue }) => {
    try {
      const newPaylaod = {
        email: payload.email,
        clerkId: payload?.clerkId,
        profileImage: payload.profileImage,
        name: payload.name,
        message: payload.message,
        // parentDocId: payload?.id,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      firebase
        .firestore()
        .collection("documents")
        .doc(payload.id)
        .collection("messages")
        .doc(payload.threadId)
        .collection("threads")
        .add(newPaylaod);
      onSuccess();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const getChats = createAsyncThunk(
  "document/getChats",
  async ({ id }: any, { dispatch, rejectWithValue }) => {
    try {
      const unsubscribe = firebase
        .firestore()
        .collection("documents")
        .doc(id)
        .collection("messages")
        .orderBy("createdAt", "desc")
        .onSnapshot((querySnapshot) => {
          const tempStates: any[] = [];
          querySnapshot.forEach((doc) => {
            tempStates.push({ id: doc.id, ...doc.data() });
          });
          console.log(tempStates, "tempStatestempStates");
          dispatch(getChatsFetched(tempStates));
        });

      return unsubscribe;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const getChatsFetched = (chats: any[]) => ({
  type: "document/getChatsFetched",
  payload: chats,
});

interface HomeInitialState {
  singleDocument: any;
  documentChats: any;
  loading: boolean;
  error: any;
}

const initialState: HomeInitialState = {
  singleDocument: {},
  documentChats: [],
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
        state.singleDocument = action.payload;
      })
      .addCase(getChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase("document/getChatsFetched", (state, action: any) => {
        state.documentChats = action.payload;
      });
  },
});

export default documentSlice.reducer;
