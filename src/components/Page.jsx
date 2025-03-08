import Text from "./Text.jsx";

function Page({ title, description, className, children }) {
    return (
        <>
            <div>
                <Text type="h2">{title}</Text>
                <div className="bg-primary h-1 w-10"></div>
                {description && (
                    <Text type="p" className="mt-2">
                        {description}
                    </Text>
                )}
                <div className="mb-5"></div>
            </div>
            <div className={className}>{children}</div>
        </>
    );
}

export default Page;