import { Box } from "@chakra-ui/react";
import { useState } from "react";

const TruncatedText = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedText = isExpanded
    ? text
    : text.split(" ").slice(0, 10).join(" ");

  return (
    <div>
      <Box
        className={`truncated-text ${isExpanded ? "expanded" : ""}`}
        lineHeight={6}
      >
        {truncatedText}
        {!isExpanded && text.split(" ").length > 10 && (
          <span
            onClick={toggleExpanded}
            style={{ cursor: "pointer", color: "#185aca", fontSize: "13px" }}
          >
            ... See More
          </span>
        )}
        {isExpanded && (
          <span
            onClick={toggleExpanded}
            style={{ cursor: "pointer", color: "#185aca", fontSize: "13px" }}
          >
            ... Less
          </span>
        )}
      </Box>
    </div>
  );
};

export default TruncatedText;
