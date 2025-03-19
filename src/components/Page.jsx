import Text from "./Text.jsx";

const loadingPage = (
    <Page title={"Loading..."} description={"Please stand by until the page loaded."} />
)

function Page({ ready = true, title, description, className, children }) {
    return ready ? (
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
    ) : loadingPage;
}

export default Page;
