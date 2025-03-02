import { Flex } from "antd";
import { housesStore } from "../../store/housesStore";
import House from "../House/House";
import DragAndDrop from "../commonComponents/DragAndDrop/DragAndDrop";
import { useState } from "react";

const Houses = () => {
  const { houses, setHouses } = housesStore();

  const [isDragging, setIsDragging] = useState(false);

  return (
    <Flex
      align="end"
      gap={20}
      style={{ overflow: isDragging ? "hidden" : "auto", flex: 1 }}
    >
      <DragAndDrop
        items={houses}
        setItems={setHouses}
        setIsDragging={setIsDragging}
      >
        {houses.map((house) => {
          return <House key={house.id} itemId={house.id} {...house} />;
        })}
      </DragAndDrop>
    </Flex>
  );
};

export default Houses;
