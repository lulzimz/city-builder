import { Flex } from "antd";
import { housesStore } from "../../store/housesStore";
import "./HousesList.css";
import { useState } from "react";

const COLORS = ["red", "green", "orange"];

const HousesList = () => {
  const { houses, setHouses } = housesStore();

  const handleEditHouse = (id, key, value) => {
    setHouses(
      houses.map((house) =>
        house.id === id ? { ...house, [key]: value } : house
      )
    );
  };

  return (
    <Flex vertical className="housesContainer">
      <div className="section">Houses List</div>

      <Flex className="housesList">
        {houses.map(({ id, title, floors, color }, index) => {
          return (
            <Flex key={index} className="house">
              <Flex vertical gap={10}>
                <div className="title">{title}</div>

                <Flex gap={5}>
                  <span>Floors:{floors}</span>
                </Flex>

                <input
                  type="range"
                  value={floors}
                  max={10}
                  onChange={(e) =>
                    handleEditHouse(id, "floors", e.target.value)
                  }
                />
              </Flex>

              <Flex vertical gap={10}>
                <button
                  className="delete-icon"
                  onClick={() =>
                    setHouses(houses.filter((item) => item.id !== id))
                  }
                >
                  X
                </button>

                <Flex gap={5}>
                  <span>Color:</span>

                  <select
                    onChange={(e) =>
                      handleEditHouse(id, "color", e.target.value)
                    }
                  >
                    {COLORS.map((opt, i) => (
                      <option
                        key={i}
                        selected={opt === color}
                        value={opt}
                        label={opt}
                      />
                    ))}
                  </select>
                </Flex>
              </Flex>
            </Flex>
          );
        })}
      </Flex>

      <Footer />
    </Flex>
  );
};

export default HousesList;

const Footer = () => {
  const { houses, setHouses } = housesStore();

  const [createNewHouse, setCreateNewHouse] = useState(false);
  const [newHouse, setNewHouse] = useState({});

  const handleAddHouse = () => {
    setHouses([...houses, { id: Date.now(), ...newHouse }]);
    setCreateNewHouse(false);
  };

  return (
    <Flex justify="center" className="section">
      {!createNewHouse ? (
        <button onClick={() => setCreateNewHouse(true)}>Build new house</button>
      ) : (
        <Flex vertical gap={5}>
          <Flex gap={5}>
            Title:
            <input
              onChange={(e) =>
                setNewHouse((p) => ({ ...p, title: e.target.value }))
              }
            />
          </Flex>

          <Flex gap={5}>
            Floors:
            <input
              type="number"
              max="10"
              onChange={(e) => {
                const floor = e.target.value;
                setNewHouse((p) => ({ ...p, floors: floor > 10 ? 10 : floor }));
              }}
            />
          </Flex>

          <Flex gap={5}>
            Color:
            <select
              onChange={(e) =>
                setNewHouse((p) => ({ ...p, color: e.target.value }))
              }
            >
              {COLORS.map((opt, i) => (
                <option
                  key={i}
                  selected={opt === newHouse.color}
                  value={opt}
                  label={opt}
                />
              ))}
            </select>
          </Flex>

          <button
            disabled={Object.values(newHouse).length !== 3}
            onClick={handleAddHouse}
          >
            Add
          </button>

          <button onClick={() => setCreateNewHouse(false)}>Cancel</button>
        </Flex>
      )}
    </Flex>
  );
};
