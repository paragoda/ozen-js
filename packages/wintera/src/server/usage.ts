import { ZimaAdmin } from '.'
import { cb } from './builders/ColBuilder'
import { Model } from './types'

/*
File describe how I want to model backend from frontend
*/

const admin = new ZimaAdmin('api.somedomen.com', 'some super secret admin token')

type Category = {
  id: string
  name: string
}

// client model
type Product = {
  id: string
  name: string
  count: number
  category: string
}

const categoryModel: Model<Category> = {
  id: cb.uuid().pk(),
  name: cb.varchar(255).unique()
}

const productModel: Model<Product> = {
  id: cb.uuid().pk(),
  name: cb.text().unique(),
  count: cb.int(64),
  category: cb.fk(categoryModel.id).nullable()
}

admin.route('long', 'SELECT * FROM users ... long query ...')
admin.models(categoryModel, productModel)