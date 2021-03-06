import Vue from 'vue'
import Router from 'vue-router'

import ProductShow from '@/components/product/show'
import ProductEdit from '@/components/product/edit'
import ProductInsert from '@/components/product/insert'
import ProductDetails from '@/components/product/details'
import ProductReport from '@/components/product/report'

import SaleShow from '@/components/sale/show'
import SaleEdit from '@/components/sale/edit'
import SaleInsert from '@/components/sale/insert'
import SaleDetails from '@/components/sale/details'
import SaleReport from '@/components/sale/report'

import ClientShow from '@/components/client/show'
import ClientEdit from '@/components/client/edit'
import ClientInsert from '@/components/client/insert'
import ClientDetails from '@/components/client/details'
import ClientReport from '@/components/client/report'

import pdv from '@/components/pdv/pdv'
import pay from '@/components/pdv/pay'
import report from '@/components/report/report'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/clients/report',
      name: 'clients.report',
      component: ClientReport
    },
    {
      path: '/products/report',
      name: 'products.report',
      component: ProductReport
    },
    {
      path: '/sales/report',
      name: 'sales.report',
      component: SaleReport
    },
    {
      path: '/',
      name: 'pdv',
      component: pdv
    },
    {
      path: '/reports',
      name: 'reports.show',
      component: report
    },
    {
      path: '/pay',
      component: pay
    },
    {
      path: '/products',
      name: 'products.show',
      component: ProductShow
    },
    {
      path: '/products/edit/:id',
      name: 'products.edit',
      component: ProductEdit
    },
    {
      path: '/products/new',
      name: 'products.insert',
      component: ProductInsert
    },
    {
      path: '/products/details/:id',
      name: 'products.details',
      component: ProductDetails
    },
    {
      path: '/sales',
      name: 'sales.show',
      component: SaleShow
    },
    {
      path: '/sales/edit/:id',
      name: 'sales.edit',
      component: SaleEdit
    },
    {
      path: '/sales/new',
      name: 'sales.insert',
      component: SaleInsert
    },
    {
      path: '/sales/details/:id',
      name: 'sales.details',
      component: SaleDetails
    },
    {
      path: '/clients',
      name: 'clients.show',
      component: ClientShow
    },
    {
      path: '/clients/edit/:id',
      name: 'clients.edit',
      component: ClientEdit
    },
    {
      path: '/clients/new',
      name: 'clients.insert',
      component: ClientInsert
    },
    {
      path: '/clients/details/:id',
      name: 'clients.details',
      component: ClientDetails
    }
  ]
})
