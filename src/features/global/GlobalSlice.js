import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
   products:[
      {
        id: 1,
        title: 'Ürün Adı 1',
        variants: [...Array(24)].map( (k,i) =>({
            id: 101  +i ,
            title: 'Variant ' + (i+1),
            stock: Math.ceil(Math.random() * 50)
          })),
      },{
        id: 2,
        title: 'Ürün Adı 2',
        variants: []
      }
   ],
   list:[
      {
        id:1,
        title: 'Liste 1',
        items: [
          {
            product:{
              id: 1,
              title: 'Ürün Adı 1',
            },
            variants:[
              {
                id: 101,
                title: 'Variant 1',
                total: 2
              },
              {
                id: 102,
                title: 'Variant 2',
                total: 3
              }
            ]
          }
        ]
      }
   ],
   deleteDialogProps:{
      show: false,
      title: '',
      message: '',
      selected: null,
      method: '' // product|variant
   },
   showCreateProductModal: false,
   editProductModal:{
      show: false,
      selected: null
   },
   creteVariantModal: {
      show: true,
      selected: null
   },
   editVariantModal: {
      show: true,
      selected: null
   },
   createlistModal: {
      show: false
   },
   editlistModal:{
     show: false,
     selected: null
   },
   calculateListModal:{
     show: true,
     selected: null
   }
};


export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    showDeleteDialog: (state, action) => {
      const {title, message, selected, method } = action.payload;
      state.deleteDialogProps = {
        ...state.deleteDialogProps,
        title, message, selected, method
      }
    },
    setDeleteDialog: (state,action) => {
      state.deleteDialogProps = {
        ...state.deleteDialogProps,
        show: true,
        ...action.payload
      };
    },
    setCreateProductModal: (state, action) => {
      state.showCreateProductModal = action.payload;
    },
    deleteDialogHandle: (state, action) => {
      state.deleteDialogProps.show = false;
      console.log( action.payload );
      state.products = state.products.filter(p => p.id !== action.payload);

      console.log("silindi deleteDialogHandle");
    },
    addProductItem: (state, action) => {
  
      state.products = [
        ...state.products,
        {
          id: Date.now(),
          title: action.payload.title,
          variants: []        
        }
      ];
      
      state.showCreateProductModal = false;
    },
    setEditProductModal: (state, action) => {
        state.editProductModal.show = action.payload.show ?? true;
        state.editProductModal.selected = action.payload.selected;
    },
    editVariantItem: (state, action) => {
        const item = state.products.find( p => p.id == action.payload.product_id );
        if(!item || !item.variants)
        return;

        const variant = item.variants.find( v => v.id == action.payload.id);

        if(variant){
          variant.title = action.payload.title;
          variant.stock = action.payload.stock;
       } 
    },
    editProductItem: (state, action) => {
      const item = state.products.find( p => p.id == action.payload.id );
      if(item){
        item.title = action.payload.title;
      }
    },
    setCreateVariantModal: (state, action) => {
      state.creteVariantModal.show = action.payload.show ?? false;
      state.creteVariantModal.selected = action.payload.selected;
    },
    addVariantItem: (state, action) => {
      const item = state.products.find( p => p.id == action.payload.id );
      if(item){
         if(!item.variants) item.variants = [];
         item.variants = [
            ...item.variants,
            {
              id: Date.now(),
              title: action.payload.title,
              stock: action.payload.stock
            }
         ];
      }
    },
    setEditVariantModal: (state, action) => {
      state.editVariantModal.show = action.payload.show ?? false;
      state.editVariantModal.selected = action.payload.selected;
    },
    deleteVariantHandle: (state, action) => {
      console.log('deleteVariantHandle', action)
      const item = state.products.find( p => p.id == action.payload.product_id );
      if(item && item.variants){
        console.log('deleteVariantHandle', action)
        item.variants = item.variants.filter(v => v.id !== action.payload.id);
      }
      state.deleteDialogProps.show = false;

    },
    setCreatelistModal: (state, action) =>{
        state.createlistModal.show = action.payload.show ?? false;
    },
    deleteListItem: (state, action) => {
      state.list = state.list.filter(i => i.id !== action.payload.id);
      state.deleteDialogProps.show = false;
    },
    addListItem: (state, action) => {
      state.list = [
        ...state.list,
        {
          id:Date.now(),
          title: action.payload.title,
          items: action.payload.items
        }
      ];
      state.createlistModal.show = false;
    },
    setEditListModal: (state, action) => {
      state.editlistModal.show = action.payload.show ?? false;
      state.editlistModal.selected = action.payload.selected;
    },
    editListItem: (state, action) => {
      const find = state.list.find(i => i.id == action.payload.id);
      console.log("find", find)
      if(find){
        find.title = action.payload.title;
        find.items = action.payload.items;
      }
      state.editlistModal.show = false;
      state.editlistModal.selected = null;
    },
    setCalculateListModal: (state, action) => {
      state.calculateListModal.show = action.payload.show ?? false;
      state.calculateListModal.selected = action.payload.selected;
    }
  },
});

export const { setDeleteDialog, 
  deleteDialogHandle, 
  setCreateProductModal, 
  addProductItem,
  deleteVariantHandle,
  editProductItem,
  setEditProductModal,
  setCreateVariantModal,
  addVariantItem,
  setEditVariantModal,
  editVariantItem,
  setCreatelistModal,
  deleteListItem,
  addListItem,
  editListItem,
  setEditListModal,
  setCalculateListModal
 } = globalSlice.actions;

export const showDeleteDialog = (state) => state.global.deleteDialogProps.show;
export const deleteDialogProps = (state) => state.global.deleteDialogProps;

export const showEditProductModal = (state) => state.global.editProductModal;

export const showCreateProductModal = (state) => state.global.showCreateProductModal;
export const showCreatelistModal = (state) => state.global.createlistModal;
export const showEditlistModal = (state) => state.global.editlistModal;

export const showCalculateListModal = (state) => state.global.calculateListModal;



export const showCreteVariantModal = (state) => state.global.creteVariantModal;
export const showEditVariantModal = (state) => state.global.editVariantModal;

export const getProducts = (state) => state.global.products;


export const getList = (state) => state.global.list;

export default globalSlice.reducer;