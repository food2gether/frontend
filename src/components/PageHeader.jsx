import Text from "./Text.jsx";

function PageHeader({ title, description }) {
  return (
      <div>
        <Text type="h2">{title}</Text>
        <div className="bg-primary h-1 w-10"></div>
        { description &&
          <Text type="p" clazzName="mt-2">
            {description}
          </Text>
        }
      </div>
  );
}

export default PageHeader;