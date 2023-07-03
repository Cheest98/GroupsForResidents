import { Button } from "@mui/material";
import { useSelector } from "react-redux";

const ShoppingList = ({ shoppingLists, deleteShoppingList }) => {
    const token = useSelector((state) => state.token);

    const handleDelete = (listId) => {
        deleteShoppingList(listId);
    }

    return (
        <div>
            {shoppingLists.map(list => (
                <div key={list._id}>
                    <h2>{list.name}</h2>
                    <p>Total Price: {list.totalPrice}</p>
                    <Button
                        onClick={() => handleDelete(list._id)}
                        sx={{
                            color: "white",
                            backgroundColor: "red",
                            borderRadius: "3rem",
                        }}
                    >
                        Delete List
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default ShoppingList;