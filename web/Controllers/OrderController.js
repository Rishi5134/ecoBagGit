// fetches ecobag orders
export const allEcoOrders = async (req, res,session,  client, Order) => {
    try {
        const { reverseValue, searchCategory, forwardCursor, backwardCursor, firstNumProd, lastNumProd } = req.body
        console.log("forwardcursor", forwardCursor);

        // const test_session = await Shopify.Utils.loadCurrentSession(req, res);
        const ordersCount = await Order.count({
            session: session,
            status: "any",
        });
        const variables = {
            "numProds": 8,
            "ForwardCursor": forwardCursor,
            "BackwardCursor": backwardCursor
        }
        const data = await client.query({
            data: {
                query: `query ($numProds: Int!, $ForwardCursor: String, $BackwardCursor: String) {
                    orders(reverse:${reverseValue}, first: ${firstNumProd}, after: $ForwardCursor, last: ${lastNumProd}, before: $BackwardCursor, query:"lineItems.title:Eco Bag") {
                      edges {
                        cursor
                        node {
                            currencyCode
                          id
                          totalPrice
                          name
                          email
                          discountCode
                          lineItems(first: 10) {
                            nodes {
                              name
                              title
                              variantTitle
                              id
                            }
                          }
                        }
                      }
                      pageInfo {
                        startCursor
                        hasNextPage
                        hasPreviousPage
                        endCursor
                      }
                    }
                  }
                  `,

                variables: variables
            }

        });
        const ordersCount2 = {
            count: 0
        }
        res.status(200).json({ data, ordersCount, success: true });

    } catch (error) {
        console.log("Error" + error);
        res.status(200).json({ error, success: false });
    }
}

// fetches one order
export const singleOrder = async (req, res,session,  client) => {
    try {
        const ID = req.params.id;
        console.log("Order ID", ID);
        const order = await client.query({
            data: `{
      order(id: "gid://shopify/Order/3937586544769") {
        canMarkAsPaid
        email
        id
        lineItems(first: 10) {
          nodes {
            id
            title
          }
        }
        name
        totalPrice
        totalTax
      }
  }`})
        console.log("Order: " + order);
        res.status(200).json(order)
    } catch (error) {
        console.log("Error" + error);
    }
}

//fetches all products
export const allProducts = async (req, res,session,  Product) => {
    try {
        console.log("Session: " + session?.accessToken);
        const products = await Product.all({ session });
        // console.log("Products", products);
        res.status(200).json({ products })

    } catch (error) {
        console.log("Error" + error);
        res.status(500).json({ error })
    }
}

// fetches one product
export const singleProduct = async (req, res,session,  Product) => {
    try {
        let id = req.params.id
        const singleProduct = await Product.find({ session, id });
        // console.log(singleProduct);
        res.status(200).send(singleProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}