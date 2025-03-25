import Text from "./Text.jsx";
import PropTypes from "prop-types";

function OrderDisplay({ name, quantity, price, light, className }) {
    return light ? (
        <>
            <div className={`p-2 pr-1 ${className} rounded-l-lg`}>{quantity}x</div>
            <div className={`p-2 pl-1 ${className} rounded-r-lg`}>{name}</div>
        </>
    ) : (
        <>
            <div className={`p-2 ${className} rounded-l-lg`}>{name}</div>
            <div className={`p-2 ${className}`}>{quantity}x</div>
            <div className={`p-2 ${className} rounded-r-lg`}>{price} EUR</div>
        </>
    );
}

OrderDisplay.propTypes = {
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    light: PropTypes.bool,
    className: PropTypes.string,
}

function OrderOverview({ orderItems, menu, light }) {
    return (
        <div className={"w-full"}>
            <div className="grid text-black" style={{ gridTemplateColumns: light ? "max-content max-content" : "auto max-content max-content" }}>
                {orderItems
                    .sort((a, b) => menu[a.menuItemId]?.name.localeCompare(menu[b.menuItemId]?.name))
                    .map((orderItem, index) => (
                        <OrderDisplay key={orderItem.id}
                                      name={menu[orderItem.menuItemId]?.name}
                                      quantity={orderItem.quantity}
                                      price={(menu[orderItem.menuItemId]?.price / 100).toFixed(2)}
                                      className={index % 2 === 0 ? "bg-primary/20" : ""}
                                      light={light}
                        />
                    ))}
            </div>
            <div className="flex flex-row justify-end">
                <Text className={"border-t-4 pl-4 mt-2 border-primary p-2"}>
                    {orderItems.reduce((prev, curr) => prev + (curr.quantity * menu[curr.menuItemId]?.price) / 100, 0).toFixed(2)} EUR
                </Text>
            </div>
        </div>
    );
}

OrderOverview.propTypes = {
    orderItems: PropTypes.array.isRequired,
    menu: PropTypes.object.isRequired,
    light: PropTypes.bool,
}

export default OrderOverview;
