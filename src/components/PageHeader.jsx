import Text from "./Text.jsx";

function PageHeader({ title, description }) {
  return (
      <div>
        <Text type="h2">{title}</Text>
        <div className="bg-primary h-1 w-10"></div>
        { description &&
          <Text type="p" className="mt-2">
            {description}
          </Text>
        }
        <div className="mb-5"></div>
      </div>
  );
}

export default PageHeader;