import Image from "next/image";
import React, { useState } from "react";
import deleteIcon from "@/public/icons/icons8-delete.svg";
import editIcon from "@/public/icons/icons8-edit.svg";
import tickIcon from "@/public/icons/icons8-tick.svg";
import cancelIcon from "@/public/icons/icons8-cancel.svg";

const TodoCard = ({ todo, handleDelete, handleEdit }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(todo?.content);

  return (
    <div className="flex justify-between items-center p-2 bg-gray-100 min-w-[300px] rounded cursor-pointer hover:bg-gray-200">
      {isEdit ? (
        <input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="px-2 py-1 rounded-[4px] focus:outline-none border"
        />
      ) : (
        <span className="px-2 py-1">{todo?.content}</span>
      )}
      <div className="flex items-center gap-2">
        {isEdit ? (
          <>
            <Image
              onClick={async () => {
                await handleEdit(todo.id, editValue);
                setIsEdit(false);
              }}
              src={tickIcon}
              alt="save"
              width={18}
              height={18}
            />
            <Image
              onClick={() => setIsEdit(false)}
              src={cancelIcon}
              alt="cancel"
              width={18}
              height={18}
            />
          </>
        ) : (
          <>
            <Image
              onClick={() => setIsEdit(true)}
              src={editIcon}
              alt="edit"
              width={18}
              height={18}
              className="transition duration-300 hover:rotate-45"
            />
            <Image
              onClick={() => handleDelete(todo.id)}
              src={deleteIcon}
              alt="delete"
              width={18}
              height={18}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
