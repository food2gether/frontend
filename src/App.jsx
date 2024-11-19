import React from "react";

// Components
import Text from "./components/Text";

function App() {
    return (
        <div className="navMargin">
            <div className="flex flex-row items-center justify-center mt-10 container">
                <Text type="h1" bold center clazzName={"mr-5"}>
                    Hello World
                </Text>
                <img
                    src="assets/hand.png"
                    alt="placeholder"
                    className="w-10 h-10"
                />
            </div>
        </div>
    );
}

export default App;
