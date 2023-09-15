import store from '../store/index'

import { getList } from './index'
import { setListInit } from '../utils'

export const refreshListTable = () => {
    getList().then(data => {
        if(data?.status){
            setListInit(data.data);
        }
    }).catch(() => {

    })
}