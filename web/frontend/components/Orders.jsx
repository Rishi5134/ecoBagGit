import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils"
import { Button, DataTable, Pagination } from "@shopify/polaris";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { EditMajor, DeleteMajor } from '@shopify/polaris-icons';
import '../Styles/Orders.css';

const Orders = () => {
    const app = useAppBridge();
    const [orders, setOrders] = useState([]);
    const [lineItems, setLineItems] = useState([]);
    const [searchCategory, setSearchCategory] = useState(null)
    const [reverseValue, setReverseValue] = useState(false)
    const [forwardCursor, setForwardCursor] = useState(null);
    const [backwardCursor, setBackwardCursor] = useState(null);
    const [backwardCursorString, setBackwardCursorString] = useState(null);
    const [forwardCursorString, setForwardCursorString] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [firstNumProd, setFirstNumProd] = useState("$numProds");
    const [lastNumProd, setLastNumProd] = useState(null);
    const [customerEmail, setCustomerEmail] = useState("");

    const prevData = () => {
        setBackwardCursor(backwardCursorString)
        setForwardCursor(null)
        setLastNumProd("$numProds")
        setFirstNumProd(null)
        if (prevPage === false) {
            setBackwardCursor(null)
        }
        // getAllOrders(queryFilters)
    }
    const nextData = () => {
        // setCurrentPage(currentPage + 1)
        setLastNumProd(null)
        setFirstNumProd("$numProds")
        setForwardCursor(forwardCursorString)
        setBackwardCursor(null)
        if (nextPage === false) {
            setForwardCursor(null)
        }
        // getAllOrders(queryFilters);
    }

    const cssNextEnable = `
#nextURL {
    pointer-events: none !important;
}
`
    const cssNextDisable = `
#nextURL {
    pointer-events: auto !important;
}
`
    const cssPrevDisable = `
#previousURL {
    pointer-events: none !important;
}
`
    const cssPrevEnable = `
#previousURL {
    pointer-events: auto !important;
}
`
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
        [
            item.node.email,
        ],
        // [
        //     `${item.node.variants.nodes[0].price}`
        //     // }`,
        // ],

        // [
        //     <div onClick={
        //         () => getSingleOrder(item.node.id)
        //     }>
        //         <Button onClick={toggleModal}><EditMajor />
        //         </Button>
        //     </div>,

        //     // <EditMajor onClick={
        //     //     () => getSingleProdGql(item.node.id)
        //     // }/>,
        // ],
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
    const getSingleOrder = async (SingleProdID) => {
        const id = SingleProdID.split('/').splice(-1)
        const token = await getSessionToken(app);
        console.log("token:-", token);
        const config = {
            headers: {
                Authorization: "Bearer " + token,
            }
        }
        body: ProductID
        try {
            const { data } = await axios.get(`/api/order/${id}`, config);
            console.log("Single Order orders", data)
        } catch (error) {
            console.log("Single Order Error", error);
        }

    }

    const getAllOrders = async (queryFilters) => {
        const token = await getSessionToken(app);
        console.log("token:-", token);
        const config = {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(queryFilters)
        }
        const { data } = await axios.post('/api/orders', queryFilters, config);
        console.log("All orders", data)
   
    
        setForwardCursorString(data.body.data.orders.pageInfo.endCursor)
        setBackwardCursorString(data.body.data.orders.pageInfo.startCursor)
        setPrevPage(data.body.data.orders.pageInfo.hasPreviousPage)
        setNextPage(data.body.data.orders.pageInfo.hasNextPage)
        setOrders(data.body.data.orders.edges);
        // setCustomerEmail(data.body.data.orders.edges);
    }
    console.log("forwardCursor", forwardCursor);
    console.log("backwardCursor", backwardCursor);
    const queryFilters = {
        reverseValue, searchCategory, forwardCursor, backwardCursor, nextPage, prevPage, firstNumProd, lastNumProd
    }
    useEffect(() => {
        getAllOrders(queryFilters)
        // getSingleOrder()
    }, [reverseValue, searchCategory, forwardCursor, backwardCursor, nextPage, prevPage, firstNumProd, lastNumProd])
    return (
        <>
        {
            nextPage !== true ? <style>{cssNextEnable}</style> : <style>{cssNextDisable}</style>
        }
        {
            prevPage !== true ? <style>{cssPrevDisable}</style> : <style>{cssPrevEnable}</style>
        }
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


                        "Email",

                    ]
                }
                rows={rows2}
                footerContent={
                    `Showing ${currentPage} of ${totalPages} results`
                } />
                <div className="ordersPagination">
                <Pagination hasPrevious
                onPrevious={prevData}
                hasNext
                onNext={nextData} />
                </div>

        </>
    )
}

export default Orders