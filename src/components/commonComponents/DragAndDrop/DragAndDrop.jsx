import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

const SortableItem = ({ children }) => {
  const { props, ...rest } = children;
  const { itemId, ...restProps } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: itemId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {React.cloneElement(rest, restProps)}
    </div>
  );
};

const DragAndDrop = ({
  children,
  items = [],
  setItems = () => {},
  setIsDragging = () => {},
}) => {
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = ({ active, over }) => {
    setIsDragging(false);

    if (!over) {
      return;
    }

    if (active.id === over.id) {
      return;
    }

    setItems(
      arrayMove(
        items,
        items.findIndex((it) => it.id === active.id),
        items.findIndex((it) => it.id === over.id)
      )
    );
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        {React.Children.map(children, (child) => {
          if (!child) {
            return;
          }

          return <SortableItem key={child.props.itemId}>{child}</SortableItem>;
        })}
      </SortableContext>
    </DndContext>
  );
};

export default DragAndDrop;
