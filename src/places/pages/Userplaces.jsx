import React from 'react'
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import Button from '../../shared/components/FormElements/Button';


const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire state bulding',
    description: 'One of the famous sky scrapers in the world',
    imageUrl: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F1%2F10%2FEmpire_State_Building_%2528aerial_view%2529.jpg%2F800px-Empire_State_Building_%2528aerial_view%2529.jpg&tbnid=Rmci_Vo7MhgNuM&vet=12ahUKEwjry761uquEAxUtVaQEHflICxsQMygAegQIARB0..i&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FEmpire_State_Building&docid=XfQII-lYE0auyM&w=800&h=1201&q=empire%20state%20building&ved=2ahUKEwjry761uquEAxUtVaQEHflICxsQMygAegQIARB0',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat:40.7484405,
      lng:-73.9878584
    },
    creator:'u1',

  },
  {
    id: 'p2',
    title: 'Emp state bulding',
    description: 'One of the famous sky scrapers in the world',
    imageUrl: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F1%2F10%2FEmpire_State_Building_%2528aerial_view%2529.jpg%2F800px-Empire_State_Building_%2528aerial_view%2529.jpg&tbnid=Rmci_Vo7MhgNuM&vet=12ahUKEwjry761uquEAxUtVaQEHflICxsQMygAegQIARB0..i&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FEmpire_State_Building&docid=XfQII-lYE0auyM&w=800&h=1201&q=empire%20state%20building&ved=2ahUKEwjry761uquEAxUtVaQEHflICxsQMygAegQIARB0',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat:40.7484405,
      lng:-73.9878584
    },
    creator:'u2',

  }
]

const Userplaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)
  return (
    <PlaceList items = {loadedPlaces} />
  )
}

export default Userplaces