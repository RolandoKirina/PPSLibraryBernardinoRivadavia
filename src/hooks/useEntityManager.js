import { useState, useEffect } from "react";

export const  useEntityManager = (initialItemsEntity, nameEntity) =>{
    const getStoredItems = () =>{
        const stored  = localStorage.getItem(`${nameEntity}`);
        if(!stored || stored==='[]'){
            return initialItemsEntity;
        }

        try{
            return JSON.parse(stored);
        }

         catch (error) {
            console.error("Error parsing:", error);
             return initialItemsEntity;
        }
    };
    const [items,setItems]= useState(getStoredItems());


    useEffect(() => { //persistencia automatica
        localStorage.setItem(nameEntity, JSON.stringify(items));
    }, [items]);

    const getItem = (Id) => {
        const found = items.find((item) => item.Id === Id);
        if (!found) 
            console.warn(`Préstamo con ID ${Id} no encontrado`);
        return found;
    };

     //POST
    const createItem = (newItem) => {
        setItems((prev) => [...prev, newItem]);
    }

     const updateItem = (Id, updatedData) => {
        setItems((prev) => 
            prev.map((item) => 
               item.Id === Id ? { ...item, ...updatedData } : item

            )
        );
    }

       const deleteItem = (Id) => {
        setItems((prev) =>
            prev.filter((item) => item.id !== Id)
           
        );
         {console.log(items)}
    };

    return{
            items,
            getItem,
            createItem,
            updateItem,
            deleteItem
    };
}

