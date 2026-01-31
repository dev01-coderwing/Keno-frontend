import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import { toast } from "react-toastify";

/*  LIKE */
export const toggleFavorite = createAsyncThunk(
    "favorite/toggle",
    async (payload, { rejectWithValue }) => {
        try {
            console.log("LIKE PAYLOAD 👉", payload);
            const res = await api.post("/favorites/like", payload);
            return res.data;
        } catch (err) {
            console.log("LIKE ERROR 👉", err.response?.data);
            return rejectWithValue(err.response?.data || "Like failed");
        }
    }
);

/*  UNLIKE */
export const unlikeFavorite = createAsyncThunk(
    "favorite/unlike",
    async (favoriteId, { rejectWithValue }) => {
        try {
            await api.delete(`/favorites/${favoriteId}`);
            return favoriteId;
        } catch (err) {
            return rejectWithValue("Unlike failed");
        }
    }
);

export const fetchUserFavorites = createAsyncThunk(
  "favorite/fetchUser",
  async (userId) => {
    const res = await api.get(`/favorites/user/${userId}`);
    return res.data.favorites; // backend { favorites: [...] }
  }
);

const favoriteSlice = createSlice({
    name: "favorite",
    initialState: {
       likedResults: {},    
  favoritesList: [],   
  loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(toggleFavorite.pending, (state) => {
                state.loading = true;
            })

            
            .addCase(toggleFavorite.fulfilled, (state, action) => {
                state.loading = false;

                if (!action.payload || !action.payload.favorite) return;

                const fav = action.payload.favorite;

                state.likedResults[fav.resultId] = fav._id;   
                toast.success("Liked ");
            })

            .addCase(toggleFavorite.rejected, (state, action) => {
                state.loading = false;

                if (action.payload?.message === "Already liked") {
                    const fav = action.payload.favorite;   

                    if (fav) {
                        state.likedResults[fav.resultId] = fav._id;
                    }

                    toast.info("Already liked this number ");
                } else {
                    toast.error("Something went wrong");
                }
            })

      
            .addCase(unlikeFavorite.fulfilled, (state, action) => {
                const favoriteId = action.payload;

                for (const resultId in state.likedResults) {
                    if (state.likedResults[resultId] === favoriteId) {
                        delete state.likedResults[resultId];
                    }
                }

                toast.info("Removed from favorites ");
            })
            .addCase(fetchUserFavorites.fulfilled, (state, action) => {
  const all = action.payload || [];
  const keno = all.filter(f => f.gameType === "KENO");

  state.favoritesList = keno;
  state.likedResults = {};
  keno.forEach(f => {
    state.likedResults[f.resultId] = f._id;
  });
});

    },
});

export default favoriteSlice.reducer;
