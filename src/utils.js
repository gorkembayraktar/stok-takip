import store from './store/index'


import { 
    setDeleteDialog as SDD, 
    deleteDialogHandle as DDH, 
    setCreateProductModal as createModal,
    addProductItem as insertProduct,
    deleteVariantHandle as deleteVariant,
    setEditProductModal as sEditProductModal,
    editProductItem as eProductItem,
    setCreateVariantModal as sCreateVariantModal,
    addVariantItem as addVariantItemFunc,
    setEditVariantModal as setEditVariantModalFunc,
    editVariantItem as editVariantItemFunc,
    setCreatelistModal as setCreatelistModalFunc,
    deleteListItem as deleteListItemFunc,
    addListItem as addListItemFunc,
    editListItem as editListItemFunc,
    setEditListModal as setEditListModalFunc,
    setCalculateListModal as setCalculateListModalFunc,
    setProductsInit as setProductsInitFunc,
    setListInit as setListInitFunc
} from './features/global/GlobalSlice'

import {
    login as loginFunc,
    logout as logoutFunc
} from './features/auth/AuthSlice'


export const login = ( state ) => {
    return store.dispatch( loginFunc( state ) );
}
export const logout = () => {
    return store.dispatch( logoutFunc( ) );
}

export const setProductsInit = (state) => {
    return store.dispatch( setProductsInitFunc(state) );
}
export const setListInit = (state) => {
    return store.dispatch( setListInitFunc(state) );
}


export const setDeleteDialog = ( state ) => {
    store.dispatch( SDD( state ) );
}

export const deleteDialogHandle = ( id ) => {
    store.dispatch( DDH( id ) );
}

export const setCreateProductModal = ( state ) => {
    store.dispatch( createModal( state ) );
}

export const addProductItem = (state) => {
    store.dispatch( insertProduct(state) );
}

export const deleteProduct = () => {

}

export const deleteVariantHandle = (state) => {
    store.dispatch( deleteVariant( state ) );
}


export const setEditProductModal = (state) => {
    store.dispatch( sEditProductModal( state ) );
}

export const editProductItem = (state) => {
    store.dispatch( eProductItem( state ) );
}

export const setCreateVariantModal = (state) => {
    store.dispatch( sCreateVariantModal(state) );
}

export const addVariantItem = (state)=>{
    store.dispatch( addVariantItemFunc(state) );
}
export const setEditVariantModal = (state) => {
    store.dispatch( setEditVariantModalFunc(state) );
}
export const editVariantItem = (state) => {
    store.dispatch( editVariantItemFunc(state) );
}

export const setCreatelistModal = (state) => {
    store.dispatch( setCreatelistModalFunc(state) );
}

export const deleteListItem = (state) => {
    store.dispatch( deleteListItemFunc(state) );
}
export const addListItem = (state) => {
    store.dispatch( addListItemFunc(state) );
}

export const editListItem = (state) => {
    store.dispatch( editListItemFunc(state) );
}
export const setEditListModal = (state) => {
    store.dispatch( setEditListModalFunc(state) );
}

export const setCalculateListModal = (state) => {
    store.dispatch( setCalculateListModalFunc(state) );
}

