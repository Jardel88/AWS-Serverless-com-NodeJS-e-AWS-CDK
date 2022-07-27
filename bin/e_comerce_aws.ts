
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ProductsAppStack } from '../lib/productsApp-stack'
import { ECommerceApiStack } from '../lib/ecommerceApi-stack';


const app = new cdk.App();

const env: cdk.Environment = {
  account: "715117130685",
  region: "us-east-1"
}

//Tag para controle de custo
const tags = {
  cost: "ECommerce",
  team: "CursoAWS"
}

const productsAppStack = new ProductsAppStack(app, "ProductsApp", {
  tags: tags,
  env: env
})

const eCommerceApiStack = new ECommerceApiStack(app, "EComerceApi", {
  productsFetchHandler: productsAppStack.productsFetchHandler,
  tags: tags,
  env: env
})

//Apensa para deixar explicito que uma Stack depende de outra Stack
eCommerceApiStack.addDependency(productsAppStack)