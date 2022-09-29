import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import axios from 'axios'
import { trophyImage } from "../assets";

import { ProductsCard } from "../components";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { useEffect } from "react";
import Orders from "../components/Orders";

export default function HomePage() {
  const app = useAppBridge();
  const allProducts = async () => {
    const token = await getSessionToken(app);
    console.log("token:-", token);
    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + token,
        }

      }
      const { data } = await axios.get('/api/products', config);
      console.log("All Products", data);

    } catch (error) {
      console.log("Error", error);
    }

  }
  const singleProduct = async () => {
    const token = await getSessionToken(app);
    console.log("token:-", token);
    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + token,
        }

      }
      const { data } = await axios.get('/api/product/6588815343745', config);
      console.log("Product", data);

    } catch (error) {
      console.log("Error", error);
    }

  }
  useEffect(() => {
    allProducts();
  })

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card sectioned>
           <Orders/>
          </Card>
        </Layout.Section>
      
      </Layout>
    </Page>
  );
}
