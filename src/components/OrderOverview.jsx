import Text from "./Text.jsx";

function OrderOverview({ orderItems, menu }) {
    return (
        <div className={"w-full"}>
            <div className="grid text-black" style={{ gridTemplateColumns: "auto max-content max-content" }}>
                {orderItems
                    .sort((a, b) => menu[a.menuItemId].name.localeCompare(menu[b.menuItemId].name))
                    .map((orderItem, index) => (
                        <>
                            <div className={`p-2 ${index % 2 !== 0 ? "bg-primary/20 rounded-l-lg" : ""}`} key={orderItem.id + "name"}>
                                {menu[orderItem.menuItemId].name}
                            </div>
                            <div className={`p-2 ${index % 2 !== 0 ? "bg-primary/20" : ""}`} key={orderItem.id + "quantity"}>
                                {orderItem.quantity}x
                            </div>
                            <div className={`p-2 ${index % 2 !== 0 ? "bg-primary/20 rounded-r-lg" : ""}`} key={orderItem.id + "price"}>
                                {(menu[orderItem.menuItemId].price / 100).toFixed(2)} EUR
                            </div>
                        </>
                    ))}
            </div>
            <div className="flex flex-row justify-end">
                <Text className={"border-t-4 pl-4 mt-2 border-primary p-2"}>
                    {orderItems.reduce((prev, curr) => prev + (curr.quantity * menu[curr.menuItemId].price) / 100, 0).toFixed(2)} EUR
                </Text>
            </div>
        </div>
    );
}

export default OrderOverview;