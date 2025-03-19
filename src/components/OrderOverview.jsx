import Text from "./Text.jsx";

function OrderOverview({ orderItems, menu }) {
    return (
        <div>
            <div className="grid" style={{ gridTemplateColumns: "auto max-content max-content" }}>
                {orderItems
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((orderItem, index) => (
                        <>
                            <div className={`p-2 ${index % 2 !== 0 ? "bg-primary border-l-2" : ""}`} key={orderItem.id + "name"}>
                                {menu[orderItem.menuItemId].name}
                            </div>
                            <div className={`p-2 ${index % 2 !== 0 ? "bg-primary" : ""}`} key={orderItem.id + "quantity"}>
                                {orderItem.quantity}x
                            </div>
                            <div className={`p-2 ${index % 2 !== 0 ? "bg-primary border-r-2" : ""}`} key={orderItem.id + "price"}>
                                {menu[orderItem.menuItemId].price} EUR
                            </div>
                        </>
                    ))}
            </div>
            <Text className={"border-t-4 pl-4 mt-2 border-primary"}>
                {orderItems.reduce((prev, curr) => prev + (curr.quantity * menu[curr.menuItemId].price) / 100, 0).toFixed(2)} EUR
            </Text>
        </div>
    );
}

export default OrderOverview;