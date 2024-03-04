import React from 'react'
import './UsersItem.css'
import { Link } from 'react-router-dom';
import Avatar from "./../../shared/components/UIelements/Avatar"
import Card from "../../shared/components/UIelements/Card"

function UsersItem(probs) {
  return (
   <li className='user-item'>
        <Card className="user-item__content" >
            <Link to ={`/${probs.id}/places`}>
                <div className="user-item__image">
                    <Avatar image={probs.image} alt={probs.name}  />
                </div>
                <div className="user-item__info">
                    <h2>{probs.name}</h2>
                    <h3>{probs.placecount} {probs.placecount ===1 ? 'place' : 'places'}</h3>
                </div>
            </Link>
        </Card>
   </li>
  );
}

export default UsersItem