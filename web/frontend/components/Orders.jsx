import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils"
import { Button, DataTable } from "@shopify/polaris";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { EditMajor, DeleteMajor } from '@shopify/polaris-icons';

const Orders = () => {
    const app = useAppBridge();
    const [orders, setOrders] = useState([]);
    const [lineItems, setLineItems] = useState([]);
    // if (orders) {
        
    //     setLineItems(orders.node.lineItems)
    //     console.log("LineItems", lineItems);
    // }
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10
    const count = orders.length
    const totalPages = Math.ceil(count / rowsPerPage)
    console.log("Total pages: " + totalPages);
    const calculatedRows = orders.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    console.log("calculatedRows", calculatedRows);



    const [active, setActive] = useState(false);
    const toggleModal = useCallback(() => setActive((active) => !active), []);




  const rows2 = calculatedRows.map((item) => ([
        // [
        //     <img src={
        //         item.node.images.nodes[0].src
        //     } />,
        // ],
        [
            item.node.name,
        ],
        [
            item.node.lineItems.nodes.map((i) => (<><h1>{i.title}</h1></>)),
        ],
        // [
        //     `${item.node.variants.nodes[0].price}`
        //     // }`,
        // ],

        [
            <div onClick={
                () => getSingleOrder(item.node.id)
            }>
                <Button onClick={toggleModal}><EditMajor />
                </Button>
            </div>,

            // <EditMajor onClick={
            //     () => getSingleProdGql(item.node.id)
            // }/>,
        ],
        // [

        //     <div style={
        //         {
        //             width: "2rem",
        //             cursor: "pointer"
        //         }
        //     }
        //         onClick={
        //             // () => getSingleProduct(item.id)
        //             () => setDeleteProdId(item.node.id)
        //         }>
        //         <DeleteMajor onClick={toggleModalDel} />


        //     </div>,
        //     // <DeleteMajor onClick={
        //     //     () => deleteProduct(item.id)
        //     // }/>
        // ],
    ]));
    const ProductID = {
            id: 3937586544769
        }
    const getSingleOrder = async(SingleProdID) => {
        const id = SingleProdID.split('/').splice(-1)
        const token = await getSessionToken(app);
        console.log("token:-", token);
        const config = {
            headers:{
                Authorization: "Bearer " + token,
            }
        }
        body: ProductID
        try {
            const {data} = await axios.get(`/api/order/${id}`, config);
        console.log("Single Order orders", data)
        } catch (error) {
            console.log("Single Order Error", error);
        }
        
    }

    const getAllOrders = async() => {
        const token = await getSessionToken(app);
        console.log("token:-", token);
        const config = {
            headers:{
                Authorization: "Bearer " + token,
            }
        }
        const {data} = await axios.get('/api/orders', config);
        console.log("All orders", data)
        setOrders(data.body.data.orders.edges);
        
    }
    useEffect(() => {
        getAllOrders()
        // getSingleOrder()
    },[])
  return (
    <>
        <h1>Orders</h1>
        <DataTable columnContentTypes={
                                [
                                    "text",
                                    "text",
                                    "text",
                                   
                                ]
                            }
                                headings={
                                    [
                                        "Order",
                                        "Ordered Items",
                                

                                        "Edit",
                                        
                                    ]
                                }
                                rows={rows2}
                                footerContent={
                                    `Showing ${currentPage} of ${totalPages} results`
                                } />

    </>
  )
}

export default Orders