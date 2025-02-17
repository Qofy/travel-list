import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true},

// ];

export default function App(){

  //Uplifting
  const [items, setItems] = useState([])

  function handleAddItem(item){
    setItems(items => [...items, item])
  } 

  function handleDeletItem(id) {
    setItems((items) =>items
    .filter(item=> item.id !== id))
  }

  function handleToggleItem(id){
    setItems((items) => items.map((item) => item.id === id ? {...item, packed: !item.packed} : item))
  }
  return(
  <div className="app">
    <Logo/>
    <Form onAddItems = {handleAddItem}/>
    <PackingList items={items} onDeletItems ={handleDeletItem} onToggleItems={handleToggleItem}/>
    <Stats/>
  </div>
  )
}

function Logo(){
  return <h1> 🧑‍✈️ Far Away 🧳</h1>
}

function Form({onAddItems}){

  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)

  function handleSubmit(e){
    e.preventDefault();//this prevent default reload which is on forms
    const newItems = {quantity, description, packed: false, id: Date.now()};
    console.log(newItems)

    onAddItems(newItems)

    setDescription("")
    setQuantity(1)
}
  return <form className="add-form" onSubmit={handleSubmit}>
    <h3>What do you need for your 😍 trip?</h3>
    <select value={quantity} onChange={(e)=>{setQuantity(+e.target.value)}}>
    {Array.from({length: 20}, (__dirname, i) => i + 1).map(num => (
      <option value={num} key={num}>{num}</option>
    ))} 
    </select>
    <input type="text" placeholder="Item..." value={description} onChange={(e) =>{setDescription(e.target.value)}}/>
    <button>Add</button>
  </form>
}

function PackingList({ items, onDeletItems ,onToggleItems }){
  return(
    <div className="list">
      <ul>
        {items.map((item) => <Item key={item.id} onDeletItem={onDeletItems}item={item} onToggleItem= {onToggleItems}/>)}
      </ul>
    </div>
  )
}

function Item({item, onDeletItem, onToggleItem}){
  return <li>
    <input type="checkbox" value={item.packed} onChange={()=>{onToggleItem(item.id)}}/>
   <span style={item.packed ? {textDecoration: "line-through"}:{}}>
    {item.quantity} {item.description}   
    </span> 
    <button onClick={() => onDeletItem(item.id)}>❌</button>
  </li>
}

function Stats(){
  return <footer className="stats">
    <em>You have X items on your list, and you already packed X (X%)</em>
  </footer>
}