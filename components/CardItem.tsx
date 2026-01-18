import React from "react";

const CardItem = ({
  fieldName,
  fieldValue,
}: {
  fieldName: string;
  fieldValue: string;
}) => {
  return (
    <div className="mb-2">
      {fieldName}: {<span className="font-bold">{fieldValue}</span>}
    </div>
  );
};

export default CardItem;
