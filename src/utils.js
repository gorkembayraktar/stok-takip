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
    editVariantItem as editVariantItemFunc
} from './features/global/GlobalSlice'

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