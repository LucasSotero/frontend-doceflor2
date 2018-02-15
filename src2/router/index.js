import Vue from 'vue'
import Router from 'vue-router'

import modal2 from '@/components/Modal'

import ProductEdit from '@/components/product/edit'
import ProductInsert from '@/components/product/insert'
import ProductShow from '@/components/product/show'
import ProductDatails from '@/components/product/details'
import ProductReport from '@/components/product/report'

import clientEdit from '@/components/client/edit'
import clientShow from '@/components/client/show'
import clientInsert from '@/components/client/insert'
import clientDatails from '@/components/client/details'

import sale from '@/components/sale/Sale'
import saleShow from '@/components/sale/show'
import saleDatails1 from '@/components/sale/details'
import saleReport from '@/components/sale/report'
import modal from '@/components/sale/modal-sale'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/modal2',
      component: modal2
    },
    {
      path: '/sales',
      component: saleShow
    },
    {
      path: '/sales/details/:id',
      component: saleDatails1
    },
    {
      path: '/products',
      name: 'products',
      component: ProductShow
    },
    {
      path: '/products/view/:id',
      component: ProductEdit
    },
    {
      path: '/products/new/',
      component: ProductInsert
    },
    {
      path: '/products/details/:id',
      component: ProductDatails
    },
    {
      path: '/clients',
      name: 'clients',
      component: clientShow
    },
    {
      path: '/clients/view/:id',
      component: clientEdit
    },
    {
      path: '/clients/new/',
      component: clientInsert
    },
    {
      path: '/clients/details/:id',
      component: clientDatails
    },
    {
      path: '/sale/',
      component: sale
    },
    {
      path: '/products/report',
      component: ProductReport
    },
    {
      path: '/sales/report',
      component: saleReport
    },
    {
      path: '/sales/modal',
      component: modal
    }
  ]
})
