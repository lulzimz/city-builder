import { Flex } from "antd";
import { housesStore } from "../../store/housesStore";
import House from "../House/House";

const Houses = () => {
  const { houses } = housesStore();

  return (
    <Flex align="end" gap={20} style={{ overflow: "auto" }}>
      {houses.map((house, index) => (
        <House key={house.id} {...house} />
      ))}
    </Flex>
  );
};

export default Houses;
